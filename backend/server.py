from flask import Flask, request, jsonify  # Flask framework for handling requests
from flask_cors import CORS  # To enable Cross-Origin Resource Sharing (CORS)
import tensorflow as tf  # TensorFlow for loading the model and making predictions
from tensorflow.keras.models import load_model  # Specific function for loading the model
import numpy as np  # NumPy for array manipulations
from PIL import Image  # Python Imaging Library (Pillow) for image processing
import os  # OS module for handling file paths and directories


# Load the model
class_names = ['T-shirt/top', 'Trouser', 'Pullover', 'Dress', 'Coat',
               'Sandal', 'Shirt', 'Sneaker', 'Bag', 'Ankle boot']

app = Flask(__name__)
CORS(app)

# find/create upload folder
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# set the folder where files (images) will be uploaded to
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# root route for backend page
@app.route("/")
def main():
    return {"message": "Welcome to the file upload server"}

# file upload route for backend
@app.route('/uploadFile', methods=['POST'])
def upload_file():
    # ensure the request has a file attached
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected  file"}), 400
    
    # save the file to the directory
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)
    script_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(script_dir, file_path)

    try:
        # load the model
        model_path = 'models/probability_model.keras'
        model = load_model(model_path)

        # load and preprocess the image
        img = Image.open(file).convert('L').resize((28, 28))
        img_array = np.array(img) / 255.0
        img_array = 1 - img_array
        img_array = np.expand_dims(img_array, axis=0)

        # make predictions
        probabilities = model.predict(img_array)

        print(f"Raw model output: {probabilities}")
        predictions = {class_names[i]: float(probabilities[0][i]) for i in range(len(class_names))}
        print(f"Probabilities sum: {np.sum(probabilities)}")  # Should be ~1.0

        predicted_label = class_names[np.argmax(probabilities[0])]
        confidence = float(np.max(probabilities)) * 100

        print(f"label: {predicted_label}")
        print(f"confidence: {confidence}")

        return jsonify({
            'message': 'File uploaded successfully', 
            'predictions':  predictions,
            'classification': predicted_label, 
            'confidence': confidence
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

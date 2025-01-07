# Full-Stack Clothing Classifier Web App

A full-stack web application that uses a machine learning model, trained with the Fashion MNIST dataset to classify uploaded images of clothing into predefined categories. The application displays the most likely classification along with the top 5 classifications and their associated probabilities.

## Features
- Upload an image of clothing to the webpage.
- The machine learning model predicts the image's clothing category.
- Displays the top prediction with its confidence score.
- Lists the top 5 classifications with their respective probabilities.

## Tech Stack

### Backend
- **Machine Learning Model**: Built and trained using TensorFlow in Google Colab.
- **Server**: Flask, handling image uploads, preprocessing, interacting with ML model to serve predictions.

### Frontend
- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind

## How It Works
1. **Image Upload**: Users upload an image of clothing via the web interface.
2. **Preprocessing**: 
   - The image is sent to the Flask server.
   - The machine learning model processes the image and predicts its classification.
   - Probabilities for all categories are calculated.
3. **Results**:
   - The server responds with the top classification and its confidence score.
   - It also includes the top 5 classifications and their probabilities.
4. **Display**:
   - The frontend shows the uploaded image, top prediction, and a list of the top 5 predictions.

## Setup Instructions
### Prerequisites
- Python (3.8 or later)
- Node.js (16.x or later)
- npm or yarn

### Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/johnsh9656/ClothingClassification.git
    ```
2. Follow the instructions in ./backend to set up the backend
3. Follow the instructions in ./frontend to set up the frontend
4. Visit [http://localhost:3000](http://localhost:3000)

"use client"
// pages/index.tsx
import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:5000/uploadFile', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch prediction');
      }

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error('Error uploading file:', error);
      setPrediction('Error making prediction.');
    }
  };

  return (
    <div className='flex flex-col justify-center text-cente text-content'>
      <h1>Clothing Classifier</h1>
      <h2 className='text-red-500 '>hello</h2>
      <section>
        <h2>Upload an Image</h2>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {file && <p>Selected file: {file.name}</p>}
        <button onClick={handleUpload} className='mt-3 p-3 cursor-pointer'>
          Upload and Predict
        </button>
      </section>

      <section className='p-5'>
        <h2>Prediction Result</h2>
        <div className='p-3 border-solid border-red-500 rounded-md bg-gray-200'>
          {prediction || 'No prediction yet.'}
        </div>
      </section>
    </div>
  );
}

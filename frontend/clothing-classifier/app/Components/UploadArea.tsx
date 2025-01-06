import React, { useState } from 'react';
import { Prediction } from '../page';

interface UploadAreaProps {
  predictionData: Prediction[];
  setPredictionData: React.Dispatch<React.SetStateAction<Prediction[]>>;
}

export default function UploadArea({ predictionData, setPredictionData }:UploadAreaProps) {
  
  const [file, setFile] = useState<File | null>(null);

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

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        const imageDataUrl = fileReader.result as string;

        const newPrediction: Prediction = {
          filename: file.name,
          classification: data.classification,
          confidence: data.confidence,
          path: imageDataUrl,
        };
  
        setPredictionData((predictionData) => [newPrediction, ...predictionData]);
      }

      
    } catch (error) {
      console.error('Error uploading file:', error);

      const errorPrediction: Prediction = {
        filename: file.name,
        classification: 'Error',
        confidence: 0,
      };
      
      setPredictionData((predictionData) => [errorPrediction, ...predictionData]);
    }

  };

  

  return (
    <section className='w-[80vw] md:w-[36rem] flex flex-col justify-center bg-altbackground rounded-2xl p-5 lg:p-6 gap-4 text-content border-black border-solid border-2 drop-shadow-custom hover:drop-shadow-hover transition-all duration-150'>
      <h2 className='text-left font-semibold'>Upload an Image:</h2>
      <div className='flex flex-row justify-between'>
        <label
          htmlFor="file-upload"
          className="py-2 px-5 cursor-pointer bg-blue-500 text-content rounded-xl hover:bg-blue-600 transition-all duration-300 text-center"
        >
          Select File
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <p className='text-right'>Selected file: {file ? file.name : "none"}</p>
      </div>
      
      <button onClick={handleUpload} className='p-3 cursor-pointer bg-accent hover:bg-accenthover rounded-xl transition-all duration-300'>
        Upload and Predict
      </button>
    </section>
  )
}
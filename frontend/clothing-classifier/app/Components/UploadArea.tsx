import React, { useState } from 'react';

interface UploadAreaProps {
  setPrediction: React.Dispatch<React.SetStateAction<string>>;
}

export default function UploadArea({ setPrediction }:UploadAreaProps) {
  
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
      setPrediction(data.prediction);
    } catch (error) {
      console.error('Error uploading file:', error);
      setPrediction('Error making prediction.');
    }

  };

  

  return (
    <section className='w-[80vw] flex flex-col justify-center bg-altbackground rounded-2xl p-5 gap-4 text-content'>
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
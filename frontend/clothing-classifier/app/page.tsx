"use client"
// pages/index.tsx
import { useState } from 'react';
import UploadArea from './Components/UploadArea';
import PredictionCard from './Components/PredictionCard';

export interface Prediction {
  classification: String;
  confidence: Number;
}

export default function Home() {
  const [predictionData, setPredictionData] = useState<Prediction[]>([])

  const [prediction, setPrediction] = useState<string>('');

  return (
    <main className='flex flex-col text-center items-center text-content min-h-screen'>
      <h1 className='mt-16 mb-10 text-content text-4xl font-bold '>Clothing Classifier</h1>
      <UploadArea setPrediction={setPrediction} />

      <section className='p-5'>
        <h2 className=''>Prediction Result</h2>
        <div className='p-3 border-solid border-red-500 rounded-md bg-gray-200'>
          {prediction || 'No prediction yet.'}
        </div>

        {predictionData.map((prediction, _) => (
          <PredictionCard prediction={prediction} />
        ))}
      </section>
    </main>
  );
}
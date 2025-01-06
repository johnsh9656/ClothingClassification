"use client"
// pages/index.tsx
import { useState } from 'react';
import UploadArea from './Components/UploadArea';
import PredictionCard from './Components/PredictionCard';

export interface Prediction {
  filename: string;
  classification: string;
  confidence: Number;
  path?: string;
}

export default function Home() {
  const [predictionData, setPredictionData] = useState<Prediction[]>([])

  return (
    <main className='flex flex-col text-center items-center text-content min-h-screen'>
      <h1 className='mt-16 mb-10 text-content text-4xl font-bold '>Clothing Classifier</h1>
      <UploadArea predictionData={predictionData} setPredictionData={setPredictionData} />

      <section className='flex flex-col gap-4 p-5 w-[80vw]'>
        {predictionData.map((prediction, _) => (
          <PredictionCard key={_} prediction={prediction} />
        ))}
      </section>
    </main>
  );
}
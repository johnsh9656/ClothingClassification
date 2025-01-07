import React from 'react'
import { Prediction } from '../page'
import Image from 'next/image';

interface PredictionCardProps {
    prediction: Prediction;
}

export default function PredictionCard({ prediction }: PredictionCardProps) {
    const sortedPredictions = Object.entries(prediction.predictions)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([label, probability]) => ({ label, probability }));

    return (
    <div className='flex flex-col md:flex-row items-center md:items-start bg-altbackground rounded-2xl p-4 gap-y-2 gap-x-4 border-black border-solid border-2 drop-shadow-custom hover:drop-shadow-hover transition-all duration-150'>
        <div className='flex  md:max-w-[50%]'>
            {prediction.path ? (
                <Image 
                    src={prediction.path || ""}
                    alt="Image not found"
                    width={500}
                    height={500}
                    className='rounded-lg border-black border-solid border-2'
                />
            ) : (
                <p>No image available</p>
            )}
        </div>
        <div className='flex flex-col gap-4 text-left w-full md:w-fit px-2 py-1 md:p-0'>
            <p className='font-bold'>{prediction.filename}</p>
            <div className='flex flex-col gap-0'>
                <p className=''><span className='font-semibold'>Classification: </span>{prediction.classification}</p>
                <p className=''><span className='font-semibold'>Confidence: </span>{prediction.confidence.toFixed(4)} %</p>
            </div>
            <ul className='flex flex-col text-xs'>
            {sortedPredictions.map(({ label, probability }) => (
                <li key={`${prediction.filename}_${label}`} className='flex flex-row justify-between'>
                    <span>{label}:</span>
                    <span>{(probability * 100).toFixed(4)}%</span>
                </li>
            ))}
            </ul>
        </div>
    </div>
  )
}
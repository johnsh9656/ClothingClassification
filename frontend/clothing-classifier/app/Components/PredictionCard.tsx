import React from 'react'
import { Prediction } from '../page'
import Image from 'next/image';

interface PredictionCardProps {
    prediction: Prediction;
}

export default function PredictionCard({ prediction }: PredictionCardProps) {
  return (
    <div className='flex flex-col md:flex-row items-center md:items-start bg-altbackground rounded-2xl p-4 md:p-8 gap-y-2 gap-x-4 border-black border-solid border-2'>
        <div className=' md:max-w-[50%]'>
            <Image 
                src={prediction.path || ""}
                alt="Image not found"
                width={500}
                height={500}
                className='rounded-lg border-black border-solid border-2'
            />
        </div>
        <div className='flex flex-col gap-4 text-left w-full px-2 py-1 md:p-0'>
            <p className='font-bold'>{prediction.filename}</p>
            <div className='flex flex-col gap-0'>
                <p className=''><span className='font-semibold'>Classification: </span>{prediction.classification}</p>
                <p className=''><span className='font-semibold'>Confidence: </span>{prediction.confidence.toFixed(4)} %</p>
            </div>
        </div>
    </div>
  )
}
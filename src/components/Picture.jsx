import React, { useState } from 'react'
import { photos } from '../photos'
import Carousel from './Carousel'
import { ImageCard } from './ImageCard'
import {ArrowLeft } from './icons'
import { useNavigate } from 'react-router-dom'

const years = [...new Set(photos.map(p => p.year))]

function Picture() {
  const navigate = useNavigate();
  const [year, setYear] = useState(years[0])

  return (

    <div className="flex flex-col items-center justify-center min-h-screen">

      <div className="w-[90%] max-w-[400px]">
        <h1 className="mt-4 text-2xl font-bold text-center text-white sm:text-2xl drop-shadow-lg">
            Album Kenangan Kita
          </h1>

        <div className="flex justify-center gap-2 mt-4">
          {years.map(y => (
            <button
              key={y}
              onClick={() => setYear(y)}
              className={`px-4 py-1 text-sm rounded-full border border-white/50 ${y === year ? 'bg-white text-gray-800' : 'bg-white/20 text-white'}`}
            >
              {y}
            </button>
          ))}
        </div>

        <Carousel key={year}>
          {photos.filter(p => p.year === year).map(p => (
            <ImageCard
              key={p.name}
              imageUrl={p.src}
              altText="Foto kenangan kita"
              title={p.title}
              description={p.caption}
            />
          ))}
        </Carousel>

        <div className="flex justify-center w-full mt-12 mb-8">
          <button
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-white border rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/50"
            onClick={() => navigate('/recap')}
          >
            <ArrowLeft /> Kembali
          </button>

        </div>
      </div>
    </div>


  )
}

export default Picture

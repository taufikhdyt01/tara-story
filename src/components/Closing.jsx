import React from 'react'
import {ArrowLeft } from './icons'
import { useNavigate } from 'react-router-dom'
import { fireworks,couple } from '../assets';

function Closing() {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 bg-black/20">
      {/* Fireworks background */}
      <div className="absolute inset-0 z-0">
        <img
          src={fireworks}
          alt="Fireworks"
          className="absolute object-cover w-full h-full opacity-30"
        />
      </div>

      <div className="z-10 max-w-lg text-center">
        {/* Couple Animation */}
        <div className="flex justify-center mb-8">
          <img
            src={couple}
            alt="Couple"
            className="object-contain w-48 h-48 drop-shadow-lg"
          />
        </div>

        {/* Greeting text */}
        <div className="space-y-6 text-white">
          <h1 className="text-3xl font-bold sm:text-4xl drop-shadow-lg">
            Happy 4 Months, Sayang! ❤️
          </h1>
          
          <p className="text-lg leading-relaxed sm:text-xl drop-shadow-lg">
            4 bulan bersamamu terasa seperti mimpi indah yang jadi kenyataan. Meskipun waktu bersamaan kita masih sebentar, tapi rasanya udah bikin aku yakin kalau kamu adalah jawaban dari semua doa-doaku. 
          </p>

          <p className="text-lg leading-relaxed sm:text-xl drop-shadow-lg">
            Makasih ya udah mau terima aku apa adanya. Makasih udah selalu support aku dalam segala hal. Makasih udah mau berbagi tawa dan air mata sama aku. 
          </p>

          <p className="text-lg font-bold leading-relaxed sm:text-xl drop-shadow-lg">
            I love you more each day, and I can't wait to create more beautiful memories with you! 💑
          </p>

          <p className="mt-8 text-sm text-white/80">
            With love, Taufik ✨
          </p>
        </div>

        {/* Button */}
        <div className="z-10 flex justify-center w-full mt-12">
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

export default Closing
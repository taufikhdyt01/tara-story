import React from 'react'
import { ArrowRight,ArrowLeft,Message,Image,Music,Heart } from './icons'
import { useNavigate } from 'react-router-dom'
import '../index.css'
function Recap() {
  const navigate = useNavigate();

  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-black/20">
    <div className="w-full max-w-sm text-center sm:max-w-md">
      <h1 className="mb-8 text-2xl font-bold text-white sm:text-4xl drop-shadow-lg">
        Yuk intip kenangan kita bersama ❤️
      </h1>
  
      <div className="flex flex-wrap justify-center gap-10 mb-12">
        {[
          { Icon: Message, label: 'Messages', path: '/recap/message' },
          { Icon: Image, label: 'Pictures', path: '/recap/pictures' },
          { Icon: Music, label: 'Music', path: '/recap/music' },
        ].map(({ Icon, label, path }) => (
          <div key={label} className="flex flex-col items-center">
            <button
              className="relative w-20 h-20 group sm:w-24 sm:h-24"
              onClick={() => navigate(path)}
            >
              <Heart className="absolute inset-0 z-0 w-full h-full shadow-svg" />
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <Icon color="#C67593" />
              </div>
            </button>
            <span className="mt-4 text-sm font-medium text-white animate-bounce">
              Klik aku! 
            </span>
          </div>
        ))}
      </div>
  
      <div className="flex justify-between w-full">
        <button
          className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-white border rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm sm:text-base border-white/50"
          onClick={() => navigate('/timer')}
        >
          <ArrowLeft />  Sebelumnya
        </button>
        <button
          className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-white border rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm sm:text-base border-white/50"
          onClick={() => navigate('/closing')}
        >
           Berikutnya <ArrowRight />
        </button>
      </div>
    </div>
  </div>
  
  )
}

export default Recap
import React from 'react'
import { ArrowRight,ArrowLeft,Message,Image,Music,Heart } from './icons'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Mic, ListChecks, MapPinned, CircleHelp } from 'lucide-react'
import '../index.css'
function Recap() {
  const navigate = useNavigate();

  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
    <div className="w-full max-w-sm text-center sm:max-w-md">
      <h1 className="mb-8 text-2xl font-bold text-white sm:text-4xl drop-shadow-lg">
        Yuk intip kenangan kita bersama ❤️
      </h1>
  
      <div className="flex flex-wrap justify-center gap-10 mb-12">
        {[
          { Icon: Message, label: 'Surat', path: '/recap/message' },
          { Icon: Image, label: 'Foto', path: '/recap/pictures' },
          { Icon: Music, label: 'Musik', path: '/recap/music' },
          { Icon: ({ color }) => <Sparkles color={color} size={28} />, label: 'Wrapped', path: '/recap/wrapped' },
          { Icon: ({ color }) => <Mic color={color} size={28} />, label: 'Voice Note', path: '/recap/voice' },
          { Icon: ({ color }) => <ListChecks color={color} size={28} />, label: 'Rencana', path: '/recap/plans' },
          { Icon: ({ color }) => <MapPinned color={color} size={28} />, label: 'Peta', path: '/recap/journey' },
          { Icon: ({ color }) => <CircleHelp color={color} size={28} />, label: 'Kuis', path: '/recap/quiz' },
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
            <span className="mt-3 text-sm font-bold text-white drop-shadow">
              {label}
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
          onClick={() => navigate('/letter')}
        >
           Berikutnya <ArrowRight />
        </button>
      </div>
    </div>
  </div>
  
  )
}

export default Recap
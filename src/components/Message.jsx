import React from 'react'
import { useNavigate } from 'react-router-dom'
import {ArrowLeft } from './icons'

function Message() {
  const navigate = useNavigate();

  const messages = [
    { description: "Dua tahun, dua kota, satu orang yang sama. Makasih udah tetep di sini, sayang ❤️" },
    { description: "Batu–Tasikmalaya emang jauh, tapi kangen aku ke kamu lebih jauh lagi. Nggak sabar ketemu kamu lagi 🤍" },
    { description: "Dari sekian banyak hal di dunia ini, kamu tetep jadi favorit aku. Apalagi pas lagi genit-genitnya 😝" },
    { description: "Setiap hari bersamamu adalah anugerah terindah. Aku berharap kita bisa terus bersama sampai menua. ❤️" },   
    { description: "Kamu adalah jawaban dari semua doaku. Mari kita jalani kisah ini sampai ke pelaminan, sampai kita membangun keluarga kecil yang bahagia. 💑" },
    { description: "Tak perlu sempurna, cukup saling melengkapi. Teruslah bersamaku, menjadi yang terakhir dalam hidupku. 💍" },
    { description: "Aku bersyukur Allah mempertemukan kita. Semoga perjalanan kita berakhir di altar pernikahan, menyempurnakan separuh agama kita. 🕌" },
    { description: "Bersamamu, aku belajar arti kesabaran dan ketulusan. Mari kita berjuang bersama menuju halal. InsyaAllah, kita bisa melewati semuanya. 🤲" },
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black/20">
      <div className="w-[90%] max-w-[400px]">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index}
              className="p-4 text-white border rounded-lg bg-white/10 backdrop-blur-sm border-white/20"
            >
              {message.description}
            </div>
          ))}
        </div>

        <div className="flex justify-center w-full mt-12">
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

export default Message

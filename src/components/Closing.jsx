import React from 'react'
import {ArrowLeft } from './icons'
import { useNavigate } from 'react-router-dom'
import { fireworks,couple } from '../assets';

function Closing() {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4">
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
            Happy 2nd Anniversary, Sayang! ❤️
          </h1>

          <p className="text-lg leading-relaxed sm:text-xl drop-shadow-lg">
            Dua tahun lalu, 10 Oktober, kita mulai cerita ini. Dulu aku bikin website ini buat ngerayain 4 bulan, sekarang udah 2 tahun aja. Cepet banget ya, tapi rasanya kayak baru kemarin aku deg-degan nunggu kamu bales chat.
          </p>

          <p className="text-lg leading-relaxed sm:text-xl drop-shadow-lg">
            Dulu kita ketemu tiap hari. Terus jadi tiap minggu, setahun LDR Batu–Surabaya. Sekarang Batu–Tasikmalaya, jadi tiap bulan, dan nanti nggak tau bakal sejauh apa lagi. Ditambah kesibukan kita masing-masing yang makin banyak. Tapi lihat, kita masih di sini, masih saling milih.
          </p>

          <p className="text-lg leading-relaxed sm:text-xl drop-shadow-lg">
            Makasih udah sabar, udah percaya, dan udah selalu care sama aku, sesibuk apa pun kamu. Makasih juga udah tetep genit sama aku. Yang terakhir itu jangan pernah berubah ya 😝
          </p>

          <p className="text-lg font-bold leading-relaxed sm:text-xl drop-shadow-lg">
            Aku pengen tahun-tahun berikutnya bukan cuma nambah angka, tapi juga nambah langkah, sampai ke jenjang yang lebih serius. Bismillah, aku serius sama kamu. 💍
          </p>

          <p className="mt-8 text-sm text-white/80">
            With love, Taufik ✨
          </p>
        </div>

        {/* Button */}
        <div className="z-10 flex justify-center w-full mt-12">
            <button
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-white border rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/50"
              onClick={() => navigate('/letter')}
            >
              <ArrowLeft /> Kembali
            </button>
          </div>   
      </div>
    </div>
  )
}

export default Closing
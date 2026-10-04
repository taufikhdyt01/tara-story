import React from 'react'
import {ArrowLeft } from './icons'
import { MessageCircleHeart, RotateCcw } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { photos } from '../photos'

const latest = photos.at(-1)

// One-time burst of hearts flying up from the bottom when the page opens
const burst = Array.from({ length: 28 }, () => ({
  x: (Math.random() - 0.5) * 360,
  y: -(300 + Math.random() * 450),
  rotate: (Math.random() - 0.5) * 120,
  size: 18 + Math.random() * 22,
  delay: Math.random() * 0.6,
  duration: 2 + Math.random() * 1.5,
  emoji: ['❤️', '💖', '💗', '🤍', '✨'][Math.floor(Math.random() * 5)],
}))

function HeartBurst() {
  return (
    <div aria-hidden className="fixed inset-x-0 bottom-0 z-30 flex justify-center pointer-events-none">
      {burst.map((h, i) => (
        <motion.span
          key={i}
          className="absolute bottom-0"
          style={{ fontSize: h.size }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.4 }}
          animate={{ x: h.x, y: h.y, opacity: 0, scale: 1, rotate: h.rotate }}
          transition={{ duration: h.duration, delay: h.delay, ease: 'easeOut' }}
        >
          {h.emoji}
        </motion.span>
      ))}
    </div>
  )
}

// Paragraphs fade in one by one as they scroll into view
const Para = ({ className = '', children }) => (
  <motion.p
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.6 }}
    transition={{ duration: 0.7 }}
    className={`text-lg leading-relaxed sm:text-xl drop-shadow-lg ${className}`}
  >
    {children}
  </motion.p>
)

function Closing() {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 py-12">
      <HeartBurst />

      <div className="z-10 max-w-lg text-center">
        {/* Latest photo as a tilted polaroid */}
        {latest && (
          <motion.div
            className="w-56 p-2 pb-3 mx-auto mb-10 bg-white rounded-sm shadow-2xl"
            initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: -4 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <img src={latest.src} alt="Kita" className="object-cover w-full aspect-[4/5]" />
            <p className="mt-2 text-xl font-hand text-rose-600">us, always 🤍</p>
          </motion.div>
        )}

        {/* Greeting text */}
        <div className="space-y-6 text-white">
          <h1 className="text-3xl font-bold sm:text-4xl drop-shadow-lg">
            Happy 2nd Anniversary, Sayang! ❤️
          </h1>

          <Para>
            Dua tahun lalu, 10 Oktober, kita mulai cerita ini. Cepet banget ya, tapi rasanya kayak baru kemarin aku deg-degan nunggu kamu bales chat.
          </Para>

          <Para>
            Dulu kita ketemu tiap hari. Terus jadi tiap minggu, setahun LDR Batu–Surabaya. Sekarang Batu–Tasikmalaya, jadi tiap bulan, dan nanti nggak tau bakal sejauh apa lagi. Ditambah kesibukan kita masing-masing yang makin banyak. Tapi lihat, kita masih di sini, masih saling milih.
          </Para>

          <Para>
            Makasih udah sabar, udah percaya, dan udah selalu care sama aku, sesibuk apa pun kamu. Perhatian kecil dari kamu itu yang bikin hari-hari aku jadi lebih ringan 🤍
          </Para>

          <Para className="font-bold">
            Aku pengen tahun-tahun berikutnya bukan cuma nambah angka, tapi juga nambah langkah, sampai ke jenjang yang lebih serius. Bismillah, aku serius sama kamu. 💍
          </Para>


          <p className="mt-8 text-sm text-white/80">
            With love, Taufik ✨
          </p>
        </div>

        {/* Reply via WhatsApp */}
        <a
          href={`https://wa.me/62895395793881?text=${encodeURIComponent('Happy 2nd anniversary juga sayang ❤️ ')}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 mt-10 font-bold bg-white rounded-full shadow-lg text-rose-600 active:scale-95"
        >
          <MessageCircleHeart className="w-5 h-5" /> Balas ke Taufik 💌
        </a>

        {/* Buttons */}
        <div className="z-10 flex justify-center w-full gap-3 mt-8">
            <button
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-white border rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/50"
              onClick={() => navigate('/letter')}
            >
              <ArrowLeft /> Kembali
            </button>
            <button
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-white border rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/50"
              onClick={() => navigate('/chat')}
            >
              <RotateCcw className="w-4 h-4" /> Ulangi dari awal
            </button>
          </div>
      </div>
    </div>
  )
}

export default Closing

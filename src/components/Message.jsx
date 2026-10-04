import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from './icons'

// "Buka kalau..." letters: label = kapan dibuka, text = isi surat
const letters = [
  {
    emoji: '💭',
    label: 'kamu kangen aku',
    text: 'Kangen ya? Sama, aku juga. Coba dengerin 1000X sebentar, terus bayangin kita lagi duduk di Fore, kamu cerita panjang lebar dan aku dengerin sambil senyum. Jarak ini cuma sementara, sayang. Kita pasti ketemu lagi.',
  },
  {
    emoji: '🌧️',
    label: 'kamu lagi sedih',
    text: 'Nggak apa-apa sedih, kamu nggak harus selalu kuat. Telepon aku ya, aku bakal dengerin semuanya sampai selesai. Kamu nggak sendirian, ada aku di sini, walaupun dari jauh.',
  },
  {
    emoji: '😮‍💨',
    label: 'kamu lagi capek',
    text: 'Kamu udah berusaha keras hari ini, dan aku bangga sama kamu. Istirahat dulu ya, makan yang enak, tidur yang cukup. Semua urusan bisa nunggu, kesehatan kamu lebih penting.',
  },
  {
    emoji: '💪',
    label: 'kamu butuh semangat',
    text: 'Inget nggak, kamu udah ngelewatin banyak hal yang dulu kamu kira nggak bisa. Kamu jauh lebih hebat dari yang kamu pikir. Aku percaya sama kamu, selalu.',
  },
  {
    emoji: '🌙',
    label: 'kamu nggak bisa tidur',
    text: 'Belum bisa tidur ya? Tarik napas pelan-pelan. Bayangin kita lagi makan sushi bareng sambil ketawa-ketawa. Semoga habis ini kamu tidur nyenyak. Selamat tidur, sayang.',
  },
  {
    emoji: '😊',
    label: 'kamu lagi seneng',
    text: 'Yeay! Cerita ke aku dong, aku pengen jadi orang pertama yang ikut seneng. Senyum kamu itu salah satu hal favorit aku di dunia.',
  },
  {
    emoji: '🤍',
    label: 'kamu ragu sama kita',
    text: 'Ketemu kita boleh makin jarang, dari tiap hari jadi tiap minggu, terus tiap bulan. Tapi aku nggak pernah ragu sama kamu. Aku milih kamu kemarin, hari ini, dan seterusnya. Kita usahain bareng ya.',
  },
  {
    emoji: '🎉',
    label: 'hari anniversary kita',
    text: 'Happy 2nd anniversary, sayang. Makasih udah jadi orang yang paling care sama aku selama dua tahun ini. Semoga Allah selalu jaga kita, dan semoga tahun-tahun berikutnya kita makin dekat ke jenjang yang lebih serius. Aamiin.',
  },
]

function Message() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(null)
  const [opened, setOpened] = useState([])

  const show = (i) => {
    setOpen(i)
    setOpened(o => (o.includes(i) ? o : [...o, i]))
  }

  return (
    <div className="flex flex-col items-center min-h-screen py-12">
      <div className="w-[90%] max-w-[400px]">
        <h1 className="text-4xl font-bold text-center text-white drop-shadow-lg">Surat Kecil Buat Kamu</h1>
        <p className="mt-2 mb-8 text-center text-white/80">Buka sesuai suasana hati kamu ya 💌</p>

        <div className="grid grid-cols-2 gap-3">
          {letters.map((letter, i) => (
            <button
              key={letter.label}
              onClick={() => show(i)}
              className={`relative flex flex-col items-center justify-center gap-2 p-4 text-center text-white border rounded-2xl backdrop-blur-sm aspect-square active:scale-95 transition ${opened.includes(i) ? 'bg-white/5 border-white/20' : 'bg-white/15 border-white/40 shadow-lg'}`}
            >
              <span className="text-4xl">{letter.emoji}</span>
              <span className="text-xs text-white/80">Buka kalau</span>
              <span className="text-sm font-bold leading-tight">{letter.label}</span>
              {opened.includes(i) && <span className="absolute text-xs top-2 right-3 text-white/60">dibuka ✓</span>}
            </button>
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

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              role="dialog"
              aria-label={`Buka kalau ${letters[open].label}`}
              className="w-full max-w-[360px] p-6 rounded-2xl bg-[#fff5f8] shadow-2xl"
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              onClick={e => e.stopPropagation()}
            >
              <p className="text-sm text-rose-400">{letters[open].emoji} Buka kalau {letters[open].label}</p>
              <p className="mt-3 text-2xl leading-snug font-hand text-rose-700">{letters[open].text}</p>
              <p className="mt-4 text-xl text-right font-hand text-rose-500">Taufik ❤️</p>
              <button
                onClick={() => setOpen(null)}
                className="w-full py-2 mt-5 font-bold text-white rounded-full bg-rose-500 active:bg-rose-600"
              >
                Tutup
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Message

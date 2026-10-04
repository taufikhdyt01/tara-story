import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from './icons'

// answer = index pilihan yang benar
const questions = [
  { q: 'Tanggal jadian kita?', options: ['29 Agustus 2024', '10 Oktober 2024', '10 November 2024', '9 Oktober 2024'], answer: 1 },
  { q: 'Foto pertama kita diambil di mana?', options: ['MOG', 'Transmart', 'Malang Town Square', 'Fore'], answer: 2 },
  { q: 'Tempat yang paling sering kita datengin?', options: ['Fore', 'Starbucks', 'Pesen Kopi', 'MOG'], answer: 0 },
  { q: 'Makanan favorit kita berdua?', options: ['Ramen', 'Seblak', 'Bakso', 'Sushi'], answer: 3 },
  { q: 'Waktu LDR Batu–Surabaya, kita ketemu berapa sering?', options: ['Tiap hari', 'Seminggu sekali', 'Dua minggu sekali', 'Sebulan sekali'], answer: 1 },
  { q: 'Lagu musik latar website ini judulnya apa?', options: ['2001x', 'Bermuara', '1000X', 'Penjaga Hati'], answer: 2 },
]

const cheers = ['Pinter! 😘', 'Bener dong! 🥰', 'Iya! Kamu inget 🥹', 'Mantap sayang! ✨']

const result = (score) => {
  if (score === questions.length) return 'Sempurna! Kamu emang paling kenal aku 🥹'
  if (score >= questions.length - 2) return 'Hampir sempurna! Tetep aku sayang kok 😌'
  if (score >= 2) return 'Hmm, kayaknya kita harus lebih sering ngobrol 😤'
  return 'Yaampun sayang 😭 nanti aku ceritain ulang semuanya ya'
}

function Quiz() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState(null)
  const [score, setScore] = useState(0)
  const finished = index === questions.length
  const current = questions[index]

  const pick = (i) => {
    if (picked !== null) return
    setPicked(i)
    if (i === current.answer) setScore(s => s + 1)
  }

  const next = () => {
    setPicked(null)
    setIndex(i => i + 1)
  }

  const restart = () => {
    setIndex(0)
    setPicked(null)
    setScore(0)
  }

  const optionStyle = (i) => {
    if (picked === null) return 'bg-white/15 border-white/40 active:bg-white/30'
    if (i === current.answer) return 'bg-emerald-500/80 border-emerald-200'
    if (i === picked) return 'bg-rose-700/70 border-rose-300'
    return 'bg-white/5 border-white/20 opacity-60'
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12">
      <div className="w-[90%] max-w-[400px] text-white">
        <h1 className="text-4xl font-bold text-center drop-shadow-lg">Seberapa Kenal Kamu Sama Aku?</h1>

        <AnimatePresence mode="wait">
          {finished ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 mt-8 text-center text-gray-900 bg-white shadow-2xl rounded-3xl"
            >
              <p className="text-sm font-bold tracking-widest uppercase text-rose-500">Skor kamu</p>
              <p className="mt-2 font-black text-7xl text-rose-600">{score}/{questions.length}</p>
              <p className="mt-4 text-3xl leading-snug font-hand text-rose-700">{result(score)}</p>
              <button onClick={restart} className="w-full py-2 mt-6 font-bold border-2 rounded-full border-rose-500 text-rose-600">
                Main lagi
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="mt-8"
            >
              <div className="flex items-center justify-between mb-2 text-sm text-white/80">
                <span>Soal {index + 1}/{questions.length}</span>
                <span>Skor: {score}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/20">
                <div className="h-full bg-white rounded-full" style={{ width: `${(index / questions.length) * 100}%` }} />
              </div>

              <p className="mt-6 text-2xl font-bold leading-snug drop-shadow">{current.q}</p>

              <div className="mt-5 space-y-3">
                {current.options.map((option, i) => (
                  <button
                    key={option}
                    onClick={() => pick(i)}
                    className={`w-full px-4 py-3 text-left font-bold border rounded-2xl backdrop-blur-sm transition ${optionStyle(i)}`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {picked !== null && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 text-center">
                  <p className="text-2xl font-hand drop-shadow">
                    {picked === current.answer
                      ? cheers[index % cheers.length]
                      : `Yah salah 😤 jawabannya ${current.options[current.answer]}`}
                  </p>
                  <button onClick={next} className="px-8 py-2 mt-4 font-bold bg-white rounded-full text-rose-600 active:scale-95">
                    {index === questions.length - 1 ? 'Lihat skor' : 'Lanjut →'}
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

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

export default Quiz

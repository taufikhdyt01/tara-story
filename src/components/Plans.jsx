import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from './icons'

// Daftar rencana ke depan, bebas diubah
const plans = [
  { emoji: '✈️', text: 'Liburan berdua ke tempat yang belum pernah kita datengin' },
  { emoji: '🍣', text: 'Nyobain sushi di tempat baru, atau bikin sendiri bareng' },
  { emoji: '🎤', text: 'Nonton konser bareng lagi, yang lebih megah kayak BTS' },
  { emoji: '❄️', text: 'Snow date beneran ke luar negeri, liat salju asli bareng' },
  { emoji: '📸', text: 'Photobox di setiap momen penting kita' },
  { emoji: '🏖️', text: 'Main ke pantai bareng, liat sunset sambil ngobrol' },
  { emoji: '🚗', text: 'Road trip berdua, ke Jogja atau ke mana aja asal bareng kamu' },
  { emoji: '⚽', text: 'Tribun date, nonton Persib langsung di stadion bareng' },
  { emoji: '🎓', text: 'Saling support sampai kita sama-sama sukses' },
  { emoji: '💍', text: 'Melangkah ke jenjang yang lebih serius, bareng kamu' },
]

function Plans() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center min-h-screen py-12">
      <div className="w-[90%] max-w-[400px]">
        <h1 className="text-4xl font-bold text-center text-white drop-shadow-lg">Janji & Rencana Kita</h1>
        <p className="mt-2 mb-8 text-center text-white/80">Hal-hal yang pengen aku lakuin bareng kamu 🤍</p>

        <div className="space-y-2">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.text}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.12 }}
              className="flex items-center gap-3 p-3 border rounded-xl backdrop-blur-sm bg-white/10 border-white/20"
            >
              <span className="w-6 text-sm font-bold text-center text-white/60">{i + 1}</span>
              <span className="text-xl">{plan.emoji}</span>
              <span className="flex-1 text-sm text-white">{plan.text}</span>
            </motion.div>
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

export default Plans

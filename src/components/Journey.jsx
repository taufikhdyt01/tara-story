import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from './icons'

// Simplified Java outline (lon/lat projected into the 390x200 viewBox)
const JAVA = 'M10 80 L38 32 L74 38 L106 44 L134 50 L146 74 L190 83 L218 89 L238 56 L262 71 L286 86 L310 104 L342 134 L378 137 L380 170 L362 188 L334 170 L306 176 L262 167 L218 155 L178 137 L142 140 L102 122 L58 110 L22 86 Z'

// Batu & Malang are ~20 km apart, nudged apart so the pins don't overlap
const cities = {
  Tasikmalaya: { x: 131, y: 120 },
  Surabaya: { x: 312, y: 112 },
  Malang: { x: 322, y: 154 },
  Batu: { x: 294, y: 146 },
}

// me = Taufik, you = Ufaira
const stages = [
  { period: 'Agu – Sep 2024', me: 'Malang', you: 'Malang', distance: 'Sekota', note: 'Pertama kali ketemu dan mulai PDKT. Foto pertama kita di Malang Town Square, masih malu-malu.' },
  { period: 'Okt 2024 – Jan 2025', me: 'Malang', you: 'Malang', distance: 'Sekota', note: 'Resmi jadian 10 Oktober. Ketemu tiap hari, belum kepikiran bakal jauh-jauhan.' },
  { period: 'Feb – Mei 2025', me: 'Malang', you: 'Batu', distance: '±20 km', note: 'Kamu pindah ke Batu buat koas di RSUD Karsa Husada. Cuma beda kota, tapi tetep aja kerasa ada jaraknya.' },
  { period: 'Jun 2025 – Mei 2026', me: 'Surabaya', you: 'Batu', distance: '±100 km', note: 'Aku pindah ke Surabaya karena kerja. LDR pertama kita, ketemu seminggu sekali selama setahun.' },
  { period: 'Jun 2026', me: 'Malang', you: 'Malang', distance: 'Sekota', note: 'Aku balik ke Malang buat fokus nyelesain S2, dan kamu koas di RSSA Malang. Sama-sama di Malang lagi, rasanya kayak balik ke awal cerita kita.' },
  { period: 'Jul – Agu 2026', me: 'Malang', you: 'Batu', distance: '±20 km', note: 'Kamu balik ke Batu buat lanjut koas di sana. Deket, tapi udah nggak sekota lagi.' },
  { period: 'Sep 2026 – sekarang', me: 'Tasikmalaya', you: 'Batu', distance: '±650 km', note: 'S2 aku udah selesai dan sekarang kerja remote, jadi aku pulang ke Tasikmalaya, sementara kamu masih berjuang koas di Batu. Jarak paling jauh sejauh ini, ketemunya jadi sebulan sekali.' },
]

function Pin({ at, label, color, offset }) {
  return (
    <motion.g animate={{ x: at.x + offset, y: at.y }} transition={{ type: 'spring', stiffness: 80, damping: 14 }}>
      <circle r="9" fill={color} stroke="white" strokeWidth="2" />
      <text textAnchor="middle" dy="3.5" fontSize="10" fontWeight="700" fill="white">{label}</text>
    </motion.g>
  )
}

function Journey() {
  const navigate = useNavigate();
  const [active, setActive] = useState(stages.length - 1)
  const stage = stages[active]
  const me = cities[stage.me]
  const you = cities[stage.you]
  const together = stage.me === stage.you

  return (
    <div className="flex flex-col items-center min-h-screen py-12">
      <div className="w-[90%] max-w-[400px]">
        <h1 className="text-4xl font-bold text-center text-white drop-shadow-lg">Peta Perjalanan Kita</h1>
        <p className="mt-2 mb-6 text-center text-white/80">Jarak kita dari waktu ke waktu</p>

        {/* Map */}
        <div className="p-3 border rounded-2xl bg-white/10 backdrop-blur-sm border-white/20">
          <svg viewBox="0 0 390 200" className="w-full" role="img" aria-label={`Peta: aku di ${stage.me}, kamu di ${stage.you}`}>
            <path d={JAVA} fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinejoin="round" />
            {Object.entries(cities).map(([name, c]) => (
              <g key={name}>
                <circle cx={c.x} cy={c.y} r="3" fill="white" />
                <text
                  x={c.x}
                  y={name === 'Batu' ? c.y + 18 : c.y - 13}
                  textAnchor={name === 'Batu' ? 'end' : 'middle'}
                  fontSize="10"
                  fontWeight="600"
                  fill="white"
                >
                  {name}
                </text>
              </g>
            ))}
            {!together && (
              <motion.line
                animate={{ x1: me.x, y1: me.y, x2: you.x, y2: you.y }}
                transition={{ type: 'spring', stiffness: 80, damping: 14 }}
                stroke="white"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            )}
            <Pin at={you} label="U" color="#ec4899" offset={together ? 9 : 0} />
            <Pin at={me} label="T" color="#3b82f6" offset={together ? -9 : 0} />
          </svg>
          <div className="flex justify-center gap-4 mt-1 text-xs text-white/80">
            <span><span className="inline-block w-2.5 h-2.5 mr-1 rounded-full bg-blue-500" />Taufik</span>
            <span><span className="inline-block w-2.5 h-2.5 mr-1 rounded-full bg-pink-500" />Ufaira</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-6 space-y-2">
          {stages.map((s, i) => (
            <button
              key={s.period}
              onClick={() => setActive(i)}
              className={`w-full p-3 text-left text-white border rounded-xl backdrop-blur-sm transition ${i === active ? 'bg-white/30 border-white/60' : 'bg-white/10 border-white/20'}`}
            >
              <div className="flex items-baseline justify-between">
                <span className="font-bold">{s.period}</span>
                <span className="text-sm font-bold">{s.distance}</span>
              </div>
              <p className="text-xs text-white/80">
                {s.me === s.you ? `Sama-sama di ${s.me}` : `Aku di ${s.me} · Kamu di ${s.you}`}
              </p>
              {i === active && <p className="mt-2 text-sm">{s.note}</p>}
            </button>
          ))}
        </div>

        <p className="mt-6 text-2xl text-center text-white font-hand drop-shadow">Sejauh apa pun nanti, tujuan aku tetep kamu 🤍</p>

        <div className="flex justify-center w-full mt-10">
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

export default Journey

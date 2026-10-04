import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, animate } from 'framer-motion'
import { differenceInDays } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import { START_DATE } from '../story'
import { photos } from '../photos'
import { cover1000x } from '../assets'

const SLIDE_MS = 8000 // auto-advance per slide

const days = differenceInDays(new Date(), START_DATE)
const first = photos[0]
const latest = photos.at(-1)
const moments = ['Birthday', 'Konser date', 'Study date', 'Snow date', 'Play date']

function CountUp({ to, delay = 0 }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    const controls = animate(0, to, { duration: 1.6, delay, ease: 'easeOut', onUpdate: v => setN(Math.round(v)) })
    return () => controls.stop()
  }, [to, delay])
  return n
}

const Reveal = ({ delay = 0, className = '', children }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    className={className}
  >
    {children}
  </motion.div>
)

const Big = ({ children }) => <p className="font-black leading-none text-8xl">{children}</p>

// Each slide: background gradient + content. Text revealed step by step with delays.
const slides = [
  {
    bg: 'from-violet-600 to-fuchsia-500',
    content: () => (
      <>
        <Reveal className="text-2xl">Hai sayang 👋</Reveal>
        <Reveal delay={0.8} className="mt-4 text-5xl font-black leading-tight">Siap liat 2 tahun kita?</Reveal>
        <Reveal delay={2} className="mt-10 text-sm text-white/80">Ketuk kanan untuk lanjut →</Reveal>
      </>
    ),
  },
  {
    bg: 'from-emerald-500 to-teal-700',
    content: () => (
      <>
        <Reveal className="text-2xl">Kita udah bareng selama</Reveal>
        <Reveal delay={0.8} className="my-6"><Big><CountUp to={days} delay={0.8} /></Big><p className="mt-2 text-3xl font-bold">hari</p></Reveal>
        <Reveal delay={2.6} className="text-xl">dan aku nggak bosen sama sekali 😌</Reveal>
      </>
    ),
  },
  {
    bg: 'from-orange-500 to-rose-600',
    content: () => (
      <>
        <Reveal className="text-2xl">Jadwal ketemu kita berubah</Reveal>
        <div className="my-8 space-y-3 text-4xl font-black">
          <Reveal delay={0.8}>Tiap hari</Reveal>
          <Reveal delay={1.6} className="text-white/90">→ tiap minggu</Reveal>
          <Reveal delay={2.4} className="text-white/80">→ tiap bulan</Reveal>
        </div>
        <Reveal delay={3.4} className="text-xl">Makin jarang, tapi sayangnya nggak ikut berkurang 🤍</Reveal>
      </>
    ),
  },
  {
    bg: 'from-sky-500 to-indigo-700',
    content: () => (
      <>
        <Reveal className="text-2xl">Setahun LDR Batu–Surabaya, kita ketemu</Reveal>
        <Reveal delay={0.8} className="my-6"><Big>±<CountUp to={52} delay={0.8} /></Big><p className="mt-2 text-3xl font-bold">kali</p></Reveal>
        <Reveal delay={2.6} className="text-xl">Seminggu sekali, nggak pernah absen 🚗</Reveal>
      </>
    ),
  },
  {
    bg: 'from-pink-500 to-purple-700',
    content: () => (
      <>
        <Reveal className="text-2xl">Total date kita</Reveal>
        <Reveal delay={0.8} className="my-6"><Big><CountUp to={100} delay={0.8} />+</Big></Reveal>
        <Reveal delay={2.6} className="text-xl">Kebanyakan sampai nggak bisa disebutin satu-satu 🥰</Reveal>
      </>
    ),
  },
  {
    bg: 'from-amber-400 to-orange-600',
    content: () => (
      <>
        <Reveal className="text-2xl">Tempat paling sering kita datengin</Reveal>
        <Reveal delay={0.8} className="mt-3 text-6xl font-black">Fore ☕</Reveal>
        <Reveal delay={2} className="mt-12 text-2xl">Makanan favorit kita</Reveal>
        <Reveal delay={2.8} className="mt-3 text-6xl font-black">Sushi 🍣</Reveal>
      </>
    ),
  },
  {
    bg: 'from-rose-500 to-red-700',
    content: () => (
      <>
        <Reveal className="mb-6 text-2xl">Momen favorit aku</Reveal>
        {moments.map((m, i) => (
          <Reveal key={m} delay={0.6 + i * 0.5} className="flex items-baseline gap-4 py-1 text-3xl font-black">
            <span className="w-8 text-white/60">{i + 1}</span>{m}
          </Reveal>
        ))}
      </>
    ),
  },
  {
    bg: 'from-green-500 to-emerald-900',
    content: () => (
      <>
        <Reveal className="text-2xl">Lagu kita</Reveal>
        <Reveal delay={0.8} className="my-6">
          <img src={cover1000x} alt="1000X" className="w-56 h-56 rounded-lg shadow-2xl" />
        </Reveal>
        <Reveal delay={1.6} className="text-5xl font-black">1000X</Reveal>
        <Reveal delay={1.9} className="text-xl text-white/80">Ghea Indrawari</Reveal>
      </>
    ),
  },
  {
    bg: 'from-fuchsia-500 to-violet-800',
    content: () => (
      <>
        <Reveal className="text-xl">Yang paling kamu suka dari aku</Reveal>
        <Reveal delay={0.8} className="mt-2 text-4xl font-black">Pendengar yang baik 🎧</Reveal>
        <Reveal delay={2} className="mt-12 text-xl">Yang paling aku suka dari kamu</Reveal>
        <Reveal delay={2.8} className="mt-2 text-4xl font-black">Kamu yang selalu care 🤍</Reveal>
      </>
    ),
  },
  {
    bg: 'from-slate-600 to-rose-700',
    content: () => (
      <>
        <Reveal className="mb-6 text-3xl font-black">Dulu vs Sekarang</Reveal>
        <div className="grid grid-cols-2 gap-3">
          {[[first, 'Dulu', 0.6], [latest, 'Sekarang', 1.6]].map(([p, label, delay]) => (
            <Reveal key={label} delay={delay}>
              <img src={p.src} alt={label} className="object-cover w-full rounded-lg shadow-xl aspect-[3/4]" />
              <p className="mt-2 font-bold">{label}</p>
              <p className="text-xs text-white/70">{p.title}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={2.8} className="mt-6 text-lg">Yang beda cuma tanggalnya, sayangnya tetep sama. Malah nambah 😌</Reveal>
      </>
    ),
  },
]

function Summary({ onReplay, onExit }) {
  const rows = [
    ['Hari bareng', days],
    ['Total date', '100+'],
    ['Lagu kita', '1000X'],
    ['Tempat favorit', 'Fore'],
    ['Makanan favorit', 'Sushi'],
  ]
  return (
    <>
      <Reveal className="w-full p-6 text-gray-900 bg-white shadow-2xl rounded-3xl">
        <p className="text-sm font-bold tracking-widest uppercase text-rose-500">Our 2 Years Wrapped</p>
        <div className="grid grid-cols-2 gap-4 mt-5">
          <div>
            <p className="text-xs font-bold text-gray-500">Momen favorit</p>
            {moments.map((m, i) => <p key={m} className="text-sm font-bold">{i + 1}. {m}</p>)}
          </div>
          <div className="space-y-2">
            {rows.map(([label, value]) => (
              <div key={label}>
                <p className="text-xs font-bold text-gray-500">{label}</p>
                <p className="font-black leading-tight">{value}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-5 text-2xl text-center font-hand text-rose-600">Taufik ❤️ Kamu</p>
      </Reveal>
      <Reveal delay={0.8} className="flex gap-3 mt-6 pointer-events-auto">
        <button onClick={onReplay} className="px-5 py-2 font-bold text-white border rounded-full border-white/60">Lihat lagi</button>
        <button onClick={onExit} className="px-5 py-2 font-bold bg-white rounded-full text-rose-600">Selesai</button>
      </Reveal>
    </>
  )
}

const TOTAL = slides.length + 1 // + summary

function Wrapped() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0)
  const isLast = index === TOTAL - 1

  const next = () => setIndex(i => Math.min(i + 1, TOTAL - 1))
  const prev = () => setIndex(i => Math.max(i - 1, 0))

  useEffect(() => {
    if (isLast) return
    const t = setTimeout(next, SLIDE_MS)
    return () => clearTimeout(t)
  }, [index, isLast])

  const bg = isLast ? 'from-rose-500 to-violet-700' : slides[index].bg

  return (
    <div className="fixed inset-0 z-40 overflow-hidden text-white select-none">
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className={`absolute inset-0 bg-gradient-to-br ${bg}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col justify-center h-full max-w-[420px] mx-auto px-8 pointer-events-none">
            {isLast
              ? <Summary onReplay={() => setIndex(0)} onExit={() => navigate('/recap')} />
              : slides[index].content()}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Tap zones: left third = back, rest = next */}
      {!isLast && (
        <div className="absolute inset-0 flex">
          <button aria-label="Sebelumnya" className="w-1/3 h-full" onClick={prev} />
          <button aria-label="Berikutnya" className="flex-1 h-full" onClick={next} />
        </div>
      )}

      {/* Progress bars + close */}
      <div className="absolute inset-x-0 top-0 max-w-[420px] mx-auto px-3 pt-3">
        <div className="flex gap-1">
          {Array.from({ length: TOTAL }, (_, i) => (
            <div key={i} className="flex-1 h-1 overflow-hidden rounded-full bg-white/30">
              {i < index && <div className="w-full h-full bg-white" />}
              {i === index && (
                <motion.div
                  key={index}
                  className="h-full bg-white"
                  initial={{ width: isLast ? '100%' : '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: SLIDE_MS / 1000, ease: 'linear' }}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-3">
          <p className="text-xs font-bold tracking-widest uppercase text-white/80">Our 2 Years Wrapped</p>
          <button aria-label="Tutup" onClick={() => navigate('/recap')} className="relative z-10 p-1">
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Wrapped

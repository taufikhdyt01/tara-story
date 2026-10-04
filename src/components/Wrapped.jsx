import React from 'react'
import { motion } from 'framer-motion'
import { differenceInDays } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from './icons'
import { START_DATE } from '../story'
import { photos } from '../photos'

const stats = [
  { value: differenceInDays(new Date(), START_DATE), label: 'hari bareng kamu, dan aku nggak bosen sama sekali' },
  { value: photos.length, label: 'foto kenangan di album kita' },
  { value: 'Tiap hari → tiap minggu → tiap bulan', label: 'jadwal ketemu kita makin jarang, tapi sayangnya nggak ikut berkurang', small: true },
  { value: '±52', label: 'kali ketemu selama setahun LDR Batu–Surabaya, seminggu sekali nggak pernah absen' },
  { value: '100+', label: 'kali date. Kebanyakan sampai nggak bisa disebutin satu-satu 🥰' },
  { value: 'Batu · Malang · Surabaya · Tasikmalaya', label: 'kota-kota yang jadi bagian cerita kita', small: true },
  { value: 'Fore ☕', label: 'tempat yang paling sering kita datengin. Baristanya mungkin udah hafal muka kita', small: true },
  { value: 'Sushi 🍣', label: 'makanan favorit kita berdua', small: true },
  { value: 'Birthday · Konser · Study date · Snow date · Play date', label: 'momen favorit aku', small: true },
  { value: 'Pendengar yang baik', label: 'katanya ini hal yang paling kamu suka dari aku. Aku bakal terus dengerin kamu kok', small: true },
  { value: 'Kamu yang care', label: 'hal yang paling aku suka dari kamu. Bahkan dari jauh pun kamu tetep perhatian', small: true },
  { value: '1000X · 2001x · Kita Lewati Berdua', label: 'lagu-lagu yang paling "kita" banget', small: true },
]

const first = photos[0]
const latest = photos.at(-1)

function Wrapped() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center min-h-screen py-16">
      <div className="w-[90%] max-w-[400px] space-y-4">
        <h1 className="mb-8 text-3xl font-bold text-center text-white drop-shadow-lg">
          Our 2 Years Wrapped ✨
        </h1>

        {stats.map(({ value, label, small }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-5 text-white border rounded-2xl bg-white/10 backdrop-blur-sm border-white/20"
          >
            <p className={`font-bold ${small ? 'text-2xl' : 'text-5xl'}`}>{value}</p>
            <p className="mt-1 text-white/80">{label}</p>
          </motion.div>
        ))}

        {first && latest && first !== latest && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-5 text-white border rounded-2xl bg-white/10 backdrop-blur-sm border-white/20"
          >
            <p className="mb-4 text-2xl font-bold">Dulu vs Sekarang</p>
            <div className="grid grid-cols-2 gap-3">
              {[[first, 'Dulu'], [latest, 'Sekarang']].map(([p, label]) => (
                <div key={label}>
                  <img src={p.src} alt={label} className="object-cover w-full rounded-lg aspect-[3/4]" />
                  <p className="mt-2 text-sm font-bold">{label}</p>
                  <p className="text-xs text-white/70">{p.title}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-white/80">Yang beda cuma tanggalnya, sayangnya tetep sama. Malah nambah 😌</p>
          </motion.div>
        )}

        <div className="flex justify-center w-full pt-8">
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

export default Wrapped

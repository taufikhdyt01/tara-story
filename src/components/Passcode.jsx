import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UNLOCK_DATE, bgm } from '../story'

// Passcode
const CORRECT_PASSCODE = '1010'

// Buka ?preview untuk ngetes sebelum hari-H
const preview = new URLSearchParams(location.search).has('preview')

function Locked({ now }) {
  const s = Math.floor((UNLOCK_DATE - now) / 1000)
  const parts = [[Math.floor(s / 86400), 'Hari'], [Math.floor(s / 3600) % 24, 'Jam'], [Math.floor(s / 60) % 60, 'Menit'], [s % 60, 'Detik']]
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen px-6 text-center text-white bg-black/60 backdrop-blur-sm">
      <h1 className="mb-2 text-2xl font-bold">Sabar ya sayang 💌</h1>
      <p className="mb-8 text-white/80">Ada sesuatu buat kamu, tapi baru bisa dibuka tanggal 10 Oktober nanti.</p>
      <div className="flex gap-4 font-bold">
        {parts.map(([value, label]) => (
          <div key={label} className="flex flex-col items-center">
            <span className="text-4xl tabular-nums">{value.toString().padStart(2, '0')}</span>
            <span className="text-xs font-normal text-white/70">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Passcode() {
    const [passcode, setPasscode] = useState([])
    const [message, setMessage] = useState('')
    const [now, setNow] = useState(new Date())
    const navigate = useNavigate();

    useEffect(() => {
      const timer = setInterval(() => setNow(new Date()), 1000)
      return () => clearInterval(timer)
    }, [])
    const handleNumberClick = (number) => {
      if (passcode.length < 6) {
        const newPasscode = [...passcode, number]
        setPasscode(newPasscode)
  
        if (newPasscode.length === 4) {
          const enteredPasscode = newPasscode.join('')
          if (enteredPasscode === CORRECT_PASSCODE) {
            setMessage('Yeay betul!! :)')
            // must start inside the click, browsers block autoplay otherwise
            bgm.play().catch(() => {})
            setTimeout(() => {
              setMessage('Bentar ya...')
              navigate("/question");
              
            }, 500)
          } else {
            setMessage('Kodenya salah nih, coba inget-inget tanggal jadian kita!')
            setTimeout(() => {
              setPasscode([])
              setMessage('')
            }, 4000)
          }
        }
      }
    }
  
    const handleCancel = () => {
      setPasscode([])
      setMessage('')
    }
  if (now < UNLOCK_DATE && !preview) return <Locked now={now} />
  return (
    <div className="flex items-center justify-center w-full min-h-screen overflow-hidden text-white bg-black/60 backdrop-blur-sm">
        <div className="flex flex-col items-center max-w-full">
            {/* Title */}
            <h1 className="mb-8 text-2xl font-light">Masukkan Kode</h1>

            {/* Passcode Dots */}
            <div className="flex gap-4 mb-16">
            {[...Array(4)].map((_, i) => (
                <div
                key={i}
                className={`w-3.5 h-3.5 rounded-full ${
                    i < passcode.length ? 'bg-white' : 'border-2 border-zinc-500'
                }`}
                />
            ))}
            </div>

            {/* Message */}
            {message && (
            <div className={`mb-4 -mt-9 text-sm font-bold ${passcode.join('') === CORRECT_PASSCODE ? 'text-green-500' : 'text-red-500'}`}>
                {message}
            </div>
            )}

            {/* Number Pad */}
            <div className="grid max-w-full grid-cols-3 gap-4 mb-8">
            {[
                { num: 1 },
                { num: 2 },
                { num: 3 },
                { num: 4 },
                { num: 5 },
                { num: 6 },
                { num: 7 },
                { num: 8 },
                { num: 9 },
            ].map(({ num }) => (
                <button
                key={num}
                onClick={() => handleNumberClick(num)}
                className="flex items-center justify-center w-16 h-16 transition-colors rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 active:bg-zinc-600/50"
                >
                <span className="text-3xl font-light">{num}</span>
                </button>
            ))}
            <div className="col-start-2">
                <button
                onClick={() => handleNumberClick(0)}
                className="flex items-center justify-center w-16 h-16 transition-colors rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 active:bg-zinc-600/50"
                >
                <span className="text-3xl font-light">0</span>
                </button>
            </div>
            </div>

            {/* Cancel Button */}
            <button
            onClick={handleCancel}
            className="text-lg transition-colors text-white/90 hover:text-white active:text-white/70"
            >
            Hapus
            </button>
          </div>
        </div>


  )
}

export default Passcode
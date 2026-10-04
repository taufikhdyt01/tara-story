import React from 'react'
import { useEffect, useState } from 'react'
import { intervalToDuration } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from './icons'
import { START_DATE } from '../story'

const pad = (n = 0) => n.toString().padStart(2, '0')

function Timer() {
  const [now, setNow] = useState(new Date())
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // date-fns leaves out zero fields, so default them to 0
  const { years = 0, months = 0, days = 0, hours, minutes, seconds } = intervalToDuration({ start: START_DATE, end: now })

  return (
    <div
  className="relative flex flex-col items-center justify-center min-h-screen px-4 text-white bg-center bg-cover bg-black/20"
>
  <div className="z-10 text-center">
    {/* Title */}
    <h1 className="mb-8 text-lg font-bold sm:text-2xl drop-shadow-lg">
     Kita udah bersama selama:
    </h1>

    <div className="flex items-end justify-center gap-5 mb-6 font-bold sm:gap-8">
      {[[years, 'Tahun'], [months, 'Bulan'], [days, 'Hari']].map(([value, label]) => (
        <div key={label} className="flex flex-col items-center">
          <span className="text-6xl sm:text-8xl drop-shadow-lg">{value}</span>
          <span className="mt-1 text-sm sm:text-2xl sm:mt-2">{label}</span>
        </div>
      ))}
    </div>
    <p className="mb-6 text-3xl font-bold tabular-nums sm:text-5xl drop-shadow-lg">
      {pad(hours)} : {pad(minutes)} : {pad(seconds)}
    </p>
    <p className='mb-8 text-lg drop-shadow-lg'>{`... dan akan terus bersama ❤️` }</p>
    {/* Button */}
    <div className="flex justify-center w-full">
      <button
        className="flex items-center justify-center gap-2 px-6 py-2 mt-8 text-sm text-white border rounded-lg sm:mt-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm sm:text-base border-white/50"
        onClick={() => navigate('/recap')}
      >
        Lanjut ke halaman berikutnya <ArrowRight/>
      </button>
    </div>
  </div>
</div>

  )
}

export default Timer

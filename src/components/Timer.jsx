import React from 'react'
import { useEffect, useState } from 'react'
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from './icons'

function Timer() {
  // Anniversary date
  const START_DATE = new Date('2024-10-10')
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      
      const days = Math.abs(differenceInDays(now, START_DATE))
      const hours = Math.abs(differenceInHours(now, START_DATE) % 24)
      const minutes = Math.abs(differenceInMinutes(now, START_DATE) % 60)
      const seconds = Math.abs(differenceInSeconds(now, START_DATE) % 60)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [])
  return (
    <div 
  className="relative flex flex-col items-center justify-center min-h-screen px-4 text-white bg-center bg-cover bg-black/20"
>
  <div className="z-10 text-center">
    {/* Title */}
    <h1 className="mb-8 text-lg font-bold sm:text-2xl drop-shadow-lg">
     Kita udah bersama selama:
    </h1>
    
    {/* Countdown */}
    <div className="flex items-center justify-center gap-3 mb-6 text-5xl font-bold sm:gap-4 sm:text-7xl">
      <div className="flex flex-col items-center">
        <span className="drop-shadow-lg">{timeLeft.days.toString().padStart(2, '0')}</span>
        <span className="mt-1 text-sm sm:text-2xl sm:mt-2">Hari</span>
      </div>
      <span className="text-4xl sm:text-6xl">:</span>
      <div className="flex flex-col items-center">
        <span className="drop-shadow-lg">{timeLeft.hours.toString().padStart(2, '0')}</span>
        <span className="mt-1 text-sm sm:text-2xl sm:mt-2">Jam</span>
      </div>
      <span className="text-4xl sm:text-6xl">:</span>
      <div className="flex flex-col items-center">
        <span className="drop-shadow-lg">{timeLeft.minutes.toString().padStart(2, '0')}</span>
        <span className="mt-1 text-sm sm:text-2xl sm:mt-2">Menit</span>
      </div>
      <span className="text-4xl sm:text-6xl">:</span>
      <div className="flex flex-col items-center">
        <span className="drop-shadow-lg">{timeLeft.seconds.toString().padStart(2, '0')}</span>
        <span className="mt-1 text-sm sm:text-2xl sm:mt-2">Detik</span>
      </div>
    </div>
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
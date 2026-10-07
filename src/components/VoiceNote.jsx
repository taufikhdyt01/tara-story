import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Play, Pause } from 'lucide-react'
import { ArrowLeft } from './icons'
import { bgm } from '../story'
import { profile } from '../assets'

// Rekaman: taruh file di public/voicenote.mp3
const SRC = '/voicenote.mp3'

// Fixed pseudo-random bar heights so the waveform looks the same every visit
const bars = Array.from({ length: 36 }, (_, i) => 25 + Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6)) * 75)

const fmt = (s) => (isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}` : '0:00')

function VoiceNote() {
  const navigate = useNavigate();
  const audioRef = useRef(null)
  const bgmWasPlaying = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [missing, setMissing] = useState(false)

  // Pause the background music while the voice note plays, resume it afterwards
  const onPlay = () => {
    bgmWasPlaying.current = !bgm.paused
    bgm.pause()
    setPlaying(true)
  }
  const onStop = () => {
    setPlaying(false)
    if (bgmWasPlaying.current) bgm.play().catch(() => {})
    bgmWasPlaying.current = false
  }

  // A detached <audio> keeps playing after unmount, so stop it explicitly
  useEffect(() => {
    const audio = audioRef.current
    return () => audio.pause()
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    audio.paused ? audio.play().catch(() => setMissing(true)) : audio.pause()
  }

  const seek = (e) => {
    const audio = audioRef.current
    if (!duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * duration
  }

  const progress = duration ? time / duration : 0

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12">
      <div className="w-[90%] max-w-[400px] text-center text-white">
        <h1 className="text-4xl font-bold drop-shadow-lg">Pesan Suara Buat Kamu</h1>
        <p className="mt-2 mb-10 text-white/80">Pakai earphone biar lebih kerasa 🎧</p>

        <audio
          ref={audioRef}
          src={SRC}
          preload="metadata"
          onLoadedMetadata={e => setDuration(e.currentTarget.duration)}
          onTimeUpdate={e => setTime(e.currentTarget.currentTime)}
          onPlay={onPlay}
          onPause={onStop}
          onEnded={() => setTime(0)}
          onError={() => setMissing(true)}
        />

        {/* WhatsApp-style voice note bubble */}
        <div className="flex items-center gap-3 p-3 text-left bg-white shadow-xl rounded-2xl rounded-tl-none">
          <div className="relative flex-shrink-0">
            <img src={profile} alt="Taufik" className="object-cover w-12 h-12 rounded-full" />
            <span className="absolute -bottom-1 -right-1 text-sm">🎙️</span>
          </div>
          <button
            aria-label={playing ? 'Jeda' : 'Putar'}
            onClick={toggle}
            disabled={missing}
            className="flex-shrink-0 text-gray-600 disabled:opacity-40"
          >
            {playing ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current" />}
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center h-10 gap-[2px] cursor-pointer" onClick={seek}>
              {bars.map((h, i) => (
                <span
                  key={i}
                  className={`flex-1 rounded-full ${i / bars.length < progress ? 'bg-rose-500' : 'bg-gray-300'}`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between text-[11px] text-gray-500">
              <span>{fmt(playing || time ? time : duration)}</span>
              <span>Taufik</span>
            </div>
          </div>
        </div>

        {missing && <p className="mt-4 text-sm text-white/80">Pesan suaranya belum ada 🙈</p>}

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

export default VoiceNote

import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Volume2, VolumeX } from 'lucide-react'
import {Closing, Letter,Passcode,Question,Recap,Timer,Message,Music,Picture,Wrapped} from './components'
import { bgm } from './story'
import './index.css'

function MusicToggle() {
  const [playing, setPlaying] = useState(!bgm.paused)
  const { pathname } = useLocation()

  useEffect(() => {
    const update = () => setPlaying(!bgm.paused)
    bgm.addEventListener('play', update)
    bgm.addEventListener('pause', update)
    return () => {
      bgm.removeEventListener('play', update)
      bgm.removeEventListener('pause', update)
    }
  }, [])

  if (pathname === '/') return null
  return (
    <button
      aria-label={playing ? 'Matikan musik' : 'Putar musik'}
      onClick={() => (playing ? bgm.pause() : bgm.play().catch(() => {}))}
      className="fixed z-50 p-2 text-white border rounded-full top-4 right-4 bg-white/20 backdrop-blur-sm border-white/50"
    >
      {playing ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
    </button>
  )
}

function App() {
  return (
    <Router>
      <MusicToggle />
      <Routes>
        <Route path="/" element={<Passcode />} />
        <Route path="/question" element={<Question />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/recap" element={<Recap />} />
        <Route path="/recap/message" element={<Message />} />
        <Route path="/recap/music" element={<Music />} />
        <Route path="/recap/pictures" element={<Picture />} />
        <Route path="/recap/wrapped" element={<Wrapped />} />
        <Route path="/letter" element={<Letter />} />
        <Route path="/closing" element={<Closing />} />
      </Routes>
    </Router>
  )
}

export default App

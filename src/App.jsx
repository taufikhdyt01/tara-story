import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Volume2, VolumeX } from 'lucide-react'
import { motion, MotionConfig } from 'framer-motion'
import {Closing, Letter,Passcode,Chat,Recap,Timer,Message,Music,Picture,Wrapped,VoiceNote,Plans} from './components'
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

  // hidden where it would cover page controls (chat header icons, wrapped close button)
  if (pathname === '/' || pathname === '/chat' || pathname === '/recap/wrapped') return null
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

const hearts = Array.from({ length: 14 }, () => ({
  left: Math.random() * 100,
  size: 10 + Math.random() * 18,
  duration: 9 + Math.random() * 10,
  delay: -Math.random() * 19,
}))

function FloatingHearts() {
  return (
    <div aria-hidden className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {hearts.map((h, i) => (
        <span
          key={i}
          className="floating-heart"
          style={{ left: `${h.left}%`, fontSize: h.size, animationDuration: `${h.duration}s`, animationDelay: `${h.delay}s` }}
        >
          ❤
        </span>
      ))}
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  // opacity only: a transform here would break position:fixed inside pages
  return (
    <motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Routes location={location}>
        <Route path="/" element={<Passcode />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/recap" element={<Recap />} />
        <Route path="/recap/message" element={<Message />} />
        <Route path="/recap/music" element={<Music />} />
        <Route path="/recap/pictures" element={<Picture />} />
        <Route path="/recap/wrapped" element={<Wrapped />} />
        <Route path="/recap/voice" element={<VoiceNote />} />
        <Route path="/recap/plans" element={<Plans />} />
        <Route path="/letter" element={<Letter />} />
        <Route path="/closing" element={<Closing />} />
      </Routes>
    </motion.div>
  )
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
    <Router>
      <FloatingHearts />
      <MusicToggle />
      <AnimatedRoutes />
    </Router>
    </MotionConfig>
  )
}

export default App

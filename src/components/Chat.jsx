import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Video, Phone, CheckCheck } from 'lucide-react'
import { profile } from '../assets'

// Naskah chat. { text } = pesan dari Taufik, { choices } = pilihan balasan dia.
// correct: index jawaban yang benar (kosong = semua benar), wrong: balasan kalau salah, next: halaman tujuan
const script = [
  { text: 'Sayaaang 🥺' },
  { text: 'Akhirnya kebuka juga websitenya hehe' },
  { text: 'Lagi apa?' },
  { choices: ['Lagi buka website dari kamu 😳', 'Lagi kangen kamu 🥺'] },
  { text: 'Aku juga kangen bangeet. Batu–Tasik ternyata jauh ya 😭' },
  { text: 'Eh btw, tau nggak hari ini hari apa?' },
  { choices: ['Hari Sabtu?', 'Hari anniversary kita! 🥳'], correct: 1, wrong: 'Iya sih Sabtu 😤 tapi bukan itu maksud akuu, coba lagi' },
  { text: 'Pinter banget pacar aku 😘' },
  { text: 'Nggak kerasa ya, udah 2 tahun aja kita' },
  { text: 'Mau tau udah berapa lama persisnya?' },
  { choices: ['Mau dong!'], next: '/timer' },
]

const time = () => new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })

function Chat() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [messages, setMessages] = useState([])
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)
  const item = script[step]

  const send = (from, text) => setMessages(m => [...m, { from, text, time: time() }])

  // Taufik's messages appear one by one after a "typing" pause scaled to their length
  useEffect(() => {
    if (!item?.text) return
    setTyping(true)
    const t = setTimeout(() => {
      setTyping(false)
      send('him', item.text)
      setStep(s => s + 1)
    }, 800 + item.text.length * 30)
    return () => clearTimeout(t)
  }, [step])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const choose = (i) => {
    send('me', item.choices[i])
    if (item.correct !== undefined && i !== item.correct) {
      setTyping(true)
      setTimeout(() => {
        setTyping(false)
        send('him', item.wrong)
      }, 1200)
    } else if (item.next) {
      setTimeout(() => navigate(item.next), 1200)
    } else {
      setStep(s => s + 1)
    }
  }

  return (
    <div className="flex flex-col h-dvh max-w-[480px] mx-auto bg-[#efeae2]">
      {/* Header */}
      <div className="flex items-center gap-3 px-3 py-2 text-white bg-[#008069]">
        <ArrowLeft className="w-5 h-5" />
        <img src={profile} alt="Taufik" className="object-cover w-10 h-10 rounded-full" />
        <div className="flex-1">
          <p className="font-bold leading-tight">Taufik ❤️</p>
          <p className="text-xs text-white/80">{typing ? 'sedang mengetik...' : 'online'}</p>
        </div>
        <Video className="w-5 h-5" />
        <Phone className="w-5 h-5 ml-3" />
      </div>

      {/* Messages */}
      <div className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
        <p className="mx-auto mb-4 w-fit px-3 py-1 text-xs text-gray-600 bg-white/80 rounded-lg">Hari ini</p>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-3 py-1.5 rounded-lg shadow-sm text-[15px] text-gray-900 ${m.from === 'me' ? 'bg-[#d9fdd3] rounded-tr-none' : 'bg-white rounded-tl-none'}`}>
              {m.text}
              <span className="inline-flex items-center gap-1 ml-2 text-[11px] text-gray-500 align-bottom">
                {m.time}
                {m.from === 'me' && <CheckCheck className="w-4 h-4 text-sky-500" />}
              </span>
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="flex gap-1 px-4 py-3 bg-white rounded-lg rounded-tl-none shadow-sm">
              {[0, 150, 300].map(d => (
                <span key={d} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Reply choices */}
      <div className="px-3 py-3 space-y-2 bg-[#f0f2f5] min-h-[4rem]">
        {item?.choices && !typing && item.choices.map((c, i) => (
          <button
            key={c}
            onClick={() => choose(i)}
            className="w-full px-4 py-2.5 text-left text-gray-900 bg-white rounded-full shadow-sm active:bg-gray-100"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Chat

import React, { useEffect, useRef } from 'react';
import { gsap, CSSRulePlugin } from 'gsap/all';
import '../index.css';
import { ArrowLeft,ArrowRight } from "./icons";
import { useNavigate } from 'react-router-dom'
gsap.registerPlugin(CSSRulePlugin);

function Letter() {
  const envelopeRef = useRef(null);
  const letterRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const flap = CSSRulePlugin.getRule(".envelope:before");
    const t1 = gsap.timeline({ paused: true });
    t1.to(flap, {
      duration: 0.5,
      cssRule: { rotateX: 180 },
    })
      .set(flap, { cssRule: { zIndex: 10 } })
      .to(letterRef.current, {
        scale: 0.8,
        translateY: -200,
        duration: 0.9,
        ease: "back.inOut(1.5)",
      })
      .set(letterRef.current, { zIndex: 40 })
      .to(letterRef.current, {
        duration: 0.7,
        ease: "back.out(0.4)",
        translateY: -60,
        height: 300,
        translateZ: 250,
      });

    const t2 = gsap.timeline({ paused: true });


    const openCard = () => {
      t1.play();
      t2.play();
    };

    const closeCard = (e) => {
      e.stopPropagation();
      t1.reverse();
      t2.reverse();
    };

    const envelopeElement = envelopeRef.current;
    const closeButton = letterRef.current.querySelector(".close");

    envelopeElement.addEventListener("click", openCard);
    closeButton.addEventListener("click", closeCard);

    return () => {
      envelopeElement.removeEventListener("click", openCard);
      closeButton.removeEventListener("click", closeCard);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className='w-[90%] max-w-[400px]'>
          <div className="flex-grow flex items-center justify-center h-[400px]">
          <div className="letter-container">
            <div className="content">
              <div className="envelope" ref={envelopeRef}></div>
              <div className="letter" ref={letterRef}>
                <div className="body">
                  <span className="close">x</span>
                  <div className="message">
                    <p>Hai sayang,</p>
                    <p>Kalau kamu baca ini, berarti kita udah ketemu lagi setelah sekian lama cuma bisa video call. Aku seneng banget. Akhirnya bisa liat kamu langsung, bukan lewat layar yang suka nge-freeze pas lagi seru-serunya.</p>
                    <p>Dua tahun ini nggak selalu gampang. Dari ketemu tiap hari, jadi tiap minggu, sekarang tiap bulan. Belum lagi kesibukan kita masing-masing. Tapi kamu selalu nyempetin care sama aku, bahkan dari jauh. Itu yang bikin aku makin yakin sama kamu.</p>
                    <p>Kamu pernah bilang suka karena aku pendengar yang baik. Tenang aja, aku bakal terus jadi orang pertama yang dengerin cerita kamu, mau sejauh apa pun jaraknya.</p>
                    <p>Makasih udah jadi rumah yang bisa aku datengin walaupun jauh. Aku sayang kamu, hari ini, besok, dan seterusnya.</p>
                    <p>Taufik ❤️</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between w-full p-6 mb-10">
            <button
              className="px-4 py-2 flex justify-center items-center bg-white/20 gap-2 hover:bg-white/30 backdrop-blur-sm text-white text-sm sm:text-base border border-white/50 rounded-lg"
              onClick={() => navigate('/recap')}
            >
              <ArrowLeft /> Sebelumnya
            </button>
            <button
              className="px-4 py-2 flex justify-center items-center bg-white/20 gap-2 hover:bg-white/30 backdrop-blur-sm text-white text-sm sm:text-base border border-white/50 rounded-lg"
              onClick={() => navigate('/closing')}
            >
              Berikutnya <ArrowRight />
            </button>
          </div>
        
      </div>
    </div>

  
  );
}

export default Letter;

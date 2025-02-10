import React from 'react'
import { 
  f240829, f240909, f241012, f241019, f241020, 
  f241102, f241117, f241127, f241218, f241225,
  f241228, f241230, f241231, f250110, f250203, f250207
} from '../assets'
import Carousel from './Carousel'
import { ImageCard } from './ImageCard'
import {ArrowLeft } from './icons'
import { useNavigate } from 'react-router-dom'

function Picture() {
  const navigate = useNavigate();

  const pictures = [
    { Image: f240829, title: '29 Agustus 2024', description: "First photo kita! Masih malu-malu habis nonton di Malang Town Square. Awal dari semua kenangan indah kita ❤️"},   
    { Image: f240909, title: '9 September 2024', description: "BBQ di Thana. Hari dimana aku mulai mengungkapkan keseriusan hubungan sama kamu 🫶"},
    { Image: f241012, title: '12 Oktober 2024', description: "Mall date di MOG. Nggak ada yang spesial, tapi karena sama kamu jadi berkesan banget 🥰"},
    { Image: f241019, title: '19 Oktober 2024', description: "First Timezone date! Main games sampe capek bareng kamu tetep seru 🎮"},
    { Image: f241020, title: '20 Oktober 2024', description: "Nintendo date pertama kita. Kamu lucu banget waktu main Nintendo Switch Sport 🎯"},
    { Image: f241102, title: '2 November 2024', description: "Happy 20th birthday sayangku! Semoga semua impian kamu tercapai ya 🎂"},
    { Image: f241117, title: '17 November 2024', description: "Study date di Starbucks. Fokus belajar tapi tetep curi-curi pandang ke kamu 📚☕"},
    { Image: f241127, title: '27 November 2024', description: "Proud moment! My girl habis sidang. Keren banget 👩‍🎓"},
    { Image: f241218, title: '18 Desember 2024', description: "Akhirnya aku selesai semhas! Makasih udah support terus sayang 🎓"},
    { Image: f241225, title: '25 Desember 2024', description: "First photobox kita! Malu-malu tapi hasilnya cute banget 📸"},
    { Image: f241228, title: '28 Desember 2024', description: "Adventure ke Paralayang dari malem sampe pagi. Worth it bisa liat sunrise bareng kamu ⛅"},
    { Image: f241230, title: '30 Desember 2024', description: "Post-sidang photo! Finally lega bisa selesai, thank you for always being there 🫂"},
    { Image: f241231, title: '31 Desember 2024', description: "New Year's Eve di Pesen Kopi Plus Betek. Semoga kita masih tetep terus bersama ya 🎆"},
    { Image: f250110, title: '10 Januari 2025', description: "Quality time di Milenial Glow Garden JTP 3. Cantik lampunya, tapi lebih cantik kamu 💫"},
    { Image: f250203, title: '3 Februari 2025', description: "Maskeran bareng setelah 2 minggu LDR. Kangen quality time kaya gini sama kamu 🤗"},
    { Image: f250207, title: '7 Februari 2025', description: "Movie date di Transmart. Film nya bagus, tapi lebih bagus nontonnya sama kamu 🎬"}
  ]
  return (
  
    <div className="flex flex-col items-center justify-center min-h-screen bg-black/20">

      <div className="w-[90%] max-w-[400px]">
        <h1 className="-mb-4 text-2xl font-bold text-center text-white sm:text-2xl drop-shadow-lg">
            Album Kenangan Kita
          </h1>
        <Carousel>
          {pictures.map(({Image,title,description,index}) => (
            <ImageCard
              key={index}
              imageUrl={Image}
              altText="Foto kenangan kita"
              title={title}
              description={description}
            />
          ))}
        </Carousel>

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

export default Picture
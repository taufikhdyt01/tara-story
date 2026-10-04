import React from "react";
import { ArrowLeft } from "./icons";
import { Music2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef } from "react";
import { penjagahati, rumahitu, sleeping, anugerahterindah, tungguapalagi, feather, adadirimu, bermuara } from "../assets";

function Music() {
  const navigate = useNavigate();
  // albumCover opsional: tanpa cover tampil ikon musik
  const songs = [
  {
    title: "1000x",
    artist: "Ghea Indrawari",
  },
  {
    title: "Lewati Berdua",
    artist: "", // TODO: nama penyanyi
  },
  {
    title: "Overnight",
    artist: "", // TODO: nama penyanyi
  },
  {
    title: "Penjaga Hati",
    artist: "Nadhif Basalamah",
    albumCover: penjagahati,
  },
  {
    title: "Kita Usahakan Rumah Itu",
    artist: "Sal Priadi",
    albumCover: rumahitu,
  },
  {
    title: "I'd Like to Watch You Sleeping",
    artist: "Sal Priadi",
    albumCover: sleeping,
  },
  {
    title: "Anugerah Terindah",
    artist: "Andmesh",
    albumCover: anugerahterindah,
  },
  {
    title: "Tunggu Apa Lagi",
    artist: "Nyoman Paul",
    albumCover: tungguapalagi,
  },
  {
    title: "birds of a feather",
    artist: "Billie Eilish",
    albumCover: feather,
  },
  {
    title: "Semenjak Ada Dirimu",
    artist: "Yovie Widianto, HIVI!",
    albumCover: adadirimu,
  },
  {
    title: "Bermuara",
    artist: "Rizky Febian, Mahalini",
    albumCover: bermuara,
  },
];
  const containerRef = useRef(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
    <div className="w-[90%] max-w-[400px]">
      <h1 className="mt-4 -mb-4 text-2xl font-bold text-center text-white sm:text-2xl drop-shadow-lg">
        Lagu yang menggambarkan hubungan kita
      </h1>

      <div ref={containerRef}  className=" relative w-full h-[52rem] rounded-lg overflow-hidden mt-8 mb-12">
        {songs.map((song, index) => (
          <motion.div
            key={index}
            className="absolute" // Use absolute positioning
            // staggered zig-zag start positions, still draggable
            style={{
              left: `${[3, 25, 12][index % 3]}%`,
              top: `${index * 4.5 + 1}rem`,
            }}
            drag
            dragConstraints={containerRef} // Adjust to container size
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 flex items-center gap-4 w-56 h-[4rem]">
              <div className="flex-shrink-0 w-12 h-12">
                {song.albumCover ? (
                  <img
                    src={song.albumCover}
                    alt="Album cover"
                    className="object-cover w-full h-full rounded-md"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full rounded-md bg-gradient-to-br from-rose-300 to-rose-500">
                    <Music2 className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-sm font-medium text-white truncate">
                  {song.title}
                </h2>
                <p className="text-xs truncate text-white/70">{song.artist}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navigation Button */}
      <div className="flex justify-center w-full mt-4 mb-4">
        <button
          className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-white border rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/50"
          onClick={() => navigate("/recap")}
        >
          <ArrowLeft /> Kembali
        </button>
      </div>
    </div>
  </div>
  );
}

export default Music;

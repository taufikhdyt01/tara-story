import React from "react";
import { ArrowLeft } from "./icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef } from "react";
import { penjagahati, rumahitu, sleeping, anugerahterindah, tungguapalagi, feather, adadirimu, bermuara, lover, tonight } from "../assets";

function Music() {
  const navigate = useNavigate();
  const songs = [
  {
    title: "Penjaga Hati",
    artist: "Nadhif Basalamah",
    albumCover: penjagahati,
    left: "5%",
    top: "5%",
  },
  {
    title: "Kita Usahakan Rumah Itu",
    artist: "Sal Priadi",
    albumCover: rumahitu,
    left: "40%",
    top: "15%",
  },
  {
    title: "I'd Like to Watch You Sleeping",
    artist: "Sal Priadi",
    albumCover: sleeping,
    left: "15%",
    top: "40%",
  },
  {
    title: "Anugerah Terindah",
    artist: "Andmesh",
    albumCover: anugerahterindah,
    left: "30%",
    top: "75%",
  },
  {
    title: "Tunggu Apa Lagi",
    artist: "Nyoman Paul",
    left: "5%",
    top: "65%",
    albumCover: tungguapalagi,
  },
  {
    title: "birds of a feather",
    artist: "Billie Eilish",
    albumCover: feather,
    left: "25%",
    top: "90%",
  },
  {
    title: "Semenjak Ada Dirimu",
    artist: "Yovie Widianto, HIVI!",
    albumCover: adadirimu,
    left: "35%",
    top: "50%",
  },
  {
    title: "Bermuara",
    artist: "Rizky Febian, Mahalini",
    albumCover: bermuara,
    left: "10%",
    top: "25%",
  },
];
  const containerRef = useRef(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black/20">
    <div className="w-[90%] max-w-[400px]">
      <h1 className="mt-4 -mb-4 text-2xl font-bold text-center text-white sm:text-2xl drop-shadow-lg">
        Lagu yang menggambarkan hubungan kita
      </h1>

      <div ref={containerRef}  className=" relative w-full h-[40rem] rounded-lg overflow-hidden mt-8 mb-12">
        {songs.map((song, index) => (
          <motion.div
            key={index}
            className="absolute" // Use absolute positioning
            style={{
              left: song.left,
              top: song.top,
            }}
            drag
            dragConstraints={containerRef} // Adjust to container size
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 flex items-center gap-4 w-56 h-[4rem]">
              <div className="flex-shrink-0 w-12 h-12">
                <img
                  src={song.albumCover}
                  alt="Album cover"
                  className="object-cover w-full h-full rounded-md"
                />
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

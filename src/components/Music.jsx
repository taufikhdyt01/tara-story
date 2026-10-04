import React, { useEffect, useState } from "react";
import { ArrowLeft } from "./icons";
import { Play, Pause, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { bgm } from "../story";
import { penjagahati, rumahitu, sleeping, adadirimu, bermuara, cover1000x, cover2001x, lewatiberdua } from "../assets";

// albumCover = sampul, link = link Spotify (opsional, lagu diketuk untuk buka)
const songs = [
{
  title: "1000X",
  artist: "Ghea Indrawari",
  albumCover: cover1000x,
  bgm: true, // lagu musik latar
  link: "https://open.spotify.com/album/6Af2yNV7t9ThcHfYboQLQN",
},
{
  title: "2001x",
  artist: "Adrian Khalif",
  albumCover: cover2001x,
  link: "https://open.spotify.com/track/7EkTXoaED7peReoRytElSi",
},
{
  title: "Kita Lewati Berdua",
  artist: "Overnight",
  albumCover: lewatiberdua,
  link: "https://open.spotify.com/album/5MUKAQZAisxQQqMmfTx4M4",
},
{
  title: "Penjaga Hati",
  artist: "Nadhif Basalamah",
  albumCover: penjagahati,
  link: "https://open.spotify.com/track/6i9Ci0IN1q1GcnhdbKU7kZ",
},
{
  title: "Kita Usahakan Rumah Itu",
  artist: "Sal Priadi",
  albumCover: rumahitu,
  link: "https://open.spotify.com/track/5Egm9N7FnzsThl1CFXB2mm",
},
{
  title: "I'd Like to Watch You Sleeping",
  artist: "Sal Priadi",
  albumCover: sleeping,
  link: "https://open.spotify.com/track/0Y7dCFSIdB9vJ8nnVIAfuv",
},
{
  title: "Semenjak Ada Dirimu",
  artist: "Yovie Widianto, HIVI!",
  albumCover: adadirimu,
  link: "https://open.spotify.com/track/5H4MSA6eIr6x1iBTn1vpMG",
},
{
  title: "Bermuara",
  artist: "Rizky Febian, Mahalini",
  albumCover: bermuara,
  link: "https://open.spotify.com/track/2EijGQoEilhHWlQWMoS9Jc",
},
];

function Equalizer() {
  return (
    <span className="flex items-end gap-[2px] h-3">
      {[0, 200, 400].map(d => (
        <span key={d} className="w-[3px] h-full bg-emerald-300 rounded-sm eq-bar" style={{ animationDelay: `${d}ms` }} />
      ))}
    </span>
  );
}

function Music() {
  const navigate = useNavigate();
  const [playing, setPlaying] = useState(!bgm.paused);

  useEffect(() => {
    const update = () => setPlaying(!bgm.paused);
    bgm.addEventListener("play", update);
    bgm.addEventListener("pause", update);
    return () => {
      bgm.removeEventListener("play", update);
      bgm.removeEventListener("pause", update);
    };
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen py-12">
      <div className="w-[90%] max-w-[400px]">
        {/* Header */}
        <div className="flex flex-col items-center text-center text-white">
          <div className="grid w-48 h-48 grid-cols-2 overflow-hidden rounded-lg shadow-2xl">
            {songs.slice(0, 4).map(song => (
              <img key={song.title} src={song.albumCover} alt="" className="object-cover w-full h-full" />
            ))}
          </div>
          <h1 className="mt-6 text-4xl font-bold drop-shadow-lg">Playlist Kita</h1>
          <p className="mt-1 text-sm text-white/80">Lagu-lagu yang menggambarkan hubungan kita</p>
          <p className="mt-1 text-xs text-white/70">Dibuat oleh Taufik · {songs.length} lagu</p>
        </div>

        {/* Play background music */}
        <div className="flex justify-end mt-4 mb-2">
          <button
            aria-label={playing ? "Jeda" : "Putar"}
            onClick={() => (playing ? bgm.pause() : bgm.play().catch(() => {}))}
            className="flex items-center justify-center bg-white rounded-full shadow-lg w-14 h-14 text-rose-600 active:scale-95"
          >
            {playing ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 ml-1 fill-current" />}
          </button>
        </div>

        {/* Tracks */}
        <div className="p-2 border rounded-2xl bg-white/10 backdrop-blur-sm border-white/20">
          {songs.map((song, index) => {
            const Row = song.link ? motion.a : motion.div;
            const nowPlaying = song.bgm && playing;
            return (
              <Row
                key={song.title}
                {...(song.link && { href: song.link, target: "_blank", rel: "noreferrer" })}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 p-2 rounded-lg active:bg-white/20"
              >
                <span className="w-5 text-sm text-center text-white/70">
                  {nowPlaying ? <Equalizer /> : index + 1}
                </span>
                <img src={song.albumCover} alt="" className="flex-shrink-0 object-cover w-12 h-12 rounded-md shadow" />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-bold truncate ${nowPlaying ? "text-emerald-200" : "text-white"}`}>{song.title}</p>
                  <p className="text-xs truncate text-white/70">{song.artist}</p>
                </div>
                {song.link && <ExternalLink className="flex-shrink-0 w-4 h-4 text-white/60" />}
              </Row>
            );
          })}
        </div>

        <div className="flex justify-center w-full mt-10">
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

import React, { useState } from "react";
import { SoundGroup, PhonicsSound } from "../types";
import { speakPhoneme, speakWord, displayPhoneme } from "../utils/speech";
import { motion, AnimatePresence } from "motion/react";

// Beautiful interactive custom child illustrations mapping for phonics actions (Modern, 3D style, cute emojis)
function PhonicsActionIllustrator({ sound }: { sound: string }) {
  const normSound = sound.toLowerCase();

  // Find corresponding cartoon mapping
  let content = null;
  let bgGradient = "from-amber-100 to-orange-50/60";
  let borderColor = "border-amber-200";

  if (normSound === "s") {
    bgGradient = "from-emerald-100 via-teal-50 to-emerald-50/30";
    borderColor = "border-emerald-250";
    content = (
      <div className="relative flex flex-col items-center justify-center">
        <motion.div
          animate={{ x: [-15, 15, -15], rotate: [-8, 8, -8], scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="text-6xl drop-shadow-[0_10px_10px_rgba(16,185,129,0.3)] filter cursor-pointer"
        >
          🐍
        </motion.div>
        <span className="text-[11px] font-black text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full mt-2 border border-emerald-200 uppercase tracking-widest select-none">
          S-S-S-S-S
        </span>
      </div>
    );
  } else if (normSound === "a") {
    bgGradient = "from-rose-100 via-pink-50 to-rose-50/30";
    borderColor = "border-rose-250";
    content = (
      <div className="relative flex flex-col items-center justify-center">
        {/* Apple bouncing */}
        <motion.div
          animate={{ y: [-6, 6, -6], rotate: [0, 4, -4, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="text-6xl drop-shadow-[0_10px_10px_rgba(244,63,94,0.35)] relative"
        >
          🍎
          {/* Animated small ants */}
          <motion.span
            animate={{ x: [-12, -4, -12], y: [15, 12, 15] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute -bottom-1 -left-2 text-xl pointer-events-none"
          >
            🐜
          </motion.span>
          <motion.span
            animate={{ x: [10, 4, 10], y: [-5, -10, -5] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="absolute -top-1 -right-2 text-xl pointer-events-none"
          >
            🐜
          </motion.span>
        </motion.div>
        <span className="text-[11px] font-black text-rose-800 bg-rose-100/80 px-2.5 py-0.5 rounded-full mt-2 border border-rose-200 uppercase tracking-widest select-none">
          A-A-A-A-A!
        </span>
      </div>
    );
  } else if (normSound === "t") {
    bgGradient = "from-sky-100 via-blue-50 to-sky-50/30";
    borderColor = "border-sky-250";
    content = (
      <div className="relative flex flex-col items-center justify-center">
        <div className="flex items-center gap-2 relative">
          <motion.div
            animate={{ rotate: [-20, 20, -20] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="text-5xl drop-shadow-[0_8px_8px_rgba(14,165,233,0.3)]"
          >
            🎾
          </motion.div>
          {/* Tennis ball flying back and forth */}
          <motion.div
            animate={{ x: [-20, 20, -20], y: [-8, 8, -8] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="text-4xl drop-shadow-[0_6px_6px_rgba(234,179,8,0.3)]"
          >
            🥎
          </motion.div>
        </div>
        <span className="text-[11px] font-black text-sky-800 bg-sky-100/80 px-2.5 py-0.5 rounded-full mt-2 border border-sky-200 uppercase tracking-widest select-none">
          T-T-T-T-T
        </span>
      </div>
    );
  } else if (normSound === "i") {
    bgGradient = "from-indigo-100 via-purple-50 to-indigo-50/30";
    borderColor = "border-indigo-250";
    content = (
      <div className="relative flex flex-col items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.06, 1], rotate: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="text-6xl drop-shadow-[0_10px_10px_rgba(99,102,241,0.3)] relative"
        >
          🐭
          {/* Spilled Ink */}
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="absolute -bottom-1 -right-3 text-2xl"
          >
            💧
          </motion.span>
        </motion.div>
        <span className="text-[11px] font-black text-indigo-800 bg-indigo-100/80 px-2.5 py-0.5 rounded-full mt-2 border border-indigo-200 uppercase tracking-widest select-none">
          I-I-I-I-I!
        </span>
      </div>
    );
  } else if (normSound === "p") {
    bgGradient = "from-fuchsia-100 via-rose-50 to-fuchsia-50/30";
    borderColor = "border-fuchsia-250";
    content = (
      <div className="relative flex flex-col items-center justify-center">
        <div className="flex items-center gap-1.5">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-5xl drop-shadow-[0_8px_8px_rgba(240,119,200,0.3)]"
          >
            🐷
          </motion.div>
          {/* Blow candle */}
          <motion.div
            animate={{ x: [-4, 6], opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-2xl animate-pulse"
          >
            💨
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="text-4xl drop-shadow-[0_8px_8px_rgba(245,158,11,0.35)]"
          >
            🎂
          </motion.div>
        </div>
        <span className="text-[11px] font-black text-fuchsia-800 bg-fuchsia-100/80 px-2.5 py-0.5 rounded-full mt-2 border border-fuchsia-250 uppercase tracking-widest select-none">
          P-P-P-P-P!
        </span>
      </div>
    );
  } else if (normSound === "n") {
    bgGradient = "from-blue-100 via-sky-50 to-blue-50/30";
    borderColor = "border-blue-255";
    content = (
      <div className="relative flex flex-col items-center justify-center">
        <motion.div
          animate={{ y: [-5, 5, -5], rotate: [-4, 4, -4] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
          className="text-6xl drop-shadow-[0_12px_12px_rgba(37,99,235,0.25)] relative"
        >
          ✈️
          <motion.span
            animate={{ x: [40, -40], opacity: [0, 0.8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="absolute top-2 -right-12 text-xl"
          >
            ☁️
          </motion.span>
        </motion.div>
        <span className="text-[11px] font-black text-blue-800 bg-blue-100/80 px-2.5 py-0.5 rounded-full mt-2 border border-blue-200 uppercase tracking-widest select-none">
          NNNNNN!
        </span>
      </div>
    );
  } else if (normSound === "c" || normSound === "k" || normSound === "ck") {
    bgGradient = "from-amber-100 via-orange-50 to-amber-50/30";
    borderColor = "border-amber-250";
    content = (
      <div className="relative flex flex-col items-center justify-center">
        <div className="flex items-center gap-1">
          <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [-4, 4, -4] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-5xl drop-shadow-[0_8px_8px_rgba(245,158,11,0.3)]"
          >
            🐱
          </motion.div>
          <motion.div
            animate={{ y: [-15, 5, -15], rotate: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="text-4xl"
          >
            🪁
          </motion.div>
        </div>
        <span className="text-[11px] font-black text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full mt-2 border border-amber-250 uppercase tracking-widest select-none">
          C-C-C! / K-K-K!
        </span>
      </div>
    );
  } else if (normSound === "e") {
    bgGradient = "from-yellow-100 via-orange-50 to-yellow-50/30";
    borderColor = "border-yellow-250";
    content = (
      <div className="relative flex flex-col items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="text-6xl drop-shadow-[0_10px_10px_rgba(234,179,8,0.35)] relative"
        >
          🍳
          <span className="absolute -top-2 -left-2 text-2xl animate-pulse">🥚</span>
        </motion.div>
        <span className="text-[11px] font-black text-yellow-800 bg-yellow-105/80 px-2.5 py-0.5 rounded-full mt-2 border border-yellow-200 uppercase tracking-widest select-none">
          E-E-E-E-E!
        </span>
      </div>
    );
  } else if (normSound === "h") {
    bgGradient = "from-red-100 via-orange-50 to-red-50/30";
    borderColor = "border-red-250";
    content = (
      <div className="relative flex flex-col items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-5xl drop-shadow-[0_8px_8px_rgba(239,68,68,0.3)] relative"
        >
          🥵
          <motion.span
            animate={{ y: [-5, 8], opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="absolute -bottom-1 -right-1 text-base pointer-events-none"
          >
            💦
          </motion.span>
        </motion.div>
        <span className="text-[11px] font-black text-red-800 bg-red-100/80 px-2.5 py-0.5 rounded-full mt-2 border border-red-200 uppercase tracking-widest select-none">
          H-H-H-H-H!
        </span>
      </div>
    );
  } else if (normSound === "r") {
    bgGradient = "from-amber-100 via-yellow-50 to-amber-50/20";
    borderColor = "border-amber-200";
    content = (
      <div className="relative flex flex-col items-center justify-center">
        <motion.div
          animate={{ rotate: [-6, 6, -6], scale: [1, 1.04, 1] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          className="text-6xl drop-shadow-[0_10px_10px_rgba(217,119,6,0.3)] relative"
        >
          🐶
          <span className="absolute -bottom-1 -right-2 text-2xl">🦴</span>
        </motion.div>
        <span className="text-[11px] font-black text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full mt-2 border border-amber-250 uppercase tracking-widest select-none">
          RRRRRRR!
        </span>
      </div>
    );
  } else if (normSound === "m") {
    bgGradient = "from-emerald-100 via-green-50 to-emerald-50/20";
    borderColor = "border-emerald-200";
    content = (
      <div className="relative flex flex-col items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
          className="text-6xl drop-shadow-[0_10px_10px_rgba(16,185,129,0.3)] relative"
        >
          😋
          <motion.span
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            className="absolute -top-3 -right-3 text-2xl pointer-events-none"
          >
            🍩
          </motion.span>
        </motion.div>
        <span className="text-[11px] font-black text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full mt-2 border border-emerald-250 uppercase tracking-widest select-none">
          MMMMMMM!
        </span>
      </div>
    );
  } else if (normSound === "d") {
    bgGradient = "from-violet-100 via-indigo-50 to-violet-50/20";
    borderColor = "border-violet-250";
    content = (
      <div className="relative flex flex-col items-center justify-center">
        <motion.div
          animate={{ rotate: [-8, 8, -8], scale: [1, 1.06, 1] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="text-6xl drop-shadow-[0_10px_10px_rgba(139,92,246,0.3)] relative"
        >
          🥁
          <span className="absolute -top-3 -right-3 text-2xl animate-bounce">🎶</span>
        </motion.div>
        <span className="text-[11px] font-black text-violet-800 bg-violet-100/80 px-2.5 py-0.5 rounded-full mt-2 border border-violet-250 uppercase tracking-widest select-none">
          D-D-D-D-D!
        </span>
      </div>
    );
  } else if (normSound === "g") {
    bgGradient = "from-blue-100 via-cyan-50 to-blue-50/20";
    borderColor = "border-blue-200";
    content = (
      <div className="relative flex flex-col items-center justify-center">
        <motion.div
          animate={{ rotate: [0, -360] }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="text-6xl drop-shadow-[0_10px_10px_rgba(37,99,235,0.3)] relative"
        >
          🌀
          <motion.span
            animate={{ y: [0, 15], opacity: [0.8, 0] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="absolute bottom-2 left-4 text-sm pointer-events-none"
          >
            💧
          </motion.span>
        </motion.div>
        <span className="text-[11px] font-black text-blue-850 bg-blue-100/80 px-2.5 py-0.5 rounded-full mt-2 border border-blue-200 uppercase tracking-widest select-none">
          G-G-G-G-G!
        </span>
      </div>
    );
  } else if (normSound === "o") {
    bgGradient = "from-amber-100 via-yellow-50 to-amber-50/20";
    borderColor = "border-amber-200";
    content = (
      <div className="relative flex flex-col items-center justify-center">
        <div className="flex items-center gap-1.5">
          <motion.div
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-5xl drop-shadow-[0_12px_12px_rgba(234,179,8,0.45)]"
          >
            💡
          </motion.div>
          <motion.div className="text-3xl">🔛</motion.div>
        </div>
        <span className="text-[11px] font-black text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full mt-2 border border-amber-250 uppercase tracking-widest select-none">
          O-O-O-O-O!
        </span>
      </div>
    );
  } else if (normSound === "u") {
    bgGradient = "from-purple-100 via-fuchsia-50 to-purple-50/20";
    borderColor = "border-purple-200";
    content = (
      <div className="relative flex flex-col items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.05, 1], y: [-3, 3, -3] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-6xl drop-shadow-[0_10px_10px_rgba(168,85,247,0.3)] relative"
        >
          ☂️
          <motion.span
            animate={{ y: [-15, 12], opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute -top-3 left-4 text-xs pointer-events-none"
          >
            🌧️
          </motion.span>
        </motion.div>
        <span className="text-[11px] font-black text-purple-800 bg-purple-100/80 px-2.5 py-0.5 rounded-full mt-2 border border-purple-250 uppercase tracking-widest select-none">
          U-U-U-U-U!
        </span>
      </div>
    );
  } else if (normSound === "l") {
    bgGradient = "from-pink-100 via-rose-50 to-pink-50/20";
    borderColor = "border-pink-200";
    content = (
      <div className="relative flex flex-col items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.08, 1], rotate: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="text-6xl drop-shadow-[0_10px_10px_rgba(244,63,94,0.35)]"
        >
          🍭
        </motion.div>
        <span className="text-[11px] font-black text-rose-800 bg-pink-100/80 px-2.5 py-0.5 rounded-full mt-2 border border-pink-250 uppercase tracking-widest select-none">
          LLLLLLLLL!
        </span>
      </div>
    );
  } else if (normSound === "f") {
    bgGradient = "from-teal-100 via-cyan-50 to-teal-50/25";
    borderColor = "border-teal-200";
    content = (
      <div className="relative flex flex-col items-center justify-center">
        <motion.div
          animate={{ rotate: [-15, 15, -15], y: [-4, 4, -4] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="text-6xl drop-shadow-[0_10px_10px_rgba(20,184,166,0.35)] relative"
        >
          🐟
          <span className="absolute -bottom-2 -right-1 text-lg">🌊</span>
        </motion.div>
        <span className="text-[11px] font-black text-teal-800 bg-teal-100/80 px-2.5 py-0.5 rounded-full mt-2 border border-teal-250 uppercase tracking-widest select-none">
          FFFFFFFFF!
        </span>
      </div>
    );
  } else if (normSound === "b") {
    bgGradient = "from-orange-100 via-yellow-50 to-orange-50/25";
    borderColor = "border-orange-200";
    content = (
      <div className="relative flex flex-col items-center justify-center">
        <div className="flex items-center gap-1">
          <motion.div
            animate={{ rotate: [-25, 15, -25] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-5xl drop-shadow-[0_8px_8px_rgba(249,115,22,0.3)]"
          >
            🏏
          </motion.div>
          <motion.div
            animate={{ x: [0, 40], y: [0, -20], opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
            className="text-3xl"
          >
            ⚾
          </motion.div>
        </div>
        <span className="text-[11px] font-black text-orange-800 bg-orange-105/80 px-2.5 py-0.5 rounded-full mt-2 border border-orange-250 uppercase tracking-widest select-none">
          B-B-B-B-B!
        </span>
      </div>
    );
  } else {
    // Default magic box
    content = (
      <div className="relative flex flex-col items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.08, 1], y: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="text-6xl drop-shadow-[0_12px_12px_rgba(245,158,11,0.35)]"
        >
          ⭐
        </motion.div>
        <span className="text-[11px] font-black text-amber-800 bg-amber-105/80 px-2.5 py-0.5 rounded-full mt-2 border border-amber-250 uppercase tracking-widest select-none">
          CỐ GẮNG LÊN BÉ!
        </span>
      </div>
    );
  }

  return (
    <div className={`w-full h-20 bg-gradient-to-br ${bgGradient} rounded-2xl border-2 ${borderColor} flex items-center justify-center relative overflow-hidden select-none shadow-sm hover:shadow-md transition-all duration-300`}>
      {/* Background soft ambiance circles */}
      <div className="absolute inset-x-0 top-0 h-6 bg-white/20 blur-lg pointer-events-none" />
      <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-white/10 rounded-full blur-md pointer-events-none" />
      <div className="absolute -top-6 -right-6 w-16 h-16 bg-white/10 rounded-full blur-md pointer-events-none" />
      
      {/* Cute sparkle particles on background */}
      <div className="absolute top-1.5 left-3 text-xs animate-pulse opacity-60">✨</div>
      <div className="absolute bottom-1.5 right-3 text-xs animate-pulse opacity-60">✨</div>

      {/* Main visual cartoon */}
      <div className="relative z-10 scale-90">
        {content}
      </div>
    </div>
  );
}

interface SoundBoardProps {
  group: SoundGroup;
}

export default function SoundBoard({ group }: SoundBoardProps) {
  const [selectedSound, setSelectedSound] = useState<PhonicsSound>(group.sounds[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Update selected sound when group changes
  React.useEffect(() => {
    if (group.sounds.length > 0) {
      setSelectedSound(group.sounds[0]);
    }
  }, [group]);

  const handlePlaySound = async (sound: string) => {
    setIsPlaying(true);
    await speakPhoneme(sound);
    setIsPlaying(false);
  };

  const handlePlayWord = async (word: string) => {
    await speakWord(word, 0.73);
  };

  return (
    <div className="w-full bg-white rounded-[2.5rem] p-6 md:p-8 hover:shadow-xl transition-all duration-300 border-4 border-b-12 border-slate-200/90 shadow-lg" id="sound-board-container">
      {/* Title Subheader */}
      <div className="flex items-center gap-2 mb-6 border-b-4 border-slate-100 pb-5 justify-between">
        <div className="flex items-center gap-2">
          <span className="text-3xl animate-bounce">📢</span>
          <h2 className="text-2xl font-black font-sans text-sky-950">
            Học Âm & Hành Động Jolly Phonics
          </h2>
        </div>
        <span className="text-xs bg-sky-100 text-sky-800 font-black px-4 py-1.5 rounded-full border-2 border-sky-300 shadow-sm uppercase tracking-wider">
          Nhóm {group.number}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        {/* 1. Left Sound list Selector (3 cols) */}
        <div className="md:col-span-3 flex flex-row flex-wrap md:flex-col gap-1.5 md:h-[300px] justify-between pr-1" id="soundboard-left-selectors">
          {group.sounds.map((soundItem, idx) => {
            const isCurrent = selectedSound.sound === soundItem.sound;
            return (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedSound(soundItem)}
                className={`flex-1 min-w-[76px] md:w-full py-1 px-1.5 md:py-1.5 md:px-2 rounded-lg font-black font-sans text-center md:text-left transition-all border-2 flex items-center justify-between cursor-pointer ${
                  isCurrent
                    ? "bg-sky-500 border-sky-600 border-b-4 border-b-sky-700 text-white shadow-xs translate-y-[-1px]"
                    : "bg-slate-50 hover:bg-slate-100 border-slate-200 border-b-4 border-b-slate-300 text-slate-855 active:translate-y-[1px] active:border-b-2"
                }`}
                id={`sound-btn-${soundItem.sound}`}
              >
                <span className="text-sm md:text-base font-mono font-black">/{displayPhoneme(soundItem.sound)}/</span>
                <span className={`hidden xl:inline-block text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${
                  isCurrent ? "bg-sky-400 text-white shadow-xs" : "bg-slate-200 text-slate-500"
                }`}>
                  {soundItem.exampleWords[0]}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* 2. Central Big Display Panel (5 cols) */}
        <div className="md:col-span-5 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSound.sound}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="bg-sky-50/10 border-4 border-b-12 border-sky-100 rounded-[24px] p-4 flex flex-col justify-center items-center h-[300px] relative overflow-hidden"
              id="sound-detail-card"
            >
              {/* Gold "Phoneme Sound" Badge */}
              <div className="absolute top-2.5 right-2.5 bg-amber-400 text-amber-950 text-[9px] uppercase font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm select-none border border-amber-500">
                <span>⭐ ÂM ĐƠN</span>
              </div>

              <div className="flex flex-col items-center text-center w-full mt-2">
                {/* Visual Letter Box */}
                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-b-6 border-sky-405 flex items-center justify-center shadow-md select-none">
                  <span className="text-3xl font-mono font-black text-sky-600">/{displayPhoneme(selectedSound.sound)}/</span>
                </div>
                <h3 className="text-lg font-black text-sky-950 mt-3.5 leading-tight">
                  Ngữ âm: /{displayPhoneme(selectedSound.sound)}/
                </h3>
                <p className="text-slate-400 text-[10px] mt-1 font-bold max-w-[210px] leading-tight">
                  Hãy nhấn nút loa phía dưới để bé nghe phát âm chuẩn nhé!
                </p>

                {/* Big Pronunciation Play Button */}
                <div className="w-full mt-4">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handlePlaySound(selectedSound.sound)}
                    className="w-full py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 font-black text-white text-xs shadow-md border-b-4 border-sky-700 hover:brightness-105 active:translate-y-[1px] active:border-b-2 active:shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    id="btn-play-phoneme"
                  >
                    <span className="text-sm animate-pulse">🔊</span>
                    <span>Nghe âm /{displayPhoneme(selectedSound.sound)}/</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3. Right Action Guide Column (4 cols) */}
        <div className="md:col-span-4 flex flex-col">
          <div className="bg-slate-50/50 border-2 border-slate-200/60 rounded-[24px] p-4 flex flex-col justify-between h-[300px] relative shadow-xs" id="action-guide-panel">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
              <span className="text-xs font-black text-slate-550 uppercase tracking-wide flex items-center gap-1">
                🤲 Hành động mô phỏng
              </span>
              <span className="text-[8px] font-black uppercase text-indigo-500 tracking-wider">
                Action Guide
              </span>
            </div>

            {/* Centered Hero Illustration Area (about 30% of card height) */}
            <div className="flex justify-center flex-grow items-center py-1">
              <div className="w-full">
                <PhonicsActionIllustrator sound={selectedSound.sound} />
              </div>
            </div>

            {/* Instruction stack */}
            <div className="space-y-1.5">
              {/* Vietnamese Instruction */}
              <div>
                <span className="inline-block px-1.5 py-0.5 rounded text-[8px] font-black bg-amber-105 text-amber-800 uppercase tracking-widest leading-none">
                  VN
                </span>
                <p className="text-[10px] sm:text-[11px] font-bold text-slate-805 leading-snug mt-0.5">
                  {selectedSound.actionVi}
                </p>
              </div>

              {/* English Instruction */}
              <div>
                <span className="inline-block px-1.5 py-0.5 rounded text-[8px] font-black bg-sky-105 text-sky-850 uppercase tracking-widest leading-none">
                  EN
                </span>
                <p className="text-[10px] font-semibold text-slate-500 leading-snug mt-0.5 italic">
                  {selectedSound.actionEn}
                </p>
              </div>
            </div>

            {/* Memory Tip Section inside a soft highlighted box at bottom */}
            <div className="mt-2.5 bg-indigo-50/60 p-2 rounded-xl border border-indigo-100/50 flex items-start gap-1.5 text-[9px] text-indigo-950 font-semibold leading-normal">
              <span className="text-xs shrink-0 select-none">💡</span>
              <p>
                <strong>Mẹo nhớ:</strong> Làm điệu bộ sinh động kích hoạt cơ miệng và trí nhớ siêu tốc nhé!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom blocks (Story description & Tap-to-listen Words grid) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-8 pt-6 border-t-4 border-slate-100">
        
        {/* Story description on Left-Center (8 cols) */}
        <div className="md:col-span-8 bg-amber-50/30 border-4 border-b-12 border-amber-100 rounded-[2.5rem] p-6 flex flex-col justify-center">
          <h4 className="text-xs font-black text-amber-800 uppercase tracking-wider flex items-center gap-2 mb-3.5">
            <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-amber-250 bg-white shadow-xs">
              <img 
                src="/src/assets/images/children_books_3d_1781603293428.jpg" 
                alt="3D books"
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer" 
              />
            </div>
            <span className="text-sm">BỐI CẢNH CÂU CHUYỆN</span>
          </h4>
          <p className="text-slate-800 text-sm md:text-base leading-relaxed font-extrabold">
            {selectedSound.storyVi || "Hãy kể câu chuyện ngắn cho bé tưởng tượng và rèn luyện khẩu âm vui vẻ nhé!"}
          </p>
        </div>

        {/* Tap-to-listen words on Right (4 cols) */}
        <div className="md:col-span-4 flex flex-col justify-center">
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
            TỪ VÍ DỤ (BÉ NHẤP ĐỂ NGHE)
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {selectedSound.exampleWords.map((word, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePlayWord(word)}
                className="px-4 py-3 bg-white hover:bg-sky-50/30 text-slate-800 font-mono font-black rounded-2xl border-2 border-b-6 border-slate-200/90 hover:border-slate-350 text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer hover:scale-105 active:scale-95 active:translate-y-[2px] active:border-b-2"
                id={`example-word-btn-${word}`}
              >
                <span className="text-base">🔊</span>
                <span>{word.toUpperCase()}</span>
              </motion.button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { speakPhoneme, speakWord, speakEncouragement } from "../utils/speech";
import { SoundGroup } from "../types";
import { analyzeWord } from "../utils/wordAnalyzer";

interface BlendingBoardProps {
  group: SoundGroup;
  onWordMastered: (word: string) => void;
}

export default function BlendingBoard({ group, onWordMastered }: BlendingBoardProps) {
  const [selectedWordIndex, setSelectedWordIndex] = useState<number>(0);
  const [activeSegmentIndex, setActiveSegmentIndex] = useState<number | null>(null);
  const [isAutoBlending, setIsAutoBlending] = useState<boolean>(false);
  const [blendCompleted, setBlendCompleted] = useState<boolean>(false);

  // Reset states when group or word changes
  useEffect(() => {
    setActiveSegmentIndex(null);
    setIsAutoBlending(false);
    setBlendCompleted(false);
  }, [group, selectedWordIndex]);

  const starterWords = group.starterWords || [];
  const currentWordObj = starterWords[selectedWordIndex] || { word: "sat", segments: ["s", "a", "t"] };

  // Separate visual spelling layers from pronunciation layers using word analyzer
  const { display: displaySegments, audio: audioPhonemes } = analyzeWord(
    currentWordObj.word,
    currentWordObj.segments
  );

  const handleSegmentClick = async (visualSeg: string, idx: number) => {
    if (isAutoBlending) return;
    setActiveSegmentIndex(idx);
    const audioPhoneme = audioPhonemes[idx];
    if (audioPhoneme) {
      await speakPhoneme(audioPhoneme);
    }
    setTimeout(() => {
      setActiveSegmentIndex(null);
    }, 500);
  };

  const startAutoBlend = async () => {
    if (isAutoBlending) return;
    setIsAutoBlending(true);
    setBlendCompleted(false);

    // Sequentially voice out each phoneme segment
    for (let i = 0; i < displaySegments.length; i++) {
      setActiveSegmentIndex(i);
      const audioPhoneme = audioPhonemes[i];
      if (audioPhoneme) {
        await speakPhoneme(audioPhoneme);
        await new Promise((resolve) => setTimeout(resolve, 550));
      } else {
        // Silent block (e.g. silent 'e' in Magic E). Still highlight visually so child notes its presence!
        await new Promise((resolve) => setTimeout(resolve, 350));
      }
    }

    setActiveSegmentIndex(null);
    await new Promise((resolve) => setTimeout(resolve, 150));

    // Speak the complete blended word clearly
    await speakWord(currentWordObj.word, 0.78);
    setBlendCompleted(true);
    setIsAutoBlending(false);

    // Congratulate and trigger master Callback
    speakEncouragement("Bé ghép vần tuyệt vời!", "Splendid reading!");
    onWordMastered(currentWordObj.word);
  };

  return (
    <div className="w-full bg-white rounded-[2.5rem] p-6 md:p-8 border-4 border-b-12 border-amber-150 shadow-xl" id="blending-board-root">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-4 border-amber-100 pb-5 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl animate-bounce">🧩</span>
          <div>
            <h2 className="text-2xl font-black font-sans text-amber-950">
              Bảng Ghép Vần (Blending Board)
            </h2>
            <p className="text-xs text-amber-600 font-extrabold uppercase tracking-wider">
              Nhấn các âm đơn lẻ rồi hòa quyện thành từ hoàn chỉnh nào!
            </p>
          </div>
        </div>

        <div className="bg-amber-100 text-amber-900 border border-amber-300 font-sans font-black text-xs px-4 py-2 rounded-full uppercase tracking-wider">
          {group.name}
        </div>
      </div>

      {/* Main Workspace Layout (Left: word select list, Right: Interactive Blending Canvas) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* WORD LIST COLUMN */}
        <div className="md:col-span-4 flex flex-col gap-3">
          <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">
            Từ vần trong Nhóm:
          </span>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-1">
            {starterWords.map((itemObj, idx) => {
              const isSelected = selectedWordIndex === idx;
              return (
                <button
                  key={itemObj.word}
                  onClick={() => setSelectedWordIndex(idx)}
                  className={`px-4 py-3 rounded-2xl font-mono text-base font-black text-left uppercase border-2 transition-all cursor-pointer ${
                    isSelected
                      ? "bg-amber-500 border-amber-650 text-white shadow-md font-extrabold translate-x-1"
                      : "bg-amber-50/20 border-slate-200 hover:bg-amber-50/50 text-slate-700"
                  }`}
                >
                  <span className="mr-1.5 text-sm">➡️</span>
                  <span>{itemObj.word}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ACTIVE BLENDING PANEL */}
        <div className="md:col-span-8 flex flex-col justify-between p-6 rounded-3xl border-4 border-b-12 border-amber-200 bg-amber-50/30 min-h-[320px]">
          <div className="text-center mb-4">
            <span className="text-[10px] bg-white px-3 py-1 rounded-full border border-amber-200 uppercase tracking-widest font-black text-amber-700 shadow-sm">
              Màn Hình Ghép Vần
            </span>
            <p className="text-xs text-slate-500 font-bold mt-2">
              Bé nhấp vào từng bóng chữ tròn để phát âm, hoặc nhấp nút để tự học mượt mà nhé!
            </p>
          </div>

          {/* Core Interactive Sound Segments Area */}
          <div className="flex justify-center items-center gap-6 my-6 flex-wrap">
            {displaySegments.map((seg, idx) => {
              const isActive = activeSegmentIndex === idx;
              return (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <motion.button
                    whileHover={{ scale: isAutoBlending ? 1 : 1.12 }}
                    whileTap={{ scale: isAutoBlending ? 1 : 0.9 }}
                    onClick={() => handleSegmentClick(seg, idx)}
                    disabled={isAutoBlending}
                    className={`w-20 h-20 rounded-full flex items-center justify-center font-mono text-3xl font-black uppercase shadow-md border-4 border-b-8 transition-all cursor-pointer ${
                      isActive
                        ? "bg-amber-500 text-white border-amber-650 scale-110 shadow-lg -translate-y-2"
                        : "bg-white text-slate-800 border-slate-250 hover:border-amber-400"
                    }`}
                  >
                    {seg}
                  </motion.button>
                  {/* Indicator little dot */}
                  <div
                    className={`w-3.5 h-3.5 rounded-full border transition-all ${
                      isActive ? "bg-amber-500 scale-120" : "bg-slate-200"
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Control Actions */}
          <div className="flex flex-col items-center gap-4 mt-2">
            <button
              onClick={startAutoBlend}
              disabled={isAutoBlending}
              className="px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 border-4 border-b-8 border-amber-750 font-black text-white text-base shadow-md flex items-center gap-2.5 cursor-pointer disabled:opacity-50 active:translate-y-1 active:border-b-4 hover:scale-103 transition-all"
            >
              <span>🔊</span>
              <span>
                {isAutoBlending ? "Đang đánh vần từng chữ..." : "BÉ GHÉP VẦN TỰ ĐỘNG 🐝"}
              </span>
            </button>

            {/* Visual celebration effects when completed */}
            <AnimatePresence>
              {blendCompleted && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="bg-emerald-500 text-white font-black text-xs px-4 py-2 rounded-2xl border-2 border-emerald-650 flex items-center gap-1.5 shadow-sm"
                >
                  <span>⭐ ghép vần thành công! Bé siêu thế! ⭐</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

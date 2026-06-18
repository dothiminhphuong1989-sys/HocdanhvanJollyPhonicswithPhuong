import React from "react";
import { SoundGroup, AppProgress } from "../types";
import { jollyPhonicsGroups } from "../data/phonicsData";
import { motion } from "motion/react";
import { displayPhoneme } from "../utils/speech";

interface GroupSelectorProps {
  progress: AppProgress;
  onSelectGroup: (groupNumber: number) => void;
  onToggleGroupUnlock: (groupNumber: number) => void;
  selectedGroupNumber: number;
}

export default function GroupSelector({
  progress,
  onSelectGroup,
  onToggleGroupUnlock,
  selectedGroupNumber
}: GroupSelectorProps) {

  // Dynamically compute the progress percentage for each group based on mastered words
  const calculateGroupProgress = (group: SoundGroup): number => {
    if (!group.starterWords || group.starterWords.length === 0) return 0;
    const groupWords = group.starterWords.map(w => w.word);
    const masteredInGroup = progress.masteredWords.filter(word => groupWords.includes(word)).length;
    return Math.min(100, Math.round((masteredInGroup / group.starterWords.length) * 100));
  };

  // Get color themes for different group bands
  const getGroupTheme = (num: number, isSelected: boolean) => {
    const themes: Record<number, { border: string; bg: string; text: string; numBg: string; progressBg: string; shadow: string }> = {
      1: { border: "border-amber-300 border-b-amber-500", bg: "bg-amber-50/20", text: "text-amber-850", numBg: "bg-amber-500", progressBg: "bg-amber-400", shadow: "shadow-amber-100" },
      2: { border: "border-sky-305 border-b-sky-500", bg: "bg-sky-50/20", text: "text-sky-850", numBg: "bg-sky-500", progressBg: "bg-sky-400", shadow: "shadow-sky-100" },
      3: { border: "border-purple-300 border-b-purple-500", bg: "bg-purple-50/20", text: "text-purple-850", numBg: "bg-purple-550", progressBg: "bg-purple-400", shadow: "shadow-purple-100" },
      4: { border: "border-emerald-300 border-b-emerald-500", bg: "bg-emerald-50/20", text: "text-emerald-850", numBg: "bg-emerald-500", progressBg: "bg-emerald-400", shadow: "shadow-emerald-100" },
      5: { border: "border-rose-300 border-b-rose-500", bg: "bg-rose-50/20", text: "text-rose-850", numBg: "bg-rose-500", progressBg: "bg-rose-450", shadow: "shadow-rose-100" },
      6: { border: "border-blue-300 border-b-blue-500", bg: "bg-blue-50/20", text: "text-blue-850", numBg: "bg-blue-600", progressBg: "bg-blue-450", shadow: "shadow-blue-100" },
      7: { border: "border-teal-300 border-b-teal-500", bg: "bg-teal-50/20", text: "text-teal-850", numBg: "bg-teal-500", progressBg: "bg-teal-400", shadow: "shadow-teal-100" }
    };
    
    // Default fallback for alternative spelling groups (group indices 8-17)
    const fallback = { border: "border-indigo-300 border-b-indigo-500", bg: "bg-indigo-50/20", text: "text-indigo-850", numBg: "bg-indigo-650", progressBg: "bg-indigo-500", shadow: "shadow-indigo-100" };
    
    const active = themes[num] || fallback;
    return {
      ...active,
      border: isSelected ? "border-amber-400 border-b-amber-600" : active.border
    };
  };

  const totalSoundsCount = jollyPhonicsGroups.reduce((acc, g) => acc + g.sounds.length, 0);

  return (
    <div className="w-full bg-white rounded-[2.5rem] p-6 border-4 border-b-12 border-slate-200/90 shadow-xl" id="group-selector-panel">
      
      {/* Header Info */}
      <div className="flex items-start justify-between mb-6 gap-3 pb-4 border-b-4 border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-3xl animate-bounce">📚</span>
            <h2 className="text-2xl font-black font-sans text-sky-950">
              7 Nhóm Âm Jolly Phonics
            </h2>
          </div>
          <p className="text-sm text-slate-400 mt-2 font-bold leading-relaxed">
            Chọn nhóm âm hoặc âm phụ dưới đây để khơi dậy phản xạ ghép vần, học hành thật vui tươi nhé bé!
          </p>
        </div>
        <div className="bg-amber-100 text-amber-900 text-xs font-black px-3.5 py-2 rounded-full flex items-center gap-1.5 select-none shrink-0 border-2 border-amber-300 shadow-sm">
          <span>{totalSoundsCount} ÂM</span>
        </div>
      </div>

      {/* Groups Scroll Container */}
      <div className="grid grid-cols-1 gap-4 max-h-[580px] overflow-y-auto pr-1.5 custom-scrollbar" id="groups-scroll-list">
        {jollyPhonicsGroups.map((group) => {
          const isUnlocked = progress.unlockedGroups.includes(group.number);
          const isSelected = selectedGroupNumber === group.number;
          const percentage = calculateGroupProgress(group);
          const theme = getGroupTheme(group.number, isSelected);
          
          return (
            <motion.div
              key={group.number}
              whileHover={{ scale: isUnlocked ? 1.02 : 1 }}
              whileTap={{ scale: isUnlocked ? 0.98 : 1 }}
              className={`p-5 rounded-[2rem] border-4 border-b-10 transition-all relative overflow-hidden flex flex-col justify-between gap-4 cursor-pointer ${
                isSelected
                  ? "bg-amber-50/20 " + theme.border + " " + theme.shadow + " shadow-md"
                  : isUnlocked
                  ? "bg-slate-50 border-slate-200 border-b-slate-350 hover:bg-slate-1/10"
                  : "bg-slate-100/50 border-slate-200/50 border-b-slate-300 opacity-60 cursor-not-allowed"
              }`}
              onClick={() => {
                if (isUnlocked) {
                  onSelectGroup(group.number);
                }
              }}
              id={`group-card-${group.number}`}
            >
              {/* Card Top Block */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-3.5">
                  {/* Round number tag */}
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-lg text-white shadow-md border-2 border-black/5 shrink-0 select-none ${
                    isUnlocked ? theme.numBg : "bg-slate-400 text-slate-105"
                  }`}>
                    {group.number >= 8 ? "★" : group.number}
                  </div>

                  <div>
                    <h3 className="font-black text-slate-900 text-base md:text-lg flex items-center gap-1.5 flex-wrap leading-tight">
                      <span>{group.name}</span>
                      {isUnlocked && (
                        <span className="text-xl animate-pulse">✅</span>
                      )}
                    </h3>
                  </div>
                </div>

                {/* Unlocked toggle button for parents */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleGroupUnlock(group.number);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase flex items-center gap-1.5 transition-all cursor-pointer border-2 border-b-4 ${
                    isUnlocked
                      ? "bg-emerald-100 hover:bg-emerald-150 text-emerald-800 border-emerald-300 border-b-emerald-400 active:translate-y-[2px] active:border-b-2"
                      : "bg-slate-200 hover:bg-slate-250 text-slate-700 border-slate-300 border-b-slate-400 active:translate-y-[2px] active:border-b-2"
                  }`}
                  id={`btn-unlk-toggle-${group.number}`}
                >
                  {isUnlocked ? (
                    <>
                      <span>🔓 Mở</span>
                    </>
                  ) : (
                    <>
                      <span>🔒 Khóa</span>
                    </>
                  )}
                </button>
              </div>

              {/* Sound list previews horizontal bar */}
              <div className="flex flex-wrap gap-1.5">
                {group.sounds.map((soundItem, idx) => (
                  <span
                    key={idx}
                    className={`text-xs px-2.5 py-1 rounded-xl border-2 font-mono font-black ${
                      isSelected
                        ? "bg-amber-105 text-amber-900 border-amber-300"
                        : isUnlocked
                        ? "bg-white text-sky-850 border-slate-200"
                        : "bg-slate-200/50 text-slate-500 border-slate-300"
                    }`}
                  >
                    /{displayPhoneme(soundItem.sound)}/
                  </span>
                ))}
              </div>

              {/* Progress bar and metrics */}
              {isUnlocked && (
                <div className="mt-1 flex items-center justify-between gap-3 text-xs font-black text-slate-500">
                  <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden border-2 border-slate-205/70 relative">
                    <div 
                      className={`h-full transition-all duration-350 rounded-full ${theme.progressBg}`} 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="shrink-0 font-black text-slate-800 font-mono leading-none">{percentage}%</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Decorative cute bee sitting on flowers at bottom of sidebar */}
      <div className="mt-6 pt-5 border-t-4 border-slate-100 flex items-center justify-center gap-5 relative overflow-hidden h-32" id="sidebar-bee-flower-deco">
        {/* Lovely green grass and cute flowers illustration */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-emerald-500/10 rounded-t-[2.5rem]" />
        
        <div className="absolute inset-x-0 bottom-1 flex justify-between px-10 select-none pointer-events-none text-3xl animate-pulse">
          <span>🌻</span>
          <span>🌸</span>
        </div>

        {/* Animated chubby bee sitting in center */}
        <motion.div 
          animate={{ y: [-6, 4, -6], rotate: [-2, 2, -2] }} 
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="relative z-10 flex flex-col items-center gap-1.5 select-none"
        >
          <div className="flex items-center justify-center text-5xl leading-none">🐝</div>
          <span className="text-xs bg-white border-2 border-slate-200 text-slate-800 font-black px-4 py-1 rounded-full shadow-md">
            Học vui - Nhớ lâu! 🌟
          </span>
        </motion.div>
      </div>

    </div>
  );
}

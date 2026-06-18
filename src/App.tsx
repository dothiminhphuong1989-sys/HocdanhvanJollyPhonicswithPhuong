import React, { useState, useEffect } from "react";
import { AppProgress } from "./types";
import { jollyPhonicsGroups } from "./data/phonicsData";
import GroupSelector from "./components/GroupSelector";
import SoundBoard from "./components/SoundBoard";
import BlendingBoard from "./components/BlendingBoard";
import SegmentingGame from "./components/SegmentingGame";
import ReaderAI from "./components/ReaderAI";
import TrickyWords from "./components/TrickyWords";
import Certificate from "./components/Certificate";
import NavigationSidebar from "./components/NavigationSidebar";
import { speechConfig, speakWord, speakPhoneme, speakEncouragement } from "./utils/speech";
import { motion, AnimatePresence } from "motion/react";

const PROGRESS_STORAGE_KEY = "jolly_phonics_blending_progress_v1";

const defaultProgress: AppProgress = {
  unlockedGroups: [1, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], // Group 1 and all Alternative groups (8-17) unlocked by default
  starsCount: 12, // Starting count matching the screenshot
  masteredWords: []
};

export default function App() {
  const [progress, setProgress] = useState<AppProgress>(defaultProgress);
  const [selectedGroupNumber, setSelectedGroupNumber] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"sounds" | "blending" | "games" | "ai-reader" | "tricky" | "certificate" | "advanced">("sounds");
  const [showProgressResetConfirm, setShowProgressResetConfirm] = useState<boolean>(false);

  // Real-time speech pitch and speed controls (to solve deep/subdued voices)
  const [childPitch, setChildPitch] = useState<number>(1.30);
  const [childRate, setChildRate] = useState<number>(0.76);

  // Collapsible panel toggles
  const [isStatsCollapsed, setIsStatsCollapsed] = useState<boolean>(true);
  const [isVoiceCollapsed, setIsVoiceCollapsed] = useState<boolean>(true);
  const [isVideoCollapsed, setIsVideoCollapsed] = useState<boolean>(false);
  const [videoStartTime, setVideoStartTime] = useState<number>(16);
  const [videoPlayerKey, setVideoPlayerKey] = useState<number>(0);

  // Video Reading Practice completed sentences state and helpers
  const [completedSentences, setCompletedSentences] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem("jolly_phonics_completed_sentences");
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const handleToggleSentenceRead = (groupNum: number, index: number) => {
    const key = `${groupNum}-${index}`;
    const updated = {
      ...completedSentences,
      [key]: !completedSentences[key]
    };
    setCompletedSentences(updated);
    try {
      localStorage.setItem("jolly_phonics_completed_sentences", JSON.stringify(updated));
    } catch {}

    // Reward with a star when completing
    if (!completedSentences[key]) {
      handleEarnStar();
    }
  };

  const isSentenceRead = (groupNum: number, index: number) => {
    return !!completedSentences[`${groupNum}-${index}`];
  };

  const getVideoReadingSentences = (groupNum: number): { en: string; vi: string }[] => {
    switch (groupNum) {
      case 1:
        return [
          { en: "A pin is in a tin.", vi: "Một chiếc ghim ở trong hộp thiếc." },
          { en: "A sad ant sat.", vi: "Một chú kiến buồn bã đang ngồi đó." },
          { en: "Pat a pan tap.", vi: "Vỗ nhẹ cái ghim chảo." }
        ];
      case 2:
        return [
          { en: "A red hen in a hat.", vi: "Một nàng gà mái đỏ đội mũ." },
          { en: "Dad runs to the dog.", vi: "Bố đang chạy tới chú cún cưng." },
          { en: "Kick a tin can.", vi: "Đá một cái lon bằng thiếc." }
        ];
      case 3:
        return [
          { en: "A big fat bug on a dog.", vi: "Một con bọ to béo bò trên chú cún." },
          { en: "Run in the green mud.", vi: "Chạy nhảy trong vũng bùn xanh." },
          { en: "A hot cup on a log.", vi: "Một chiếc tách nóng trên khúc gỗ." }
        ];
      case 4:
        return [
          { en: "The bee is on a leaf.", vi: "Chú ong mật đang đậu trên chiếc lá." },
          { en: "A goat in a rain coat.", vi: "Một chú dê mặc chiếc áo đi mưa." },
          { en: "See the bright light.", vi: "Nhìn thấy ánh sáng rực rỡ tươi sáng." }
        ];
      case 5:
        return [
          { en: "Look at the cool moon.", vi: "Hãy nhìn vào vầng trăng mát dịu đằng kia." },
          { en: "The wind blows strong.", vi: "Cơn gió thổi qua thật là mạnh mẽ." },
          { en: "A zoom on a long zip.", vi: "Lướt kéo nhanh chiếc khóa kéo dài." }
        ];
      case 6:
        return [
          { en: "A fish in a shell.", vi: "Một chú cá nhỏ nằm trong vỏ sò." },
          { en: "A shiny red fox.", vi: "Một chú cáo đỏ lấp lánh tinh nghịch." },
          { en: "Yogurt in a cup.", vi: "Hộp sữa chua thơm ngon trong chiếc cốc." }
        ];
      case 7:
      default:
        return [
          { en: "A quick duck quacks.", vi: "Một chú vịt nhanh nhẹn kêu quác quác." },
          { en: "Loud sound of a toy.", vi: "Tiếng vang lớn phát ra từ món đồ chơi." },
          { en: "My arm in the park.", vi: "Cánh tay của con vẫy trong công viên." }
        ];
    }
  };

  // Sync state to our global mutable speechConfig
  useEffect(() => {
    speechConfig.pitch = childPitch;
    speechConfig.rate = childRate;
  }, [childPitch, childRate]);

  // Load progress from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && Array.isArray(parsed.unlockedGroups)) {
          // Ensure all new alternative spelling groups 8-17 are unlocked
          const fallbackGroups = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
          const hasAllAlts = fallbackGroups.every((n: number) => parsed.unlockedGroups.includes(n));
          const safeUnlocked = hasAllAlts 
            ? parsed.unlockedGroups 
            : Array.from(new Set([...parsed.unlockedGroups, ...fallbackGroups])).sort((a, b) => a - b);
          
          setProgress({ 
            ...parsed, 
            unlockedGroups: safeUnlocked,
            // Keep default stars if loaded user has 0 stars
            starsCount: parsed.starsCount || 12 
          });
          
          // Set selection to highest unlocked main group or 1
          const highestUnlocked = Math.max(...safeUnlocked.filter((n: number) => n <= 7), 1);
          setSelectedGroupNumber(highestUnlocked);
        }
      }
    } catch (e) {
      console.error("Failed to load progress:", e);
    }
  }, []);

  // Save progress helper
  const saveProgress = (newProgress: AppProgress) => {
    setProgress(newProgress);
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(newProgress));
    } catch (e) {
      console.error("Failed to save progress:", e);
    }
  };

  // Toggle group lock state (parents utility)
  const handleToggleGroupUnlock = (groupNumber: number) => {
    if (groupNumber === 1) return; // Cannot lock Group 1

    let newUnlocked = [...progress.unlockedGroups];
    if (newUnlocked.includes(groupNumber)) {
      newUnlocked = newUnlocked.filter(n => n !== groupNumber);
      if (selectedGroupNumber === groupNumber) {
        setSelectedGroupNumber(groupNumber - 1 || 1);
      }
    } else {
      newUnlocked.push(groupNumber);
      setSelectedGroupNumber(groupNumber);
    }

    saveProgress({
      ...progress,
      unlockedGroups: Array.from(new Set(newUnlocked)).sort((a, b) => a - b)
    });
  };

  const handleWordMastered = (word: string) => {
    if (!progress.masteredWords.includes(word)) {
      const newMastered = [...progress.masteredWords, word];
      saveProgress({
        ...progress,
        masteredWords: newMastered,
        starsCount: progress.starsCount + 1
      });
    }
  };

  const handleEarnStar = () => {
    saveProgress({
      ...progress,
      starsCount: progress.starsCount + 1
    });
  };

  const handleResetProgress = () => {
    saveProgress(defaultProgress);
    setSelectedGroupNumber(1);
    setActiveTab("sounds");
    setShowProgressResetConfirm(false);
  };

  // Extract unlocked letter sounds dynamically
  const getUnlockedLetters = (): string[] => {
    const lettersSet = new Set<string>();
    jollyPhonicsGroups.forEach(group => {
      if (progress.unlockedGroups.includes(group.number)) {
        group.sounds.forEach(s => lettersSet.add(s.sound));
      }
    });
    return Array.from(lettersSet);
  };

  const currentGroup = jollyPhonicsGroups.find(g => g.number === selectedGroupNumber) || jollyPhonicsGroups[0];
  const unlockedLetters = getUnlockedLetters();

  const handleSidebarWordBtnClick = async (word: string) => {
    await speakWord(word, 0.77);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans p-4 md:p-6 lg:p-8 flex flex-col justify-between" id="app-root-container">
      <div className="max-w-7xl mx-auto w-full flex-grow">
        
        {/* Modern Header panel - Bento Style exactly like the screen */}
        <header className="mb-6 bg-white rounded-[2.2rem] p-5 md:p-6 text-slate-800 shadow-xs border border-slate-100 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6" id="app-hero-header">
          {/* Subtle graphic background overlays */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-sky-100/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-24 w-28 h-28 bg-amber-100/10 rounded-full blur-xl pointer-events-none" />

          {/* Left: Mascot & App branding */}
          <div className="flex items-center gap-4 relative">
            {/* Cute round mascot (yellow) styled like the graduation block */}
            <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center overflow-hidden shadow-sm text-center relative font-black cursor-default shrink-0">
              <img
                src="/src/assets/images/bee_mascot_3d_1781603230183.jpg"
                alt="3D Bee Mascot"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-sky-400 rounded-full border border-white animate-ping" />
            </div>
            
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-tight flex items-center gap-1.5">
                  Học Jolly Phonics <span className="text-sky-600 font-extrabold">cùng Minh Phương</span>
                  <span className="text-[10px] bg-sky-500 text-white font-bold px-3 py-1 rounded-full uppercase tracking-wider ml-1">Lớp học thông minh</span>
                </h1>
              </div>
              <p className="text-slate-400 text-xs mt-1 max-w-xl font-bold leading-normal">
                Ứng dụng luyện phát âm, ghép vần Blending chuẩn Anh Mỹ theo 42 âm Jolly Phonics tích hợp Trí tuệ nhân tạo thông minh.
              </p>
            </div>
          </div>

          {/* Center: Real-time user stats counters exactly mimicking the screenshot */}
          <div className="flex flex-wrap items-center gap-4 shrink-0 justify-start sm:justify-center">
            {/* Stars count exactly matching picture style */}
            <div className="bg-amber-50 text-amber-900 px-5 py-2.5 rounded-2xl border-2 border-amber-200 flex items-center gap-2 shadow-xs font-black select-none">
              <span className="text-xs font-black uppercase tracking-wide">Bé Tích Lũy:</span>
              <img
                src="/src/assets/images/gold_trophy_3d_1781603250251.jpg"
                alt="3D Gold Trophy"
                className="w-6 h-6 object-cover rounded-lg"
                referrerPolicy="no-referrer"
              />
              <span className="text-base font-mono font-black text-amber-500 leading-none">
                {progress.starsCount}
              </span>
            </div>

            {/* Streak days */}
            <div className="bg-orange-50 text-orange-900 px-5 py-2.5 rounded-2xl border-2 border-orange-255/10 flex items-center justify-center gap-2 shadow-xs select-none">
              <span className="text-base font-mono font-black leading-none flex items-center gap-1">
                🔥 5
              </span>
              <span className="text-[10px] text-orange-700 font-black uppercase tracking-wide">Ngày</span>
            </div>

            {/* Support hotline strictly styled like image */}
            <div className="bg-emerald-500/10 text-emerald-800 px-5 py-2.5 rounded-2xl border border-emerald-200/60 flex items-center gap-2.5 shadow-xs font-bold">
              <span className="text-xl">📞</span>
              <div>
                <span className="block text-[8px] text-emerald-600 font-black uppercase tracking-widest leading-none mb-0.5">Hotline Hỗ Trợ</span>
                <span className="text-xs font-black font-mono leading-none">0977 348 789</span>
              </div>
            </div>
          </div>
        </header>

        {/* Introduction step-by-step Bento guide row */}
        <section className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-5" id="intro-guide-section">
          {/* Bento Block 1: Red */}
          <div className="bg-gradient-to-br from-red-500 to-rose-600 text-white p-5 rounded-[2rem] shadow-xs relative overflow-hidden flex gap-4 pr-10 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 flex items-center justify-center bg-white/20">
              <img
                src="/src/assets/images/toy_blocks_3d_1781603264818.jpg"
                alt="3D Toy Blocks"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="relative z-10">
              <h4 className="font-extrabold text-sm md:text-base text-white">Học Âm Đơn Lẻ</h4>
              <p className="text-[11px] text-white/90 mt-1 lines-clamp-2 font-bold leading-relaxed">Con bắt đầu ghi nhớ cách phát âm của 42 âm Jolly Phonics và nắm vững điệu bộ hành động thú vị để dễ nhớ lâu.</p>
            </div>
            {/* Faint watermark character on background */}
            <span className="absolute bottom-[-10px] right-[10px] text-7xl font-sans font-black text-white/10 select-none pointer-events-none">Aa</span>
          </div>

          {/* Bento Block 2: Amber */}
          <div className="bg-gradient-to-br from-amber-450 to-orange-500 text-white p-5 rounded-[2rem] shadow-xs relative overflow-hidden flex gap-4 pr-10 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 flex items-center justify-center bg-white/20">
              <img
                src="/src/assets/images/bee_mascot_3d_1781603230183.jpg"
                alt="3D Bee"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="relative z-10">
              <h4 className="font-extrabold text-sm md:text-base text-white">Tập Ghép Vần</h4>
              <p className="text-[11px] text-white/90 mt-1 lines-clamp-2 font-bold leading-relaxed">Lướt chú ong mật từ trái sang phải để ghép các âm lẻ lại với nhau thành từ hoàn chỉnh và sướng tai!</p>
            </div>
            {/* Faint watermark character on background */}
            <span className="absolute bottom-[-10px] right-[10px] text-7xl font-mono font-black text-white/10 select-none pointer-events-none">Cat</span>
          </div>

          {/* Bento Block 3: Indigo */}
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 text-white p-5 rounded-[2rem] shadow-xs relative overflow-hidden flex gap-4 pr-10 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 flex items-center justify-center bg-white/20">
              <img
                src="/src/assets/images/friendly_robot_3d_1781603279123.jpg"
                alt="3D Robot"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="relative z-10">
              <h4 className="font-extrabold text-sm md:text-base text-white">Luyện Đọc Câu Ngắn AI</h4>
              <p className="text-[11px] text-white/90 mt-1 lines-clamp-2 font-bold leading-relaxed">Sử dụng sức mạnh của Gemini để tự động tạo ra các câu ngắn luyện đọc, cam kết CHỈ chứa các âm con đã học.</p>
            </div>
            {/* Faint watermark character on background */}
            <span className="absolute bottom-[-10px] right-[14px] text-6xl font-mono text-white/10 select-none pointer-events-none">★</span>
          </div>
        </section>

        {/* Restore Two-Column Layout (Left sidebar 4 grid cols, Right training workspace 8 grid cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="interactive-split-grid">
          
          {/* LEFT COLUMN: Sidebar with collapsible panels for optimal neatness */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            {/* Unified Navigation Sidebar containing dropdown/accordion selector, alternative sounds, tricky words, rules, and certificate */}
            <NavigationSidebar
              progress={progress}
              selectedGroupNumber={selectedGroupNumber}
              activeTab={activeTab}
              onSelectGroup={(num) => {
                setSelectedGroupNumber(num);
              }}
              onSelectTab={(tab) => {
                setActiveTab(tab);
              }}
              onToggleGroupUnlock={handleToggleGroupUnlock}
            />

            {/* 3. Bộ đếm sao / Thông tin bé rèn luyện thành công - Collapsible Widget */}
            <div className="bg-white rounded-[2.2rem] p-5 border border-slate-100 shadow-xs text-slate-705">
              <button 
                onClick={() => setIsStatsCollapsed(!isStatsCollapsed)}
                className="w-full flex items-center justify-between text-left font-black text-slate-800 focus:outline-none"
              >
                <span className="text-xs font-black text-slate-450 uppercase tracking-widest flex items-center gap-2">
                  <span>⭐️ THÔNG TIN BÉ LUYỆN TẬP</span>
                </span>
                <span className="text-base text-slate-400 font-mono">
                  {isStatsCollapsed ? "▼ Hiện" : "▲ Ẩn"}
                </span>
              </button>

              <AnimatePresence>
                {!isStatsCollapsed && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mt-3 pt-3 border-t border-slate-100"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold text-slate-400">Danh sách từ đã thuộc</span>
                      {progress.masteredWords.length > 0 && (
                        <button
                          onClick={() => setShowProgressResetConfirm(true)}
                          className="text-[10px] text-red-500 font-black hover:underline cursor-pointer flex items-center gap-0.5"
                          id="btn-trigger-reset-progress"
                        >
                          <span>🔄 Reset</span>
                        </button>
                      )}
                    </div>

                    {progress.masteredWords.length === 0 ? (
                      <p className="text-[11px] text-slate-400 font-bold leading-relaxed">Con yêu đang rèn luyện chăm ngoan để tích lũy những ngôi sao đầu tiên đấy, phụ huynh cùng sát cánh nhé!</p>
                    ) : (
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-600 mb-2 font-bold">
                          <span>Từ đã thành thạo:</span>
                          <span className="font-black text-emerald-600 font-mono">{progress.masteredWords.length} từ</span>
                        </div>
                        <div className="flex flex-wrap gap-1 max-h-[140px] overflow-y-auto pr-1">
                          {progress.masteredWords.map((word, i) => (
                            <span key={i} className="text-[10px] bg-slate-105 text-slate-700 font-mono font-black px-2 py-0.5 rounded-md border border-slate-200">
                              {word.toUpperCase()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {showProgressResetConfirm && (
                      <div className="mt-3 bg-red-50 border border-red-100 rounded-2xl p-3 text-xs text-red-800" id="reset-confirm-box">
                        <p className="font-extrabold mb-2 leading-relaxed">Phụ huynh chắc chắn xóa sạch thành tích của con chứ?</p>
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setShowProgressResetConfirm(false)}
                            className="px-2 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded font-black cursor-pointer text-slate-700"
                          >
                            Bỏ qua
                          </button>
                          <button
                            onClick={handleResetProgress}
                            className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded font-black text-white cursor-pointer"
                          >
                            Đồng ý
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 4. CHỈNH GIỌNG ĐỌC CHO BÉ - Collapsible Widget */}
            <div className="bg-white rounded-[2.2rem] p-5 border border-slate-100 shadow-xs text-slate-705">
              <button 
                onClick={() => setIsVoiceCollapsed(!isVoiceCollapsed)}
                className="w-full flex items-center justify-between text-left font-black text-slate-800 focus:outline-none"
              >
                <span className="text-xs font-black text-slate-450 uppercase tracking-widest flex items-center gap-2">
                  <span>📢 CHỈNH GIỌNG ĐỌC CHO BÉ</span>
                </span>
                <span className="text-base text-slate-400 font-mono">
                  {isVoiceCollapsed ? "▼ Hiện" : "▲ Ẩn"}
                </span>
              </button>

              <AnimatePresence>
                {!isVoiceCollapsed && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mt-3 pt-3 border-t border-slate-100"
                  >
                    <div className="space-y-3.5">
                      {/* Pitch controller */}
                      <div>
                        <div className="flex justify-between text-[10px] font-black text-slate-700 leading-normal">
                          <span>Độ cao giọng (Pitch):</span>
                          <span className="text-sky-600 font-bold">
                            {childPitch >= 1.5 ? "👧 Thanh vút" : childPitch >= 1.3 ? "👱‍♀️ Ngọt ngào" : "👩 Trầm ấm"}
                          </span>
                        </div>
                        <input
                          type="range"
                          min="1.0"
                          max="1.7"
                          step="0.05"
                          value={childPitch}
                          onChange={(e) => setChildPitch(parseFloat(e.target.value))}
                          className="w-full h-1 bg-slate-105 rounded-lg appearance-none cursor-pointer accent-indigo-500 mt-1"
                        />
                      </div>

                      {/* Speed controller */}
                      <div>
                        <div className="flex justify-between text-[10px] font-black text-slate-700 leading-normal">
                          <span>Tốc độ đọc (Speed):</span>
                          <span className="text-sky-600 font-bold">
                            {childRate <= 0.65 ? "🐢 Chậm rãi" : childRate <= 0.78 ? "🐇 Chậm ngọt" : "⚡ Bình thường"}
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0.55"
                          max="1.0"
                          step="0.05"
                          value={childRate}
                          onChange={(e) => setChildRate(parseFloat(e.target.value))}
                          className="w-full h-1 bg-slate-105 rounded-lg appearance-none cursor-pointer accent-indigo-500 mt-1"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => speakWord("Excellent job! Keep practicing, little star!")}
                        className="w-full mt-1 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg font-black text-[9px] text-slate-650 flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>🔊 Thử giọng đọc ngữ âm</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 5. VIDEO HƯỚNG DẪN PHÁT ÂM CHUẨN - Collapsible Widget */}
            <div className="bg-white rounded-[2.2rem] p-5 border border-slate-100 shadow-xs text-slate-755 flex flex-col gap-3">
              <button 
                onClick={() => setIsVideoCollapsed(!isVideoCollapsed)}
                className="w-full flex items-center justify-between text-left font-black text-slate-800 focus:outline-none"
              >
                <span className="text-xs font-black text-rose-500 uppercase tracking-widest flex items-center gap-2">
                  <span>📺 VIDEO HỌC PHÁT ÂM CHUẨN</span>
                </span>
                <span className="text-sm text-slate-400 font-mono">
                  {isVideoCollapsed ? "▼ Hiện" : "▲ Ẩn"}
                </span>
              </button>

              <AnimatePresence>
                {!isVideoCollapsed && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mt-1 pt-3 border-t border-slate-100 flex flex-col gap-3"
                  >
                    <p className="text-[10px] text-slate-400 font-bold leading-normal">
                      Mời bé xem video hướng dẫn khẩu hình miệng và các điệu bộ phát âm chuẩn theo phương pháp Jolly Phonics nhé:
                    </p>

                    <div className="relative w-full aspect-video rounded-[1.2rem] overflow-hidden border-2 border-slate-150 shadow-inner bg-slate-950">
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={`https://www.youtube.com/embed/v_w93Ig4E3o?start=${videoStartTime}&rel=0&autoplay=0&showinfo=0&controls=1`}
                        key={videoPlayerKey}
                        title="Jolly Phonics 42 Sounds Pronunciation Video Guide"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    </div>

                    {/* Navigation Jump buttons by Group */}
                    <div>
                      <span className="text-[9px] uppercase font-black text-indigo-700 block mb-1.5 tracking-wider">Chọn nhanh nhóm bài hát & âm phát:</span>
                      <div className="grid grid-cols-4 gap-1.5">
                        {[
                          { lbl: "Nhóm 1", sec: 16 },
                          { lbl: "Nhóm 2", sec: 76 },
                          { lbl: "Nhóm 3", sec: 150 },
                          { lbl: "Nhóm 4", sec: 226 },
                          { lbl: "Nhóm 5", sec: 303 },
                          { lbl: "Nhóm 6", sec: 378 },
                          { lbl: "Nhóm 7", sec: 456 },
                          { lbl: "Bắt đầu", sec: 0 }
                        ].map((btn, bIdx) => (
                          <button
                            key={bIdx}
                            onClick={() => {
                              setVideoStartTime(btn.sec);
                              setVideoPlayerKey(p => p + 1);
                            }}
                            className={`px-1 py-1 rounded-lg text-[9px] font-black cursor-pointer transition-all border ${
                              videoStartTime === btn.sec
                                ? "bg-rose-500 border-rose-650 text-white shadow-sm"
                                : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600"
                            }`}
                          >
                            {btn.lbl}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT COLUMN: Tab selectors, active stage component, quick games, and YouTube song player underneath */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            
            {/* Horizontal Tabs bar strictly styled with beautiful emojis, containing ONLY the 4 group learning modes */}
            {["sounds", "blending", "games", "ai-reader"].includes(activeTab) ? (
              <div className="grid grid-cols-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-xs gap-1.5" id="navigation-tabs-box">
                <button
                  onClick={() => setActiveTab("sounds")}
                  className={`py-2.5 px-1 rounded-xl text-xs font-black flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                    activeTab === "sounds"
                      ? "bg-sky-500 text-white shadow-xs border-b-2 border-sky-700"
                      : "text-slate-600 hover:bg-slate-50 border-b-2 border-transparent"
                  }`}
                  id="tab-btn-sounds"
                >
                  <span className="text-lg">📣</span>
                  <span className="truncate w-full text-center">Học Âm</span>
                </button>

                <button
                  onClick={() => setActiveTab("blending")}
                  className={`py-2.5 px-1 rounded-xl text-xs font-black flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                    activeTab === "blending"
                      ? "bg-amber-500 text-white shadow-xs border-b-2 border-amber-700"
                      : "text-slate-600 hover:bg-slate-50 border-b-2 border-transparent"
                  }`}
                  id="tab-btn-blending"
                >
                  <span className="text-lg">🧩</span>
                  <span className="truncate w-full text-center font-black">Ghép Vần</span>
                </button>

                <button
                  onClick={() => setActiveTab("games")}
                  className={`py-2.5 px-1 rounded-xl text-xs font-black flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                    activeTab === "games"
                      ? "bg-emerald-500 text-white shadow-xs border-b-2 border-emerald-700"
                      : "text-slate-600 hover:bg-slate-50 border-b-2 border-transparent"
                  }`}
                  id="tab-btn-games"
                >
                  <span className="text-lg">🎮</span>
                  <span className="truncate w-full text-center text-slate-600">Trò Chơi</span>
                </button>

                <button
                  onClick={() => setActiveTab("ai-reader")}
                  className={`py-2.5 px-1 rounded-xl text-xs font-black flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                    activeTab === "ai-reader"
                      ? "bg-indigo-600 text-white shadow-xs border-b-2 border-indigo-800"
                      : "text-slate-600 hover:bg-slate-50 border-b-2 border-transparent"
                  }`}
                  id="tab-btn-ai-reader"
                >
                  <span className="text-lg">📖</span>
                  <span className="truncate w-full text-center">Luyện Đọc</span>
                </button>
              </div>
            ) : (
              <div className="bg-white p-4.5 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between gap-3 text-slate-800 animate-fadeIn" id="custom-workspace-heading">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">
                    {activeTab === "advanced" ? "🚀" :
                     activeTab === "tricky" ? "📝" : "🏆"}
                  </span>
                  <div>
                    <h2 className="text-[11px] sm:text-xs font-black font-sans tracking-wide leading-none text-slate-900 uppercase">
                      {activeTab === "advanced" ? "Học nâng cao - Jolly Phonics" :
                       activeTab === "tricky" ? "Từ Khó Rèn Luyện (Tricky Words)" : "Bằng Khen Danh Dự Của Bé"}
                    </h2>
                    <p className="text-[10px] text-slate-400 font-bold mt-1 sm:mt-1.5 leading-none">
                      {activeTab === "advanced" ? "Bé rèn luyện và học tập nâng cao chương trình ngữ âm Anh ngữ" :
                       activeTab === "tricky" ? "Luyện phát âm các từ đặc biệt không tuân quy luật ghép vần đơn thuần" : "Danh hiệu vinh quang cổ vũ tinh thần học tập xuất sắc"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab("sounds")}
                  className="px-3 py-1.5 bg-[#E3F2FD] hover:bg-sky-150 rounded-xl text-[10px] font-black text-sky-700 cursor-pointer flex items-center gap-1 transition-colors border border-sky-150 shrink-0 select-none"
                >
                  <span>📣</span>
                  <span className="hidden sm:inline">Trở Về Nhóm Âm</span>
                </button>
              </div>
            )}

            {/* Display active workspace panel */}
            <div className="w-full relative min-h-[440px]" id="tab-content-render-stage">
              <AnimatePresence mode="wait">
                {activeTab === "sounds" && (
                  <motion.div
                    key="sounds"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                  >
                    <SoundBoard group={currentGroup} />
                  </motion.div>
                )}

                {activeTab === "blending" && (
                  <motion.div
                    key="blending"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                  >
                    <BlendingBoard
                      group={currentGroup}
                      onWordMastered={handleWordMastered}
                    />
                  </motion.div>
                )}

                {activeTab === "advanced" && (
                  <motion.div
                    key="advanced"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="w-full bg-white rounded-[2.2rem] p-6 sm:p-8 border border-slate-100 shadow-sm text-center"
                  >
                    <div className="max-w-2xl mx-auto flex flex-col items-center py-4">
                      {/* Animated Badge & Hero */}
                      <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center text-4xl mb-6 shadow-xs border border-amber-100/60 animate-bounce" style={{ animationDuration: '3s' }}>
                        🚀
                      </div>
                      
                      <h3 className="text-xl sm:text-2xl font-black font-sans text-slate-800 tracking-tight mb-2">
                        Khám Phá Jolly Phonics Nâng Cao!
                      </h3>
                      
                      <p className="text-slate-500 font-bold text-xs sm:text-sm max-w-lg mx-auto mb-8 leading-relaxed">
                        Do chính sách bảo mật nghiêm ngặt của trình duyệt (chặn hiển thị trong khung iframe), ba mẹ hãy nhấn nút phía dưới để bé chuyển sang phòng học nâng cao phiên bản toàn màn hình nhé!
                      </p>

                      {/* Premium highlights layout */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8 text-left">
                        {/* Box 1 */}
                        <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100 flex gap-3.5 items-start">
                          <span className="text-2xl pt-0.5">📚</span>
                          <div>
                            <h4 className="font-black text-xs text-sky-950 uppercase tracking-wider">Ngữ pháp nâng cao</h4>
                            <p className="text-[10px] text-sky-850 font-bold mt-1 leading-normal">
                              Làm quen với các cấu trúc kết hợp từ và định hướng viết câu Jolly Grammar từ sớm.
                            </p>
                          </div>
                        </div>

                        {/* Box 2 */}
                        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex gap-3.5 items-start">
                          <span className="text-2xl pt-0.5">✍️</span>
                          <div>
                            <h4 className="font-black text-xs text-emerald-805 uppercase tracking-wider">Luyện chính tả & Ghép vần</h4>
                            <p className="text-[10px] text-emerald-850 font-bold mt-1 leading-normal">
                              Nghe và chủ động viết từ vựng đa dạng, phá cấu trúc khó không lo lỗi sai.
                            </p>
                          </div>
                        </div>

                        {/* Box 3 */}
                        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3.5 items-start">
                          <span className="text-2xl pt-0.5">🎯</span>
                          <div>
                            <h4 className="font-black text-xs text-amber-500 uppercase tracking-wider">Trò chơi hấp dẫn</h4>
                            <p className="text-[10px] text-amber-850 font-bold mt-1 leading-normal">
                              Hàng loạt trò chơi phân tách âm tố và trò chơi tương tác hình ảnh sống động.
                            </p>
                          </div>
                        </div>

                        {/* Box 4 */}
                        <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 flex gap-3.5 items-start">
                          <span className="text-2xl pt-0.5">⭐</span>
                          <div>
                            <h4 className="font-black text-xs text-purple-550 uppercase tracking-wider">Bảng Vàng Danh Dự</h4>
                            <p className="text-[10px] text-purple-850 font-bold mt-1 leading-normal">
                              Tích lũy bảng sao thử thách lôi cuốn và nhận các chứng nhận danh giá sau bài test!
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Engaging and Beautiful Action Button */}
                      <a
                        href="https://ai.studio/apps/cab191da-899e-47bd-ae07-6ec259bb7fd1?fullscreenApplet=true"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 bg-[#6E8B6A] text-[#FAF6EE] hover:bg-[#5D755A] font-black text-sm px-8 py-4.5 rounded-2xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-center bento-border-emerald"
                      >
                        Mở Khóa Học Nâng Cao Ngay 🚀
                      </a>
                      
                      <p className="text-slate-400 text-[10px] font-bold mt-4 tracking-wide">
                        (Hệ thống sẽ mở an toàn trong một Tab mới cho bé trải nghiệm mượt mà nhất)
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === "games" && (
                  <motion.div
                    key="games"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                  >
                    <SegmentingGame
                      group={currentGroup}
                      onEarnStar={handleEarnStar}
                    />
                  </motion.div>
                )}

                {activeTab === "ai-reader" && (
                  <motion.div
                    key="reader"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                  >
                    <ReaderAI
                      unlockedLetters={unlockedLetters}
                      currentGroup={currentGroup}
                    />
                  </motion.div>
                )}

                {activeTab === "tricky" && (
                  <motion.div
                    key="tricky"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                  >
                    <TrickyWords onEarnStar={handleEarnStar} />
                  </motion.div>
                )}

                {activeTab === "certificate" && (
                  <motion.div
                    key="certificate"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Certificate progress={progress} />
                  </motion.div>
                )}


              </AnimatePresence>
            </div>

            {/* YouTube Song Video widget embedded exactly at the bottom of the right column */}
            {currentGroup.youtubeId && (
              <div className="bg-white rounded-[2.2rem] p-5 border border-slate-100 shadow-xs flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <span className="text-xs font-black text-rose-500 uppercase tracking-widest flex items-center gap-1.5">
                    🎵 Bài Hát Jolly Phonics - Nhóm {currentGroup.number}
                  </span>
                  <span className="text-[10px] font-black text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100/50">Cùng bé hát múa</span>
                </div>

                <div className="relative w-full aspect-video rounded-[1.5rem] overflow-hidden border-2 border-slate-200/60 shadow-inner bg-slate-950">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${currentGroup.youtubeId}?rel=0&autoplay=0&showinfo=0&controls=1`}
                    title={`Jolly Phonics Group ${currentGroup.number} Song`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <p className="text-xs text-slate-400 font-bold leading-normal text-center">
                  Cùng hát, nhảy múa và làm điệu bộ vui tai vui mắt cùng bé nhé!
                </p>
              </div>
            )}

            {/* Video-guided reading practice for each group */}
            <div className="bg-white rounded-[2.2rem] p-6 border border-slate-100 shadow-xs text-slate-755 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-indigo-50 border border-indigo-200">
                    <img 
                      src="/src/assets/images/friendly_robot_3d_1781603279123.jpg" 
                      alt="3D robot icon" 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer" 
                    />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest leading-none mb-1">
                      🎥 LUYỆN ĐỌC THEO VIDEO
                    </h3>
                    <p className="text-[10px] text-slate-400 font-bold block leading-none">Bé nhìn mốc câu, nghe phát âm chuẩn và luyện đọc to theo video bài hát</p>
                  </div>
                </div>
                <span className="text-[9px] font-black text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100 select-none">
                  Câu tập đọc
                </span>
              </div>

              {/* Embedded video player synchronized with the selected group song/sounds start time */}
              <div className="relative w-full aspect-video rounded-[1.5rem] overflow-hidden border-2 border-indigo-100/50 shadow-md bg-slate-950 my-1">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/v_w93Ig4E3o?start=${
                    currentGroup.number === 1 ? 16 :
                    currentGroup.number === 2 ? 76 :
                    currentGroup.number === 3 ? 150 :
                    currentGroup.number === 4 ? 226 :
                    currentGroup.number === 5 ? 303 :
                    currentGroup.number === 6 ? 378 :
                    currentGroup.number === 7 ? 456 : 0
                  }&rel=0&autoplay=0&showinfo=0&controls=1`}
                  title={`Video luyện phát âm ngữ âm Jolly Phonics - Nhóm ${currentGroup.number}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>

              <div className="flex flex-col gap-3">
                {getVideoReadingSentences(currentGroup.number).map((item, idx) => {
                  const isRead = isSentenceRead(currentGroup.number, idx);
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.01 }}
                      className="p-3.5 border-2 border-b-6 border-slate-100 hover:border-indigo-100/80 hover:bg-indigo-50/10 rounded-2xl flex items-center justify-between gap-3 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => speakWord(item.en, childRate)}
                          className="w-8 h-8 rounded-full bg-indigo-55 hover:bg-indigo-100 border-b-4 border-indigo-200 hover:border-b-2 flex items-center justify-center text-indigo-650 cursor-pointer active:translate-y-[1px] transition-all shrink-0"
                          title="Bé nghe đọc mẫu"
                        >
                          <span className="text-sm">🔊</span>
                        </button>
                        <div>
                          <p className="font-sans font-black text-xs sm:text-sm text-slate-800 tracking-wide select-text">
                            {item.en}
                          </p>
                          <p className="text-[10px] text-slate-400 font-bold mt-0.5 select-text">
                            {item.vi}
                          </p>
                        </div>
                      </div>

                      {/* Sparkly interactive check star button for child achievement */}
                      <button
                        onClick={() => handleToggleSentenceRead(currentGroup.number, idx)}
                        className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                          isRead
                            ? "bg-emerald-500 border-emerald-600 text-white shadow-xs"
                            : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-400"
                        }`}
                      >
                        {isRead ? (
                          <motion.span animate={{ scale: [0.6, 1.3, 1] }} className="text-sm">⭐</motion.span>
                        ) : (
                          <span className="text-xs">✔️</span>
                        )}
                      </button>
                    </motion.div>
                  );
                })}
              </div>
              <p className="text-[10px] text-slate-400 font-bold leading-normal mt-1 border-t border-slate-55/60 pt-2 text-center">
                👉 Nhấp loa 🔊 nghe đọc mẫu. Chạm ông sao ⭐ để ghi nhận kết quả và nhận phần thưởng từ ba mẹ!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer block containing exact details */}
      <footer className="mt-12 text-center text-[11px] text-slate-400 border-t border-slate-150 pt-5 pb-4" id="app-disclaimer-footer">
        <p className="flex items-center justify-center gap-1.5 flex-wrap font-bold">
          <span className="text-slate-500">Học Jolly Phonics cùng Minh Phương</span>
          <span className="text-slate-305">•</span>
          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-150/60 font-black">SĐT hỗ trợ: 0977 348 789</span>
          <span className="text-slate-305">•</span>
          <span className="text-slate-500">Phương pháp Blending Jolly Phonics Vương quốc Anh</span>
          <span className="text-red-500">❤️</span>
          <span className="text-indigo-600 font-extrabold bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">Bảo trợ bởi Gemini AI Flash</span>
        </p>
        <p className="mt-2 text-[10px] font-semibold text-slate-400/80">© 2026 Học Jolly Phonics cùng Minh Phương. All rights reserved. Hoạt động phi thương mại cho sự nghiệp rèn âm em bé Việt Nam.</p>
      </footer>
    </div>
  );
}

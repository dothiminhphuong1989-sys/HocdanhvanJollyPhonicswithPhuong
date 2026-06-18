import React, { useState } from "react";
import { SoundGroup, AppProgress } from "../types";
import { jollyPhonicsGroups } from "../data/phonicsData";
import { motion, AnimatePresence } from "motion/react";
import { Facebook, Heart } from "lucide-react";

interface NavigationSidebarProps {
  progress: AppProgress;
  selectedGroupNumber: number;
  activeTab: string;
  onSelectGroup: (groupNumber: number) => void;
  onSelectTab: (tab: "sounds" | "blending" | "games" | "ai-reader" | "tricky" | "certificate" | "advanced") => void;
  onToggleGroupUnlock: (groupNumber: number) => void;
}

export default function NavigationSidebar({
  progress,
  selectedGroupNumber,
  activeTab,
  onSelectGroup,
  onSelectTab,
  onToggleGroupUnlock
}: NavigationSidebarProps) {
  const [isGroupListExpanded, setIsGroupListExpanded] = useState<boolean>(true);

  // Group-specific active tab means the child is in one of the active learning modes
  const isGroupTabActive = ["sounds", "blending", "games", "ai-reader"].includes(activeTab);

  // Computed completed progress per group
  const calculateGroupProgress = (group: SoundGroup): number => {
    if (!group.starterWords || group.starterWords.length === 0) return 0;
    const groupWords = group.starterWords.map(w => w.word);
    const masteredInGroup = progress.masteredWords.filter(word => groupWords.includes(word)).length;
    return Math.min(100, Math.round((masteredInGroup / group.starterWords.length) * 100));
  };

  return (
    <div 
      className="w-full bg-white rounded-[2.2rem] border border-slate-100 shadow-md divide-y divide-slate-100 overflow-hidden" 
      id="unified-navigation-sidebar"
    >
      {/* Sidebar Header Title */}
      <div className="p-5 bg-gradient-to-r from-sky-50 to-indigo-50/30 flex items-center gap-3 select-none">
        <span className="text-2xl">📚</span>
        <div>
          <h2 className="font-extrabold text-[#111827] text-xs uppercase tracking-widest leading-none">
            HỌC TẬP
          </h2>
          <p className="text-[10px] text-slate-400 font-bold mt-1 leading-none">
            Jolly Phonics cùng bé
          </p>
        </div>
      </div>

      {/* Main Navigation Stack */}
      <div className="p-4 flex flex-col gap-4" id="sidebar-menu-items">
        
        {/* 1. COLLAPSIBLE GROUP SELECTOR */}
        <div className="flex flex-col gap-1.5 uniq-selector-section">
          <button
            onClick={() => setIsGroupListExpanded(!isGroupListExpanded)}
            className="w-full p-3 rounded-2xl flex items-center justify-between text-left font-black transition-colors hover:bg-[#F5F9FF] text-[#374151]"
            id="sidebar-btn-group-toggle"
          >
            <span className="text-xs uppercase tracking-wider flex items-center gap-2">
              <span className="text-base select-none">📂</span>
              Chọn nhóm âm
            </span>
            <span className="text-[10px] text-slate-400 font-bold bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-lg select-none">
              {isGroupListExpanded ? "Ẩn ▲" : "Hiện ▼"}
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isGroupListExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden pl-3 flex flex-col gap-1.5 border-l border-slate-100/80 my-1"
                id="sidebar-group-sublist"
              >
                {jollyPhonicsGroups.slice(0, 7).map((grp) => {
                  const isUnlocked = progress.unlockedGroups.includes(grp.number);
                  const isSelected = selectedGroupNumber === grp.number && isGroupTabActive;
                  const percent = calculateGroupProgress(grp);

                  return (
                    <div key={grp.number} className="relative flex items-center justify-between w-full pr-1 group">
                      <button
                        disabled={!isUnlocked}
                        onClick={() => {
                          onSelectGroup(grp.number);
                          // Default to pronunciation view on group switch
                          if (!isGroupTabActive) {
                            onSelectTab("sounds");
                          }
                        }}
                        className={`grow py-2 px-3.5 rounded-xl text-left transition-all text-xs font-black flex flex-col gap-1 ${
                          isSelected
                            ? "bg-[#E3F2FD] border-l-4 border-l-[#2196F3] text-[#1E88E5]"
                            : isUnlocked
                            ? "hover:bg-[#F5F9FF] text-slate-650"
                            : "opacity-45 cursor-not-allowed text-slate-400"
                        }`}
                        id={`sidebar-grp-btn-${grp.number}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-4 h-4 rounded-md text-[10px] font-mono font-black flex items-center justify-center text-white ${
                            isSelected ? "bg-[#1E88E5]" : isUnlocked ? "bg-slate-400" : "bg-slate-300"
                          }`}>
                            {grp.number}
                          </span>
                          <span className="truncate">{grp.name.replace(`Nhóm ${grp.number}`, "")}</span>
                          {percent === 100 && isUnlocked && <span className="text-[10px]">🏆</span>}
                        </div>
                        {isUnlocked && percent > 0 && (
                          <div className="w-24 bg-slate-100 h-1 rounded-full overflow-hidden border border-slate-205/10 mt-0.5">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${percent}%` }} />
                          </div>
                        )}
                      </button>

                      {/* Parent lock/unlock toggle switch inside sidebar for seamless administration */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleGroupUnlock(grp.number);
                        }}
                        className={`text-[10px] p-1.5 rounded-lg border ml-1 focus:outline-none shrink-0 transition-colors ${
                          isUnlocked
                            ? "bg-emerald-50 hover:bg-emerald-100 border-emerald-100 text-emerald-600"
                            : "bg-slate-50 hover:bg-slate-100 border-slate-100 text-slate-400"
                        }`}
                        title={isUnlocked ? "Đóng khóa nhóm âm" : "Mở khóa nhóm âm cho bé"}
                      >
                        {isUnlocked ? "🔓" : "🔒"}
                      </button>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 2. TỪ KHÓ (Tricky words) */}
        <button
          onClick={() => onSelectTab("tricky")}
          className={`w-full p-3.5 rounded-2xl flex items-center gap-3 text-left transition-all ${
            activeTab === "tricky"
              ? "bg-[#E3F2FD] border-l-4 border-l-[#2196F3] text-[#1E88E5] font-black"
              : "hover:bg-[#F5F9FF] text-slate-700 font-bold"
          }`}
          id="sidebar-btn-tricky"
        >
          <span className="text-lg">📝</span>
          <span className="text-xs uppercase tracking-wide">Từ khó</span>
        </button>

        {/* 3. BẰNG KHEN (certificate) */}
        <button
          onClick={() => onSelectTab("certificate")}
          className={`w-full p-3.5 rounded-2xl flex items-center gap-3 text-left transition-all ${
            activeTab === "certificate"
              ? "bg-[#E3F2FD] border-l-4 border-l-[#2196F3] text-[#1E88E5] font-black"
              : "hover:bg-[#F5F9FF] text-slate-700 font-bold"
          }`}
          id="sidebar-btn-certificate"
        >
          <span className="text-lg">🏆</span>
          <span className="text-xs uppercase tracking-wide">Bằng khen</span>
        </button>

        {/* 4. HỌC NÂNG CAO (Advanced Learning via secure External Portal) */}
        <button
          onClick={() => onSelectTab("advanced")}
          className={`w-full p-3.5 rounded-2xl flex items-center gap-3 text-left transition-all ${
            activeTab === "advanced"
              ? "bg-[#E3F2FD] border-l-4 border-l-[#2196F3] text-[#1E88E5] font-black"
              : "hover:bg-[#F5F9FF] text-slate-700 font-bold"
          }`}
          id="sidebar-btn-advanced"
        >
          <span className="text-lg">🚀</span>
          <span className="text-xs uppercase tracking-wide">Học nâng cao</span>
        </button>

      </div>

      {/* Cheerful Facebook Follow section specifically built for parents & learners */}
      <div className="p-5 bg-gradient-to-br from-blue-50 to-sky-100/50 flex flex-col gap-2 select-none" id="sidebar-facebook-block">
        <div className="flex items-center gap-1.5">
          <Facebook className="w-4 h-4 text-blue-600 fill-blue-600 shrink-0" />
          <span className="text-[11px] font-extrabold text-blue-700 tracking-wider uppercase">
            Gửi Ba Mẹ & Học Viên
          </span>
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse ml-auto" />
        </div>
        
        <p className="text-[11px] font-semibold text-slate-700 leading-relaxed">
          Theo dõi <span className="font-extrabold text-indigo-700">Phương</span> trên Facebook để nhận được nhiều chia sẻ hay về học Phonics nói riêng và Tiếng Anh nói chung nhé!
        </p>
        
        <a 
          href="https://www.facebook.com/minh.phuong.293635" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="mt-1 w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[11px] py-2 px-3 rounded-xl shadow-sm transition-all transform active:scale-95 flex items-center justify-center gap-1.5"
          id="facebook-follow-link"
        >
          <Facebook className="w-3.5 h-3.5 text-white stroke-[3px]" />
          Kết nối Facebook
        </a>
      </div>
    </div>
  );
}

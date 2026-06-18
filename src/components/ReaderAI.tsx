import React, { useState } from "react";
import { SoundGroup } from "../types";
import { speakWord, speakPhoneme } from "../utils/speech";
import { motion, AnimatePresence } from "motion/react";

interface ReaderAIProps {
  unlockedLetters: string[];
  currentGroup: SoundGroup;
}

interface PhonicsStory {
  story: string;
  vietnameseStory: string;
  keyWords: { word: string; segments: string[] }[];
  question: string;
  answer: string;
  isFallback?: boolean;
}

interface SavedStory extends PhonicsStory {
  id: string;
  savedAt: string;
  groupNumber: number;
  groupName: string;
}

export default function ReaderAI({ unlockedLetters, currentGroup }: ReaderAIProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [storyData, setStoryData] = useState<PhonicsStory | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showTranslation, setShowTranslation] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [activeKeywordWord, setActiveKeywordWord] = useState<string | null>(null);
  const [activeSegIndex, setActiveSegIndex] = useState<number | null>(null);

  const [savedStories, setSavedStories] = useState<SavedStory[]>(() => {
    try {
      const items = localStorage.getItem("jolly_phonics_saved_stories");
      return items ? JSON.parse(items) : [];
    } catch {
      return [];
    }
  });

  const fetchAIStory = async () => {
    setLoading(true);
    setError(null);
    setShowTranslation(false);
    setShowAnswer(false);

    try {
      const response = await fetch("/api/generate-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          unlockedLetters,
          groupName: currentGroup.name,
          groupNumber: currentGroup.number
        }),
      });

      if (!response.ok) {
        throw new Error("Lỗi mạng khi tải câu rèn luyện. Hãy kiểm tra lại kết nối.");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setStoryData(data);

      // Auto-save the newly created reading sentences so the child can easily select them later
      const formatter = new Intl.DateTimeFormat("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit"
      });

      const newSavedItem: SavedStory = {
        ...data,
        id: Date.now().toString(),
        savedAt: formatter.format(new Date()),
        groupNumber: currentGroup.number,
        groupName: currentGroup.name
      };

      setSavedStories(prev => {
        const isDuplicate = prev.some(s => s.story.trim().toLowerCase() === data.story.trim().toLowerCase());
        if (isDuplicate) return prev;
        const updated = [newSavedItem, ...prev];
        localStorage.setItem("jolly_phonics_saved_stories", JSON.stringify(updated));
        return updated;
      });

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Không thể khởi tạo câu rèn luyện AI. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const deleteSavedStory = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedStories.filter(s => s.id !== id);
    setSavedStories(updated);
    localStorage.setItem("jolly_phonics_saved_stories", JSON.stringify(updated));
  };

  const loadSavedStory = (item: SavedStory) => {
    setStoryData(item);
    setShowTranslation(false);
    setShowAnswer(false);
    setActiveKeywordWord(null);
    setActiveSegIndex(null);
  };

  const speakEntireStory = async () => {
    if (!storyData) return;
    await speakWord(storyData.story, 0.75); // Slow rate for kids
  };

  const handleWordClick = async (word: string) => {
    // Speak clicked word from the sentences
    const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    await speakWord(cleanWord, 0.75);
  };

  const handleSoundOutKeyword = async (wordObj: { word: string; segments: string[] }) => {
    setActiveKeywordWord(wordObj.word);

    // Phoneme spell sound-outs sequential with 0.5s pause
    for (let i = 0; i < wordObj.segments.length; i++) {
      setActiveSegIndex(i);
      await speakPhoneme(wordObj.segments[i]);
      // 500ms standard Jolly Phonics pause
      await new Promise(r => setTimeout(r, 500));
    }

    setActiveSegIndex(null);
    // Final blend speak
    await speakWord(wordObj.word, 0.8);
    setActiveKeywordWord(null);
  };

  return (
    <div className="w-full bg-white rounded-[2.5rem] p-6 md:p-8 border-4 border-b-12 border-sky-100 shadow-xl" id="reader-ai-container">
      <div className="flex items-center justify-between mb-8 border-b-4 border-sky-100 pb-5 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-xs border border-sky-200 shrink-0">
            <img 
              src="/src/assets/images/friendly_robot_3d_1781603279123.jpg" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer" 
            />
          </div>
          <div>
            <h2 className="text-2xl font-black font-sans text-sky-950">
              Luyện Đọc Câu Ngắn AI (AI Sentence Reader)
            </h2>
            <p className="text-sm text-slate-400 font-bold mt-1">Sử dụng trí tuệ nhân tạo để tạo các câu ngắn, dễ thương CHỈ từ các chữ cái bé đã học!</p>
          </div>
        </div>
        <div className="bg-indigo-50 text-indigo-800 text-xs px-4 py-2 rounded-full font-black border-2 border-indigo-200 select-none shadow-sm">
          Gemini Flash AI Powered
        </div>
      </div>

      <p className="text-slate-500 text-sm mb-6 leading-relaxed font-bold">
        Phần lớn sách tự đọc tiếng Anh cho trẻ em chứa quá nhiều từ lạ hoặc từ bất quy tắc vượt tầm của con. Nhờ AI thông minh, chương trình tự động phân tích và tạo ra câu ngắn rèn luyện đọc **chỉ chứa các âm hoặc chữ cái con đã mở khóa** để con học tập lưu loát, tự tin!
      </p>

      {/* Main interface area */}
      <div className="bg-indigo-50/20 border-4 border-indigo-100 rounded-[2.5rem] p-6 lg:p-8 flex flex-col items-center w-full">
        {!storyData && !loading && (
          <div className="text-center py-10 flex flex-col items-center justify-center">
            <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-b-8 border-indigo-200 bg-white shadow-md animate-bounce mb-6">
              <img 
                src="/src/assets/images/friendly_robot_3d_1781603279123.jpg" 
                alt="3D AI Robot"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <h3 className="text-2xl font-black text-slate-850 mb-2">Bắt đầu tạo câu rèn luyện ngay nào!</h3>
            <p className="text-sm text-slate-500 max-w-sm mb-6 leading-relaxed font-bold">
              Các chữ cái mở khóa hiện tại: <span className="font-mono font-black text-indigo-650 block mt-2 text-lg">{unlockedLetters.join(", ")}</span>
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchAIStory}
              className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 font-black text-white border-2 border-b-6 border-indigo-805 shadow-md cursor-pointer flex items-center gap-2 transition-all"
              id="btn-gen-ai-story"
            >
              <span className="text-xl animate-spin">✨</span>
              <span>Tạo câu ngắn rèn luyện ngay</span>
            </motion.button>
          </div>
        )}

        {loading && (
          <div className="text-center py-12 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin mb-4"></div>
            <p className="text-lg font-black text-indigo-950">Gemini đang biên soạn các câu ngắn phù hợp...</p>
            <p className="text-xs text-slate-400 mt-2 font-black font-sans uppercase tracking-wider">Đang sàng lọc chặt chẽ các từ trong kho từ có âm đã học.</p>
          </div>
        )}

        {error && (
          <div className="text-center py-6 text-red-600 text-sm flex flex-col items-center gap-3">
            <span className="text-4xl select-none">⚠️</span>
            <p className="font-extrabold text-sm">{error}</p>
            <button
              onClick={fetchAIStory}
              className="mt-4 px-6 py-3.5 bg-slate-800 text-white font-black rounded-xl border-4 border-b-8 border-slate-950 hover:bg-slate-900 text-xs cursor-pointer"
            >
              Thử lại lần nữa
            </button>
          </div>
        )}

        {/* Story details display */}
        {storyData && !loading && (
          <div className="w-full">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4 border-b-2 border-indigo-100/40 pb-4">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-xs font-black text-indigo-600 uppercase tracking-widest bg-white border-2 border-indigo-100 rounded-full px-4 py-2 shadow-sm select-none">
                  Bài tập đọc câu ngắn của con
                </span>
                {storyData.isFallback && (
                  <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider bg-emerald-50 border-2 border-emerald-100 rounded-full px-3 py-1.5 shadow-sm select-none flex items-center gap-1 animate-pulse">
                    <span>✨</span> Giáo trình chuẩn
                  </span>
                )}
              </div>
              <div className="flex gap-2.5">
                <button
                  onClick={fetchAIStory}
                  className="px-5 py-3.5 bg-white border-4 border-b-8 border-slate-300 hover:bg-slate-50 font-black rounded-2xl text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                  title="Tạo câu rèn luyện mới"
                  id="btn-regen-ai-story"
                >
                  <span className="text-sm">✨</span>
                  <span>Tạo câu rèn luyện mới</span>
                </button>
                <button
                  onClick={speakEntireStory}
                  className="px-5 py-3.5 bg-indigo-600 hover:bg-indigo-750 font-black text-white border-4 border-b-8 border-indigo-800 rounded-2xl text-xs flex items-center gap-2 cursor-pointer transition-colors shadow-md"
                  id="btn-read-ai-story-full"
                >
                  <span className="text-sm">🔊</span>
                  <span>Đọc câu cho bé nghe</span>
                </button>
              </div>
            </div>

            {/* Readout book panel */}
            <div className="bg-white border-4 border-b-12 border-indigo-200 rounded-[2.5rem] p-6 md:p-8 shadow-inner mb-6 relative w-full">
              {/* Story sentences with tap-to-read word bubbles */}
              <div className="flex flex-wrap gap-x-3 gap-y-4 justify-center text-2xl md:text-3xl lg:text-4xl font-sans font-black tracking-wide text-sky-950 leading-relaxed text-center mb-8 select-text">
                {storyData.story.split(" ").map((word, i) => {
                  return (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.15, color: "#4f46e5", y: -2 }}
                      onClick={() => handleWordClick(word)}
                      className="cursor-pointer border-b-4 border-dashed border-indigo-200 hover:border-indigo-600 pb-1 rounded px-1 transition-all inline-block font-sans font-black"
                      title="Tap to blend this word"
                      id={`story-word-${i}`}
                    >
                      {word}
                    </motion.span>
                  );
                })}
              </div>

              {/* Toggle parent's Vietnamese translation */}
              <div className="border-t-2 border-slate-100 pt-5 flex flex-col items-center">
                <button
                  onClick={() => setShowTranslation(!showTranslation)}
                  className="text-xs font-black text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 cursor-pointer transition-colors uppercase tracking-wider"
                  id="btn-toggle-translation"
                >
                  <span className="text-sm">👁️</span>
                  <span>{showTranslation ? "Ẩn dịch tiếng Việt" : "Xem dịch tiếng Việt dành cho ba mẹ"}</span>
                </button>

                <AnimatePresence>
                  {showTranslation && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-sm text-slate-700 mt-4 text-center font-extrabold italic bg-slate-50 rounded-2xl p-4 border-2 border-slate-200 w-full leading-relaxed"
                    >
                      🇺🇳 {storyData.vietnameseStory}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Key Word Blending Guide Cards */}
            <div className="mb-8">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-4">
                Từ rèn luyện vần cốt lõi (Tap to segment and blend)
              </span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {storyData.keyWords.map((wordObj, i) => {
                  const isCurrent = activeKeywordWord === wordObj.word;

                  return (
                    <div
                      key={i}
                      onClick={() => handleSoundOutKeyword(wordObj)}
                      className={`p-5 rounded-[2rem] border-4 border-b-10 text-center cursor-pointer transition-all ${
                        isCurrent
                          ? "bg-amber-100 border-amber-300 border-b-amber-500 shadow-lg transform translate-y-[2px]"
                          : "bg-white hover:bg-slate-50 border-slate-300 text-slate-800 shadow-md"
                      }`}
                      id={`reader-keyword-card-${wordObj.word}`}
                    >
                      <span className="font-mono font-black text-2xl text-slate-900 block mb-3 select-none">
                        {wordObj.word}
                      </span>
                      {/* Segment dots indicator */}
                      <div className="flex items-center justify-center gap-1.5 select-none">
                        {wordObj.segments.map((seg, idx) => {
                          const isSegActive = isCurrent && activeSegIndex === idx;
                          return (
                            <span
                              key={idx}
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-black transition-all ${
                                isSegActive
                                  ? "bg-amber-500 text-white scale-125 shadow-sm"
                                  : "bg-slate-100 text-slate-600 border border-slate-250"
                              }`}
                            >
                              {seg}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Phonics Comprehension Question Game */}
            <div className="bg-amber-50 border-4 border-b-12 border-amber-250 rounded-[2.5rem] p-6 lg:p-8 shadow-inner">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 border-2 border-amber-200 flex items-center justify-center text-amber-700 shrink-0 select-none">
                  <span className="text-3xl animate-bounce">❓</span>
                </div>
                <div className="w-full">
                  <h4 className="text-xs font-black text-amber-800 uppercase tracking-widest">
                    Thử thách tập đọc hiểu (Reading Comprehension Game)
                  </h4>
                  <div className="flex items-center gap-4 mt-3 flex-wrap sm:flex-nowrap">
                    <p className="text-slate-900 text-xl font-black font-sans leading-relaxed">
                      {storyData.question}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => speakWord(storyData.question, 0.72)}
                      className="p-3.5 px-5 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl text-xs flex items-center gap-1.5 font-black shrink-0 border-b-4 border-amber-700 shadow-md cursor-pointer"
                      title="Listen to the question"
                      id="btn-speak-question"
                    >
                      <span className="text-sm animate-bounce">🔊</span>
                      <span>Nghe câu hỏi</span>
                    </motion.button>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-4 flex-wrap border-t border-amber-200/50 pt-4">
                    <button
                      onClick={() => setShowAnswer(!showAnswer)}
                      className="text-xs font-black text-amber-800 hover:text-amber-950 cursor-pointer underline decoration-2 animate-pulse uppercase tracking-wider"
                      id="btn-reveal-answer"
                    >
                      {showAnswer ? "Ẩn đáp án rèn luyện" : "Hiện đáp án tiếng Anh mẫu"}
                    </button>

                    {showAnswer && (
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-mono font-black text-amber-950 bg-white border-4 border-b-8 border-amber-250 px-5 py-3 rounded-2xl shadow-md select-all">
                          {storyData.answer}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => speakWord(storyData.answer, 0.7)}
                          className="p-3 bg-slate-800 hover:bg-slate-900 text-white rounded-2xl border-b-4 border-slate-950 shadow-md cursor-pointer"
                          title="Listen to the answer"
                          id="btn-speak-answer"
                        >
                          <span className="text-sm animate-pulse">🔊</span>
                        </motion.button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 📚 KHO CÂU ĐỌC CỦA BÉ (Saved reading shelf) */}
      <div className="mt-8 border-t-4 border-dashed border-sky-100 pt-8 w-full" id="kids-bookshelf-section">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">📚</span>
            <div>
              <h3 className="text-xl font-black text-sky-950">Kho Câu Đọc Của Bé</h3>
              <p className="text-xs text-slate-400 font-bold mt-0.5">Lưu trữ các câu ngắn đã tạo để bé ôn tập nhanh bất cứ lúc nào!</p>
            </div>
          </div>
          {savedStories.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm("Bố mẹ có chắc chắn muốn xóa toàn bộ các câu chuyện đã lưu không?")) {
                  setSavedStories([]);
                  localStorage.removeItem("jolly_phonics_saved_stories");
                }
              }}
              className="text-[10px] font-black text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 border-2 border-red-200 rounded-xl px-3.5 py-1.5 cursor-pointer transition-all uppercase tracking-wide"
              id="btn-clear-all-saved-stories"
            >
              Dọn sạch kho 🗑️
            </button>
          )}
        </div>

        {savedStories.length === 0 ? (
          <div className="bg-slate-50 border-4 border-dashed border-slate-200 rounded-[2rem] p-8 text-center flex flex-col items-center justify-center">
            <span className="text-4xl mb-3 select-none filter grayscale opacity-65">📖</span>
            <p className="text-sm font-black text-slate-400 text-center max-w-sm leading-relaxed">
              Kho của bé đang trống. Khi bố mẹ nhấn tạo bài đọc mới, bài học sẽ tự động được cất giữ ngăn nắp tại đây nhé!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" id="saved-stories-list">
            {savedStories.map((item) => {
              const isActive = storyData?.story === item.story;
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.02, y: -2 }}
                  onClick={() => loadSavedStory(item)}
                  className={`p-5 rounded-[2rem] border-4 cursor-pointer relative flex flex-col justify-between transition-all group ${
                    isActive
                      ? "bg-indigo-50/50 border-indigo-400 shadow-lg"
                      : "bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-350 shadow-sm"
                  }`}
                  id={`saved-story-card-${item.id}`}
                >
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      {/* Badge header & delete button */}
                      <div className="flex items-center justify-between mb-3 w-full">
                        <span className={`text-[10px] font-black uppercase tracking-wide px-3 py-1 mr-2 rounded-full border-2 ${
                          item.groupNumber <= 3
                            ? "bg-rose-50 text-rose-700 border-rose-100"
                            : item.groupNumber <= 5
                            ? "bg-amber-50 text-amber-700 border-amber-100"
                            : "bg-emerald-50 text-emerald-700 border-emerald-100"
                        }`}>
                          Nhóm {item.groupNumber}
                        </span>
                        <button
                          onClick={(e) => deleteSavedStory(item.id, e)}
                          className="text-slate-300 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors cursor-pointer"
                          title="Xóa bài đọc khỏi kho"
                          id={`btn-delete-saved-story-${item.id}`}
                        >
                          <span className="text-sm">🗑️</span>
                        </button>
                      </div>

                      {/* Preview content */}
                      <p className="text-slate-800 text-xs font-bold line-clamp-3 mb-4 leading-relaxed italic pr-1 select-none">
                        "{item.story}"
                      </p>
                    </div>

                    {/* Date & Footer indicator */}
                    <div className="border-t border-slate-150/40 pt-3 flex items-center justify-between mt-auto">
                      <span className="text-[10px] font-mono text-slate-400 font-bold">
                        {item.savedAt}
                      </span>
                      <span className={`text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shrink-0 ${
                        isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-indigo-500"
                      }`}>
                        {isActive ? "Đang học 📖" : "Mở học 📚"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

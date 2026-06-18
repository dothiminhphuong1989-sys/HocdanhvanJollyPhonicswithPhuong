import React, { useState, useEffect } from "react";
import { SoundGroup } from "../types";
import { speakPhoneme, speakWord, speakEncouragement, displayPhoneme } from "../utils/speech";
import { motion, AnimatePresence } from "motion/react";
import { analyzeWord } from "../utils/wordAnalyzer";

interface SegmentingGameProps {
  group: SoundGroup;
  customWords?: { word: string; segments: string[] }[];
  onEarnStar: () => void;
}

export default function SegmentingGame({ group, customWords = [], onEarnStar }: SegmentingGameProps) {
  const [gameMode, setGameMode] = useState<"spelling" | "listen-choose">("spelling");

  // ==========================================
  // GAME 1: SPELLING / SEGMENTING STATE & LOGIC
  // ==========================================
  const wordBank = [...group.starterWords, ...customWords];
  const uniqueWords = Array.from(new Set(wordBank.map(w => w.word)))
    .map(word => wordBank.find(w => w.word === word)!)
    .filter(Boolean);

  const [gameState, setGameState] = useState<"not-started" | "playing" | "completed">("not-started");
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [scrambledPhonemes, setScrambledPhonemes] = useState<{ id: string; sound: string; audio: string }[]>([]);
  const [spelledPhonemes, setSpelledPhonemes] = useState<string[]>([]);
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [score, setScore] = useState<number>(0);

  const currentWord = uniqueWords[currentWordIndex] || { word: "sat", segments: ["s", "a", "t"] };
  const { display: currentDisplaySegments, audio: currentAudioSegments } = analyzeWord(currentWord.word, currentWord.segments);

  const startNewWord = (index: number) => {
    const wordObj = uniqueWords[index];
    if (!wordObj) {
      setGameState("completed");
      return;
    }

    setSpelledPhonemes([]);
    setMessage(null);

    const { display: displaySegments, audio: audioSegments } = analyzeWord(wordObj.word, wordObj.segments);

    const items = displaySegments.map((sound, i) => ({
      id: `${sound}-${i}`,
      sound,
      audio: audioSegments[i]
    }));

    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setScrambledPhonemes(shuffled);
    setGameState("playing");
    
    setTimeout(() => {
      speakWord(wordObj.word, 0.75);
    }, 450);
  };

  const handleHearTargetWord = () => {
    speakWord(currentWord.word, 0.75);
  };

  const handleSelectPhoneme = async (item: { id: string; sound: string; audio: string }) => {
    const currentSegmentIndex = spelledPhonemes.length;
    const expectedSegment = currentDisplaySegments[currentSegmentIndex];

    if (item.audio) {
      await speakPhoneme(item.audio);
    }

    if (item.sound === expectedSegment) {
      const newSpelling = [...spelledPhonemes, item.sound];
      setSpelledPhonemes(newSpelling);
      setScrambledPhonemes(prev => prev.filter(p => p.id !== item.id));

      if (newSpelling.length === currentDisplaySegments.length) {
        setScore(prev => prev + 1);
        onEarnStar();
        setMessage({ text: `Xuất sắc! Con đã ghép đúng từ "${currentWord.word.toUpperCase()}"!`, isError: false });
        await speakWord(currentWord.word, 0.8);
        await speakEncouragement("Tuyệt vời!", "Amazing job!");
      }
    } else {
      setMessage({ text: "Sai âm rồi! Nghe lại từ và chọn lại nha con.", isError: true });
      setTimeout(() => setMessage(null), 2500);
    }
  };

  const handleNextWord = () => {
    const nextIndex = currentWordIndex + 1;
    if (nextIndex < uniqueWords.length) {
      setCurrentWordIndex(nextIndex);
      startNewWord(nextIndex);
    } else {
      setGameState("completed");
    }
  };

  const handleResetGame = () => {
    setCurrentWordIndex(0);
    setScore(0);
    startNewWord(0);
  };

  // ==========================================
  // GAME 2: LISTEN & CHOOSE SOUND STATE & LOGIC
  // ==========================================
  const [lcState, setLcState] = useState<"not-started" | "playing" | "answered" | "completed">("not-started");
  const [lcQuestIndex, setLcQuestIndex] = useState<number>(0);
  const [lcTargetSound, setLcTargetSound] = useState<string>("");
  const [lcOptions, setLcOptions] = useState<string[]>([]);
  const [lcSelectedOption, setLcSelectedOption] = useState<string | null>(null);
  const [lcScore, setLcScore] = useState<number>(0);
  const [lcFeedbackMessage, setLcFeedbackMessage] = useState<{ text: string; isCorrect: boolean } | null>(null);

  const startLcQuestion = (index: number) => {
    const soundsList = group.sounds.map(s => s.sound);
    const target = soundsList[index];

    if (!target) {
      setLcState("completed");
      return;
    }

    // Select distractors from all Jolly Phonics letters
    const allPhonemes = [
      "s", "a", "t", "i", "p", "n",
      "c", "k", "ck", "e", "h", "r", "m", "d",
      "g", "o", "u", "l", "f", "b",
      "ai", "j", "oa", "ie", "ee", "or",
      "z", "w", "ng", "v", "oo",
      "y", "x", "ch", "sh", "th",
      "qu", "ou", "oi", "ue", "er", "ar"
    ];

    const distractors = allPhonemes
      .filter(p => p !== target && !soundsList.filter(s => s === target).includes(p))
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const options = [target, ...distractors].sort(() => Math.random() - 0.5);

    setLcTargetSound(target);
    setLcOptions(options);
    setLcSelectedOption(null);
    setLcFeedbackMessage(null);
    setLcQuestIndex(index);
    setLcState("playing");

    setTimeout(() => {
      speakPhoneme(target);
    }, 400);
  };

  const handleLcOptionClick = async (option: string) => {
    if (lcSelectedOption !== null) return; // Prevent double click

    setLcSelectedOption(option);
    await speakPhoneme(option);

    if (option === lcTargetSound) {
      setLcScore(prev => prev + 1);
      onEarnStar();
      setLcFeedbackMessage({ text: "Chính xác rồi con ơi! Bé thông thái quá! ⭐️", isCorrect: true });
      await speakEncouragement("Xuất sắc!", "Brilliant job!");
    } else {
      setLcFeedbackMessage({ text: `Chưa chính xác rồi. Đây là âm "${option.toUpperCase()}", âm cần tìm là "${lcTargetSound.toUpperCase()}".`, isCorrect: false });
    }
  };

  const handleLcNext = () => {
    const nextIndex = lcQuestIndex + 1;
    const soundsList = group.sounds.map(s => s.sound);
    if (nextIndex < soundsList.length) {
      startLcQuestion(nextIndex);
    } else {
      setLcState("completed");
    }
  };

  const handleLcReset = () => {
    setLcScore(0);
    startLcQuestion(0);
  };

  // React to group shifts
  useEffect(() => {
    setGameState("not-started");
    setLcState("not-started");
    setScore(0);
    setLcScore(0);
  }, [group]);

  return (
    <div className="w-full bg-white rounded-[2.5rem] p-6 md:p-8 border-4 border-b-12 border-sky-100 shadow-xl" id="phonics-game-workspace">
      
      {/* Header Panel with Mode Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 pb-5 border-b-4 border-slate-100 gap-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl animate-bounce">🎮</span>
          <div>
            <h2 className="text-2xl font-black font-sans text-sky-950">
              Khu Vui Chơi Kỳ Thú (Phonics Games)
            </h2>
            <p className="text-sm text-slate-400 font-bold mt-1">Biến học tập thành niềm hạnh phúc ngọt ngào cho bé</p>
          </div>
        </div>

        {/* Chunky Professional Mode Switch */}
        <div className="bg-slate-100 p-2 rounded-[2rem] flex gap-2 self-start lg:self-center border-2 border-slate-200" id="game-mode-toggles">
          <button
            onClick={() => setGameMode("spelling")}
            className={`px-5 py-3 rounded-2xl text-sm font-black flex items-center gap-2 transition-all cursor-pointer border-2 border-b-4 ${
              gameMode === "spelling"
                ? "bg-emerald-500 border-emerald-600 border-b-emerald-700 text-white shadow-md active:translate-y-[2px]"
                : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200 border-b-slate-350"
            }`}
          >
            🧩 Ghép Vần Tạo Từ
          </button>
          <button
            onClick={() => {
              setGameMode("listen-choose");
              if (lcState === "not-started") {
                setLcState("not-started");
              }
            }}
            className={`px-5 py-3 rounded-2xl text-sm font-black flex items-center gap-2 transition-all cursor-pointer border-2 border-b-4 ${
              gameMode === "listen-choose"
                ? "bg-amber-500 border-amber-600 border-b-amber-700 text-white shadow-md active:translate-y-[2px]"
                : "bg-white hover:bg-slate-50 text-slate-705 border-slate-200 border-b-slate-350"
            }`}
          >
            🔊 Nghe Âm Chọn Chữ
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        
        {/* ==================== GAME MODE 1: SPELLING ==================== */}
        {gameMode === "spelling" && (
          <motion.div
            key="spelling-game"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-black text-slate-405 uppercase tracking-widest">Trò chơi 1: X xếp bóng chữ tinh nghịch</span>
              <span className="bg-emerald-50 text-emerald-800 text-xs px-4 py-2 rounded-full font-black border-2 border-emerald-250 shadow-sm select-none">
                Đúng: {score}/{uniqueWords.length} từ
              </span>
            </div>

            {gameState === "not-started" && (
              <div className="text-center py-10 flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-4xl mb-5 animate-bounce select-none">
                  🎈
                </div>
                <h3 className="text-xl font-black text-slate-850 mb-2">Thử thách ghép vần thính học</h3>
                <p className="text-sm text-slate-500 max-w-md mb-6 leading-relaxed font-bold">
                  Món quà thính giác: Ứng dụng sẽ đọc to một từ tiếng Anh ngẫu nhiên. Con hãy chăm chú lắng nghe và dịch chuyển những chiếc bong bóng chữ cái theo đúng thứ tự để tạo nên một đầu từ chiến thắng nhé!
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => startNewWord(0)}
                  className="px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold border-4 border-b-8 border-emerald-700 shadow-lg cursor-pointer transition-all"
                  id="btn-start-sp-game"
                >
                  Bắt đầu chơi ngay 🎮
                </motion.button>
              </div>
            )}

            {gameState === "playing" && (
              <div className="flex flex-col items-center">
                
                {/* Visual Speaker sound Box */}
                <div className="mb-8 text-center bg-slate-50 border-4 border-b-12 border-slate-200 p-6 rounded-[2.5rem] w-full max-w-md shadow-sm">
                  <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">
                    Bấm để nghe âm thanh của từ cần tìm:
                  </h3>
                  <div className="flex items-center justify-center gap-5">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleHearTargetWord}
                      className="w-20 h-20 bg-emerald-500 hover:bg-emerald-600 border-4 border-b-8 border-emerald-700 rounded-3xl flex items-center justify-center text-white shadow-md cursor-pointer"
                      id="btn-play-tg"
                    >
                      <span className="text-4xl animate-pulse select-none">🔊</span>
                    </motion.button>
                    <span className="text-sm text-slate-800 font-extrabold block text-left leading-relaxed">
                      Nghe đi nghe lại thật kỹ <br /> để đoán chính xác! 👂
                    </span>
                  </div>
                </div>

                {/* Display spelled slots */}
                <div className="w-full max-w-md bg-slate-50 border-4 border-dashed border-slate-250 rounded-[2.5rem] p-6 min-h-[140px] flex items-center justify-center gap-4 mb-8 shadow-inner">
                  {spelledPhonemes.length === 0 && (
                    <span className="text-slate-400 text-sm font-bold text-center select-none block max-w-[250px] leading-relaxed">Bong bóng chữ bé chọn sẽ bay vào đây nha! ✨</span>
                  )}
                  
                  <AnimatePresence>
                    {spelledPhonemes.map((phoneme, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, y: 15 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0 }}
                        className="w-20 h-20 bg-gradient-to-b from-white to-emerald-50 border-4 border-b-10 border-emerald-400 rounded-3xl text-emerald-800 font-mono font-black text-4xl flex items-center justify-center shadow-lg select-none"
                      >
                        {displayPhoneme(phoneme)}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Message banner */}
                {message && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`mb-6 p-4 rounded-[1.8rem] border-4 border-b-8 text-sm font-black flex items-center gap-3 w-full max-w-md shadow-md ${
                      message.isError
                        ? "bg-red-50 border-red-300 border-b-red-400 text-red-700"
                        : "bg-emerald-50 border-emerald-305 border-b-emerald-400 text-emerald-850"
                    }`}
                  >
                    <span className="text-2xl shrink-0">{message.isError ? "😢" : "🎉"}</span>
                    <span>{message.text}</span>
                  </motion.div>
                )}

                {/* Bubble choices */}
                <div className="mb-8 w-full max-w-md">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest block text-center mb-4">
                    Nhấp vào bong bóng để sắp xếp:
                  </span>
                  <div className="flex items-center justify-center gap-4 flex-wrap">
                    {scrambledPhonemes.map((item) => (
                      <motion.button
                        key={item.id}
                        whileHover={{ scale: 1.15, y: -4 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleSelectPhoneme(item)}
                        className="w-20 h-20 bg-gradient-to-b from-white to-slate-50 border-4 border-b-10 border-slate-300 hover:border-emerald-400 hover:to-emerald-50/50 rounded-full text-slate-800 font-mono font-black text-3xl flex items-center justify-center shadow-lg hover:shadow-emerald-100 cursor-pointer transition-colors"
                      >
                        {displayPhoneme(item.sound)}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Next controller */}
                {spelledPhonemes.length === currentDisplaySegments.length && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={handleNextWord}
                    className="px-8 py-4 bg-slate-800 text-white font-black rounded-2xl border-4 border-b-8 border-slate-950 shadow-md hover:bg-slate-900 flex items-center gap-2 cursor-pointer hover:scale-103 active:scale-97 transition-all text-sm"
                  >
                    <span>Từ tiếp theo</span>
                    <span className="text-lg">➔</span>
                  </motion.button>
                )}
              </div>
            )}

            {gameState === "completed" && (
              <div className="text-center py-10 flex flex-col items-center justify-center">
                <span className="text-7xl mb-6 select-none animate-bounce block">🏆</span>
                <h3 className="text-2xl font-black text-slate-850 mb-2">Quá xuất sắc con yêu!</h3>
                <p className="text-sm text-slate-500 max-w-sm mb-6 leading-relaxed font-bold">
                  Tất cả từ ngữ tinh anh đều đã bị con đánh bại chuẩn xác! Giành lấy huy hiệu thính lực và vương miện sao thôi nào!
                </p>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleResetGame}
                    className="px-6 py-4 rounded-2xl bg-white text-slate-800 border-4 border-b-8 border-slate-300 font-black hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Luyện lại từ đầu 🔄</span>
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* ==================== GAME MODE 2: LISTEN & CHOOSE ==================== */}
        {gameMode === "listen-choose" && (
          <motion.div
            key="listen-choose-game"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Trò chơi 2: Nghe âm chọn chữ siêu tốc</span>
              <span className="bg-amber-50 text-amber-800 text-xs px-4 py-2 rounded-full font-black border-2 border-amber-250 shadow-sm select-none">
                Số điểm: {lcScore}/{group.sounds.length} âm
              </span>
            </div>

            {lcState === "not-started" && (
              <div className="text-center py-10 flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center text-4xl mb-5 animate-bounce select-none">
                  🔊
                </div>
                <h3 className="text-xl font-black text-slate-850 mb-2">Học thính học: Nghe âm chọn chữ</h3>
                <p className="text-sm text-slate-500 max-w-md mb-6 leading-relaxed font-bold">
                  Món quà phát âm: Máy sẽ phát âm của một chữ cái tinh nghịch từ Nhóm {group.number}. Bé hãy nghe cẩn thận rồi chọn đúng chiếc bong bóng chứa chữ cái đó nhé!
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => startLcQuestion(0)}
                  className="px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold border-4 border-b-8 border-amber-700 shadow-lg cursor-pointer transition-all"
                  id="btn-start-lc-game"
                >
                  Bắt đầu chơi trò nghe âm 🎈
                </motion.button>
              </div>
            )}

            {lcState === "playing" && (
              <div className="flex flex-col items-center">
                
                {/* Large speaker for playback */}
                <div className="mb-8 text-center bg-amber-50/50 border-4 border-b-12 border-amber-200 p-8 rounded-[2.5rem] w-full max-w-sm shadow-inner flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-100/40 rounded-full blur-2xl pointer-events-none"></div>
                  
                  <span className="text-xs font-black text-amber-700 uppercase tracking-widest mb-4">
                    Câu số {lcQuestIndex + 1} trên {group.sounds.length}
                  </span>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => speakPhoneme(lcTargetSound)}
                    className="w-24 h-24 bg-amber-500 hover:bg-amber-600 border-4 border-b-8 border-amber-700 rounded-full flex items-center justify-center text-white shadow-xl cursor-pointer mb-4"
                    id="btn-play-lc-audio"
                  >
                    <span className="text-4xl select-none">🔊</span>
                  </motion.button>
                  <p className="text-xs text-amber-805 font-black uppercase tracking-wider">Chạm hình loa màu cam để nghe lại âm!</p>
                </div>

                {/* Option Choice Bubbles */}
                <div className="grid grid-cols-2 gap-5 w-full max-w-sm mb-6">
                  {lcOptions.map((option) => {
                    const isSelected = lcSelectedOption === option;
                    const isCorrect = option === lcTargetSound;
                    
                    let btnStyle = "bg-white border-slate-200 hover:border-amber-400 text-slate-800 hover:bg-slate-50";
                    if (lcSelectedOption !== null) {
                      if (isSelected) {
                        btnStyle = isCorrect 
                          ? "bg-emerald-500 border-emerald-700 text-white" 
                          : "bg-red-500 border-red-700 text-white";
                      } else if (isCorrect) {
                        btnStyle = "bg-emerald-100 border-emerald-300 text-emerald-800"; // display answer after wrong choice
                      }
                    }
 
                    return (
                      <motion.button
                        key={option}
                        disabled={lcSelectedOption !== null}
                        whileHover={lcSelectedOption === null ? { scale: 1.06, y: -3 } : {}}
                        whileTap={lcSelectedOption === null ? { scale: 0.94 } : {}}
                        onClick={() => handleLcOptionClick(option)}
                        className={`py-8 px-5 border-4 border-b-10 rounded-3xl font-mono font-black text-4xl shadow-md text-center cursor-pointer transition-all ${btnStyle}`}
                      >
                        {displayPhoneme(option)}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Feedback message banner */}
                {lcFeedbackMessage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`mb-6 p-4 rounded-2xl border-4 border-b-8 text-sm font-black flex items-center gap-3 w-full max-w-sm ${
                      lcFeedbackMessage.isCorrect
                        ? "bg-emerald-50 border-emerald-255 border-b-emerald-400 text-emerald-800"
                        : "bg-red-50 border-red-300 border-b-red-400 text-red-700"
                    }`}
                  >
                    <span className="text-2xl shrink-0">{lcFeedbackMessage.isCorrect ? "🥳" : "👉"}</span>
                    <span>{lcFeedbackMessage.text}</span>
                  </motion.div>
                )}

                {/* Next control */}
                {lcSelectedOption !== null && (
                  <motion.button
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={handleLcNext}
                    className="px-8 py-3.5 bg-slate-850 text-white font-black rounded-xl border-4 border-b-8 border-slate-950 shadow-md hover:bg-slate-900 flex items-center gap-2 cursor-pointer text-sm"
                  >
                    <span>Tiếp theo</span>
                    <span className="text-lg">➔</span>
                  </motion.button>
                )}
              </div>
            )}

            {lcState === "completed" && (
              <div className="text-center py-10 flex flex-col items-center justify-center">
                <span className="text-7xl mb-6 select-none animate-bounce block">🌟</span>
                <h3 className="text-2xl font-black text-amber-950 mb-2">Thần đồng phát âm xuất hiện!</h3>
                <p className="text-sm text-slate-500 max-w-sm mb-6 leading-relaxed font-bold">
                  Mẹ ơi nhìn xem, con đã rèn luyện tuyệt đỉnh và nghe chính xác {lcScore} âm thanh kỳ diệu của nhóm âm này rồi!
                </p>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLcReset}
                    className="px-6 py-4 rounded-2xl bg-white text-slate-800 border-4 border-b-8 border-slate-305 font-black hover:bg-slate-50 flex items-center gap-2 cursor-pointer animate-pulse"
                  >
                    <span>Luyện lại nhóm này 🔄</span>
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

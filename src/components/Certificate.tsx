import React, { useState, useEffect } from "react";
import { AppProgress } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { speakWord, speakEncouragement } from "../utils/speech";

interface CertificateProps {
  progress: AppProgress;
  onResetProgress?: () => void;
}

export default function Certificate({ progress, onResetProgress }: CertificateProps) {
  const [childName, setChildName] = useState<string>("");
  const [submittedName, setSubmittedName] = useState<string>("");
  const [stampActive, setStampActive] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  useEffect(() => {
    // If we have progress, play a sweet celebratory chime or sound upon rendering
    if (progress.starsCount > 0) {
      setTimeout(() => {
        speakEncouragement("Chúc mừng con yêu đã xuất sắc!", "Outstanding work completing your certificate!");
      }, 500);
    }
  }, [progress.starsCount]);

  const handleCreateCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!childName.trim()) return;
    setSubmittedName(childName.trim());
    setStampActive(true);
    setShowConfetti(true);
    speakEncouragement("Bé giỏi quá!", "Amazing job!");
  };

  const handlePrint = () => {
    window.print();
  };

  // Generate a random array of positions for our custom confetti elements
  const confettiParticles = Array.from({ length: 35 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100, // percentage x
    y: Math.random() * -100, // delay offset y
    size: Math.random() * 8 + 6, // px size
    color: ["#FBBF24", "#34D399", "#60A5FA", "#F472B6", "#A78BFA", "#F87171"][Math.floor(Math.random() * 6)],
    delay: Math.random() * 2,
    rotation: Math.random() * 360
  }));

  return (
    <div className="w-full bg-white rounded-[2.5rem] p-6 md:p-8 border-4 border-b-12 border-sky-100 shadow-xl" id="certificate-workspace">
      
      {/* Printable CSS style tags to ensure page layout is perfect and clean */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-certificate-card, #printable-certificate-card * {
            visibility: visible;
          }
          #printable-certificate-card {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            border: none !important;
            box-shadow: none !important;
            transform: none !important;
            margin: 0 !important;
            padding: 2cm !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Confetti overlay */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-25 rounded-[2.5rem] no-print" id="custom-confetti-container">
          {confettiParticles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-md opacity-90"
              style={{
                backgroundColor: p.color,
                left: `${p.x}%`,
                width: p.size,
                height: p.size,
                top: `-20px`,
                transform: `rotate(${p.rotation}deg)`,
              }}
              animate={{
                y: ["0vh", "90vh"],
                x: [`${p.x}%`, `${p.x + (Math.random() * 20 - 10)}%`],
                rotate: [p.rotation, p.rotation + 720],
                opacity: [1, 1, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 3,
                delay: p.delay,
                ease: "easeOut",
                repeat: 0
              }}
            />
          ))}
        </div>
      )}

      {/* Header instructions (Screen Only) */}
      <div className="no-print border-b-4 border-slate-105 pb-5 mb-8" id="certificate-header-instructions">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-xs border border-amber-200 shrink-0">
            <img 
              src="/src/assets/images/gold_trophy_3d_1781603250251.jpg" 
              alt="3D gold trophy"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h2 className="text-2xl font-black font-sans text-sky-955">
              Chứng Nhận Cuối Khóa Jolly Phonics
            </h2>
            <p className="text-sm text-slate-400 font-bold mt-1">Bé rèn luyện chăm chỉ để mang Bằng Danh Dự rực rỡ dán lên bảng học tập nhé!</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Option / Input Form Panel (Screen Only) */}
        <div className="lg:col-span-4 space-y-6 no-print">
          
          {/* Quick stats check */}
          <div className="bg-sky-50/50 rounded-[2rem] p-6 border-4 border-b-10 border-sky-100">
            <h4 className="text-base font-black text-sky-950 flex items-center gap-1.5 mb-4">
              <span>🌟 Thành tích bé gặt hái</span>
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm font-bold text-slate-650">
                <span>Số sao rực rỡ tích lũy:</span>
                <span className="font-black text-amber-600 bg-amber-50 border-2 border-amber-200 px-3 py-1 rounded-xl flex items-center gap-0.5 shadow-sm">{progress.starsCount} ⭐</span>
              </div>
              
              <div className="flex items-center justify-between text-sm font-bold text-slate-650">
                <span>Số nhóm âm đã học:</span>
                <span className="font-black text-sky-850 bg-sky-105/40 px-3 py-1 rounded-xl border-2 border-sky-100 shadow-sm">{progress.unlockedGroups.filter(n => n <= 7).length}/7 nhóm</span>
              </div>

              <div className="flex items-center justify-between text-sm font-bold text-slate-650">
                <span>Số từ đã thành thạo:</span>
                <span className="font-black text-emerald-850 bg-emerald-50 px-3 py-1 rounded-xl border-2 border-emerald-100/60 shadow-sm">{progress.masteredWords.length} từ</span>
              </div>
            </div>

            {progress.unlockedGroups.filter(n => n <= 7).length < 7 && (
              <div className="mt-5 p-4 bg-orange-50 border-2 border-orange-200 rounded-2xl flex gap-3 text-xs text-orange-950 shadow-inner">
                <span className="text-xl shrink-0 select-none animate-bounce">🔥</span>
                <span className="font-extrabold leading-relaxed">Ba mẹ nên hoàn thành mở khóa cả 7 nhóm âm để bé nhận được Chứng chỉ Trọn vẹn tuyệt vời nhất nhé!</span>
              </div>
            )}
          </div>

          {/* Form to enter name */}
          <div className="bg-white rounded-[2rem] p-6 border-4 border-b-10 border-slate-200 shadow-md">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Điền thông tin và đóng dấu:</h4>
            
            <form onSubmit={handleCreateCertificate} className="space-y-5">
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-wide mb-2">Tên đầy đủ của con yêu:</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Nguyễn Minh Khang"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  className="w-full px-4 py-3.5 border-4 border-slate-200 focus:border-indigo-400 focus:ring-0 rounded-2xl text-slate-800 text-base font-black outline-none transition-all shadow-inner"
                  maxLength={30}
                  id="input-child-cert-name"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-base rounded-2xl cursor-pointer border-b-6 border-indigo-850 shadow-md flex items-center justify-center gap-2 text-center"
                id="btn-generate-cert-action"
              >
                <span>Đóng Dấu & Tạo Chứng Chỉ</span>
                <img 
                  src="/src/assets/images/gold_trophy_3d_1781603250251.jpg" 
                  alt="3D Gold Trophy"
                  className="w-6 h-6 object-cover rounded-md"
                  referrerPolicy="no-referrer"
                />
              </button>
            </form>

            <AnimatePresence>
              {submittedName && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={handlePrint}
                  className="w-full mt-4 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm rounded-2xl cursor-pointer border-b-6 border-emerald-705 shadow-md flex items-center justify-center gap-2"
                  id="btn-print-certificate"
                >
                  <span className="text-base animate-pulse">🖨️</span>
                  <span>In Chứng Nhận Đẹp (Hoặc Lưu PDF)</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <div className="p-5 bg-amber-50 text-amber-900 border-4 border-b-10 border-amber-200 text-xs rounded-[2rem] flex gap-3.5 shadow-inner">
            <span className="text-2xl shrink-0 select-none animate-spin">✨</span>
            <div className="font-bold leading-relaxed text-amber-955">
              <p className="font-extrabold text-sm">Mẹo in ấn rực rỡ:</p>
              <p className="mt-1.5">
                Bấm nút <span className="underline font-bold">In Chứng Nhận</span> bên trên, trình duyệt sẽ mở hộ thoại In ấn. Ba mẹ chọn máy in màu hoặc "Lưu dưới dạng PDF" (Save as PDF) để lưu bằng khen sang máy lưu trữ an toàn rồi đem ra ngoài tiệm in màu giấy ảnh bìa dày cực đẹp nhé!
              </p>
            </div>
          </div>

        </div>

        {/* Certificate Display Screen */}
        <div className="lg:col-span-8 flex justify-center">
          
          <div
            id="printable-certificate-card"
            className="w-full max-w-[700px] aspect-[1.414/1] bg-gradient-to-br from-amber-50/70 via-white to-amber-50/40 border-[16px] md:border-[20px] border-double border-amber-500 rounded-[2rem] p-6 md:p-10 text-center relative shadow-xl overflow-hidden flex flex-col justify-between"
            style={{
              boxShadow: "0 20px 40px -15px rgba(245, 158, 11, 0.25)"
            }}
          >
            {/* Victorian Corner flourishes (Screen and print styling) */}
            <div className="absolute top-3 left-3 w-10 h-10 border-t-4 border-l-4 border-amber-400"></div>
            <div className="absolute top-3 right-3 w-10 h-10 border-t-4 border-r-4 border-amber-400"></div>
            <div className="absolute bottom-3 left-3 w-10 h-10 border-b-4 border-l-4 border-amber-400"></div>
            <div className="absolute bottom-3 right-3 w-10 h-10 border-b-4 border-r-4 border-amber-400"></div>

            {/* Background seal watermarks */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] select-none pointer-events-none text-[150px] md:text-[200px]">
              🏆
            </div>

            {/* Certificate Header contents */}
            <div>
              <div className="flex justify-center items-center gap-1.5 mb-1.5 md:mb-3">
                <span className="text-sm">⭐</span>
                <span className="text-[9px] md:text-xs font-black uppercase tracking-[0.25em] text-amber-600">Jolly Phonics Class Championship</span>
                <span className="text-sm">⭐</span>
              </div>
              
              <h3 className="text-2xl md:text-4xl font-extrabold text-slate-800 tracking-tight font-sans uppercase">
                Bằng Khen Danh Dự
              </h3>
              <p className="text-[10px] md:text-xs text-slate-400 font-extrabold uppercase mt-1 tracking-widest">Certificate of Completion</p>
            </div>

            {/* Child's glorious Name */}
            <div className="my-2 py-2 border-b-2 border-dashed border-amber-300 max-w-md mx-auto w-full min-h-[50px] md:min-h-[70px] flex items-center justify-center">
              {submittedName ? (
                <motion.h4
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-2xl md:text-4xl font-black font-sans text-indigo-750 drop-shadow-sm select-none"
                >
                  {submittedName}
                </motion.h4>
              ) : (
                <span className="text-sm md:text-base text-slate-350 italic font-medium no-print">
                  (Điền tên của bé ở bảng bên trái để xuất bằng nhé!)
                </span>
              )}
            </div>

            {/* Description context */}
            <div className="max-w-xl mx-auto">
              <p className="text-xs md:text-sm font-semibold text-slate-600 leading-relaxed">
                Đã xuất sắc hoàn thành xuất sắc khóa học <span className="font-extrabold text-sky-950">Phát Âm & Ghép Vần Phonics Anh-Mỹ</span>. Con đã dũng cảm mở khóa các nhóm âm Jolly Phonics và xuất sắc gặt hái được tổng cộng:
              </p>
              
              <div className="flex justify-center items-center gap-4 my-2.5 md:my-4">
                <span className="text-[10px] md:text-xs bg-amber-500 text-white font-black px-3.5 py-1 rounded-full border-b-2 border-amber-700">{progress.starsCount} Ngôi Sao ⭐</span>
                <span className="text-[10px] md:text-xs bg-sky-600 text-white font-black px-3.5 py-1 rounded-full border-b-2 border-sky-800">{progress.unlockedGroups.filter(n => n <= 7).length} Nhóm Âm Đã Học</span>
                <span className="text-[10px] md:text-xs bg-emerald-500 text-white font-black px-3.5 py-1 rounded-full border-b-2 border-emerald-700">{progress.masteredWords.length} Từ Đã Đoán</span>
              </div>
              
              <p className="text-[10px] md:text-xs text-slate-400 italic font-semibold">"Hành trình 1000 dặm của con bắt đầu bằng bước chân vui vẻ đầu tiên của bảng chữ cái Phonics bừng sáng hôm nay."</p>
            </div>

            {/* Signature & Stamp Bottom Section */}
            <div className="flex items-end justify-between mt-4 md:mt-8 gap-4 px-3 md:px-8">
              
              {/* Teacher Signature */}
              <div className="text-left select-none">
                <div className="h-8 md:h-12 flex items-center justify-start">
                  <span className="font-cursive text-amber-600 font-extrabold italic text-sm md:text-lg">Minh Phương Jolly</span>
                </div>
                <div className="border-t-2 border-slate-200 pt-1.5">
                  <span className="block text-[8px] md:text-[10px] font-black text-slate-700 uppercase tracking-widest">Cô Giáo</span>
                  <span className="block text-[8px] text-slate-400 font-semibold leading-none">Phụ Trách Lớp Học</span>
                </div>
              </div>

              {/* Glorious Gold Badge Seal */}
              <div className="relative shrink-0 flex items-center justify-center w-16 h-16 md:w-20 md:h-20 select-none">
                <AnimatePresence>
                  {stampActive && (
                    <motion.div
                      initial={{ scale: 3, opacity: 0, rotate: -45 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      {/* Stamp visuals */}
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-yellow-400 rounded-full flex items-center justify-center border-4 border-dashed border-yellow-600 shadow-md">
                        <span className="text-3xl md:text-4xl text-yellow-800">🏆</span>
                        
                        {/* Ribbon elements decoration behind the seal */}
                        <div className="absolute top-[85%] left-3 w-4 h-8 bg-red-600 rounded-b border border-red-700 transform rotate-12 -z-10 shadow-sm"></div>
                        <div className="absolute top-[85%] right-3 w-4 h-8 bg-red-650 rounded-b border border-red-700 transform -rotate-12 -z-10 shadow-sm"></div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {!stampActive && (
                  <div className="w-14 h-14 border border-dashed border-slate-300 rounded-full flex items-center justify-center text-[10px] text-slate-350 italic font-semibold">
                    Đóng dấu
                  </div>
                )}
              </div>

              {/* Parent Signature line */}
              <div className="text-right">
                <div className="h-8 md:h-12 flex items-end justify-end">
                  <span className="text-xs text-slate-350 italic pb-0.5 no-print">Ký ở đây</span>
                </div>
                <div className="border-t-2 border-slate-200 pt-1.5">
                  <span className="block text-[8px] md:text-[10px] font-black text-slate-700 uppercase tracking-widest">Phụ Huynh</span>
                  <span className="block text-[8px] text-slate-400 font-semibold leading-none">Ký Tên Đồng Hành</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

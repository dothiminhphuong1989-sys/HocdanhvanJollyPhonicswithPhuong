import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { speakPhoneme, speakWord, speakEncouragement } from "../utils/speech";

interface Exercise {
  type: 1 | 2 | 3 | 4; // 1: Choose word, 2: Fill in missing, 3: Match sound, 4: Sort words
  question: string;
  options?: string[]; // for multiple choice / matching
  correctAnswer: any; // index or value
  wordToShow?: string; // for fill missing "c _ t"
  itemsToSort?: { word: string; category: string }[]; // for sorting
  categoriesLabel?: string[]; // for sorting ["Short A", "Long A"]
}

interface PhonicsRuleGroup {
  id: string;
  name: string;
  emoji: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  accentColor: string;
  
  // Step 1: Observe
  observeWords: { word: string; translation: string; emoji: string }[];
  observeSound: string;
  
  // Step 2: Discover Q
  discoverQuestion: string;
  discoverOptions: string[];
  discoverCorrect: number;
  
  // Step 3: Rule Tip Card
  phonicsTip: string;
  phonicsTipExamples: string[];
  
  // Step 4: Exercises (4 items)
  exercises: Exercise[];
  
  // Step 5: Review Challenge
  reviewWords: string[];
  reviewQuestion: string;
  reviewOptions: string[];
  reviewCorrect: number;
  reviewExplanation: string;
}

const phonicsRuleGroupsData: PhonicsRuleGroup[] = [
  {
    id: "short-vowels",
    name: "Short Vowels (Nguyên âm ngắn)",
    emoji: "🍎",
    bgColor: "bg-rose-50/60",
    borderColor: "border-rose-200",
    textColor: "text-rose-900",
    accentColor: "bg-rose-500",
    observeWords: [
      { word: "cat", translation: "con mèo", emoji: "🐈" },
      { word: "hat", translation: "chiếc mũ", emoji: "🧢" },
      { word: "map", translation: "bản đồ", emoji: "🗺️" }
    ],
    observeSound: "a",
    discoverQuestion: "Mẫu tự nào tạo nên âm ngắn giống nhau trong các từ: cat, hat, map?",
    discoverOptions: ["A. Âm ngắn A (/æ/)", "B. Âm dài A (/eɪ/)", "C. Âm ngắn I (/ɪ/)"],
    discoverCorrect: 0,
    phonicsTip: "💡 Phonics Tip: Nguyên âm 'a' ngắn thường phát âm là /æ/ giống tiếng kêu dứt khoát của một chú cừu nhỏ vậy con yêu!",
    phonicsTipExamples: ["cat", "hat", "map"],
    exercises: [
      {
        type: 1,
        question: "Từ nào chứa âm ngắn Short A (/æ/)?",
        options: ["cake", "cat", "cold"],
        correctAnswer: 1
      },
      {
        type: 2,
        question: "Bé thử điền mẫu tự còn thiếu cho chú mèo: c _ t nhé!",
        wordToShow: "c _ t",
        options: ["a", "o", "e"],
        correctAnswer: "a"
      },
      {
        type: 3,
        question: "Đâu là từ phát âm chứa nguyên âm ngắn /æ/ giống 'hat'?",
        options: ["game", "map", "name"],
        correctAnswer: 1
      },
      {
        type: 4,
        question: "Bé hãy phân loại các từ sau vào đúng rổ nhé!",
        itemsToSort: [
          { word: "cat", category: "Short A" },
          { word: "hat", category: "Short A" },
          { word: "map", category: "Short A" },
          { word: "cake", category: "Long A" },
          { word: "name", category: "Long A" },
          { word: "game", category: "Long A" }
        ],
        categoriesLabel: ["Short A", "Long A"],
        correctAnswer: null
      }
    ],
    reviewWords: ["cat", "hat", "map"],
    reviewQuestion: "Các từ 'cat, hat, map' tuân theo quy tắc âm nào dưới đây?",
    reviewOptions: ["A. Long A", "B. Short A", "C. SH Sound"],
    reviewCorrect: 1,
    reviewExplanation: "✅ Chính xác! Letter 'a' thường phát ra âm ngắn /æ/ khi đứng giữa các phụ âm trong từ đơn giản đấy con!"
  },
  {
    id: "long-vowels",
    name: "Long Vowels (Nguyên âm dài)",
    emoji: "🍰",
    bgColor: "bg-amber-50/60",
    borderColor: "border-amber-200",
    textColor: "text-amber-900",
    accentColor: "bg-amber-500",
    observeWords: [
      { word: "cake", translation: "bánh ngọt", emoji: "🍰" },
      { word: "name", translation: "tên gọi", emoji: "📛" },
      { word: "game", translation: "trò chơi", emoji: "🎮" }
    ],
    observeSound: "a-e",
    discoverQuestion: "Bé nghe thấy âm gì vang lên rõ rệt khi phát âm các từ: cake, name, game?",
    discoverOptions: ["A. Âm ngắn A (/æ/)", "B. Âm dài A (/eɪ/)", "C. Âm ngắn E (/e/)"],
    discoverCorrect: 1,
    phonicsTip: "💡 Phonics Tip: Nguyên âm dài Long A phát âm đúng bằng tên chính nó /eɪ/ (A_E) đấy con yêu!",
    phonicsTipExamples: ["cake", "name", "game"],
    exercises: [
      {
        type: 1,
        question: "Từ nào có chứa âm dài Long A (/eɪ/)?",
        options: ["map", "game", "hat"],
        correctAnswer: 1
      },
      {
        type: 2,
        question: "Điền mẫu tự còn thiếu cho từ trò chơi: g _ m e",
        wordToShow: "g _ m e",
        options: ["a", "i", "o"],
        correctAnswer: "a"
      },
      {
        type: 3,
        question: "Nhấp vào từ chứa âm giống như /eɪ/ trong từ 'cake':",
        options: ["name", "bat", "rat"],
        correctAnswer: 0
      },
      {
        type: 4,
        question: "Bé hãy phân nhóm đúng các từ sau:",
        itemsToSort: [
          { word: "cake", category: "Long A" },
          { word: "play", category: "Long A" },
          { word: "day", category: "Long A" },
          { word: "mat", category: "Short A" },
          { word: "bag", category: "Short A" },
          { word: "tap", category: "Short A" }
        ],
        categoriesLabel: ["Long A", "Short A"],
        correctAnswer: null
      }
    ],
    reviewWords: ["cake", "name", "game"],
    reviewQuestion: "Các từ 'cake, name, game' tuân theo quy tắc âm nào?",
    reviewOptions: ["A. Short A", "B. Long A", "C. SH Sound"],
    reviewCorrect: 1,
    reviewExplanation: "✅ Tuyệt vời! Quy tắc: 'a_e' thường giúp chữ cái nói to tên của chính nó /eɪ/ đấy!"
  },
  {
    id: "digraphs",
    name: "Digraphs (Phụ âm ghép đôi)",
    emoji: "🐟",
    bgColor: "bg-sky-50/60",
    borderColor: "border-sky-200",
    textColor: "text-sky-900",
    accentColor: "bg-sky-500",
    observeWords: [
      { word: "fish", translation: "con cá", emoji: "🐟" },
      { word: "ship", translation: "tàu thủy", emoji: "🚢" },
      { word: "shop", translation: "cửa hàng", emoji: "🛒" }
    ],
    observeSound: "sh",
    discoverQuestion: "Cặp chữ nào cùng tạo nên âm gió xì khẽ /sh/ trong các từ: fish, ship, shop?",
    discoverOptions: ["A. ch", "B. sh", "C. th"],
    discoverCorrect: 1,
    phonicsTip: "💡 Phonics Tip: Khi hai chữ 's' và 'h' đi sát cánh nhau, chúng cùng bắt tay tạo ra âm xì phà thật mượt mà /sh/ (suỵt!) đấy con!",
    phonicsTipExamples: ["ship", "shop", "fish"],
    exercises: [
      {
        type: 1,
        question: "Từ nào phát âm kết thúc bằng âm ghép /sh/?",
        options: ["fish", "fist", "fit"],
        correctAnswer: 0
      },
      {
        type: 2,
        question: "Điền âm ghép cho từ cửa hàng: _ _ o p",
        wordToShow: "_ _ o p",
        options: ["sh", "ch", "th"],
        correctAnswer: "sh"
      },
      {
        type: 3,
        question: "Từ nào chứa âm xì hơi mạnh /sh/?",
        options: ["chair", "ship", "chin"],
        correctAnswer: 1
      },
      {
        type: 4,
        question: "Phân loại các từ theo đúng âm ghép nhé:",
        itemsToSort: [
          { word: "ship", category: "SH Sound" },
          { word: "fish", category: "SH Sound" },
          { word: "shop", category: "SH Sound" },
          { word: "chip", category: "CH Sound" },
          { word: "chin", category: "CH Sound" },
          { word: "chair", category: "CH Sound" }
        ],
        categoriesLabel: ["SH Sound", "CH Sound"],
        correctAnswer: null
      }
    ],
    reviewWords: ["ship", "shop", "fish"],
    reviewQuestion: "Các từ 'ship, shop, fish' tuân theo quy tắc âm nào?",
    reviewOptions: ["A. CH Sound", "B. SH Sound", "C. TH Sound"],
    reviewCorrect: 1,
    reviewExplanation: "✅ Lựa chọn xuất sắc! Khi s và h đứng cạnh nhau, chúng luôn tạo thành âm suỵt gió /sh/!"
  },
  {
    id: "consonant-blends",
    name: "Consonant Blends (Phụ âm ghép giữ âm lẻ)",
    emoji: "🐸",
    bgColor: "bg-emerald-50/60",
    borderColor: "border-emerald-200",
    textColor: "text-emerald-900",
    accentColor: "bg-emerald-500",
    observeWords: [
      { word: "frog", translation: "con ếch", emoji: "🐸" },
      { word: "free", translation: "miễn phí / tự do", emoji: "🆓" },
      { word: "fresh", translation: "tươi mát", emoji: "🥗" }
    ],
    observeSound: "fr",
    discoverQuestion: "Hai phụ âm đứng đầu nào được phát nhanh liên tục nối tiếp nhau trong từ: frog, free, fresh?",
    discoverOptions: ["A. tr", "B. fr", "C. bl"],
    discoverCorrect: 1,
    phonicsTip: "💡 Phonics Tip: Phụ âm ghép 'fr' giữ nguyên âm lẻ của cả hai chữ /f/ và /r/, chỉ là lướt nhanh dính chặt vào nhau thôi bấy bì!",
    phonicsTipExamples: ["frog", "free", "fresh"],
    exercises: [
      {
        type: 1,
        question: "Từ nào bắt đầu bằng phụ âm ghép lướt 'fr'?",
        options: ["tree", "frog", "flag"],
        correctAnswer: 1
      },
      {
        type: 2,
        question: "Điền phụ âm ghép phù hợp cho chú ếch: _ _ o g",
        wordToShow: "_ _ o g",
        options: ["fr", "tr", "gr"],
        correctAnswer: "fr"
      },
      {
        type: 3,
        question: "Từ nào chứa phụ âm ghép lướt 'fr'?",
        options: ["fresh", "truck", "play"],
        correctAnswer: 0
      },
      {
        type: 4,
        question: "Bé hãy phân biệt hai bộ phụ âm ghép đầu 'fr' và 'tr':",
        itemsToSort: [
          { word: "frog", category: "FR Blend" },
          { word: "free", category: "FR Blend" },
          { word: "fresh", category: "FR Blend" },
          { word: "tree", category: "TR Blend" },
          { word: "train", category: "TR Blend" },
          { word: "truck", category: "TR Blend" }
        ],
        categoriesLabel: ["FR Blend", "TR Blend"],
        correctAnswer: null
      }
    ],
    reviewWords: ["frog", "free", "fresh"],
    reviewQuestion: "Tập hợp các từ 'frog, free, fresh' có quy tắc phát âm là gì?",
    reviewOptions: ["A. Blend TR", "B. Blend FR", "C. Blend BL"],
    reviewCorrect: 1,
    reviewExplanation: "✅ Tuyệt vời! Hai phụ âm 'f' và 'r' hòa quyện nhanh chóng tạo thế ngậm /fr/ cuốn hút!"
  },
  {
    id: "vowel-teams",
    name: "Vowel Teams (Nguyên âm đôi song hành)",
    emoji: "⛵",
    bgColor: "bg-indigo-50/60",
    borderColor: "border-indigo-200",
    textColor: "text-indigo-900",
    accentColor: "bg-indigo-500",
    observeWords: [
      { word: "boat", translation: "con thuyền", emoji: "⛵" },
      { word: "goat", translation: "con dê", emoji: "🐐" },
      { word: "coat", translation: "áo khoác", emoji: "🧥" }
    ],
    observeSound: "oa",
    discoverQuestion: "Cặp nguyên âm nào đứng cạnh nhau làm chữ cái đầu phát âm dài còn bạn sau im lặng trong các từ: boat, goat, coat?",
    discoverOptions: ["A. oa", "B. ai", "C. ee"],
    discoverCorrect: 0,
    phonicsTip: "💡 Phonics Tip: Khi hai nguyên âm đi chung với nhau, nguyên âm đầu tiên làm nhiệm vụ phát âm dài dõng dạc, còn bạn phía sau giữ im lặng (như 'oa' kêu là /oʊ/!)",
    phonicsTipExamples: ["boat", "goat", "coat"],
    exercises: [
      {
        type: 1,
        question: "Từ nào có chứa cặp nguyên âm 'oa' phát âm ra là /oʊ/?",
        options: ["cat", "coat", "car"],
        correctAnswer: 1
      },
      {
        type: 2,
        question: "Điền cặp nguyên âm cho chiếc thuyền: b _ _ t",
        wordToShow: "b _ _ t",
        options: ["oa", "ai", "ee"],
        correctAnswer: "oa"
      },
      {
        type: 3,
        question: "Từ nào chứa âm kéo dài giống như trong 'boat'?",
        options: ["rain", "goat", "see"],
        correctAnswer: 1
      },
      {
        type: 4,
        question: "Phân chia các từ theo rổ nguyên âm đôi 'oa' và 'ai':",
        itemsToSort: [
          { word: "boat", category: "OA Team" },
          { word: "goat", category: "OA Team" },
          { word: "soap", category: "OA Team" },
          { word: "rain", category: "AI Team" },
          { word: "nail", category: "AI Team" },
          { word: "snail", category: "AI Team" }
        ],
        categoriesLabel: ["OA Team", "AI Team"],
        correctAnswer: null
      }
    ],
    reviewWords: ["boat", "goat", "coat"],
    reviewQuestion: "Các từ 'boat, goat, coat' tuân theo quy tắc âm nào?",
    reviewOptions: ["A. Vowel Team AI", "B. Vowel Team OA", "C. Vowel Team EE"],
    reviewCorrect: 1,
    reviewExplanation: "✅ Hoàn hảo! Khi 'o' và 'a' song hành, bạn 'o' dõng dạc nói lớn âm của mình /oʊ/, chú 'a' đi theo giữ im lặng nhé!"
  },
  {
    id: "r-controlled",
    name: "R-controlled Vowels (Nguyên âm đi với R)",
    emoji: "🚗",
    bgColor: "bg-purple-50/60",
    borderColor: "border-purple-200",
    textColor: "text-purple-900",
    accentColor: "bg-purple-500",
    observeWords: [
      { word: "car", translation: "xe hơi", emoji: "🚗" },
      { word: "star", translation: "ngôi sao", emoji: "⭐" },
      { word: "park", translation: "công viên", emoji: "🏞️" }
    ],
    observeSound: "ar",
    discoverQuestion: "Mẫu tự nào đứng sau nguyên âm làm biến đổi âm tự nhiên thành uốn lưỡi u u trong từ: car, star, park?",
    discoverOptions: ["A. Letter r", "B. Letter t", "C. Letter k"],
    discoverCorrect: 0,
    phonicsTip: "💡 Phonics Tip: Khi chữ R lém lỉnh đứng sau nguyên âm (ar), nó sẽ ra lệnh bắt nguyên âm uốn giọng khàn đặc trưng theo tiếng r đấy con yêu!",
    phonicsTipExamples: ["car", "star", "park"],
    exercises: [
      {
        type: 1,
        question: "Từ nào chứa nguyên âm bị chữ R điều khiển phát là /ɑːr/?",
        options: ["star", "step", "stay"],
        correctAnswer: 0
      },
      {
        type: 2,
        question: "Điền cặp âm bị R kiểm soát cho công viên: p _ _ k",
        wordToShow: "p _ _ k",
        options: ["ar", "or", "er"],
        correctAnswer: "ar"
      },
      {
        type: 3,
        question: "Từ nào phát âm kết thúc có đuôi /ɑːr/ uốn lưỡi?",
        options: ["arm", "aim", "ash"],
        correctAnswer: 0
      },
      {
        type: 4,
        question: "Bé hãy phân nhóm các từ có đuôi chứa 'ar' và 'or':",
        itemsToSort: [
          { word: "star", category: "AR Sound" },
          { word: "park", category: "AR Sound" },
          { word: "car", category: "AR Sound" },
          { word: "fork", category: "OR Sound" },
          { word: "horn", category: "OR Sound" },
          { word: "storm", category: "OR Sound" }
        ],
        categoriesLabel: ["AR Sound", "OR Sound"],
        correctAnswer: null
      }
    ],
    reviewWords: ["car", "star", "park"],
    reviewQuestion: "Nhóm từ 'car, star, park' đi theo quy luật ngữ âm nào dưới đây?",
    reviewOptions: ["A. Vowel AR", "B. Vowel ER", "C. Vowel OR"],
    reviewCorrect: 0,
    reviewExplanation: "✅ Bé giỏi quá! Khi chữ 'r' nghịch ngợm chiếm ưu thế, 'ar' phát ra âm trầm uốn lưỡi ấm áp /ɑːr/!"
  },
  {
    id: "silent-e",
    name: "Silent E (Chữ E câm phép thuật)",
    emoji: "🪄",
    bgColor: "bg-teal-50/60",
    borderColor: "border-teal-200",
    textColor: "text-teal-900",
    accentColor: "bg-teal-500",
    observeWords: [
      { word: "bike", translation: "xe đạp", emoji: "🚲" },
      { word: "kite", translation: "chiếc diều", emoji: "🪁" },
      { word: "home", translation: "ngôi nhà", emoji: "🏠" }
    ],
    observeSound: "e-silent",
    discoverQuestion: "Chữ cái phép thuật nào đứng cuối từ dẫu câm lặng nhưng biến nguyên âm trước nói to chữ cái gốc của mình?",
    discoverOptions: ["A. Letter e", "B. Letter a", "C. Letter o"],
    discoverCorrect: 0,
    phonicsTip: "💡 Phonics Tip: Chữ E câm (Silent e) đứng cuối từ hoàn toàn im hơi lặng tiếng, nhưng có phép lạ thổi bay một phụ âm ra trước để bắt nguyên âm đứng trước phát đúng nguyên vần chữ cái gốc!",
    phonicsTipExamples: ["bike", "kite", "home"],
    exercises: [
      {
        type: 1,
        question: "Từ nào chịu tác động đổi âm bởi chữ E phép thuật đứng cuối?",
        options: ["bike", "bit", "bin"],
        correctAnswer: 0
      },
      {
        type: 2,
        question: "Điền mẫu tự cuối cùng cho chiếc diều: k i t _",
        wordToShow: "k i t _",
        options: ["e", "a", "s"],
        correctAnswer: "e"
      },
      {
        type: 3,
        question: "Bé chọn ví dụ có quy luật của chữ E câm kì diệu nhé!",
        options: ["home", "hop", "hot"],
        correctAnswer: 0
      },
      {
        type: 4,
        question: "Hãy tách rời các từ chữ E câm và nguyên âm ngắn thông thường:",
        itemsToSort: [
          { word: "cake", category: "Magic E" },
          { word: "bike", category: "Magic E" },
          { word: "home", category: "Magic E" },
          { word: "cat", category: "Short Vowel" },
          { word: "bit", category: "Short Vowel" },
          { word: "hop", category: "Short Vowel" }
        ],
        categoriesLabel: ["Magic E", "Short Vowel"],
        correctAnswer: null
      }
    ],
    reviewWords: ["bike", "kite", "home"],
    reviewQuestion: "Các từ 'bike, kite, home' đều chịu ảnh hưởng của quy tắc gì?",
    reviewOptions: ["A. Soft C", "B. Silent E", "C. Short Vowels"],
    reviewCorrect: 1,
    reviewExplanation: "✅ Thật xuất sắc! Chữ 'e' ở cuối đứng lặng lẽ nhường toàn bộ năng lượng biến nguyên âm ở trước thành âm dài!"
  },
  {
    id: "soft-c",
    name: "Soft C (Phụ âm C nhẹ nhàng /s/)",
    emoji: "🪙",
    bgColor: "bg-cyan-50/60",
    borderColor: "border-cyan-200",
    textColor: "text-cyan-900",
    accentColor: "bg-cyan-500",
    observeWords: [
      { word: "cent", translation: "tiền xu cent", emoji: "🪙" },
      { word: "circus", translation: "rạp xiếc", emoji: "🎪" },
      { word: "city", translation: "thành phố", emoji: "🏙️" }
    ],
    observeSound: "c-soft",
    discoverQuestion: "Kí tự 'c' phát âm xì sssss mềm mại giống hệt như chú rắn khi đứng trước các ký tự nào?",
    discoverOptions: ["A. e, i, y", "B. a, o, u", "C. p, t, k"],
    discoverCorrect: 0,
    phonicsTip: "💡 Phonics Tip: Khi chữ C đứng trước các bạn 'e, i, y', nó rũ bỏ tính cách khàn đặc của tiếng gõ thước âm /k/ để nhẹ lòng kêu xì sssss êm tai nhé!",
    phonicsTipExamples: ["cent", "circus", "city"],
    exercises: [
      {
        type: 1,
        question: "Từ nào chứa âm Soft C phát âm là /s/?",
        options: ["city", "cat", "cup"],
        correctAnswer: 0
      },
      {
        type: 2,
        question: "Nhìn hình thành phố và điền chữ cái bắt đầu: _ i t y",
        wordToShow: "_ i t y",
        options: ["c", "s", "t"],
        correctAnswer: "c"
      },
      {
        type: 3,
        question: "Từ nào có chứa âm /s/ dẫu kết thúc bằng chữ 'c'?",
        options: ["rice", "rock", "rack"],
        correctAnswer: 0
      },
      {
        type: 4,
        question: "Bé hãy phân loại cực chuẩn âm C nhẹ (/s/) và C cứng (/k/):",
        itemsToSort: [
          { word: "cent", category: "Soft C /s/" },
          { word: "city", category: "Soft C /s/" },
          { word: "rice", category: "Soft C /s/" },
          { word: "cat", category: "Hard C /k/" },
          { word: "cup", category: "Hard C /k/" },
          { word: "candy", category: "Hard C /k/" }
        ],
        categoriesLabel: ["Soft C /s/", "Hard C /k/"],
        correctAnswer: null
      }
    ],
    reviewWords: ["cent", "city", "rice"],
    reviewQuestion: "Các từ 'cent, city, rice' tuân theo quy tắc gì?",
    reviewOptions: ["A. Soft C", "B. Hard C", "C. Soft G"],
    reviewCorrect: 0,
    reviewExplanation: "✅ Tuyệt cú mèo! Cứ đứng trước e, i, y thì chữ C lập tức phát ra âm xì hơi /s/!"
  },
  {
    id: "soft-g",
    name: "Soft G (Phụ âm G nhẹ nhàng /dʒ/)",
    emoji: "🦒",
    bgColor: "bg-orange-50/60",
    borderColor: "border-orange-200",
    textColor: "text-orange-950",
    accentColor: "bg-orange-500",
    observeWords: [
      { word: "giraffe", translation: "hươu cao cổ", emoji: "🦒" },
      { word: "gem", translation: "viên ngọc quý", emoji: "💎" },
      { word: "orange", translation: "quả cam tròn", emoji: "🍊" }
    ],
    observeSound: "g-soft",
    discoverQuestion: "Mẫu tự 'g' phát âm nhẹ giống như chữ âm /dʒ/ (như J trong tiếng Anh) đứng trước các chữ cái nào?",
    discoverOptions: ["A. e, i, y", "B. a, o, u", "C. m, n, p"],
    discoverCorrect: 0,
    phonicsTip: "💡 Phonics Tip: Khi chữ G kêu hãnh đứng trước ba bạn 'e, i, y', nó dịu dàng chuyển từ giọng khạc đặc trưng /g/ sang âm rung miệng đầy sức hút /dʒ/ tựa chữ J đó!",
    phonicsTipExamples: ["gem", "giraffe", "orange"],
    exercises: [
      {
        type: 1,
        question: "Từ nào chứa âm từ tốn Soft G phát âm tựa chữ J (/dʒ/)?",
        options: ["gem", "goat", "gum"],
        correctAnswer: 0
      },
      {
        type: 2,
        question: "Bé điền chữ cái bắt đầu rực sáng cho viên ngọc: _ e m",
        wordToShow: "_ e m",
        options: ["g", "j", "d"],
        correctAnswer: "g"
      },
      {
        type: 3,
        question: "Quả cam hay gã khổng lồ? Từ nào có Soft G phát âm là /dʒ/?",
        options: ["giant", "gold", "gas"],
        correctAnswer: 0
      },
      {
        type: 4,
        question: "Cùng chia tách các từ có âm Soft G và Hard G nhé con:",
        itemsToSort: [
          { word: "gem", category: "Soft G /dʒ/" },
          { word: "giant", category: "Soft G /dʒ/" },
          { word: "orange", category: "Soft G /dʒ/" },
          { word: "goat", category: "Hard G /g/" },
          { word: "gas", category: "Hard G /g/" },
          { word: "green", category: "Hard G /g/" }
        ],
        categoriesLabel: ["Soft G /dʒ/", "Hard G /g/"],
        correctAnswer: null
      }
    ],
    reviewWords: ["gem", "giant", "orange"],
    reviewQuestion: "Ba từ trên đây cùng quy chiếu về quy tắc âm nào con nhỉ?",
    reviewOptions: ["A. Soft C", "B. Hard G", "C. Soft G"],
    reviewCorrect: 2,
    reviewExplanation: "✅ Hoàn hảo rồi! Đệ tử G đứng trước e, i, y thì đổi dạng phát âm thanh tiếng chuông ngân /dʒ/!"
  }
];

export default function PhonicsDiscovery() {
  const [selectedGroupIndex, setSelectedGroupIndex] = useState<number>(0);
  const currentGroup = phonicsRuleGroupsData[selectedGroupIndex];

  // Learning steps: "observe" | "discover" | "practice" | "review"
  const [step, setStep] = useState<"observe" | "discover" | "practice" | "review">("observe");
  
  // States of Step 1: Observe
  const [listenedWords, setListenedWords] = useState<Record<string, boolean>>({});

  // States of Step 2: Discover & Phonics Tip
  const [discoverAnsw, setDiscoverAnsw] = useState<number | null>(null);
  const [discoverAttempts, setDiscoverAttempts] = useState<number>(0);
  const [showTip, setShowTip] = useState<boolean>(false);

  // States of Step 3: Practice (4 Exercises)
  const [exerciseIndex, setExerciseIndex] = useState<number>(0);
  const [exOptionSelected, setExOptionSelected] = useState<any>(null); // For MC questions
  const [exWrongAttempts, setExWrongAttempts] = useState<number>(0);
  const [exCorrectMap, setExCorrectMap] = useState<Record<number, boolean>>({});
  
  // Custom states for Sorting Exercise (Exercise 4 of Step 3)
  const currentExercise = currentGroup.exercises[exerciseIndex];
  const [sortItems, setSortItems] = useState<{ word: string; category: string; sortedCategory?: string; isCorrectStatus?: boolean }[]>([]);
  const [currentSortItemIndex, setCurrentSortItemIndex] = useState<number>(0);

  // States of Step 4: Review Challenge
  const [reviewAnswer, setReviewAnswer] = useState<number | null>(null);
  const [reviewSuccess, setReviewSuccess] = useState<boolean>(false);
  const [reviewAttempts, setReviewAttempts] = useState<number>(0);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  // Reset core states when group changes
  useEffect(() => {
    setStep("observe");
    setListenedWords({});
    setDiscoverAnsw(null);
    setDiscoverAttempts(0);
    setShowTip(false);
    setExerciseIndex(0);
    setExOptionSelected(null);
    setExWrongAttempts(0);
    setExCorrectMap({});
    setReviewAnswer(null);
    setReviewSuccess(false);
    setReviewAttempts(0);
    setShowExplanation(false);
  }, [selectedGroupIndex]);

  // Hook into initialization of sorting items
  useEffect(() => {
    if (step === "practice" && currentExercise && currentExercise.type === 4 && currentExercise.itemsToSort) {
      const items = currentExercise.itemsToSort.map(item => ({
        ...item,
        sortedCategory: undefined,
        isCorrectStatus: undefined
      }));
      setSortItems(items);
      setCurrentSortItemIndex(0);
    }
  }, [step, exerciseIndex, selectedGroupIndex]);

  // Sound play managers
  const handleWordClick = async (word: string) => {
    await speakWord(word, 0.76);
    setListenedWords(p => ({ ...p, [word]: true }));
  };

  const handleSoundTrack = async (snd: string) => {
    // Custom phoneme mappings matching the rule helper
    await speakPhoneme(snd);
  };

  const handleDiscoverOptionSelect = (optionIdx: number) => {
    setDiscoverAnsw(optionIdx);
    if (optionIdx === currentGroup.discoverCorrect) {
      speakEncouragement("Bé trả lời đúng rồi!", "Excellent job!");
      setShowTip(true);
    } else {
      const newAttempts = discoverAttempts + 1;
      setDiscoverAttempts(newAttempts);
      if (newAttempts >= 2) {
        speakEncouragement("Con xem gợi ý nhé!", "Let's check the hint!");
        setShowTip(true);
      } else {
        speakEncouragement("Thử lại xem nào!", "Try again!");
      }
    }
  };

  const handleExerciseOptionSelect = (selectedVal: any) => {
    setExOptionSelected(selectedVal);
    const correctAns = currentExercise.correctAnswer;
    
    if (selectedVal === correctAns) {
      speakEncouragement("Đúng rồi bé ơi!", "Superb!");
      setExCorrectMap(p => ({ ...p, [exerciseIndex]: true }));
    } else {
      const wAtt = exWrongAttempts + 1;
      setExWrongAttempts(wAtt);
      if (wAtt >= 2) {
        // Expose correct answer or help tip
        speakEncouragement("Bé quan sát đáp án nha!", "Look at the tip!");
        setExOptionSelected(correctAns); // Auto fill correct
        setExCorrectMap(p => ({ ...p, [exerciseIndex]: true }));
      } else {
        speakEncouragement("Sai rồi, thử lại nhé!", "Let's try one more time!");
      }
    }
  };

  const handleSortItemToCategory = (category: string) => {
    if (currentSortItemIndex >= sortItems.length) return;
    
    const currentItem = sortItems[currentSortItemIndex];
    const isCorrect = currentItem.category === category;
    
    // Animate item sound
    speakWord(currentItem.word, 0.8);

    const updatedItems = [...sortItems];
    updatedItems[currentSortItemIndex] = {
      ...currentItem,
      sortedCategory: category,
      isCorrectStatus: isCorrect
    };

    setSortItems(updatedItems);

    if (isCorrect) {
      speakEncouragement("Cực chuẩn con ơi!", "Way to go!");
    } else {
      speakEncouragement("Nhầm xíu rồi, không sao con!", "Almost got it!");
    }

    setTimeout(() => {
      if (currentSortItemIndex + 1 < sortItems.length) {
        setCurrentSortItemIndex(currentSortItemIndex + 1);
      } else {
        // Complete the exercises!
        setExCorrectMap(p => ({ ...p, [exerciseIndex]: true }));
      }
    }, 1100);
  };

  const handleReviewOptionCheck = (optIdx: number) => {
    setReviewAnswer(optIdx);
    if (optIdx === currentGroup.reviewCorrect) {
      speakEncouragement("Chúc mừng bé đã thành thạo quy tắc nhé!", "Congratulations master!");
      setReviewSuccess(true);
      setShowExplanation(true);
    } else {
      const att = reviewAttempts + 1;
      setReviewAttempts(att);
      if (att >= 2) {
        speakEncouragement("Ba mẹ hãy bật giải thích nhé!", "Let's learn the rule!");
        setShowExplanation(true);
      } else {
        speakEncouragement("Con suy nghĩ kĩ lại chút nha!", "Double check!");
      }
    }
  };

  // Check if step 1 is completed (learner has tested all 3 words)
  const isObserveCompleted = currentGroup.observeWords.every(item => listenedWords[item.word]);

  return (
    <div className="w-full bg-white rounded-[2.5rem] p-6 md:p-8 border-4 border-b-12 border-sky-150 shadow-xl" id="phonics-discovery-root">
      {/* Title block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-4 border-sky-100 pb-5 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl animate-bounce">💡</span>
          <div>
            <h2 className="text-2xl font-black font-sans text-sky-950">
              Khám Phá Quy Tắc Phonics
            </h2>
            <p className="text-xs text-slate-450 font-bold">Phương pháp rèn âm tự nhiên: Quan Sát → Luyện Tập → Tự Tìm Quy Luật</p>
          </div>
        </div>
        
        {/* Soft custom combobox layout */}
        <select
          value={selectedGroupIndex}
          onChange={(e) => setSelectedGroupIndex(parseInt(e.target.value, 10))}
          className="px-4 py-2.5 rounded-2xl bg-sky-50 text-sky-900 border-2 border-sky-200 font-sans font-black text-xs cursor-pointer focus:outline-none focus:ring-4 focus:ring-sky-100 uppercase tracking-wide shadow-sm"
        >
          {phonicsRuleGroupsData.map((g, idx) => (
            <option key={g.id} value={idx}>
              {g.emoji} {idx + 1}. {g.name}
            </option>
          ))}
        </select>
      </div>

      {/* stepper menu indicator */}
      <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-2xl border-2 border-slate-200/60 mb-6 gap-2 flex-wrap">
        <button
          onClick={() => { setStep("observe"); setExOptionSelected(null); setExWrongAttempts(0); }}
          className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
            step === "observe"
              ? "bg-sky-500 text-white shadow-sm"
              : "text-slate-500 hover:bg-slate-100"
          }`}
        >
          👁️ 1. Quan sát
        </button>
        <div className="text-slate-300">➔</div>
        <button
          disabled={!isObserveCompleted && step === "observe"}
          onClick={() => { setStep("discover"); setExOptionSelected(null); setExWrongAttempts(0); }}
          className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer disabled:opacity-50 ${
            step === "discover"
              ? "bg-amber-500 text-white shadow-sm"
              : "text-slate-500 hover:bg-slate-100"
          }`}
        >
          ❓ 2. Khám phá
        </button>
        <div className="text-slate-300">➔</div>
        <button
          disabled={(!showTip && step !== "practice" && step !== "review")}
          onClick={() => { setStep("practice"); setExerciseIndex(0); setExOptionSelected(null); setExWrongAttempts(0); }}
          className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer disabled:opacity-50 ${
            step === "practice"
              ? "bg-emerald-500 text-white shadow-sm"
              : "text-slate-500 hover:bg-slate-100"
          }`}
        >
          📝 3. Luyện tập
        </button>
        <div className="text-slate-300">➔</div>
        <button
          disabled={!exCorrectMap[3] && step !== "review"}
          onClick={() => setStep("review")}
          className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer disabled:opacity-50 ${
            step === "review"
              ? "bg-purple-600 text-white shadow-sm"
              : "text-slate-500 hover:bg-slate-100"
          }`}
        >
          🏆 4. Ôn tập
        </button>
      </div>

      <div className={`rounded-3xl border-4 border-b-12 ${currentGroup.borderColor} ${currentGroup.bgColor} p-6 min-h-[380px] flex flex-col justify-between transition-colors duration-500`}>
        <AnimatePresence mode="wait">
          
          {/* STEP 1: OBSERVE */}
          {step === "observe" && (
            <motion.div
              key="step-observe"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-6"
            >
              <div className="text-center">
                <span className="text-xs bg-white px-3 py-1 rounded-full border border-slate-200 uppercase tracking-widest font-black text-slate-500">Mốc 1: Nhìn Chữ & Nghe Phát Âm</span>
                <p className="text-lg font-black text-slate-800 mt-2">Bé hãy nhấp vào từng bức tranh hoặc từ dưới đây để nghe âm thanh nhé!</p>
              </div>

              {/* Word Display Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
                {currentGroup.observeWords.map((item, idx) => {
                  const clicked = listenedWords[item.word];
                  return (
                    <motion.button
                      key={item.word}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleWordClick(item.word)}
                      className={`p-6 bg-white rounded-2xl border-2 border-b-6 shadow-sm flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${
                        clicked ? "border-emerald-300 bg-emerald-50/10" : "border-slate-200"
                      }`}
                    >
                      <span className="text-5xl select-none">{item.emoji}</span>
                      <span className="text-2xl font-mono font-black uppercase text-slate-800 tracking-wider">
                        {item.word}
                      </span>
                      <span className="text-xs font-bold text-slate-400 capitalize bg-slate-50 px-3 py-1 rounded-full">{item.translation}</span>
                      
                      {clicked ? (
                        <span className="text-[10px] font-black text-emerald-600 flex items-center gap-1">
                          🟢 Đã nghe 🔊
                        </span>
                      ) : (
                        <span className="text-[10px] font-black text-rose-500 animate-pulse flex items-center gap-1">
                          🔴 Nhấp nghe 🔊
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Next step prompt */}
              <div className="flex flex-col items-center gap-2 mt-2">
                <p className="text-xs text-slate-500 font-extrabold text-center">
                  {isObserveCompleted 
                    ? "🎉 Tuyệt lắm! Bé đã nghe hết tất cả các từ mẫu rồi đấy. Nhấp nút màu vàng phía dưới để bắt đầu đố vui nghe âm!" 
                    : "👉 Hãy nhấp nghe cả 3 từ mẫu trên để mở khóa bước giải đố tiếp theo nha!"}
                </p>
                <button
                  disabled={!isObserveCompleted}
                  onClick={() => setStep("discover")}
                  className={`px-8 py-3.5 rounded-2xl font-black text-white text-sm transition-all shadow-md flex items-center gap-1.5 cursor-pointer ${
                    isObserveCompleted
                      ? "bg-amber-500 hover:bg-amber-600 border-4 border-b-8 border-amber-700 active:translate-y-1 active:border-b-4 hover:scale-103"
                      : "bg-slate-350 cursor-not-allowed opacity-50 border-4 border-b-8 border-slate-400"
                  }`}
                  id="btn-next-to-discover"
                >
                  <span>Bắt đầu Đố bạn ➔</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: DISCOVER */}
          {step === "discover" && (
            <motion.div
              key="step-discover"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-5"
            >
              <div className="text-center">
                <span className="text-xs bg-white px-3 py-1 rounded-full border border-slate-200 uppercase tracking-widest font-black text-slate-500">Mốc 2: Khám Phá Quy Tắc Kỳ Diệu</span>
                <p className="text-lg font-black text-slate-800 mt-2">Bé hãy trả lời câu hỏi dưới đây xem sao!</p>
              </div>

              {/* Question card */}
              <div className="bg-white/80 rounded-2xl border-2 border-slate-200 p-5 mt-2 shadow-xs">
                <p className="text-base font-black text-slate-800">{currentGroup.discoverQuestion}</p>
                
                <div className="grid grid-cols-1 gap-2.5 mt-4">
                  {currentGroup.discoverOptions.map((opt, oIdx) => {
                    const isSelected = discoverAnsw === oIdx;
                    const isCorrect = oIdx === currentGroup.discoverCorrect;
                    
                    let cardStyle = "border-slate-200 hover:bg-slate-50 text-slate-705";
                    if (isSelected) {
                      cardStyle = isCorrect
                        ? "bg-emerald-50 border-emerald-450 border-b-6 text-emerald-950 scale-101 shadow-sm"
                        : "bg-rose-50 border-rose-450 border-b-6 text-rose-950";
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={showTip}
                        onClick={() => handleDiscoverOptionSelect(oIdx)}
                        className={`w-full text-left px-5 py-4 rounded-xl border-2 font-black text-xs sm:text-sm active:scale-99 transition-all cursor-pointer ${cardStyle}`}
                      >
                        <span className="mr-1">{opt}</span>
                        {isSelected && isCorrect && <span className="ml-2">✅ Đúng rồi!</span>}
                        {isSelected && !isCorrect && <span className="ml-2">❌ Thử lại!</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Phonics Tip Card */}
              {showTip && (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-amber-500 border-4 border-b-8 border-amber-600 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden"
                  id="phonics-tip-card"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-4xl animate-bounce shrink-0 select-none">💡</span>
                    <div>
                      <h4 className="text-base font-black uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <span>PHONICS TIP QUY TẮC</span>
                      </h4>
                      <p className="font-bold text-sm leading-relaxed text-amber-50">
                        {currentGroup.phonicsTip}
                      </p>
                      
                      <div className="flex items-center gap-2 mt-4 flex-wrap">
                        <span className="text-xs font-black uppercase tracking-wide text-amber-950 bg-amber-205 px-2.5 py-0.5 rounded-full border border-amber-300">Ví dụ:</span>
                        {currentGroup.phonicsTipExamples.map(ex => (
                          <button
                            key={ex}
                            onClick={() => speakWord(ex, 0.77)}
                            className="bg-white font-mono hover:scale-105 active:scale-95 text-amber-950 font-black uppercase px-3 py-1 rounded-xl text-xs border border-amber-205 cursor-pointer shadow-sm flex items-center gap-1"
                          >
                            <span>🔊</span>
                            <span>{ex}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Progression to exercise */}
              {showTip && (
                <div className="flex flex-col items-center mt-3 animate-fade-in">
                  <button
                    onClick={() => { setStep("practice"); setExerciseIndex(0); setExOptionSelected(null); setExWrongAttempts(0); }}
                    className="px-8 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 border-4 border-b-8 border-emerald-700 font-black text-white text-sm shadow-md flex items-center gap-1.5 cursor-pointer animate-pulse-slow active:translate-y-1 active:border-b-4 hover:scale-103"
                    id="btn-go-to-exercise"
                  >
                    <span>Luyện Tập Với Quy Tắc ➔</span>
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 3: PRACTICE */}
          {step === "practice" && (
            <motion.div
              key="step-practice"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-4"
            >
              {/* Exercise headers with micro trackers */}
              <div className="flex items-center justify-between border-b pb-3 flex-wrap gap-2">
                <div>
                  <span className="text-xs bg-white px-2.5 py-0.5 rounded-full border border-slate-200 uppercase tracking-widest font-black text-emerald-600">Thực Hành Luyện Tập</span>
                  <h3 className="text-base font-black text-slate-800 mt-1">Bài tập {exerciseIndex + 1} / 4</h3>
                </div>
                
                {/* 4 dots showing completed exercises */}
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border">
                  {[0, 1, 2, 3].map(itemIdx => {
                    const isExCompleted = exCorrectMap[itemIdx];
                    const isExCurrent = exerciseIndex === itemIdx;
                    return (
                      <div
                        key={itemIdx}
                        className={`w-3.5 h-3.5 rounded-full transition-all border ${
                          isExCompleted
                            ? "bg-emerald-500 border-emerald-600"
                            : isExCurrent
                            ? "bg-amber-400 border-amber-500 animate-pulse scale-110"
                            : "bg-slate-100 border-slate-300"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* EXERCISE CONTENT RENDER AREA */}
              <div className="my-1.5 flex-grow">
                {/* EXERCISE TYPE 1: Choose word */}
                {currentExercise.type === 1 && (
                  <div className="flex flex-col gap-4">
                    <p className="text-lg font-black text-slate-800 text-center">{currentExercise.question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                      {currentExercise.options?.map((opt, optIdx) => {
                        const isChosen = exOptionSelected === optIdx;
                        const isCorrect = optIdx === currentExercise.correctAnswer;
                        
                        let optStyle = "border-slate-200 hover:bg-slate-50 text-slate-800 bg-white";
                        if (isChosen) {
                          optStyle = isCorrect
                            ? "bg-emerald-500 text-white border-emerald-650 border-b-6 shadow-md"
                            : "bg-rose-50 border-rose-455 text-rose-950 border-b-6";
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={exCorrectMap[exerciseIndex]}
                            onClick={() => handleExerciseOptionSelect(optIdx)}
                            className={`px-5 py-6 rounded-2xl border-2 font-mono font-black text-center text-lg uppercase cursor-pointer active:scale-98 transition-all flex flex-col items-center justify-center gap-3 ${optStyle}`}
                          >
                            <span className="text-3xl">🔊</span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* EXERCISE TYPE 2: Fill in missing letters */}
                {currentExercise.type === 2 && (
                  <div className="flex flex-col gap-4 items-center">
                    <p className="text-lg font-black text-slate-805 text-center">{currentExercise.question}</p>
                    
                    {/* Big word placeholder card */}
                    <div className="bg-white px-10 py-8 rounded-3xl border-2 border-dashed border-slate-300 flex items-center justify-center gap-4 text-5xl font-mono font-black uppercase text-slate-800 select-none shadow-inner my-2 tracking-widest">
                      {currentExercise.wordToShow?.split(" ").map((char, index) => {
                        if (char === "_") {
                          const isFilled = exOptionSelected !== null;
                          return (
                            <motion.span
                              key={index}
                              animate={isFilled ? { scale: [1, 1.2, 1], color: "#10b981" } : {}}
                              className={`w-14 h-16 border-b-4 border-indigo-500 text-center flex items-center justify-center ${isFilled ? "text-emerald-500 font-extrabold" : "text-indigo-400"}`}
                            >
                              {isFilled ? exOptionSelected : "?"}
                            </motion.span>
                          );
                        }
                        return <span key={index}>{char}</span>;
                      })}
                    </div>

                    {/* Options select */}
                    <div className="flex gap-4 my-2 justify-center">
                      {currentExercise.options?.map(letter => {
                        const isChosen = exOptionSelected === letter;
                        const isCorrect = letter === currentExercise.correctAnswer;
                        
                        let letterStyle = "bg-white border-slate-200 hover:bg-slate-50 text-slate-700";
                        if (isChosen) {
                          letterStyle = isCorrect
                            ? "bg-emerald-500 text-white border-emerald-650 scale-103 shadow-md"
                            : "bg-rose-50 border-rose-400 text-rose-900";
                        }

                        return (
                          <button
                            key={letter}
                            disabled={exCorrectMap[exerciseIndex]}
                            onClick={() => handleExerciseOptionSelect(letter)}
                            className={`w-16 h-16 rounded-2xl border-2 border-b-5 font-mono font-extrabold text-2xl uppercase flex items-center justify-center cursor-pointer active:scale-95 transition-all ${letterStyle}`}
                          >
                            {letter}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* EXERCISE TYPE 3: Match sound to word */}
                {currentExercise.type === 3 && (
                  <div className="flex flex-col gap-4 items-center">
                    <p className="text-lg font-black text-slate-800 text-center">{currentExercise.question}</p>
                    
                    {/* Big play Sound Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={async () => {
                        if (currentGroup.id === "short-vowels") {
                          await speakPhoneme("a");
                        } else if (currentGroup.id === "long-vowels") {
                          await speakWord("game", 0.73);
                        } else if (currentGroup.id === "digraphs") {
                          await speakPhoneme("sh");
                        } else if (currentGroup.id === "consonant-blends") {
                          await speakPhoneme("f");
                          await speakPhoneme("r");
                        } else if (currentGroup.id === "vowel-teams") {
                          await speakPhoneme("oa");
                        } else if (currentGroup.id === "r-controlled") {
                          await speakPhoneme("ar");
                        } else if (currentGroup.id === "silent-e") {
                          await speakPhoneme("e-silent");
                        } else if (currentGroup.id === "soft-c") {
                          await speakPhoneme("s");
                        } else if (currentGroup.id === "soft-g") {
                          await speakPhoneme("j");
                        }
                      }}
                      className="px-6 py-4 rounded-full bg-amber-400 hover:bg-amber-500 text-amber-950 font-black flex items-center justify-center gap-2 border-b-4 border-amber-600 cursor-pointer shadow-sm animate-pulse"
                    >
                      <span className="text-xl">🔊</span>
                      <span>Nhấp nghe âm đố</span>
                    </motion.button>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full mt-3">
                      {currentExercise.options?.map((opt, optIdx) => {
                        const isChosen = exOptionSelected === optIdx;
                        const isCorrect = optIdx === currentExercise.correctAnswer;
                        
                        let cardStyle = "bg-white border-slate-200 hover:bg-slate-50 text-slate-800";
                        if (isChosen) {
                          cardStyle = isCorrect
                            ? "bg-emerald-500 text-white border-emerald-650 border-b-6 scale-101 shadow-md"
                            : "bg-rose-50 border-rose-450 border-b-6 text-rose-950";
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={exCorrectMap[exerciseIndex]}
                            onClick={() => handleExerciseOptionSelect(optIdx)}
                            className={`px-5 py-5 rounded-2xl border-2 font-mono font-black text-center text-base uppercase cursor-pointer active:scale-97 transition-all flex items-center justify-center gap-2 ${cardStyle}`}
                          >
                            <span>🔊</span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* EXERCISE TYPE 4: Sort words (Tap to sort - premium mobile responsive) */}
                {currentExercise.type === 4 && (
                  <div className="flex flex-col gap-4">
                    <p className="text-base sm:text-lg font-black text-slate-810 text-center">Bé hãy rèn kĩ năng sắp xếp từ vào đúng rổ!</p>
                    
                    {/* Baskets view */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Left basket: categoriesLabel[0] */}
                      <button
                        onClick={() => handleSortItemToCategory(currentExercise.categoriesLabel?.[0] || "")}
                        disabled={currentSortItemIndex >= sortItems.length}
                        className="p-4 bg-sky-200/50 hover:bg-sky-200 border-4 border-b-10 border-sky-305 rounded-3xl flex flex-col items-center justify-center min-h-[120px] transition-all cursor-pointer group"
                      >
                        <span className="text-4xl group-hover:scale-110 transition-transform select-none">🧺</span>
                        <span className="text-xs sm:text-sm font-black text-sky-900 mt-2 uppercase tracking-wide">
                          Rổ {currentExercise.categoriesLabel?.[0]}
                        </span>
                        
                        {/* Display sorted items inside */}
                        <div className="flex flex-wrap gap-1 mt-2.5 justify-center max-h-[80px] overflow-y-auto">
                          {sortItems
                            .filter(x => x.sortedCategory === currentExercise.categoriesLabel?.[0])
                            .map((x, i) => (
                              <span
                                key={i}
                                className={`text-[9px] font-mono font-black px-2 py-0.5 rounded-full uppercase border ${
                                  x.isCorrectStatus ? "bg-emerald-500 border-emerald-600 text-white" : "bg-red-400 border-red-500 text-white"
                                }`}
                              >
                                {x.word}
                              </span>
                            ))}
                        </div>
                      </button>

                      {/* Right basket: categoriesLabel[1] */}
                      <button
                        onClick={() => handleSortItemToCategory(currentExercise.categoriesLabel?.[1] || "")}
                        disabled={currentSortItemIndex >= sortItems.length}
                        className="p-4 bg-purple-200/50 hover:bg-purple-200 border-4 border-b-10 border-purple-305 rounded-3xl flex flex-col items-center justify-center min-h-[120px] transition-all cursor-pointer group"
                      >
                        <span className="text-4xl group-hover:scale-110 transition-transform select-none">🧺</span>
                        <span className="text-xs sm:text-sm font-black text-purple-900 mt-2 uppercase tracking-wide">
                          Rổ {currentExercise.categoriesLabel?.[1]}
                        </span>
                        
                        {/* Display sorted items inside */}
                        <div className="flex flex-wrap gap-1 mt-2.5 justify-center max-h-[80px] overflow-y-auto">
                          {sortItems
                            .filter(x => x.sortedCategory === currentExercise.categoriesLabel?.[1])
                            .map((x, i) => (
                              <span
                                key={i}
                                className={`text-[9px] font-mono font-black px-2 py-0.5 rounded-full uppercase border ${
                                  x.isCorrectStatus ? "bg-emerald-500 border-emerald-600 text-white" : "bg-red-400 border-red-500 text-white"
                                }`}
                              >
                                {x.word}
                              </span>
                            ))}
                        </div>
                      </button>
                    </div>

                    {/* Active word flying controller */}
                    <div className="flex flex-col items-center mt-3 justify-center">
                      {currentSortItemIndex < sortItems.length ? (
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Từ cần xếp:</span>
                          <motion.div
                            key={currentSortItemIndex}
                            animate={{ scale: [0.92, 1.05, 1], rotate: [0, -3, 3, 0] }}
                            transition={{ duration: 0.35 }}
                            className="bg-white p-5 rounded-2xl border-4 border-b-8 border-amber-300 font-mono font-black text-2xl sm:text-3xl uppercase text-slate-800 tracking-wider flex items-center justify-center gap-1 shadow-md"
                          >
                            <span>🔊 {sortItems[currentSortItemIndex].word}</span>
                          </motion.div>
                          <span className="text-[10px] text-slate-500 text-center font-bold mt-1 max-w-[280px]">
                            👉 Bé hãy nhấn vào một trong hai chiếc rổ 🧺 ở trên phù hợp để nhấc từ này vào nhé!
                          </span>
                        </div>
                      ) : (
                        <div className="text-center font-black text-emerald-600 py-4 flex flex-col items-center gap-2">
                          <span className="text-3xl">🎉</span>
                          <span>Bé đã hoàn tất màn chơi phân loại hoàn hảo!</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Progress buttons */}
              <div className="border-t pt-4 flex items-center justify-between flex-wrap gap-3 mt-2">
                <button
                  disabled={exerciseIndex === 0}
                  onClick={() => {
                    setExerciseIndex(p => p - 1);
                    setExOptionSelected(null);
                    setExWrongAttempts(0);
                  }}
                  className="px-5 py-2.5 rounded-xl border-2 hover:bg-slate-50 text-slate-600 font-black text-xs cursor-pointer select-none disabled:opacity-40"
                >
                  ◀ Quay Lại
                </button>

                {exCorrectMap[exerciseIndex] ? (
                  exerciseIndex < 3 ? (
                    <button
                      onClick={() => {
                        setExerciseIndex(p => p + 1);
                        setExOptionSelected(null);
                        setExWrongAttempts(0);
                      }}
                      className="px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 font-black text-white rounded-xl text-xs flex items-center gap-1 cursor-pointer hover:scale-103"
                    >
                      <span>Bài mớI</span>
                      <span>▶</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setStep("review")}
                      className="px-8 py-3.5 bg-purple-600 hover:bg-purple-700 border-4 border-b-8 border-purple-800 font-black text-white rounded-2xl text-sm flex items-center gap-1.5 shadow-md active:translate-y-1 active:border-b-4 cursor-pointer hover:scale-103"
                      id="btn-next-to-review"
                    >
                      <span>Tiến Tới Thử Thách Ôn Tập ➔</span>
                    </button>
                  )
                ) : (
                  <span className="text-xs text-rose-500 font-black animate-pulse bg-rose-50 px-3 py-1 rounded-full border border-rose-100">🚫 Hãy hoàn thành bài tập này nha!</span>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 4: REVIEW CHALLENGE */}
          {step === "review" && (
            <motion.div
              key="step-review"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-5"
            >
              <div className="text-center">
                <span className="text-xs bg-white px-3 py-1 rounded-full border border-slate-200 uppercase tracking-widest font-black text-slate-500">Mốc 4: Tự Kiểm Chứng Quy Tắc (Review Challenge)</span>
                <p className="text-lg font-black text-slate-805 mt-1.5">Bé đã sẵn sàng giật tấm sọc học thuật chưa?</p>
              </div>

              {/* Show review targets */}
              <div className="flex justify-center gap-3 items-center flex-wrap my-1 text-slate-800 font-sans font-black select-none">
                {currentGroup.reviewWords.map(word => (
                  <button
                    key={word}
                    onClick={() => speakWord(word, 0.77)}
                    className="p-3 bg-white font-mono rounded-xl border border-slate-250 shadow-sm text-base uppercase flex items-center gap-1 hover:scale-105 active:scale-95 cursor-pointer transition-transform"
                  >
                    <span>🔊</span>
                    <span>{word}</span>
                  </button>
                ))}
              </div>

              {/* Question container */}
              <div className="bg-white/90 border-2 border-purple-200/80 rounded-2xl p-5 mt-2 shadow-xs text-slate-800">
                <span className="text-[10px] font-black text-purple-600 tracking-wider bg-purple-50 border border-purple-150 px-2 py-0.5 rounded-full">CÂU HỎI QUY TẮC</span>
                <p className="text-base font-black mt-2 leading-relaxed">{currentGroup.reviewQuestion}</p>
                
                <div className="grid grid-cols-1 gap-2 mt-4">
                  {currentGroup.reviewOptions.map((opt, rIdx) => {
                    const isSelected = reviewAnswer === rIdx;
                    const isCorrect = rIdx === currentGroup.reviewCorrect;
                    
                    let btnStyle = "border-slate-200 hover:bg-slate-50";
                    if (isSelected) {
                      btnStyle = isCorrect
                        ? "bg-emerald-500 text-white border-emerald-650 border-b-6 scale-101 shadow-sm"
                        : "bg-rose-50 border-rose-450 border-b-6 text-rose-950";
                    }

                    return (
                      <button
                        key={rIdx}
                        disabled={reviewSuccess}
                        onClick={() => handleReviewOptionCheck(rIdx)}
                        className={`w-full text-left px-5 py-4 rounded-xl border-2 font-black text-xs sm:text-sm active:scale-98 transition-all cursor-pointer ${btnStyle}`}
                      >
                        {opt}
                        {isSelected && isCorrect && <span className="ml-2 font-black">✅ Chính Xác!</span>}
                        {isSelected && !isCorrect && <span className="ml-2 font-black">❌ Sai rồi, suy nghĩ nhé!</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Discovery Summary Card */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-purple-600 border-4 border-b-8 border-purple-800 rounded-3xl p-5 text-white shadow-xl relative"
                  id="review-explanation-card"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-4xl animate-bounce select-none">👑</span>
                    <div>
                      <h4 className="text-base font-black tracking-widest uppercase mb-1 flex items-center gap-1.5">
                        <span>GIẢI THÍCH QUY TẮC PHONICS</span>
                      </h4>
                      <p className="font-extrabold text-sm leading-relaxed text-purple-100">
                        {currentGroup.reviewExplanation}
                      </p>
                      <p className="text-xs text-purple-200 font-extrabold italic mt-3">💡 Bé hãy vỗ vai bém tự hào, dán ngôi sao vàng lấp lánh kỉ niệm học giỏi nhé!</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Final Finish block */}
              {reviewSuccess && (
                <div className="flex flex-col items-center mt-3 animate-pulse-slow">
                  <span className="text-4xl select-none">⭐️⭐️⭐️</span>
                  <p className="text-xs text-slate-500 font-black mt-1">Chuẩn không bàn cãi! Bé đã hoàn toàn xuất sư bài này rồi đó!</p>
                  
                  {/* Option to play another group */}
                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() => {
                        // Advance to next group
                        if (selectedGroupIndex + 1 < phonicsRuleGroupsData.length) {
                          setSelectedGroupIndex(selectedGroupIndex + 1);
                        } else {
                          setSelectedGroupIndex(0);
                        }
                      }}
                      className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white border-4 border-b-8 border-indigo-800 font-black text-sm active:translate-y-1 active:border-b-4 hover:scale-103 shadow-md cursor-pointer"
                    >
                      Bé học nhóm tiếp theo ➔
                    </button>
                    <button
                      onClick={() => {
                        setStep("observe");
                        setListenedWords({});
                        setDiscoverAnsw(null);
                        setDiscoverAttempts(0);
                        setShowTip(false);
                      }}
                      className="px-4 py-3 bg-white text-slate-600 border-2 font-black rounded-2xl text-xs cursor-pointer select-none"
                    >
                      🔄 Chơi lại bài này
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

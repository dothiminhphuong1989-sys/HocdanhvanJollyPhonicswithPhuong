import React, { useState, useEffect } from "react";
import { speakPhoneme, speakWord, speakEncouragement, displayPhoneme } from "../utils/speech";
import { motion, AnimatePresence } from "motion/react";
import { analyzeWord, WordAnalysis } from "../utils/wordAnalyzer";

interface ExampleWord {
  word: string;
  translation: string;
  spelling: string;
  graphemes: string[];
  highlightIndex: number;
}

interface ComparePair {
  word1: string;
  soundDesc1: string;
  translation1: string;
  word2: string;
  soundDesc2: string;
  translation2: string;
}

interface PracticeRound {
  listenAndChoose: {
    audioWord: string;
    options: string[];
    correctAnswer: string;
  };
  findSound: {
    question: string;
    options: string[];
    correctAnswer: string;
  };
  spellingTask: {
    word: string;
    scrambled: string[];
    correctOrder: string[];
  };
  sortingTask: {
    category1: string;
    category2: string;
    wordList: { word: string; category: string; audio: string[] }[];
  };
  readIndie: {
    word: string;
    translation: string;
    display: string[];
  };
}

interface AlternativeLesson {
  soundName: string;
  shortDesc: string;
  phonemeHelp: string;
  primarySpelling: string;
  ruleTitle: string;
  ruleExplanation: string;
  ruleTip: string;
  compareTitle: string;
  comparePairs: ComparePair[];
  examples: ExampleWord[];
  blendWords: { word: string; display: string[]; audio: string[]; translation: string }[];
  practice: PracticeRound;
}

const alternativeLessonsData: AlternativeLesson[] = [
  {
    soundName: "y ➔ ee",
    shortDesc: "Chữ Y kêu dõng dạc /ee/",
    phonemeHelp: "Kêu kéo dài 'eee' giống âm 'ee' trong bee",
    primarySpelling: "ee",
    ruleTitle: "Phép thuật Chữ Y ở cuối từ dài",
    ruleExplanation: "Khi chữ 'Y' tinh nghịch đứng một mình ở cuối của các từ dài (có từ 2 tiếng/âm tiết trở lên), bạn ấy bỗng nhiên đổi giọng, không kêu là 'y' nữa mà hét to thành âm /ee/ kéo dài thật dễ thương!",
    ruleTip: "Hãy đếm nhịp vỗ tay nhé! 'ha-ppy' (vỗ 2 cái), 'ba-by' (vỗ 2 cái). Vì có 2 vẫy tay nên chữ Y đứng cuối sẽ hát âm 'eee'!",
    compareTitle: "So tài âm Y: Từ ngắn 1 tiếng ➔ /ie/ vs Từ dài 2 tiếng ➔ /ee/",
    comparePairs: [
      {
        word1: "fly",
        soundDesc1: "Kêu /ie/ (bởi từ chỉ có 1 tiếng khép kín)",
        translation1: "Bay lượn",
        word2: "baby",
        soundDesc2: "Kêu /ee/ (bởi từ có tới 2 tiếng ngọt ngào)",
        translation2: "Em bé sơ sinh"
      },
      {
        word1: "my",
        soundDesc1: "Kêu /ie/ (từ 1 tiếng siêu ngắn)",
        translation1: "Của tớ",
        word2: "happy",
        soundDesc2: "Kêu /ee/ (từ dài có 2 tiếng vui mừng)",
        translation2: "Hạnh phúc"
      }
    ],
    examples: [
      { word: "happy", translation: "Vui vẻ, hạnh phúc", spelling: "y", graphemes: ["h", "a", "pp", "y"], highlightIndex: 3 },
      { word: "baby", translation: "Em bé dễ thương", spelling: "y", graphemes: ["b", "ai", "b", "y"], highlightIndex: 3 },
      { word: "funny", translation: "Buồn cười, hài hước", spelling: "y", graphemes: ["f", "u", "n", "y"], highlightIndex: 3 }
    ],
    blendWords: [
      { word: "happy", display: ["h", "a", "pp", "y"], audio: ["h", "a", "p", "ee"], translation: "Hạnh phúc" },
      { word: "baby", display: ["b", "ai", "b", "y"], audio: ["b", "ai", "b", "ee"], translation: "Em bé" },
      { word: "funny", display: ["f", "u", "n", "y"], audio: ["f", "u", "n", "ee"], translation: "Vui nhộn" }
    ],
    practice: {
      listenAndChoose: {
        audioWord: "baby",
        options: ["baby", "fly", "my"],
        correctAnswer: "baby"
      },
      findSound: {
        question: "Từ nào chứa chữ Y phát âm thành /ee/ dõng dạc?",
        options: ["cry", "sky", "funny"],
        correctAnswer: "funny"
      },
      spellingTask: {
        word: "funny",
        scrambled: ["y", "f", "n", "u"],
        correctOrder: ["f", "u", "n", "y"]
      },
      sortingTask: {
        category1: "Âm /ee/ (Từ dài 2 tiếng)",
        category2: "Âm /ie/ (Từ ngắn 1 tiếng)",
        wordList: [
          { word: "happy", category: "Âm /ee/ (Từ dài 2 tiếng)", audio: ["h", "a", "p", "ee"] },
          { word: "sky", category: "Âm /ie/ (Từ ngắn 1 tiếng)", audio: ["s", "k", "ie"] },
          { word: "funny", category: "Âm /ee/ (Từ dài 2 tiếng)", audio: ["f", "u", "n", "ee"] },
          { word: "fly", category: "Âm /ie/ (Từ ngắn 1 tiếng)", audio: ["f", "l", "ie"] }
        ]
      },
      readIndie: {
        word: "sunny",
        translation: "Trời nắng bừng sáng",
        display: ["s", "u", "n", "y"]
      }
    }
  },
  {
    soundName: "y ➔ ie",
    shortDesc: "Chữ Y kêu cao vút /ie/",
    phonemeHelp: "Phát âm giống âm 'ie' trong từ pie hoặc chữ I",
    primarySpelling: "ie",
    ruleTitle: "Phép thuật Chữ Y ở từ siêu ngắn",
    ruleExplanation: "Khi chữ 'Y' kiêu hãnh đứng ở cuối của một từ siêu ngắn (chỉ có duy nhất 1 tiếng và không có bất kỳ nguyên âm nào khác đi kèm), bạn ấy sẽ biến thành âm /ie/ ngân vang tự do!",
    ruleTip: "Nhìn xem nào! Từ 'fly' không hề có chữ a, e, i, o, u nào cả. Thế nên anh bạn 'y' gánh vác cả âm chính và hét to 'ieeee'!",
    compareTitle: "So tài âm Y: Từ ngắn ➔ /ie/ vs Từ dài ➔ /ee/",
    comparePairs: [
      {
        word1: "sky",
        soundDesc1: "Kêu /ie/ (từ 1 tiếng, không có nguyên âm khác)",
        translation1: "Bầu trời rộng lớn",
        word2: "funny",
        soundDesc2: "Kêu /ee/ (nhờ từ dài có 2 âm tiết vui nhộn)",
        translation2: "Hài hước"
      },
      {
        word1: "cry",
        soundDesc1: "Kêu /ie/ (từ ngắn, chỉ 1 tiếng thôi nhé)",
        translation1: "Khóc nhè",
        word2: "sunny",
        soundDesc2: "Kêu /ee/ (từ dài sáng bừng có 2 tiếng)",
        translation2: "Có nắng tốt"
      }
    ],
    examples: [
      { word: "fly", translation: "Chú ruồi hoặc bay lượn", spelling: "y", graphemes: ["f", "l", "y"], highlightIndex: 2 },
      { word: "sky", translation: "Bầu trời xanh thẳm", spelling: "y", graphemes: ["s", "k", "y"], highlightIndex: 2 },
      { word: "my", translation: "Thuộc về bản thân con", spelling: "y", graphemes: ["m", "y"], highlightIndex: 1 }
    ],
    blendWords: [
      { word: "fly", display: ["f", "l", "y"], audio: ["f", "l", "ie"], translation: "Bay" },
      { word: "sky", display: ["s", "k", "y"], audio: ["s", "k", "ie"], translation: "Bầu trời" },
      { word: "my", display: ["m", "y"], audio: ["m", "ie"], translation: "Của tớ" }
    ],
    practice: {
      listenAndChoose: {
        audioWord: "fly",
        options: ["happy", "fly", "baby"],
        correctAnswer: "fly"
      },
      findSound: {
        question: "Từ nào chứa chữ Y phát âm thành /ie/ cao vút?",
        options: ["sunny", "sky", "funny"],
        correctAnswer: "sky"
      },
      spellingTask: {
        word: "sky",
        scrambled: ["y", "s", "k"],
        correctOrder: ["s", "k", "y"]
      },
      sortingTask: {
        category1: "Âm /ie/ (Từ ngắn 1 tiếng)",
        category2: "Âm /ee/ (Từ dài 2 tiếng)",
        wordList: [
          { word: "my", category: "Âm /ie/ (Từ ngắn 1 tiếng)", audio: ["m", "ie"] },
          { word: "baby", category: "Âm /ee/ (Từ dài 2 tiếng)", audio: ["b", "ai", "b", "ee"] },
          { word: "cry", category: "Âm /ie/ (Từ ngắn 1 tiếng)", audio: ["c", "r", "ie"] },
          { word: "sunny", category: "Âm /ee/ (Từ dài 2 tiếng)", audio: ["s", "u", "n", "ee"] }
        ]
      },
      readIndie: {
        word: "dry",
        translation: "Xơ xác, khô ráo",
        display: ["d", "r", "y"]
      }
    }
  },
  {
    soundName: "c ➔ s",
    shortDesc: "Chữ C mềm mại nói xì xào /s/",
    phonemeHelp: "Phát âm giống âm 's' nhẹ nhàng chứ không phải /k/",
    primarySpelling: "s",
    ruleTitle: "Anh bạn 'Soft C' dịu dàng",
    ruleExplanation: "Bình thường chữ C đứng đầu sẽ hét to rổn rảng '/k/' (như cat, cup). Nhưng khi đi liền trước các nguyên âm 'e', 'i', hoặc 'y', C bỗng biến thành một luồng gió dịu dàng và thì thầm nhè nhẹ '/s/ssss' giống như chữ S!",
    ruleTip: "Cứ xếp hàng ngay trước 'e', 'i', 'y', chữ C sẽ rỉ tai: 'Suỵt nghe tớ xì xì /s/ nhé con yêu ơi!'",
    compareTitle: "Cứng rắn /k/ (Hard C) vs Mềm mại /s/ (Soft C)",
    comparePairs: [
      {
        word1: "cat",
        soundDesc1: "Nói /k/ dũng mãnh (vì đứng trước chữ 'a')",
        translation1: "Chú mèo",
        word2: "city",
        soundDesc2: "Nói /s/ xì xào (vì đứng trước chữ 'i')",
        translation2: "Thành phố nhộn nhịp"
      },
      {
        word1: "cup",
        soundDesc1: "Nói /k/ sảng khoái (đứng trước chữ 'u')",
        translation1: "Chiếc tách đựng nước",
        word2: "cell",
        soundDesc2: "Nói /s/ nhè nhẹ (đứng trước chữ 'e')",
        translation2: "Tế bào / Ngăn nhỏ"
      }
    ],
    examples: [
      { word: "city", translation: "Thành phố sầm uất", spelling: "c", graphemes: ["c", "i", "t", "y"], highlightIndex: 0 },
      { word: "cell", translation: "Tế bào tí hon hoặc ngăn tủ", spelling: "c", graphemes: ["c", "e", "ll"], highlightIndex: 0 },
      { word: "face", translation: "Khuôn mặt rạng ngời", spelling: "c", graphemes: ["f", "a", "c", "e"], highlightIndex: 2 }
    ],
    blendWords: [
      { word: "city", display: ["c", "i", "t", "y"], audio: ["s", "i", "t", "ee"], translation: "Thành phố" },
      { word: "cell", display: ["c", "e", "ll"], audio: ["s", "e", "l"], translation: "Ngăn nhỏ" },
      { word: "face", display: ["f", "a", "c", "e"], audio: ["f", "ai", "s", ""], translation: "Khuôn mặt" }
    ],
    practice: {
      listenAndChoose: {
        audioWord: "city",
        options: ["cat", "cup", "city"],
        correctAnswer: "city"
      },
      findSound: {
        question: "Từ nào chứa chữ C biến thành âm xì xào /s/?",
        options: ["cake", "face", "coat"],
        correctAnswer: "face"
      },
      spellingTask: {
        word: "cell",
        scrambled: ["l", "c", "e", "l"],
        correctOrder: ["c", "e", "l", "l"]
      },
      sortingTask: {
        category1: "Mềm /s/ (Đứng kề e, i, y)",
        category2: "Cứng /k/ (Đứng kề a, o, u)",
        wordList: [
          { word: "city", category: "Mềm /s/ (Đứng kề e, i, y)", audio: ["s", "i", "t", "ee"] },
          { word: "cat", category: "Cứng /k/ (Đứng kề a, o, u)", audio: ["c", "a", "t"] },
          { word: "face", category: "Mềm /s/ (Đứng kề e, i, y)", audio: ["f", "ai", "s"] },
          { word: "cup", category: "Cứng /k/ (Đứng kề a, o, u)", audio: ["c", "u", "p"] }
        ]
      },
      readIndie: {
        word: "ice",
        translation: "Cục đá lạnh ngắt",
        display: ["i", "c", "e"]
      }
    }
  },
  {
    soundName: "g ➔ j",
    shortDesc: "Chữ G hóa thân thành /j/",
    phonemeHelp: "Phát âm dằn giọng giống chữ j trong jam hoặc jet",
    primarySpelling: "j",
    ruleTitle: "Anh bạn 'Soft G' tinh nghịch",
    ruleExplanation: "Chữ G khổng lồ bình thường nói dõng dạc '/g/g' (như go, dog). Nhưng cứ hễ đứng trước 3 nguyên âm thần kỳ 'e', 'i', 'y', G bỗng biến phép thuật thành âm giật góc /j/ dứt khoát hâm nóng cả từ vựng!",
    ruleTip: "Nhìn thấy G đứng sát ngay cạnh 'e', 'i', 'y' thì đừng kêu gờ nhé, hãy rung lưỡi bật hơi /j/ thật vui!",
    compareTitle: "Cứng rắn /g/ (Hard G) vs Mềm mại /j/ (Soft G)",
    comparePairs: [
      {
        word1: "got",
        soundDesc1: "Kêu /g/ (đứng trước chữ 'o')",
        translation1: "Nhận được",
        word2: "gem",
        soundDesc2: "Kêu /j/ dứt khoát (đứng trước chữ 'e')",
        translation2: "Viên hồng ngọc lấp lánh"
      },
      {
        word1: "dog",
        soundDesc1: "Kêu /g/ ở đuôi từ",
        translation1: "Chú cún",
        word2: "giant",
        soundDesc2: "Kêu /j/ (đứng trước chữ 'i')",
        translation2: "Người khổng lồ"
      }
    ],
    examples: [
      { word: "gem", translation: "Viên đá quý rực rỡ", spelling: "g", graphemes: ["g", "e", "m"], highlightIndex: 0 },
      { word: "giant", translation: "Người khổng lồ cao lớn", spelling: "g", graphemes: ["g", "i", "a", "n", "t"], highlightIndex: 0 },
      { word: "cage", translation: "Chiếc lồng chim gỗ", spelling: "g", graphemes: ["c", "a", "g", "e"], highlightIndex: 2 }
    ],
    blendWords: [
      { word: "gem", display: ["g", "e", "m"], audio: ["j", "e", "m"], translation: "Viên đá quý" },
      { word: "giant", display: ["g", "i", "a", "n", "t"], audio: ["j", "ie", "a", "n", "t"], translation: "Khổng lồ" },
      { word: "cage", display: ["c", "a", "g", "e"], audio: ["c", "ai", "j", ""], translation: "Lồng thú" }
    ],
    practice: {
      listenAndChoose: {
        audioWord: "gem",
        options: ["got", "gem", "dog"],
        correctAnswer: "gem"
      },
      findSound: {
        question: "Chữ G nào phát âm là /j/ dứt khoát?",
        options: ["big", "giant", "pig"],
        correctAnswer: "giant"
      },
      spellingTask: {
        word: "gem",
        scrambled: ["m", "g", "e"],
        correctOrder: ["g", "e", "m"]
      },
      sortingTask: {
        category1: "Mềm /j/ (kề e, i, y)",
        category2: "Cứng /g/ (kề a, o, u)",
        wordList: [
          { word: "gem", category: "Mềm /j/ (kề e, i, y)", audio: ["j", "e", "m"] },
          { word: "got", category: "Cứng /g/ (kề a, o, u)", audio: ["g", "o", "t"] },
          { word: "cage", category: "Mềm /j/ (kề e, i, y)", audio: ["c", "ai", "j"] },
          { word: "dog", category: "Cứng /g/ (kề a, o, u)", audio: ["d", "o", "g"] }
        ]
      },
      readIndie: {
        word: "page",
        translation: "Trang sách thơm tho",
        display: ["p", "a", "g", "e"]
      }
    }
  },
  {
    soundName: "a_e ➔ ai",
    shortDesc: "Vần A phép thuật kêu /ai/",
    phonemeHelp: "Phát âm là 'ay' giống âm 'ai' trong rain",
    primarySpelling: "ai",
    ruleTitle: "Nguyên âm chia đôi - Magic E thổi luồng khí",
    ruleExplanation: "Khi chữ 'A' đứng cách chữ 'E' bởi chỉ một phụ âm duy nhất (như trong c-a-k-e), anh bạn 'E' ở cuối sẽ hi sinh thầm lặng hoàn toàn im lặng (cầm), nhưng dùng đũa thần bắn năng lượng cực mạnh đẩy chữ 'A' đổi tiếng kêu từ ngắn /a/ thành giọng kêu tên gốc siêu bảnh /ai/!",
    ruleTip: "Hễ cuối từ có chữ 'e', hãy tìm ngay xem trước đó có chữ 'a' không nhé, 'A' lúc đó sẽ hô vang tự tin 'ai' chứ không rụt rè 'a' nữa!",
    compareTitle: "Âm ngắn /a/ vs Âm phép thuật đổi giọng /ai/",
    comparePairs: [
      {
        word1: "cat",
        soundDesc1: "Kêu /a/ ngắn cơ bản dẹt môi",
        translation1: "Chú mèo",
        word2: "cake",
        soundDesc2: "Kêu /ai/ sang xịn nhờ Magic E nâng đỡ",
        translation2: "Ổ bánh ngọt"
      },
      {
        word1: "tap",
        soundDesc1: "Kêu /a/ ngắn",
        translation1: "Vòi nước gạt",
        word2: "tape",
        soundDesc2: "Kêu /ai/ tự hào",
        translation2: "Băng dính cuộn"
      }
    ],
    examples: [
      { word: "cake", translation: "Bánh bông lan ngọt", spelling: "a-e", graphemes: ["c", "a", "k", "e"], highlightIndex: 1 },
      { word: "bake", translation: "Nướng bánh thơm phức", spelling: "a-e", graphemes: ["b", "a", "k", "e"], highlightIndex: 1 },
      { word: "game", translation: "Trò chơi lý thú", spelling: "a-e", graphemes: ["g", "a", "m", "e"], highlightIndex: 1 }
    ],
    blendWords: [
      { word: "cake", display: ["c", "a", "k", "e"], audio: ["c", "ai", "k", ""], translation: "Bánh bông lan" },
      { word: "bake", display: ["b", "a", "k", "e"], audio: ["b", "ai", "k", ""], translation: "Nướng bánh" },
      { word: "game", display: ["g", "a", "m", "e"], audio: ["g", "ai", "m", ""], translation: "Trò chơi" }
    ],
    practice: {
      listenAndChoose: {
        audioWord: "cake",
        options: ["cat", "cake", "tap"],
        correctAnswer: "cake"
      },
      findSound: {
        question: "Từ nào chứa âm phép thuật Magic E phát âm thành /ai/ ?",
        options: ["pat", "pan", "game"],
        correctAnswer: "game"
      },
      spellingTask: {
        word: "game",
        scrambled: ["e", "g", "m", "a"],
        correctOrder: ["g", "a", "m", "e"]
      },
      sortingTask: {
        category1: "Phép thuật /ai/ (a_e)",
        category2: "Bình thường /a/ ngắn",
        wordList: [
          { word: "cake", category: "Phép thuật /ai/ (a_e)", audio: ["c", "ai", "k"] },
          { word: "cat", category: "Bình thường /a/ ngắn", audio: ["c", "a", "t"] },
          { word: "game", category: "Phép thuật /ai/ (a_e)", audio: ["g", "ai", "m"] },
          { word: "tap", category: "Bình thường /a/ ngắn", audio: ["t", "a", "p"] }
        ]
      },
      readIndie: {
        word: "gate",
        translation: "Cánh cổng ngôi nhà",
        display: ["g", "a", "t", "e"]
      }
    }
  },
  {
    soundName: "i_e ➔ ie",
    shortDesc: "Vần I phép thuật kêu /ie/",
    phonemeHelp: "Phát âm là kéo dài 'eye' giống âm 'ie' trong pie",
    primarySpelling: "ie",
    ruleTitle: "Anh bạn Chữ I mọc cánh nhờ Magic E",
    ruleExplanation: "Khi chữ 'I' hiếu động bị chia cách với chữ 'E' bởi một phụ âm ở giữa, chữ 'E' thần thuật lập tức mỉm cười giữ im lặng hoàn toàn. Chữ 'I' lập tức bay cao và phát âm đúng nguyên bản tên chữ cái 'I' là /ie/ thật khí chất!",
    ruleTip: "Nếu bé thấy chữ 'E' đứng lấp ló xa xa một ô sau chữ 'I', hãy phát âm từ đó giống như tiếng thét ngạc nhiên 'Aii' /ie/ nhé!",
    compareTitle: "Âm ngắn /i/ vs Âm phép thuật đổi giọng /ie/",
    comparePairs: [
      {
        word1: "pin",
        soundDesc1: "Kêu /i/ ngắn nhút nhát thu môi",
        translation1: "Chiếc ghim thiếc",
        word2: "pine",
        soundDesc2: "Kêu /ie/ rạng rỡ",
        translation2: "Cây thông xanh"
      },
      {
        word1: "kit",
        soundDesc1: "Kêu /i/ ngắn",
        translation1: "Hộp công cụ",
        word2: "kite",
        soundDesc2: "Kêu /ie/ bay cao lộng gió",
        translation2: "Chiếc diều giấy"
      }
    ],
    examples: [
      { word: "kite", translation: "Cây diều bay cao tít", spelling: "i-e", graphemes: ["k", "i", "t", "e"], highlightIndex: 1 },
      { word: "bike", translation: "Xe đạp rèn thể lực", spelling: "i-e", graphemes: ["b", "i", "k", "e"], highlightIndex: 1 },
      { word: "time", translation: "Giờ giấc trôi nhanh", spelling: "i-e", graphemes: ["t", "i", "m", "e"], highlightIndex: 1 }
    ],
    blendWords: [
      { word: "kite", display: ["k", "i", "t", "e"], audio: ["k", "ie", "t", ""], translation: "Diều giấy" },
      { word: "bike", display: ["b", "i", "k", "e"], audio: ["b", "ie", "k", ""], translation: "Xe đạp" },
      { word: "time", display: ["t", "i", "m", "e"], audio: ["t", "ie", "m", ""], translation: "Thời gian" }
    ],
    practice: {
      listenAndChoose: {
        audioWord: "kite",
        options: ["pin", "kite", "tin"],
        correctAnswer: "kite"
      },
      findSound: {
        question: "Từ nào hô vang âm phép thuật /ie/ ?",
        options: ["sip", "pit", "bike"],
        correctAnswer: "bike"
      },
      spellingTask: {
        word: "bike",
        scrambled: ["e", "k", "b", "i"],
        correctOrder: ["b", "i", "k", "e"]
      },
      sortingTask: {
        category1: "Phép thuật /ie/ (i_e)",
        category2: "Bình thường /i/ ngắn",
        wordList: [
          { word: "bike", category: "Phép thuật /ie/ (i_e)", audio: ["b", "ie", "k"] },
          { word: "pin", category: "Bình thường /i/ ngắn", audio: ["p", "i", "n"] },
          { word: "time", category: "Phép thuật /ie/ (i_e)", audio: ["t", "ie", "m"] },
          { word: "sit", category: "Bình thường /i/ ngắn", audio: ["s", "i", "t"] }
        ]
      },
      readIndie: {
        word: "five",
        translation: "Con số 5 may mắn",
        display: ["f", "i", "v", "e"]
      }
    }
  },
  {
    soundName: "o_e ➔ oa",
    shortDesc: "Vần O phép thuật kêu /oa/",
    phonemeHelp: "Phát âm tròn môi 'oh' giống âm 'oa' trong boat",
    primarySpelling: "oa",
    ruleTitle: "Anh bạn Chữ O giữ tròn chữ nhờ Magic E",
    ruleExplanation: "Bình thường chữ O hiếu kỳ kêu dẹp môi ngắn ngủn '/o/' (như log, got). Nhưng chỉ cần nhìn thấy chữ 'E' câm đứng bảo hộ ở cuối từ cách một ô, chữ O lập tức biến thành người lớn tự tin mở rộng môi phát âm tròn trịa âm giống /oa/ ('oh')!",
    ruleTip: "Khi thấy 'e' đứng chặn hậu, đừng quên xòe môi nói 'ôồ' /oa/ thật oai vệ nhé!",
    compareTitle: "Âm ngắn /o/ vs Âm phép thuật đổi giọng /oa/",
    comparePairs: [
      {
        word1: "hop",
        soundDesc1: "Kêu /o/ ngắn nhảy lò cò",
        translation1: "Nhảy lò cò",
        word2: "hope",
        soundDesc2: "Kêu /oa/ tràn đầy hi vọng",
        translation2: "Hi vọng tươi sáng"
      },
      {
        word1: "not",
        soundDesc1: "Kêu /o/ ngắn phủ định",
        translation1: "Không phải",
        word2: "note",
        soundDesc2: "Kêu /oa/ cao xa",
        translation2: "Tờ giấy ghi chú"
      }
    ],
    examples: [
      { word: "home", translation: "Ngôi nhà gia đình ấm áp", spelling: "o-e", graphemes: ["h", "o", "m", "e"], highlightIndex: 1 },
      { word: "bone", translation: "Khúc xương gặm thơm ngon", spelling: "o-e", graphemes: ["b", "o", "n", "e"], highlightIndex: 1 },
      { word: "rose", translation: "Bông hoa hồng ngạt ngào", spelling: "o-e", graphemes: ["r", "o", "s", "e"], highlightIndex: 1 }
    ],
    blendWords: [
      { word: "home", display: ["h", "o", "m", "e"], audio: ["h", "oa", "m", ""], translation: "Ngôi nhà" },
      { word: "bone", display: ["b", "o", "n", "e"], audio: ["b", "oa", "n", ""], translation: "Khúc xương" },
      { word: "rose", display: ["r", "o", "s", "e"], audio: ["r", "oa", "z", ""], translation: "Đóa hồng" }
    ],
    practice: {
      listenAndChoose: {
        audioWord: "home",
        options: ["log", "home", "dog"],
        correctAnswer: "home"
      },
      findSound: {
        question: "Từ nào chứa vần phép thuật o_e kêu tròn trịa?",
        options: ["got", "hot", "bone"],
        correctAnswer: "bone"
      },
      spellingTask: {
        word: "home",
        scrambled: ["m", "o", "e", "h"],
        correctOrder: ["h", "o", "m", "e"]
      },
      sortingTask: {
        category1: "Phép thuật /oa/ (o_e)",
        category2: "Bình thường /o/ ngắn",
        wordList: [
          { word: "home", category: "Phép thuật /oa/ (o_e)", audio: ["h", "oa", "m"] },
          { word: "dog", category: "Bình thường /o/ ngắn", audio: ["d", "o", "g"] },
          { word: "bone", category: "Phép thuật /oa/ (o_e)", audio: ["b", "oa", "n"] },
          { word: "got", category: "Bình thường /o/ ngắn", audio: ["g", "o", "t"] }
        ]
      },
      readIndie: {
        word: "nose",
        translation: "Chiếc mũi hít hà nhạy bén",
        display: ["n", "o", "s", "e"]
      }
    }
  },
  {
    soundName: "u_e ➔ ue",
    shortDesc: "Vần U phép thuật kêu /ue/",
    phonemeHelp: "Kêu sang xịn 'iu-uh' giống âm 'ue' trong blue",
    primarySpelling: "ue",
    ruleTitle: "Lột xác chữ U nguyên vẹn nhờ Magic E",
    ruleExplanation: "Bình thường chữ U kêu khản giọng ngơ ngác '/u/' ngắn (như cup, sun). Tuy thế, khi chữ 'E' câm đứng trấn ải cuối hàng ngủ cách một khoảng phụ âm, 'E' sẽ thổi kèn lệnh hô 'U' thức giấc bật vang tiếng kêu gốc đầy oai vệ là '/ue/' kéo dài ngân vang!",
    ruleTip: "Nghe đũa phép Magic E nổ giòn giã 'biến hình' cho chữ 'u' từ 'cup' hóa sang 'cute' thật dễ thương nhé!",
    compareTitle: "Âm ngắn /u/ vs Âm phép thuật đổi giọng /ue/",
    comparePairs: [
      {
        word1: "cub",
        soundDesc1: "Kêu /u/ ngắn mộc mạc",
        translation1: "Thú con",
        word2: "cube",
        soundDesc2: "Kêu /ue/ hình khối dứt khoát",
        translation2: "Khối lập phương"
      },
      {
        word1: "tub",
        soundDesc1: "Kêu /u/ ngắn nghẹn ngào",
        translation1: "Bồn tắm gỗ",
        word2: "tube",
        soundDesc2: "Kêu /ue/ kéo dài quý phái",
        translation2: "Ống nhôm tròn"
      }
    ],
    examples: [
      { word: "tube", translation: "Ống nghiệm thủy tinh", spelling: "u-e", graphemes: ["t", "u", "b", "e"], highlightIndex: 1 },
      { word: "cute", translation: "Xinh xắn, đáng yêu vô cùng", spelling: "u-e", graphemes: ["c", "u", "t", "e"], highlightIndex: 1 },
      { word: "mule", translation: "Con la chở hàng kiên nhẫn", spelling: "u-e", graphemes: ["m", "u", "l", "e"], highlightIndex: 1 }
    ],
    blendWords: [
      { word: "tube", display: ["t", "u", "b", "e"], audio: ["t", "ue", "b", ""], translation: "Ống sáo" },
      { word: "cute", display: ["c", "u", "t", "e"], audio: ["c", "ue", "t", ""], translation: "Đáng yêu" },
      { word: "mule", display: ["m", "u", "l", "e"], audio: ["m", "ue", "l", ""], translation: "Con la" }
    ],
    practice: {
      listenAndChoose: {
        audioWord: "cute",
        options: ["cup", "cute", "sun"],
        correctAnswer: "cute"
      },
      findSound: {
        question: "Từ nào chứa âm u_e biến đổi tinh luyện thơm tho?",
        options: ["bug", "mule", "fun"],
        correctAnswer: "mule"
      },
      spellingTask: {
        word: "cute",
        scrambled: ["t", "c", "e", "u"],
        correctOrder: ["c", "u", "t", "e"]
      },
      sortingTask: {
        category1: "Phép thuật /ue/ (u_e)",
        category2: "Bình thường /u/ ngắn",
        wordList: [
          { word: "tube", category: "Phép thuật /ue/ (u_e)", audio: ["t", "ue", "b"] },
          { word: "sun", category: "Bình thường /u/ ngắn", audio: ["s", "u", "n"] },
          { word: "cute", category: "Phép thuật /ue/ (u_e)", audio: ["c", "ue", "t"] },
          { word: "cup", category: "Bình thường /u/ ngắn", audio: ["c", "u", "p"] }
        ]
      },
      readIndie: {
        word: "huge",
        translation: "To lớn, khổng lồ vĩ đại",
        display: ["h", "u", "g", "e"]
      }
    }
  }
];

export default function AlternativeSpellings() {
  const [selectedGroupIndex, setSelectedGroupIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"discover" | "rule" | "compare" | "blend" | "practice">("discover");

  // Practice state
  const [practiceSubTab, setPracticeSubTab] = useState<"listen" | "find" | "spell" | "sort" | "indie">("listen");
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  
  // Custom Spell state
  const [userSpellList, setUserSpellList] = useState<string[]>([]);
  const [spellMessage, setSpellMessage] = useState<string | null>(null);

  // Sorting Task State
  const [placedWords, setPlacedWords] = useState<Record<string, string>>({}); // word -> category
  const [sortCompleteMsg, setSortCompleteMsg] = useState<string | null>(null);

  // Indie Read State
  const [hasIndieRead, setHasIndieRead] = useState<boolean>(false);

  // Star points state helper
  const [stars, setStars] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem("jolly_phonics_alt_stars") || "0", 10);
    } catch {
      return 0;
    }
  });

  const activeLesson = alternativeLessonsData[selectedGroupIndex];

  // Sync state for local storage
  const handleEarnStar = () => {
    const nextStars = stars + 1;
    setStars(nextStars);
    try {
      localStorage.setItem("jolly_phonics_alt_stars", nextStars.toString());
    } catch {}
  };

  // Reset practice states when changing lessons or tabs
  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setUserSpellList([]);
    setSpellMessage(null);
    setPlacedWords({});
    setSortCompleteMsg(null);
    setHasIndieRead(false);
  }, [selectedGroupIndex, activeTab, practiceSubTab]);

  const handleLevelSelect = (idx: number) => {
    setSelectedGroupIndex(idx);
    setActiveTab("discover");
  };

  const handleCheckAnswer = (selected: string, correct: string) => {
    setSelectedAnswer(selected);
    if (selected === correct) {
      setIsAnswerCorrect(true);
      speakEncouragement("Tuyệt vời quá con ơi!", "Magnificent! You did it!");
      handleEarnStar();
    } else {
      setIsAnswerCorrect(false);
      speakWord("Try again! Con thử lại nhé!");
    }
  };

  const handleSpellClick = (letter: string) => {
    const nextList = [...userSpellList, letter];
    setUserSpellList(nextList);

    // Play letter sound
    // Use proper phonics logic for current lesson letter sounding
    const soundChar = letter === "e" ? "" : letter;
    if (soundChar) speakPhoneme(soundChar);

    if (nextList.length === activeLesson.practice.spellingTask.correctOrder.length) {
      const spelledStr = nextList.join("");
      const targetStr = activeLesson.practice.spellingTask.correctOrder.join("");
      if (spelledStr === targetStr) {
        setSpellMessage("Chính xác! Con ghép chữ cừ khôi lắm! ⭐");
        speakEncouragement("Rất xuất sắc nhé bé!", "Sensational spelling!");
        handleEarnStar();
      } else {
        setSpellMessage(`Chưa đúng rồi, thử lại nhé bé! Đáp án đúng: ${targetStr.toUpperCase()}`);
        speakWord("Oh, let's try again!");
      }
    }
  };

  const handleResetSpell = () => {
    setUserSpellList([]);
    setSpellMessage(null);
  };

  const handlePlaceSort = (word: string, category: string, correctCategory: string) => {
    const updated = { ...placedWords, [word]: category };
    setPlacedWords(updated);

    if (category === correctCategory) {
      speakWord(word);
      // check if all items are sorted correctly
      const totalWords = activeLesson.practice.sortingTask.wordList.length;
      const sortedKeys = Object.keys(updated);
      if (sortedKeys.length === totalWords) {
        const isAllCorrect = activeLesson.practice.sortingTask.wordList.every(
          item => updated[item.word] === item.category
        );
        if (isAllCorrect) {
          setSortCompleteMsg("Quá siêu! Con phân loại chuẩn không cần chỉnh! ⭐");
          speakEncouragement("Con thật là tuyệt vời!", "Unbelievable sorting skill!");
          handleEarnStar();
        } else {
          setSortCompleteMsg("Có vài từ sai vị trí mất rồi. Hãy nhấp Hoàn tác để làm lại nhé!");
        }
      }
    } else {
      speakWord("Ups! Nhầm tủ rồi bé ơi.");
    }
  };

  const handleIndieReadComplete = () => {
    setHasIndieRead(true);
    speakWord(activeLesson.practice.readIndie.word);
    speakEncouragement("Bé đọc chuẩn không cần chỉnh!", "Fabulous independent reading!");
    handleEarnStar();
  };

  // Blending board local states
  const [blendWordIdx, setBlendWordIdx] = useState<number>(0);
  const [activePhonemeIdx, setActivePhonemeIdx] = useState<number | null>(null);
  const [isBlending, setIsBlending] = useState<boolean>(false);

  const activeBlendWord = activeLesson.blendWords[blendWordIdx] || activeLesson.blendWords[0];

  const handleSoundOut = async () => {
    if (isBlending) return;
    setIsBlending(true);
    setActivePhonemeIdx(null);

    const { audio } = analyzeWord(activeBlendWord.word, activeBlendWord.display);

    for (let i = 0; i < audio.length; i++) {
      if (audio[i]) {
        setActivePhonemeIdx(i);
        await speakPhoneme(audio[i]);
        await new Promise(r => setTimeout(r, 600));
      }
    }
    setActivePhonemeIdx(null);
    setIsBlending(false);

    // Fuse word fully
    speakWord(activeBlendWord.word);
  };

  return (
    <div className="w-full bg-white rounded-[2.5rem] p-6 md:p-8 border-4 border-b-12 border-sky-100 shadow-xl" id="alternative-spellings-workspace">
      
      {/* Title block */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-5 border-b-4 border-slate-100">
        <div className="flex items-center gap-4">
          <span className="text-4.5xl animate-bounce leading-none">🔮</span>
          <div>
            <h2 className="text-2xl font-black text-indigo-950 font-sans tracking-wide">
              ÂM THAY THẾ DIỆU KỲ (ALTERNATIVE SPELLINGS)
            </h2>
            <p className="text-xs text-indigo-500/80 font-black mt-1 uppercase tracking-wider">
              Một âm thanh có muôn vàn cách viết biến hóa tinh nghịch!
            </p>
          </div>
        </div>

        {/* Dynamic score block */}
        <div className="bg-amber-50 border-2 border-b-4 border-amber-300 rounded-2xl px-5 py-2 flex items-center gap-2 shadow-xs">
          <span className="text-xl">⭐</span>
          <div>
            <div className="text-[9px] text-amber-700 font-extrabold leading-tight">MÉO NHẬN THƯỞNG:</div>
            <div className="text-xs font-black text-amber-950 font-mono">{stars} Ngôi sao đạt được</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        
        {/* Left Selector Column */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest px-2 select-none">
            Chọn quy luật âm học:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
            {alternativeLessonsData.map((item, index) => {
              const isSelected = selectedGroupIndex === index;
              return (
                <button
                  key={index}
                  onClick={() => handleLevelSelect(index)}
                  className={`p-4 rounded-3xl text-left font-black text-sm border-2 border-b-6 transition-all flex flex-col justify-center cursor-pointer relative overflow-hidden group ${
                    isSelected
                      ? "bg-indigo-650 text-white border-indigo-850 shadow-md translate-y-[1px]"
                      : "bg-indigo-50/40 text-indigo-950 border-indigo-100 hover:bg-indigo-50/80"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-base font-mono font-black">{item.soundName}</span>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                      isSelected ? "bg-indigo-500 text-indigo-50 border border-indigo-400" : "bg-indigo-100 text-indigo-700"
                    }`}>
                      Mẫu {index + 1}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold ${isSelected ? "text-indigo-200" : "text-slate-400"}`}>
                    {item.shortDesc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Active Learning Container */}
        <div className="lg:col-span-8 bg-slate-50/50 border-4 border-slate-100 rounded-[2.5rem] p-5 sm:p-7 flex flex-col gap-6">
          
          {/* Active Sound Headline */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b-2 border-slate-100 pb-4">
            <div>
              <span className="text-[10px] bg-indigo-100 text-indigo-700 border border-indigo-150 px-2.5 py-0.5 rounded-full font-black uppercase tracking-widest">
                Phân khu nâng cao {selectedGroupIndex + 1}
              </span>
              <h3 className="text-xl font-black text-slate-800 tracking-wide mt-1">
                Chi tiết âm: <span className="font-mono text-indigo-600">{activeLesson.soundName}</span>
              </h3>
            </div>
            <button
              onClick={() => speakPhoneme(activeLesson.primarySpelling)}
              className="flex items-center gap-1.5 py-1.5 px-3 bg-white border border-slate-200 hover:bg-slate-55 text-xs text-indigo-600 font-extrabold rounded-full shadow-xs cursor-pointer"
            >
              <span>🔊 Nghe phát âm chuẩn:</span>
              <span className="font-mono bg-indigo-50 text-indigo-700 px-2 rounded font-black">
                /{displayPhoneme(activeLesson.primarySpelling)}/
              </span>
            </button>
          </div>

          {/* 5-Step phonic tab sequence selector */}
          <div className="flex flex-wrap gap-1.5 border-b border-slate-100 pb-3">
            {[
              { id: "discover", label: "🪐 1. Khám phá", desc: "Discover" },
              { id: "rule", label: "🔮 2. Quy luật", desc: "Magic Rule" },
              { id: "compare", label: "⚖️ 3. So tài", desc: "Compare" },
              { id: "blend", label: "🧩 4. Ghép vần", desc: "Blend" },
              { id: "practice", label: "🏆 5. Thách thức", desc: "Practice" }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-3 sm:px-4 rounded-xl text-xs font-black border-2 transition-all flex flex-col items-center cursor-pointer select-none ${
                    isActive
                      ? "bg-indigo-600 text-white border-indigo-700 shadow-xs"
                      : "bg-white hover:bg-slate-50 text-slate-600 border-slate-200 border-b-4 hover:border-b-2"
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Screen Routing */}
          <div className="min-h-[300px]">
            <AnimatePresence mode="wait">
              
              {/* Tab 1: Discover */}
              {activeTab === "discover" && (
                <motion.div
                  key="discover"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <p className="text-xs text-slate-400 font-black uppercase tracking-wider mb-2">
                    🍒 NHẤP HÌNH ĐỂ NGHE CHÚ ONG ĐỌC MẪU VÀ LUYỆN KHẨU HÌNH NHÉ:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeLesson.examples.map((item, i) => (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        key={i}
                        onClick={() => speakWord(item.word)}
                        className="bg-white hover:bg-indigo-50/10 border-2 border-b-6 border-slate-200 hover:border-indigo-200 rounded-[2rem] p-4 flex items-center gap-4 text-left cursor-pointer transition-all"
                      >
                        <div className="w-14 h-14 rounded-2xl bg-indigo-50 border-2 border-indigo-150 flex items-center justify-center text-4xl text-indigo-700 font-black font-mono shrink-0 shadow-inner">
                          {displayPhoneme(item.spelling)}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-base font-black text-slate-800 tracking-wider">
                            {item.word.split("").map((letter, idx) => {
                              const isHighlight = item.graphemes[idx] === item.spelling || (item.spelling === "a-e" && (letter === "a" || letter === "e")) || (item.spelling === "i-e" && (letter === "i" || letter === "e")) || (item.spelling === "o-e" && (letter === "o" || letter === "e")) || (item.spelling === "u-e" && (letter === "u" || letter === "e"));
                              return (
                                <span
                                  key={idx}
                                  className={isHighlight ? "text-indigo-600 underline font-black underline-offset-4" : ""}
                                >
                                  {letter}
                                </span>
                              );
                            })}
                          </h4>
                          <p className="text-[10px] text-slate-405 font-bold mt-1 uppercase tracking-wide">
                            {item.translation}
                          </p>
                        </div>
                        <span className="text-lg bg-indigo-50 rounded-full w-8 h-8 flex items-center justify-center">🔊</span>
                      </motion.button>
                    ))}
                  </div>

                  <p className="text-[11px] text-slate-400 font-bold leading-normal text-center mt-3 bg-white p-3 rounded-2xl border border-slate-100">
                    👉 Hãy nhìn kỹ các chữ gạch chân! Chúng đều là những cách biến hóa khác nhau của âm chính, tạo thành các từ mới tinh khôi đấy!
                  </p>
                </motion.div>
              )}

              {/* Tab 2: Rule */}
              {activeTab === "rule" && (
                <motion.div
                  key="rule"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="bg-yellow-50 border-4 border-b-12 border-yellow-200 rounded-[2.2rem] p-6 text-yellow-950 flex flex-col gap-4 relative overflow-hidden"
                >
                  <div className="absolute top-2 right-2 text-6xl opacity-10 select-none">🧙‍♂️</div>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🔮</span>
                    <h4 className="text-base font-black text-yellow-950 font-sans tracking-wide">
                      {activeLesson.ruleTitle}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm font-extrabold text-yellow-900 leading-relaxed">
                    {activeLesson.ruleExplanation}
                  </p>
                  <div className="mt-2 bg-white/70 rounded-2xl p-4 border border-yellow-150">
                    <p className="text-xs font-black text-amber-950 mb-1">💡 Mách nhỏ ba mẹ hướng dẫn bé:</p>
                    <p className="text-[11px] text-amber-900 font-bold leading-normal">
                      {activeLesson.ruleTip}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Tab 3: Compare */}
              {activeTab === "compare" && (
                <motion.div
                  key="compare"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-4"
                >
                  <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
                    <h4 className="text-xs font-black text-indigo-950 mb-1 select-none">
                      🔍 TẠI SAO PHẢI PHÂN BIỆT ÂM?
                    </h4>
                    <p className="text-[11px] text-indigo-900 font-bold leading-normal">
                      Tránh nhầm lẫn khi đọc và viết! Cùng một chữ cái nhưng đứng ở các vị trí khác nhau, hoặc đi cùng bạn khác sẽ phát ra âm thanh hoàn toàn mới. Thử nhấp từng từ dưới đây để so sánh sự khác biệt nhé:
                    </p>
                  </div>

                  <div className="space-y-3">
                    {activeLesson.comparePairs.map((pair, idx) => (
                      <div
                        key={idx}
                        className="bg-white border-2 border-slate-200 rounded-3xl p-4 grid grid-cols-2 gap-4 shadow-xs relative overflow-hidden"
                      >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-100 text-slate-400 font-black text-[10px] w-6 h-6 rounded-full flex items-center justify-center select-none border border-slate-200">
                          VS
                        </div>

                        {/* Card Left */}
                        <button
                          onClick={() => speakWord(pair.word1)}
                          className="bg-emerald-50/20 hover:bg-emerald-50/50 border border-emerald-100 rounded-2xl p-3 text-left cursor-pointer transition-all flex flex-col gap-1"
                        >
                          <span className="text-xs font-mono font-black text-emerald-805 uppercase">
                            {pair.word1} 🔊
                          </span>
                          <span className="text-[9px] text-emerald-700/80 font-black bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100/50 self-start">
                            {pair.soundDesc1}
                          </span>
                          <span className="text-[9px] text-slate-400 font-bold mt-1">
                            Nghĩa: {pair.translation1}
                          </span>
                        </button>

                        {/* Card Right */}
                        <button
                          onClick={() => speakWord(pair.word2)}
                          className="bg-indigo-50/20 hover:bg-indigo-50/50 border border-indigo-100 rounded-2xl p-3 text-left cursor-pointer transition-all flex flex-col gap-1"
                        >
                          <span className="text-xs font-mono font-black text-indigo-805 uppercase">
                            {pair.word2} 🔊
                          </span>
                          <span className="text-[9px] text-indigo-700/80 font-black bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100/50 self-start">
                            {pair.soundDesc2}
                          </span>
                          <span className="text-[9px] text-slate-400 font-bold mt-1">
                            Nghĩa: {pair.translation2}
                          </span>
                        </button>

                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Tab 4: Blend */}
              {activeTab === "blend" && (
                <motion.div
                  key="blend"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-6"
                >
                  <p className="text-xs text-slate-400 font-black uppercase tracking-wider mb-2">
                    🧩 BẢN GHÉP VẦN TỪNG PHÂN TỬ PHONICS CHUẨN XÁC:
                  </p>

                  <div className="flex gap-2">
                    {activeLesson.blendWords.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setBlendWordIdx(idx);
                          speakWord(item.word);
                        }}
                        className={`px-3 py-2 text-xs font-black rounded-lg border cursor-pointer transition-colors ${
                          blendWordIdx === idx
                            ? "bg-indigo-600 text-white border-indigo-700"
                            : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"
                        }`}
                      >
                        {item.word.toUpperCase()}
                      </button>
                    ))}
                  </div>

                  <div className="bg-white border-4 border-b-10 border-slate-200 rounded-[2.5rem] p-6 text-center shadow-md relative">
                    <span className="text-[9px] font-black uppercase bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full border border-indigo-150 absolute top-4 left-4 select-none">
                      Phân rã âm sắc học
                    </span>

                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mt-6">
                      Bé chạm vào từng chữ để nghe âm nhé:
                    </h4>

                    {/* Interactive Phoneme Tiles */}
                    <div className="flex justify-center gap-4 mt-6 mb-8">
                      {activeBlendWord.display.map((phoneme, idx) => {
                        const isActive = activePhonemeIdx === idx;
                        return (
                          <motion.button
                            key={idx}
                            whileHover={{ y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => speakPhoneme(activeBlendWord.audio[idx])}
                            className={`w-14 h-16 rounded-2xl border-2 border-b-6 flex items-center justify-center text-2xl font-mono font-black transition-all cursor-pointer select-none ${
                              isActive
                                ? "bg-amber-500 text-white border-amber-600 border-b-orange-700 scale-110"
                                : "bg-indigo-50/50 hover:bg-indigo-100/40 text-indigo-900 border-indigo-150 hover:border-indigo-300"
                            }`}
                          >
                            {phoneme}
                          </motion.button>
                        );
                      })}
                    </div>

                    <div className="flex flex-col items-center justify-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={isBlending}
                        onClick={handleSoundOut}
                        className="py-3 px-6 bg-indigo-650 hover:bg-indigo-750 text-white font-black text-xs rounded-full cursor-pointer flex items-center gap-2 border-b-4 border-indigo-850 active:border-b-2"
                      >
                        <span>🔊 Đánh vần hòa quyện (Sound Out)</span>
                      </motion.button>

                      <p className="text-[11px] text-slate-500 font-black tracking-normal uppercase">
                        Nghĩa là: <span className="text-orange-605">{activeBlendWord.translation}</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 5: Practice */}
              {activeTab === "practice" && (
                <motion.div
                  key="practice"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  
                  {/* Practice Inner Sub-tabs */}
                  <div className="flex flex-wrap gap-1 bg-white p-1 rounded-2xl border border-slate-200">
                    {[
                      { id: "listen", label: "🎧 Nghe & chọn" },
                      { id: "find", label: "🔍 Tìm âm học" },
                      { id: "spell", label: "🧩 Ghép vần" },
                      { id: "sort", label: "📦 Phân loại" },
                      { id: "indie", label: "📖 Đọc mở rộng" }
                    ].map((st) => {
                      const isSubActive = practiceSubTab === st.id;
                      return (
                        <button
                          key={st.id}
                          onClick={() => setPracticeSubTab(st.id as any)}
                          className={`flex-1 py-2 px-2 text-[10px] sm:text-xs font-black rounded-xl text-center cursor-pointer transition-colors ${
                            isSubActive
                              ? "bg-slate-800 text-white"
                              : "text-slate-600 hover:bg-slate-55"
                          }`}
                        >
                          {st.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Activity Play Window */}
                  <div className="bg-white border text-left p-6 rounded-3xl min-h-[220px] shadow-inner border-slate-100 flex flex-col justify-center">
                    
                    {/* Activity 1: Listen and Choose */}
                    {practiceSubTab === "listen" && (
                      <div className="flex flex-col items-center text-center gap-4">
                        <span className="text-xs text-indigo-500 font-extrabold uppercase">
                          CÂU HỎI 1: NGHE VÀ CHỌN TỪ ĐÚNG CHÍNH XÁC
                        </span>

                        <button
                          onClick={() => speakWord(activeLesson.practice.listenAndChoose.audioWord)}
                          className="w-16 h-16 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 flex items-center justify-center font-black text-2xl shadow-md border-b-6 border-indigo-800 cursor-pointer"
                        >
                          🔊
                        </button>
                        <p className="text-[10px] text-slate-400 font-black">Chạm nút loa để nghe tiếng nhé bé!</p>

                        <div className="grid grid-cols-3 gap-3 w-full max-w-sm mt-3">
                          {activeLesson.practice.listenAndChoose.options.map((opt, i) => {
                            const isSelected = selectedAnswer === opt;
                            return (
                              <button
                                key={i}
                                onClick={() => handleCheckAnswer(opt, activeLesson.practice.listenAndChoose.correctAnswer)}
                                className={`py-4 rounded-2xl font-mono text-sm font-black border-2 border-b-6 uppercase cursor-pointer transition-all ${
                                  isSelected
                                    ? isAnswerCorrect
                                      ? "bg-emerald-500 border-emerald-650 text-white"
                                      : "bg-rose-500 border-rose-650 text-white"
                                    : "bg-slate-50 hover:bg-slate-100 text-slate-705 border-slate-200"
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {isAnswerCorrect !== null && (
                          <p className={`text-xs font-black mt-2 ${isAnswerCorrect ? "text-emerald-600 animate-bounce" : "text-rose-600"}`}>
                            {isAnswerCorrect ? "🌟 Tuyệt diệu! Ba mẹ tặng con một tràng pháo tay!" : "😢 Chưa đúng rồi, chạm loa nghe lại thử nhé."}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Activity 2: Find Sound */}
                    {practiceSubTab === "find" && (
                      <div className="flex flex-col items-center text-center gap-4">
                        <span className="text-xs text-indigo-500 font-extrabold uppercase">
                          CÂU HỎI 2: TÌM RA ĐẤU VẾT CỦA ÂM HỌC
                        </span>
                        <h4 className="text-sm font-black text-slate-800 tracking-wide">
                          {activeLesson.practice.findSound.question}
                        </h4>

                        <div className="grid grid-cols-3 gap-3 w-full max-w-sm mt-3">
                          {activeLesson.practice.findSound.options.map((opt, i) => {
                            const isSelected = selectedAnswer === opt;
                            return (
                              <button
                                key={i}
                                onClick={() => handleCheckAnswer(opt, activeLesson.practice.findSound.correctAnswer)}
                                className={`py-4 rounded-2xl font-mono text-sm font-black border-2 border-b-6 uppercase cursor-pointer transition-all ${
                                  isSelected
                                    ? isAnswerCorrect
                                      ? "bg-emerald-500 border-emerald-650 text-white"
                                      : "bg-rose-500 border-rose-650 text-white"
                                    : "bg-slate-50 hover:bg-slate-100 text-slate-705 border-slate-200"
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {isAnswerCorrect !== null && (
                          <p className={`text-xs font-black mt-2 ${isAnswerCorrect ? "text-emerald-600 animate-bounce" : "text-rose-600"}`}>
                            {isAnswerCorrect ? "🎉 Xuất sắc! Nhận thưởng sao may mắn!" : "🔴 Thử suy nghĩ kỹ lại xem sao bé yêu ơi."}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Activity 3: Spelling Task */}
                    {practiceSubTab === "spell" && (
                      <div className="flex flex-col items-center text-center gap-4">
                        <span className="text-xs text-indigo-500 font-extrabold uppercase">
                          CÂU HỎI 3: RÁP PHÂN TỬ CHỮ THẦN TỐC
                        </span>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => speakWord(activeLesson.practice.spellingTask.word)}
                            className="bg-indigo-100 hover:bg-indigo-200 text-indigo-705 px-3 py-1 rounded-full text-xs font-black flex items-center gap-1 cursor-pointer"
                          >
                            🔊 Nghe từ mẫu: <span className="font-mono text-indigo-650">{activeLesson.practice.spellingTask.word.toUpperCase()}</span>
                          </button>
                        </div>

                        {/* Spelling box display */}
                        <div className="min-h-[60px] border-4 border-dashed border-slate-200 rounded-2xl w-full max-w-xs flex items-center justify-center gap-3 bg-slate-50 p-3">
                          {userSpellList.length === 0 ? (
                            <span className="text-xs text-slate-400 font-extrabold">Nhấp các bong bóng chữ bên dưới...</span>
                          ) : (
                            userSpellList.map((letObj, idx) => (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                key={idx}
                                className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-mono font-black text-lg shadow-inner"
                              >
                                {letObj.toUpperCase()}
                              </motion.div>
                            ))
                          )}
                        </div>

                        {/* Available bubble letters */}
                        <div className="flex gap-2 justify-center">
                          {activeLesson.practice.spellingTask.scrambled.map((letter, idx) => {
                            const countInUse = userSpellList.filter(l => l === letter).length;
                            const countInTotal = activeLesson.practice.spellingTask.scrambled.filter(l => l === letter).length;
                            const isUsed = countInUse >= countInTotal;

                            return (
                              <button
                                key={idx}
                                disabled={isUsed}
                                onClick={() => handleSpellClick(letter)}
                                className={`w-11 h-11 rounded-full border-2 border-b-4 font-mono font-black text-lg flex items-center justify-center transition-colors ${
                                  isUsed
                                    ? "bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed"
                                    : "bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-250 cursor-pointer"
                                }`}
                              >
                                {letter}
                              </button>
                            );
                          })}
                        </div>

                        {spellMessage && (
                          <div className="text-xs font-black text-indigo-700 animate-bounce mt-1">
                            {spellMessage}
                          </div>
                        )}

                        <button
                          onClick={handleResetSpell}
                          className="pt-1.5 text-[10px] text-red-500 font-extrabold underline cursor-pointer"
                        >
                          🔄 Reset làm lại từ đầu
                        </button>
                      </div>
                    )}

                    {/* Activity 4: Sorting words */}
                    {practiceSubTab === "sort" && (
                      <div className="flex flex-col items-center gap-4">
                        <span className="text-xs text-indigo-500 font-extrabold uppercase text-center w-full">
                          CÂU HỎI 4: PHÂN HỘP ÂM THANH TINH GỌN
                        </span>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                          
                          {/* Box Category 1 */}
                          <div className="bg-indigo-50/50 border-2 border-dashed border-indigo-200 rounded-3xl p-4 text-center">
                            <h5 className="text-[11px] font-black text-indigo-950 uppercase border-b border-indigo-150 pb-1.5 mb-2 select-none">
                              🗳️ Thùng {activeLesson.practice.sortingTask.category1}
                            </h5>
                            <div className="flex flex-wrap gap-2 justify-center min-h-[60px]">
                              {activeLesson.practice.sortingTask.wordList.map((wordObj) => {
                                const wherePlaced = placedWords[wordObj.word];
                                if (wherePlaced !== activeLesson.practice.sortingTask.category1) return null;
                                return (
                                  <span key={wordObj.word} className="px-3 py-1 bg-indigo-600 text-white font-black rounded-lg text-xs font-mono shadow-xs select-none">
                                    {wordObj.word.toUpperCase()}
                                  </span>
                                );
                              })}
                            </div>
                          </div>

                          {/* Box Category 2 */}
                          <div className="bg-amber-50/50 border-2 border-dashed border-amber-200 rounded-3xl p-4 text-center">
                            <h5 className="text-[11px] font-black text-amber-950 uppercase border-b border-amber-150 pb-1.5 mb-2 select-none">
                              🗳️ Thùng {activeLesson.practice.sortingTask.category2}
                            </h5>
                            <div className="flex flex-wrap gap-2 justify-center min-h-[60px]">
                              {activeLesson.practice.sortingTask.wordList.map((wordObj) => {
                                const wherePlaced = placedWords[wordObj.word];
                                if (wherePlaced !== activeLesson.practice.sortingTask.category2) return null;
                                return (
                                  <span key={wordObj.word} className="px-3 py-1 bg-amber-500 text-white font-black rounded-lg text-xs font-mono shadow-xs select-none">
                                    {wordObj.word.toUpperCase()}
                                  </span>
                                );
                              })}
                            </div>
                          </div>

                        </div>

                        {/* Available items to sort */}
                        <div className="text-center mt-2">
                          <p className="text-[10px] text-slate-400 font-extrabold uppercase mb-2">Chữ cái cần xếp thùng:</p>
                          <div className="flex flex-wrap gap-2.5 justify-center">
                            {activeLesson.practice.sortingTask.wordList.map((item) => {
                              const alreadyPlaced = placedWords[item.word] !== undefined;
                              return (
                                <div key={item.word} className="relative group">
                                  <button
                                    disabled={alreadyPlaced}
                                    onClick={() => speakWord(item.word)}
                                    className={`py-2 px-3.5 rounded-xl font-mono text-xs font-black border border-slate-300 flex items-center gap-1.5 transition-opacity ${
                                      alreadyPlaced ? "opacity-30 bg-slate-100 cursor-not-allowed" : "bg-white hover:bg-slate-50 cursor-pointer shadow-xs"
                                    }`}
                                  >
                                    <span>{item.word.toUpperCase()}</span>
                                    <span className="text-[10px]">🔊</span>
                                  </button>

                                  {!alreadyPlaced && (
                                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 bg-slate-800 text-white text-[8px] font-black py-1 px-2.5 rounded-md flex gap-2 w-[140px] justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-lg">
                                      <button className="hover:text-amber-300 pointer-events-auto" onClick={() => handlePlaceSort(item.word, activeLesson.practice.sortingTask.category1, item.category)}>Trái</button>
                                      <span>|</span>
                                      <button className="hover:text-amber-300 pointer-events-auto" onClick={() => handlePlaceSort(item.word, activeLesson.practice.sortingTask.category2, item.category)}>Phải</button>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {sortCompleteMsg && (
                          <p className="text-xs font-black text-indigo-700 mt-2 animate-bounce">
                            {sortCompleteMsg}
                          </p>
                        )}

                        <button
                          onClick={() => {
                            setPlacedWords({});
                            setSortCompleteMsg(null);
                          }}
                          className="text-[10px] text-slate-400 font-black underline cursor-pointer mt-1"
                        >
                          🔄 Hoàn tác tất cả (Reset)
                        </button>
                      </div>
                    )}

                    {/* Activity 5: Independent reading */}
                    {practiceSubTab === "indie" && (
                      <div className="flex flex-col items-center text-center gap-4">
                        <span className="text-xs text-indigo-500 font-extrabold uppercase">
                          CÂU HỎI 5: THỬ THÁCH BÉ PHÁT ÂM TẬP ĐỘC TO TỰ TIN
                        </span>
                        
                        <p className="text-[11px] text-slate-450 font-bold leading-normal max-w-md">
                          Đây là một từ vần mở rộng vô cùng lý thú, mời bé nhìn vào các nguyên âm đã học và thử phát âm to của cả từ. Sau khi đọc xong, nhấp loa 🔊 kiểm chứng nhé!
                        </p>

                        <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-5 w-full max-w-sm text-center">
                          
                          {/* Segment display */}
                          <div className="flex justify-center gap-2 mb-4">
                            {activeLesson.practice.readIndie.display.map((seg, i) => (
                              <div key={i} className="px-4 py-2 bg-indigo-50 border-2 border-indigo-200 text-indigo-800 font-mono font-black rounded-xl text-lg select-none shadow-xs">
                                {seg}
                              </div>
                            ))}
                          </div>

                          <h3 className="text-2xl font-mono text-slate-800 tracking-wider font-black uppercase">
                            {activeLesson.practice.readIndie.word}
                          </h3>

                          <p className="text-xs text-slate-400 font-bold mt-1 tracking-wide">
                            Ý nghĩa: <span className="text-indigo-605">{activeLesson.practice.readIndie.translation}</span>
                          </p>

                          <div className="mt-5 flex justify-center gap-3">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={handleIndieReadComplete}
                              className="py-2.5 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs border-b-4 border-indigo-805"
                            >
                              <span>🔊 Bé đọc xong rồi! Check ngay</span>
                            </motion.button>
                          </div>
                        </div>

                        {hasIndieRead && (
                          <div className="text-xs font-black text-emerald-600 animate-pulse mt-2">
                            💎 Tuyệt đỉnh thông minh! Con đã ghi thêm 1 Sao Danh Giá vào kho thành tích!
                          </div>
                        )}
                      </div>
                    )}

                  </div>

                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>

      </div>

    </div>
  );
}

import React, { useState } from "react";
import { speakWord, speakEncouragement } from "../utils/speech";
import { motion, AnimatePresence } from "motion/react";

interface TrickyWord {
  word: string;
  groupNum: number; // 1 to 12
  trickyPart: string; // Explanation of why it's tricky
  sampleSentence: string;
  sentenceTranslation: string;
}

const trickyWordsData: TrickyWord[] = [
  // Nhóm 1
  {
    word: "I",
    groupNum: 1,
    trickyPart: "Chữ viết hoa một mình phát âm là /eye/ (tôi/con) kéo dài rực rỡ, không phải âm ngắn /ih/.",
    sampleSentence: "I am a happy kid.",
    sentenceTranslation: "Con là một em bé hạnh phúc."
  },
  {
    word: "the",
    groupNum: 1,
    trickyPart: "Chữ 'e' không phát âm dứt khoát mà nhẹ nhàng lướt hơi thành âm lười (schwa) nhẹ /thờ/.",
    sampleSentence: "The sun is yellow.",
    sentenceTranslation: "Ông mặt trời có màu vàng."
  },
  {
    word: "he",
    groupNum: 1,
    trickyPart: "Chữ 'e' đứng ở tận cùng từ ngắn phát âm kéo dài thành âm /ee/ (hi).",
    sampleSentence: "He sits on the rug.",
    sentenceTranslation: "Cậu ấy ngồi trên tấm thảm."
  },
  {
    word: "she",
    groupNum: 1,
    trickyPart: "Chữ 'e' đứng cuối từ ngắn 1 âm tiết đọc dài thành âm /ee/ tròn miệng (xi).",
    sampleSentence: "She can run fast.",
    sentenceTranslation: "Cô ấy có thể chạy rất nhanh."
  },
  {
    word: "me",
    groupNum: 1,
    trickyPart: "Chữ 'e' cuối đọc liền thành âm /ee/ kéo dài (mi).",
    sampleSentence: "Can you help me?",
    sentenceTranslation: "Ba mẹ giúp con được không ạ?"
  },
  {
    word: "we",
    groupNum: 1,
    trickyPart: "Chữ 'e' cuối từ ngắn phát âm dõng dạc thành âm /ee/ kéo dài (ui-i).",
    sampleSentence: "We jump together.",
    sentenceTranslation: "Chúng mình cùng nhảy lên nào."
  },

  // Nhóm 2
  {
    word: "be",
    groupNum: 2,
    trickyPart: "Chữ 'e' đứng ở tận cùng từ ngắn 1 âm tiết, phát âm thành âm /ee/ kéo dài (bi).",
    sampleSentence: "Be kind to others.",
    sentenceTranslation: "Hãy đối xử tốt bụng với mọi người."
  },
  {
    word: "was",
    groupNum: 2,
    trickyPart: "Chữ 'a' biến thành âm /o/ ngắn lười bụng, còn chữ 's' rung nhẹ nghe như âm /z/.",
    sampleSentence: "It was a hot day.",
    sentenceTranslation: "Hôm đó đã là một ngày nóng nực."
  },
  {
    word: "to",
    groupNum: 2,
    trickyPart: "Chữ 'o' chuyển biến thần kỳ thành âm /oo/ dài chứ không phải âm /o/.",
    sampleSentence: "Walk to school.",
    sentenceTranslation: "Chúng ta đi bộ tới trường nào."
  },
  {
    word: "do",
    groupNum: 2,
    trickyPart: "Chữ 'o' biến đổi nghe nhịp nhàng thành âm /oo/ dài đầy đầy (đu).",
    sampleSentence: "What do you have?",
    sentenceTranslation: "Con đang có món đồ gì thế?"
  },
  {
    word: "are",
    groupNum: 2,
    trickyPart: "Cả cụm 'are' phát âm gọn là âm /ar/ kéo dài, chữ 'e' cuối hoàn toàn câm thin thít.",
    sampleSentence: "They are happy.",
    sentenceTranslation: "Các bạn ấy đang rất vui vẻ."
  },
  {
    word: "all",
    groupNum: 2,
    trickyPart: "Chữ 'a' đổi âm thành /or/ kéo dài tròn môi, đi cùng 'll' cuốn nhẹ đầu lưỡi.",
    sampleSentence: "All the frogs jump.",
    sentenceTranslation: "Tất cả những chú ếch đều nhảy."
  },

  // Nhóm 3
  {
    word: "you",
    groupNum: 3,
    trickyPart: "Cả cụm 'ou' ở đây chỉ đơn thuần phát âm dứt khoát thành âm /oo/ dài (du).",
    sampleSentence: "I think you are super!",
    sentenceTranslation: "Con nghĩ bạn thật là siêu đẳng!"
  },
  {
    word: "your",
    groupNum: 3,
    trickyPart: "Chữ 'ou' phát âm hướng tròn và khép môi thành âm /or/ kéo dài (yo-r).",
    sampleSentence: "Wash your hands.",
    sentenceTranslation: "Con hãy rửa sạch đôi tay nhé."
  },
  {
    word: "come",
    groupNum: 3,
    trickyPart: "Chữ 'o' ở giữa lại phát âm dứt khoát như âm /u/ ngắn nhẹ dải, chữ 'e' câm (căm).",
    sampleSentence: "Come and play with me.",
    sentenceTranslation: "Hãy lại đây chơi cùng tớ nào."
  },
  {
    word: "some",
    groupNum: 3,
    trickyPart: "Chữ 'o' phát âm giống âm /u/ ngắn dứt khoát, chữ 'e' ở cuối câm bặt (xăm).",
    sampleSentence: "I want some water.",
    sentenceTranslation: "Con muốn uống một chút nước."
  },
  {
    word: "said",
    groupNum: 3,
    trickyPart: "Cặp đôi 'ai' bất ngờ không phát âm thành /ai/ dài mà rút ngắn thành /e/ (sét).",
    sampleSentence: "She said hello.",
    sentenceTranslation: "Cô ấy đã lên tiếng chào mừng."
  },
  {
    word: "here",
    groupNum: 3,
    trickyPart: "Chữ 'e' cuối câm, cụm 'ere' kéo thanh thoát thành âm /ia/ (hi-ơ).",
    sampleSentence: "Look here.",
    sentenceTranslation: "Con hãy nhìn vào đây này."
  },

  // Nhóm 4
  {
    word: "there",
    groupNum: 4,
    trickyPart: "Chữ 'e' cuối câm, còn cụm 'ere' phát âm giống hệt âm /air/ (đh-e-r).",
    sampleSentence: "Look over there.",
    sentenceTranslation: "Con hãy nhìn về phía đằng kia kìa."
  },
  {
    word: "they",
    groupNum: 4,
    trickyPart: "Cụm 'ey' kết hợp đọc dõng dạc thành nguyên âm /ai/ dài kéo dải (đh-ây).",
    sampleSentence: "They like to sing.",
    sentenceTranslation: "Các bạn ấy rất thích ca hát."
  },
  {
    word: "go",
    groupNum: 4,
    trickyPart: "Chữ 'o' dứt khoát phát âm tròn đầy thành âm nguyên âm dài /oa/ (g-ô).",
    sampleSentence: "Go to the park.",
    sentenceTranslation: "Đi ra công viên vui chơi thênh thang nào."
  },
  {
    word: "no",
    groupNum: 4,
    trickyPart: "Chữ 'o' phát âm thành nguyên âm dài tròn vút /oa/ (n-ô).",
    sampleSentence: "There is no rain today.",
    sentenceTranslation: "Hôm nay trời hoàn toàn tạnh ráo không mưa."
  },
  {
    word: "so",
    groupNum: 4,
    trickyPart: "Chữ 'o' phát âm thành âm nguyên âm dài /oa/ kéo dài hơi nhẹ (s-ô).",
    sampleSentence: "It is so sweet.",
    sentenceTranslation: "Món kẹo ngọt này rất nịnh miệng đấy."
  },
  {
    word: "my",
    groupNum: 4,
    trickyPart: "Chữ 'y' kết thúc từ ngắn một âm tiết phát âm chuyển thành âm /ie/ dài (m-ai).",
    sampleSentence: "This is my bag.",
    sentenceTranslation: "Đây là chiếc balo nhỏ xinh của con."
  },

  // Nhóm 5
  {
    word: "one",
    groupNum: 5,
    trickyPart: "Viết là o-n-e nhưng phát âm rất ngộ nghĩnh giống như bắt đầu là /w-ă-n/.",
    sampleSentence: "I have one puppy.",
    sentenceTranslation: "Con đang nuôi một chú cún con."
  },
  {
    word: "by",
    groupNum: 5,
    trickyPart: "Chữ 'y' ở cuối từ ngắn phát âm chuyển thành âm nguyên âm dài /ie/ (b-ai).",
    sampleSentence: "Sit by the lake.",
    sentenceTranslation: "Chúng mình ngồi chơi cạnh bờ hồ mát mẻ."
  },
  {
    word: "only",
    groupNum: 5,
    trickyPart: "Chữ 'o' phát âm rộng kéo tròn thành nguyên âm dài /oa/ (ô-un-ly).",
    sampleSentence: "I have only three stars.",
    sentenceTranslation: "Con mới chỉ tích lũy được ba ngôi sao thôi."
  },
  {
    word: "old",
    groupNum: 5,
    trickyPart: "Chữ 'o' đọc dài thành /oa/ cuốn theo hướng sau (ô-u-đ).",
    sampleSentence: "The big tree is very old.",
    sentenceTranslation: "Cội cây cổ thụ này đã rất nhiều năm tuổi rồi."
  },
  {
    word: "like",
    groupNum: 5,
    trickyPart: "Có phép thuật Magic E ở cuối giúp cho chữ 'i' phát âm âm bảng chữ cái dài của nó /ie/.",
    sampleSentence: "I like red apples.",
    sentenceTranslation: "Con rất thích ăn những quả táo đỏ ngọt."
  },
  {
    word: "have",
    groupNum: 5,
    trickyPart: "Chữ 'e' cuối câm dứt khoát, âm 'a' phát âm mở rộng thoải mái giống âm ngắn /a/.",
    sampleSentence: "Do you have a pet?",
    sentenceTranslation: "Nhà mình có nuôi em thú cưng nào không ạ?"
  },

  // Nhóm 6
  {
    word: "live",
    groupNum: 6,
    trickyPart: "Chữ 'e' cuối câm lặng, chữ 'i' phát âm ngắn /ih/, kết thúc bằng dực âm /v/ nhẹ.",
    sampleSentence: "Fish live in water.",
    sentenceTranslation: "Loài cá sinh sống tung tăng dưới nước."
  },
  {
    word: "give",
    groupNum: 6,
    trickyPart: "Chữ 'e' cuối câm lặng, chữ 'i' phát âm âm ngắn /ih/, rung âm cuối /v/.",
    sampleSentence: "Give me a high five!",
    sentenceTranslation: "Đập tay khen thưởng chúc mừng con nào!"
  },
  {
    word: "little",
    groupNum: 6,
    trickyPart: "Chữ 'le' ở cuối đọc dính nốt nhẹ thành lờ âm cuối (lít-tồ).",
    sampleSentence: "She is a little sister.",
    sentenceTranslation: "Đó là cô em gái nhỏ đáng yêu của con."
  },
  {
    word: "down",
    groupNum: 6,
    trickyPart: "Cử đuôi 'ow' đọc hòa âm nghe rộng giọng thành tiếng /ow/ dứt khoát (đao-n).",
    sampleSentence: "Please sit down.",
    sentenceTranslation: "Kính mời ba mẹ ngồi xuống đây nghỉ chân."
  },
  {
    word: "what",
    groupNum: 6,
    trickyPart: "Chữ 'a' lại phát âm lười bẹt thành nghe giống âm /o/ ngắn tròn môi (w-o-t).",
    sampleSentence: "What can you see?",
    sentenceTranslation: "Con có thể trông thấy điều tuyệt vời gì kia?"
  },
  {
    word: "when",
    groupNum: 6,
    trickyPart: "Chữ 'h' câm nhẹ ráo, đọc trơn tru từ nghe giống /w-e-n/.",
    sampleSentence: "When do we eat?",
    sentenceTranslation: "Khi nào gia đình mình bắt đầu bữa tối ạ?"
  },

  // Nhóm 7
  {
    word: "why",
    groupNum: 7,
    trickyPart: "Chữ 'h' câm hoàn toàn, chữ 'y' ở cuối từ phát âm thành âm /ie/ dài (oai).",
    sampleSentence: "Why are you happy?",
    sentenceTranslation: "Tại sao con lại thấy vui sướng thế?"
  },
  {
    word: "where",
    groupNum: 7,
    trickyPart: "Chữ 'h' câm bặt, cụm 'ere' phát âm giống hệt như âm /air/ rộng lòng (oe-r).",
    sampleSentence: "Where is my pencil?",
    sentenceTranslation: "Chiếc bút chì vẽ của con nằm ở đâu nhỉ?"
  },
  {
    word: "who",
    groupNum: 7,
    trickyPart: "Chữ 'wh' phát âm thành /h/ chứ không phải /w/, chữ 'o' đọc giống nguyên âm /oo/ dài.",
    sampleSentence: "Who is at the door?",
    sentenceTranslation: "Ai đang gõ cửa ngoài nhà thế ba mẹ ơi?"
  },
  {
    word: "which",
    groupNum: 7,
    trickyPart: "Chữ 'h' trong cụm 'wh' câm, chữ 'i' phát âm ngắn dứt khoát kết thúc bằng âm /ch/.",
    sampleSentence: "Which cup is yours?",
    sentenceTranslation: "Chiếc cốc uống nước nào là của con thế?"
  },
  {
    word: "any",
    groupNum: 7,
    trickyPart: "Chữ 'a' đứng đầu từ lại biến đổi phát âm thành âm /e/ ngắn (e-ni).",
    sampleSentence: "Are there any toys?",
    sentenceTranslation: "Ở đây còn món đồ chơi thú vị nào nữa không ạ?"
  },
  {
    word: "many",
    groupNum: 7,
    trickyPart: "Chữ 'a' ở đầu từ này phát âm khác thường nghe thành âm /e/ ngắn dứt khoát (me-ni).",
    sampleSentence: "I have many books.",
    sentenceTranslation: "Con sở hữu rất nhiều cuốn sách hay bổ ích."
  },

  // Nhóm 8
  {
    word: "more",
    groupNum: 8,
    trickyPart: "Chữ 'e' cuối câm, cặp âm 'or' phát âm sâu kéo dõng dạc nghe ngân vang.",
    sampleSentence: "I love you more.",
    sentenceTranslation: "Con yêu mến ba mẹ nhiều hơn nữa cơ."
  },
  {
    word: "before",
    groupNum: 8,
    trickyPart: "Chữ 'e' ở cuối câm thin thít, âm 'or' tròn miệng kéo thanh thanh.",
    sampleSentence: "Read before bed.",
    sentenceTranslation: "Chúng mình cùng đọc sách trước khi đi ngủ nhé."
  },
  {
    word: "other",
    groupNum: 8,
    trickyPart: "Chữ 'o' đọc giống âm /u/ ngắn lười bụng, còn cụm 'th' rung lưỡi nhẹ dõng dạc.",
    sampleSentence: "Show me the other book.",
    sentenceTranslation: "Hãy cho con xem cuốn giáo trình bên kia nhé."
  },
  {
    word: "were",
    groupNum: 8,
    trickyPart: "Cách đọc khác lạ tương tự âm /w-er/, chữ 'e' cuối hoàn toàn câm nhạt.",
    sampleSentence: "We were at the park.",
    sentenceTranslation: "Hôm trước chúng con đã ở công viên chạy nhảy."
  },
  {
    word: "because",
    groupNum: 8,
    trickyPart: "Cụm 'au' ở giữa thu gọn phát âm dứt khoát nghe giống âm /o/ ngắn lười bụng.",
    sampleSentence: "I sleep because I am tired.",
    sentenceTranslation: "Con đi nghỉ bởi vì cơ thể đã mệt nhoài."
  },
  {
    word: "want",
    groupNum: 8,
    trickyPart: "Chữ 'a' trong từ phát âm biến đổi nghe tròn môi như âm /o/ ngắn (w-o-n-t).",
    sampleSentence: "I want to learn.",
    sentenceTranslation: "Con thực sự rất muốn được học hỏi thêm nhiều âm."
  },

  // Nhóm 9
  {
    word: "saw",
    groupNum: 9,
    trickyPart: "Cụm đuôi 'aw' phối hợp phát âm tròn rộng giống như âm /or/ ngân dài (x-or).",
    sampleSentence: "I saw a fat pig.",
    sentenceTranslation: "Con đã nhìn thấy một chú heo béo tròn mắt."
  },
  {
    word: "put",
    groupNum: 9,
    trickyPart: "Chữ 'u' phát âm kéo dốc dứt khoát giống âm /oo/ ngắn kéo dải (p-oo-t).",
    sampleSentence: "Put the toys in the box.",
    sentenceTranslation: "Con cất dọn đồ chơi gọn gàng vào hộp nhé."
  },
  {
    word: "could",
    groupNum: 9,
    trickyPart: "Thật là kỳ bí, chữ 'l' câm hoàn toàn, còn 'ou' phát âm giống giống âm /oo/ ngắn.",
    sampleSentence: "I could run fast.",
    sentenceTranslation: "Ngày còn bé con đã từng chạy khỏe như gió."
  },
  {
    word: "should",
    groupNum: 9,
    trickyPart: "Chữ 'l' câm lặng, cặp 'ou' phát âm dứt khoát thành âm /oo/ ngắn (x-u-đ).",
    sampleSentence: "We should smile always.",
    sentenceTranslation: "Chúng mình nên mỉm cười thân thiện mọi ngày."
  },
  {
    word: "would",
    groupNum: 9,
    trickyPart: "Chữ 'l' câm tịt, cặp âm 'ou' phát âm gọn âm /oo/ dốc dứt khoát (u-oo-đ).",
    sampleSentence: "Would you join us?",
    sentenceTranslation: "Ba mẹ cùng tham gia trò chơi này với con nhé?"
  },
  {
    word: "right",
    groupNum: 9,
    trickyPart: "Cụm 'igh' phát âm thành âm nguyên âm dài /ie/ (r-ai-t), bật dứt khoát chữ 't' ở cuối.",
    sampleSentence: "That is the right way.",
    sentenceTranslation: "Đó thật sự là con đường đi rất chuẩn xác."
  },

  // Nhóm 10
  {
    word: "two",
    groupNum: 10,
    trickyPart: "Số 2 kỳ bí! Chữ 'w' hoàn toàn câm lặng, cả từ đọc nghe giống /t-oo/ dài (tu).",
    sampleSentence: "I have two hands.",
    sentenceTranslation: "Trên cơ thể con có hai bàn tay bé ngoan."
  },
  {
    word: "four",
    groupNum: 10,
    trickyPart: "Viết f-o-u-r nhưng phát âm cực ngắn gọn giống nguyên âm /or/ kéo dài (f-or).",
    sampleSentence: "Four yellow ducks.",
    sentenceTranslation: "Bốn chú vịt con có bộ lông màu vàng óng."
  },
  {
    word: "goes",
    groupNum: 10,
    trickyPart: "Chữ 'e' ở đuôi câm bặt, 'o' là âm /oa/ dài tròn môi, chữ 's' rung nhẹ nghe thành /z/.",
    sampleSentence: "He goes to play.",
    sentenceTranslation: "Cậu ấy nhanh chân đi ra ngoài sân chơi đùa."
  },
  {
    word: "does",
    groupNum: 10,
    trickyPart: "Từ này phát âm biến dị nghe giống hệt /d-ă-z/; chữ 's' phát âm rung /z/.",
    sampleSentence: "What does he do?",
    sentenceTranslation: "Cậu bé ấy đang bận bịu làm gì thế nhỉ?"
  },
  {
    word: "made",
    groupNum: 10,
    trickyPart: "Có phép Magic E ở cuối giúp cho chữ 'a' phát âm bừng sáng thành âm /ai/ dài dõng dạc.",
    sampleSentence: "Dad made a big kite.",
    sentenceTranslation: "Bố đã tự tay làm tặng con chiếc diều siêu to."
  },
  {
    word: "their",
    groupNum: 10,
    trickyPart: "Từ này phát âm đồng âm với 'there', cụm có âm /air/ kéo dài tròn môi rít hơi.",
    sampleSentence: "This is their rabbit.",
    sentenceTranslation: "Đây là chú thỏ trắng tai dài của các bạn đấy."
  },

  // Nhóm 11
  {
    word: "once",
    groupNum: 11,
    trickyPart: "Trông rất đặc trưng o-n-c-e nhưng phát âm là /w-ă-n-s/ bắt đầu bằng phụ âm /w/.",
    sampleSentence: "Once upon a time.",
    sentenceTranslation: "Ngày xửa ngày xưa ở vương quốc cổ tích đẹp."
  },
  {
    word: "upon",
    groupNum: 11,
    trickyPart: "Ghép âm trôi chảy /u-p-o-n/ dõng dạc rõ đầu chữ phát thanh.",
    sampleSentence: "Jump upon the bed.",
    sentenceTranslation: "Chúng con nhảy nhót lí lắc mừng rỡ trên đệm."
  },
  {
    word: "always",
    groupNum: 11,
    trickyPart: "Chữ 'a' đầu đọc thành âm /or/ tròn xoe; cụm 'ay' ở cuối đọc /ai/ rực rỡ dài hơi.",
    sampleSentence: "Always wash your hands.",
    sentenceTranslation: "Luôn giữ ý thức vệ sinh tay thơm tho sạch thế."
  },
  {
    word: "also",
    groupNum: 11,
    trickyPart: "Chữ 'a' đọc giống như âm /or/ tròn môi; 'o' cuối đọc kéo dải /oa/ (o-l-sô).",
    sampleSentence: "She is also very smart.",
    sentenceTranslation: "Bé gái ấy xem chừng cũng rất lanh lợi sáng dạ."
  },
  {
    word: "of",
    groupNum: 11,
    trickyPart: "Rất độc đáo, chữ 'f' tận cùng ở đây lại phát âm rung bần bật giống âm /v/.",
    sampleSentence: "A cup of sweet tea.",
    sentenceTranslation: "Một tách trà ấm thoang thoảng hương quế thơm."
  },
  {
    word: "eight",
    groupNum: 11,
    trickyPart: "Cụm âm phức tạp 'eigh' lại được thu gọn dứt khoát phát âm thành âm /ai/ dài (êt).",
    sampleSentence: "I am eight years old.",
    sentenceTranslation: "Sinh nhật này con đã tròn tám tuổi ngoan rồi."
  },

  // Nhóm 12
  {
    word: "love",
    groupNum: 12,
    trickyPart: "Chữ 'e' cuối câm dứt khoát, âm 'o' đọc mở lười giống âm /u/ ngắn dứt khoát.",
    sampleSentence: "I love my parents.",
    sentenceTranslation: "Con rất yêu kính và hiếu thảo với cha mẹ mình."
  },
  {
    word: "cover",
    groupNum: 12,
    trickyPart: "Chữ 'o' đầu đọc tương tự âm ngắn dứt khoát /u/, dực âm 'er' uốn lưỡi đều đặn.",
    sampleSentence: "Cover the delicious cake.",
    sentenceTranslation: "Con che đậy chiếc bánh ngọt ngon lành này lại nhé."
  },
  {
    word: "after",
    groupNum: 12,
    trickyPart: "Chữ 'a' phát âm dõng dạc thoải mái rộng, kết đuôi 'er' uốn cơ lưỡi đều đặn.",
    sampleSentence: "Walk after dinner.",
    sentenceTranslation: "Đi dạo rèn luyện sức khỏe sau giờ cơm tối."
  },
  {
    word: "every",
    groupNum: 12,
    trickyPart: "Đọc lướt nhanh mượt thành 2 âm 'ev-ri'; chữ 'e' ở giữa hoàn toàn biến mất tăm.",
    sampleSentence: "Read books every day.",
    sentenceTranslation: "Con rèn luyện thói quen đọc sách bổ ích mỗi ngày."
  },
  {
    word: "mother",
    groupNum: 12,
    trickyPart: "Chữ 'o' đọc giống /u/ ngắn thoải mái, 'th' rung lưỡi ấm áp, đuôi 'er' uốn cong.",
    sampleSentence: "My mother is sweet.",
    sentenceTranslation: "Người mẹ hiền dịu dưỡng dục con khôn lớn mỗi ngày."
  },
  {
    word: "father",
    groupNum: 12,
    trickyPart: "Chữ 'a' đọc rộng họng thành âm /ar/, 'th' rung giữa hai kẽ răng, 'er' uốn lưỡi.",
    sampleSentence: "My father tells stories.",
    sentenceTranslation: "Bố con thường kể những câu chuyện cổ tích hay."
  }
];

export default function TrickyWords({ onEarnStar }: { onEarnStar: () => void }) {
  const [activeGroup, setActiveGroup] = useState<number>(1);
  const [selectedWord, setSelectedWord] = useState<TrickyWord | null>(null);

  // Sight Reading Game State
  const [gamePlaying, setGamePlaying] = useState<boolean>(false);
  const [targetWord, setTargetWord] = useState<TrickyWord | null>(null);
  const [options, setOptions] = useState<TrickyWord[]>([]);
  const [gameState, setGameState] = useState<"playing" | "answered" | "completed">("playing");
  const [answerResult, setAnswerResult] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [roundsCount, setRoundsCount] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);

  const filteredWords = trickyWordsData.filter(w => w.groupNum === activeGroup);

  const startNewGameRound = () => {
    if (roundsCount >= 5) {
      setGameState("completed");
      return;
    }

    const randomTarget = trickyWordsData[Math.floor(Math.random() * trickyWordsData.length)];
    const distractors = trickyWordsData
      .filter(w => w.word !== randomTarget.word)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const shuffledOptions = [randomTarget, ...distractors].sort(() => Math.random() - 0.5);

    setTargetWord(randomTarget);
    setOptions(shuffledOptions);
    setGameState("playing");
    setAnswerResult(null);

    setTimeout(() => {
      speakWord(randomTarget.word);
    }, 450);
  };

  const handleStartGame = () => {
    setGamePlaying(true);
    setRoundsCount(0);
    setCorrectAnswers(0);
    setTimeout(() => {
      startNewGameRound();
    }, 100);
  };

  const handleWordClick = async (wordObj: TrickyWord) => {
    setSelectedWord(wordObj);
    await speakWord(wordObj.word);
  };

  const handleOptionSelect = async (selected: TrickyWord) => {
    if (gameState !== "playing" || !targetWord) return;

    if (selected.word === targetWord.word) {
      setCorrectAnswers(prev => prev + 1);
      onEarnStar();
      setAnswerResult({ isCorrect: true, text: "Tuyệt đỉnh! Con nhận dạng từ sight-word chính xác rồi! 🌟" });
      await speakEncouragement("Quá siêu!", "Splendid job!");
    } else {
      setAnswerResult({ isCorrect: false, text: `Gần đúng rồi! Đây là từ "${selected.word.toUpperCase()}", từ cần tìm là "${targetWord.word.toUpperCase()}".` });
    }
    setGameState("answered");
  };

  const handleNextRound = () => {
    const nextRounds = roundsCount + 1;
    setRoundsCount(nextRounds);
    if (nextRounds >= 5) {
      setGameState("completed");
    } else {
      // Start another round immediately
      const listCopy = [...trickyWordsData];
      const randomTarget = listCopy[Math.floor(Math.random() * listCopy.length)];
      const distractors = listCopy
        .filter(w => w.word !== randomTarget.word)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      const shuffledOptions = [randomTarget, ...distractors].sort(() => Math.random() - 0.5);

      setTargetWord(randomTarget);
      setOptions(shuffledOptions);
      setGameState("playing");
      setAnswerResult(null);

      setTimeout(() => {
        speakWord(randomTarget.word);
      }, 400);
    }
  };

  const handleSpeakSampleSentence = (sentence: string) => {
    speakWord(sentence, 0.76);
  };

  return (
    <div className="w-full bg-white rounded-[2.5rem] p-6 lg:p-8 border-4 border-b-12 border-sky-100 shadow-xl" id="tricky-words-workspace">
      
      {/* Title block */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 pb-5 border-b-4 border-slate-105 gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-xs border border-amber-200 shrink-0">
            <img 
              src="/src/assets/images/gold_trophy_3d_1781603250251.jpg" 
              alt="3D Gold Trophy"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h2 className="text-2xl font-black font-sans text-sky-950">
              Tricky Words Kỳ Bí (Sight-words Bất Quy Tắc)
            </h2>
            <p className="text-sm text-slate-400 font-bold mt-1">Những từ bất quy tắc bé cần ghi nhớ qua hình ảnh mặt chữ!</p>
          </div>
        </div>

        {/* Sight Reader Toggle */}
        <button
          onClick={() => {
            if (gamePlaying) {
              setGamePlaying(false);
              setSelectedWord(null);
            } else {
              handleStartGame();
            }
          }}
          className={`px-6 py-4 rounded-2xl text-sm font-black cursor-pointer shadow-md transition-all flex items-center gap-2 border-2 border-b-6 ${
            gamePlaying
              ? "bg-slate-850 text-white border-slate-950 hover:bg-slate-900"
              : "bg-gradient-to-r from-rose-400 to-orange-400 hover:from-rose-500 hover:to-orange-500 text-slate-900 border-orange-600 animate-pulse"
          }`}
          id="btn-toggle-sight-game"
        >
          {gamePlaying ? "📚 Trở về Xem Danh Sách" : "🎮 Chơi Thử Thách Sight-Words"}
        </button>
      </div>

      <AnimatePresence mode="wait">
        
        {/* ===================== LIST VIEW ===================== */}
        {!gamePlaying ? (
          <motion.div
            key="list-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-7"
          >
            {/* Group Selector Column */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">Danh sách 12 Nhóm Từ:</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2.5">
                {Array.from({ length: 12 }, (_, i) => i + 1).map((groupNum) => (
                  <React.Fragment key={groupNum}>
                    <button
                      onClick={() => {
                        setActiveGroup(groupNum);
                        setSelectedWord(null);
                      }}
                      className={`p-3.5 px-5 rounded-2xl text-center lg:text-left font-black text-sm border-2 border-b-6 transition-all cursor-pointer flex flex-col lg:flex-row lg:items-center lg:justify-between ${
                        activeGroup === groupNum
                          ? "bg-rose-500 text-white border-rose-700 shadow-md translate-y-[2px]"
                          : "bg-rose-50 border-rose-200 text-rose-800 hover:bg-rose-100/70"
                      }`}
                    >
                      <span>Nhóm {groupNum}</span>
                      <span className="text-xs font-mono font-black py-0.5 px-2.5 rounded-full bg-white/20 select-none">
                        {trickyWordsData.filter(w => w.groupNum === groupNum).length} từ
                      </span>
                    </button>

                    {/* Removed alternative spellings button groupNum === 7 block */}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Bubble Words Container Column */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <>
                  <div className="bg-slate-50 border-4 border-b-12 border-slate-200 rounded-[2.5rem] p-6">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-4">Nhấp vào từ để thấu hiểu bí mật phát âm:</span>
                    
                    <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                      {filteredWords.map((wordObj) => (
                        <motion.button
                          key={wordObj.word}
                          whileHover={{ scale: 1.12, y: -3 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleWordClick(wordObj)}
                          className={`px-8 py-5 rounded-[2.5rem] border-4 border-b-10 font-mono font-black text-3xl shadow-md text-center cursor-pointer transition-all ${
                            selectedWord?.word === wordObj.word
                              ? "bg-rose-500 border-rose-700 text-white shadow-lg"
                              : "bg-white border-slate-300 text-slate-800 hover:border-rose-400 hover:bg-slate-50"
                          }`}
                        >
                          {wordObj.word}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Secret explanation card */}
                  <AnimatePresence mode="wait">
                    {selectedWord ? (
                      <motion.div
                        key={selectedWord.word}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="p-6 bg-slate-50 border-4 border-b-12 border-slate-200 rounded-[2.5rem] relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-rose-200/20 rounded-full blur-2xl pointer-events-none"></div>

                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 bg-rose-50 border-2 border-rose-200 rounded-2xl flex items-center justify-center text-rose-700 shrink-0 select-none">
                            <span className="text-3xl animate-bounce">❓</span>
                          </div>
                          
                          <div className="w-full">
                            <div className="flex items-center justify-between gap-4 flex-wrap">
                              <h4 className="text-xl font-mono font-black text-slate-800 uppercase flex items-center gap-2">
                                <span>Từ Tricky:</span>
                                <span className="text-rose-600 underline underline-offset-4 font-black">{selectedWord.word}</span>
                              </h4>
                              
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => speakWord(selectedWord.word)}
                                className="bg-rose-500 hover:bg-rose-600 text-white font-black p-2.5 px-4 rounded-2xl text-xs flex items-center gap-1.5 cursor-pointer shadow-md border-b-4 border-rose-700"
                                id="btn-speak-tricky-desc"
                              >
                                <span className="text-sm">🔊</span>
                                <span>Nghe giọng ngọt</span>
                              </motion.button>
                            </div>

                            {/* Explanation block */}
                            <div className="mt-4 p-5 bg-white rounded-3xl border-2 border-slate-205 shadow-inner">
                              <p className="text-xs font-black text-rose-955 uppercase tracking-wider mb-2">🤔 Điểm kỳ lạ của từ (Tricky Mystery):</p>
                              <p className="text-sm text-slate-755 font-extrabold leading-relaxed leading-snug">{selectedWord.trickyPart}</p>
                            </div>

                            {/* Example sentence block */}
                            <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between bg-emerald-50/50 border border-emerald-150 p-5 rounded-3xl gap-3">
                              <div>
                                <span className="text-[10px] text-emerald-805 font-black uppercase tracking-widest block mb-1">Mẫu câu ứng dụng:</span>
                                <span className="text-base font-sans font-black text-slate-900 leading-snug">"{selectedWord.sampleSentence}"</span>
                                <span className="block text-xs text-emerald-950 font-bold mt-1.5">🇻🇳 Nghĩa là: {selectedWord.sentenceTranslation}</span>
                              </div>
                              
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleSpeakSampleSentence(selectedWord.sampleSentence)}
                                className="p-3 py-4 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-md border-b-4 border-emerald-700 cursor-pointer self-start md:self-center shrink-0"
                                title="Nghe mẫu câu"
                                id="btn-speak-tricky-sentence"
                              >
                                <span className="text-sm">🔊</span>
                                <span>Nghe cả câu</span>
                              </motion.button>
                            </div>

                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="p-12 text-center text-sm text-slate-400 font-extrabold italic bg-slate-50 border-4 border-dashed border-slate-200 rounded-[2.5rem] leading-relaxed">
                        👈 Ba mẹ hãy chọn một Nhóm và bấm ô chữ mẫu màu trắng bên trên để giúp bé giải mã bí mật phát âm nhé!
                      </div>
                    )}
                  </AnimatePresence>
                </>
            </div>
          </motion.div>
        ) : (
          
          // ===================== GAME PLAY VIEW =====================
          <motion.div
            key="game-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center py-4"
          >
            <div className="flex items-center justify-between w-full max-w-sm mb-4">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Trò chơi 3: Thính lực đoán mặt chữ</span>
              <span className="bg-yellow-50 text-yellow-850 text-xs px-4 py-2 rounded-full font-black border-2 border-yellow-200 shadow-sm select-none">
                Vòng: {roundsCount + 1}/5 • Đúng: {correctAnswers}
              </span>
            </div>

            {gameState !== "completed" && targetWord && (
              <div className="flex flex-col items-center w-full">
                
                {/* Large clickable visual speaker bubble */}
                <div className="mb-8 text-center bg-yellow-50 border-4 border-b-12 border-yellow-200 p-8 rounded-[2.5rem] w-full max-w-sm shadow-inner flex flex-col items-center justify-center relative">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-101/35 rounded-full blur-2xl pointer-events-none"></div>
                  
                  <span className="text-xs font-black text-yellow-900 uppercase tracking-widest mb-4">
                    Bé lật tai thính ngóng từ:
                  </span>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => speakWord(targetWord.word)}
                    className="w-24 h-24 bg-yellow-500 hover:bg-yellow-600 border-4 border-b-8 border-yellow-700 rounded-full flex items-center justify-center text-white shadow-xl cursor-pointer mb-4 animate-pulse"
                    id="btn-play-sight-audio"
                  >
                    <span className="text-4xl animate-pulse">🔊</span>
                  </motion.button>
                  <p className="text-xs text-yellow-850 font-black uppercase tracking-wider">Chạm vào loa màu vàng để phát lại từ!</p>
                </div>

                {/* Option Choices Grid */}
                <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-6">
                  {options.map((option) => {
                    const isSelectedAndAnswered = gameState === "answered";
                    const isTarget = option.word === targetWord.word;
                    
                    let bgStyle = "bg-white border-slate-300 text-slate-800 hover:border-yellow-400 hover:bg-slate-50";
                    if (isSelectedAndAnswered) {
                      if (isTarget) {
                        bgStyle = "bg-emerald-500 border-emerald-700 text-white";
                      } else {
                        bgStyle = "bg-white border-slate-200 text-slate-300 opacity-55";
                      }
                    }

                    return (
                      <motion.button
                        key={option.word}
                        disabled={gameState !== "playing"}
                        whileHover={gameState === "playing" ? { scale: 1.05, y: -2 } : {}}
                        whileTap={gameState === "playing" ? { scale: 0.95 } : {}}
                        onClick={() => handleOptionSelect(option)}
                        className={`py-6 px-4 border-4 border-b-10 rounded-3xl font-mono font-black text-3xl shadow-md text-center cursor-pointer transition-all ${bgStyle}`}
                      >
                        {option.word}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Animate feedback text */}
                <AnimatePresence>
                  {answerResult && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className={`mb-6 p-4 rounded-2xl border-4 border-b-8 text-sm font-black flex items-center gap-3 w-full max-w-sm ${
                        answerResult.isCorrect
                          ? "bg-emerald-50 border-emerald-300 border-b-emerald-400 text-emerald-800"
                          : "bg-red-50 border-red-300 border-b-red-400 text-red-705"
                      }`}
                    >
                      <span className="text-2xl shrink-0">{answerResult.isCorrect ? "🥳" : "👉"}</span>
                      <span>{answerResult.text}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Next Control */}
                {gameState === "answered" && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={handleNextRound}
                    className="px-8 py-3.5 bg-slate-800 text-white font-black rounded-xl border-4 border-b-8 border-slate-950 shadow-md hover:bg-slate-900 flex items-center gap-2 cursor-pointer text-sm"
                  >
                    <span>Luyện tiếp</span>
                    <span className="text-lg">➔</span>
                  </motion.button>
                )}

              </div>
            )}

            {/* Game complete view */}
            {gameState === "completed" && (
              <div className="text-center py-6 flex flex-col items-center justify-center w-full max-w-sm">
                <span className="text-7xl mb-6 select-none animate-bounce block">👑</span>
                <h3 className="text-2xl font-black text-slate-800 mb-2">Thần bài Sight-words siêu tốc!</h3>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed font-bold">
                  Bé yêu đã xuất sắc lắng tai nghe và vượt qua 5 vòng đoán, tìm chính xác được {correctAnswers}/5 từ khó bất trị! Nhận điểm tích lũy tuyệt đối thôi nào mẹ ơi!
                </p>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStartGame}
                    className="px-6 py-4 rounded-2xl bg-gradient-to-r from-yellow-405 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-slate-900 font-black border-4 border-b-8 border-orange-600 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Làm ván mới 🔁</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setGamePlaying(false);
                      setSelectedWord(null);
                    }}
                    className="px-6 py-4 rounded-2xl bg-white text-slate-800 border-4 border-b-8 border-slate-350 font-extrabold hover:bg-slate-50 cursor-pointer"
                  >
                    Trở lại bài học
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

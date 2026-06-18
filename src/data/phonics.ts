export interface SoundItem {
  id: string;
  sound: string; // e.g., 's', 'a', 'ai'
  examples: { word: string; translation: string; description: string; meaning: string }[];
  action: { vi: string; en: string };
  songPrompt?: string; // song lyrics or description
  storyPreset?: string;
}

export interface SoundGroup {
  id: number;
  name: string;
  sounds: SoundItem[];
}

export interface TrickyWord {
  word: string;
  level: number; // 1 to 5 (Red, Yellow, Green, Pink, Blue)
  color: string;
  sentenceVi: string;
  sentenceEn: string;
}

export interface AlternativeSpelling {
  id: string;
  primarySound: string; // e.g. "ai"
  spelling: string; // e.g. "ay"
  examples: string[];
  rules: string;
}

export interface ReadingRule {
  id: string;
  title: string;
  rule: string;
  explanation: string;
  examples: string[];
}

export const jollyPhonicsGroups: SoundGroup[] = [
  {
    id: 1,
    name: "Nhóm 1 (Group 1)",
    sounds: [
      {
        id: "s",
        sound: "s",
        examples: [
          { word: "sat", translation: "ngồi", meaning: "đã ngồi xuống", description: "The cat sat." },
          { word: "sun", translation: "mặt trời", meaning: "mặt trời chiếu sáng", description: "The sun is hot." },
          { word: "sad", translation: "buồn", meaning: "buồn bã", description: "Do not be sad." }
        ],
        action: {
          vi: "Uốn lượn tay như một con rắn đang bò và nói s-s-s-s-s.",
          en: "Weave your hand like a snake, making an 's' shape, and say s-s-s-s-s."
        }
      },
      {
        id: "a",
        sound: "a",
        examples: [
          { word: "ant", translation: "con kiến", meaning: "con kiến nhỏ", description: "An ant sat on a pan." },
          { word: "apple", translation: "quả táo", meaning: "quả táo ngọt", description: "A red apple." },
          { word: "pan", translation: "cái chảo", meaning: "cái chảo rán", description: "The ant is in the pan." }
        ],
        action: {
          vi: "Vỗ nhẹ ngón tay lên cánh tay từ cổ tay lên vai như kiến bò và nói a-a-a-a-a.",
          en: "Wiggle fingers up your arm, as if ants are crawling on you, and say a-a-a-a-a."
        }
      },
      {
        id: "t",
        sound: "t",
        examples: [
          { word: "tap", translation: "gõ/vòi nước", meaning: "gõ nhẹ hoặc vòi nước", description: "Tap the pan." },
          { word: "ten", translation: "số mười", meaning: "mười ngón tay", description: "Ten ants sat." },
          { word: "net", translation: "cái lưới", meaning: "lưới đánh cá", description: "The ant is in the net." }
        ],
        action: {
          vi: "Quay đầu liên tục từ bên này sang bên kia như đang xem trận tennis và nói t-t-t-t-t.",
          en: "Turn your head from side to side, as if watching tennis, and say t-t-t-t-t."
        }
      },
      {
        id: "i",
        sound: "i",
        examples: [
          { word: "ink", translation: "mực", meaning: "mực viết", description: "The cat spilt ink." },
          { word: "pin", translation: "cái ghim", meaning: "ghim nhỏ", description: "A pin is on the mat." },
          { word: "sit", translation: "ngồi", meaning: "yêu cầu ngồi", description: "Sit on the mat." }
        ],
        action: {
          vi: "Dùng ngón tay vuốt râu giả từ mũi ra má giống như chuột nhảy và nói i-i-i-i-i.",
          en: "Pretend to be a mouse by wiggling your fingers near your nose for whiskers and say i-i-i-i-i."
        }
      },
      {
        id: "p",
        sound: "p",
        examples: [
          { word: "pan", translation: "cái chảo", meaning: "chảo đun nấu", description: "A hot pan." },
          { word: "pin", translation: "cái ghim", meaning: "đồ ghim giấy", description: "A shiny pin." },
          { word: "pat", translation: "vỗ nhẹ", meaning: "vỗ về", description: "Pat the cat." }
        ],
        action: {
          vi: "Đưa ngón trỏ lên trước miệng như đang thổi tắt một cây nến và nói p-p-p-p-p.",
          en: "Hold your index finger up like a candle and pretend to puff it out, saying p-p-p-p-p."
        }
      },
      {
        id: "n",
        sound: "n",
        examples: [
          { word: "net", translation: "cái lưới", meaning: "lưới che", description: "The net." },
          { word: "nap", translation: "giấc ngủ trưa", meaning: "ngủ ngắn buổi trưa", description: "The cat took a nap." },
          { word: "nut", translation: "quả hạch/hạt", meaning: "hạt dẻ, hạt óc chó", description: "A small nut." }
        ],
        action: {
          vi: "Dang hai tay ra hai bên như hai cánh máy bay, rướn người và kêu n-n-n-n-n.",
          en: "Spread your arms out wide like airplane wings and make a roaring plane engine sound, n-n-n-n-n."
        }
      }
    ]
  },
  {
    id: 2,
    name: "Nhóm 2 (Group 2)",
    sounds: [
      {
        id: "ck",
        sound: "c k",
        examples: [
          { word: "cat", translation: "con mèo", meaning: "con mèo kêu meo meo", description: "The cat is on the mat." },
          { word: "kid", translation: "đứa bé", meaning: "trẻ em nựng nịu", description: "A happy kid." },
          { word: "kick", translation: "đá", meaning: "đá quả bóng", description: "Kick the tin." }
        ],
        action: {
          vi: "Nâng hai tay lên gõ như đang gõ gậy của các vũ công và nói c-c-c-c-c.",
          en: "Raise your hands up and click them together like castanets, saying c-c-c-c-c."
        }
      },
      {
        id: "e",
        sound: "e",
        examples: [
          { word: "egg", translation: "quả trứng", meaning: "trứng gà", description: "Crack the egg." },
          { word: "hen", translation: "con gà mái", meaning: "gà mái đẻ trứng", description: "The hen is in the pen." },
          { word: "pet", translation: "thú cưng", meaning: "chó mèo cảnh", description: "My lovely pet." }
        ],
        action: {
          vi: "Giả vờ như đang đập vỏ trứng chạm vào mép chảo rồi kéo sang hai bên mở lòng đỏ trứng ra và kêu e-e-e-e-e.",
          en: "Pretend to crack an egg against the side of a bowl and pull it apart, saying e-e-e-e-e."
        }
      },
      {
        id: "h",
        sound: "h",
        examples: [
          { word: "hat", translation: "cái mũ", meaning: "mũ đội đầu", description: "A big hat." },
          { word: "hen", translation: "con gà mái", meaning: "gà mái vàng", description: "A fat hen." },
          { word: "hop", translation: "nhảy lò cò", meaning: "nhảy ngắn một chân", description: "Hop on one foot." }
        ],
        action: {
          vi: "Đưa bàn tay lên trước miệng, hà hơi như đang mệt sau khi chạy bộ và nói h-h-h-h-h.",
          en: "Hold your hand in front of your mouth and pant, feeling your warm breath, saying h-h-h-h-h."
        }
      },
      {
        id: "r",
        sound: "r",
        examples: [
          { word: "rat", translation: "con chuột cống", meaning: "chuột to", description: "A fast rat." },
          { word: "red", translation: "màu đỏ", meaning: "đỏ thắm", description: "A red hat." },
          { word: "run", translation: "chạy", meaning: "chạy nhanh", description: "Run, rat, run!" }
        ],
        action: {
          vi: "Giả vờ lắc người gầm gừ giống một chú chó đang ngậm lắc chiếc dẻ lau và kêu r-r-r-r-r.",
          en: "Pretend to be a puppy shaking a rag, shaking your head, and saying r-r-r-r-r."
        }
      },
      {
        id: "m",
        sound: "m",
        examples: [
          { word: "map", translation: "bản đồ", meaning: "bản đồ chỉ đường", description: "Look at the map." },
          { word: "mug", translation: "cái ca/cốc có quai", meaning: "ca uống nước", description: "A red mug." },
          { word: "man", translation: "người đàn ông", meaning: "nam giới trưởng thành", description: "A tall man." }
        ],
        action: {
          vi: "Xoa bụng vòng tròn như vừa ăn xong một món ăn rất ngon miệng và kêu m-m-m-m-m.",
          en: "Rub your tummy in a circle, pretending you just ate something delicious, and say m-m-m-m-m."
        }
      },
      {
        id: "d",
        sound: "d",
        examples: [
          { word: "dog", translation: "con chó", meaning: "con chó trung thành", description: "The dog is big." },
          { word: "dad", translation: "bố", meaning: "bố yêu thương", description: "My dad." },
          { word: "dig", translation: "đào", meaning: "đào đất trồng cây", description: "Dig in the mud." }
        ],
        action: {
          vi: "Đưa hai tay ra trước làm điệu bộ giả vờ gõ dùi lên mặt trống múa lượn và nói d-d-d-d-d.",
          en: "Pretend to beat a drum with drumsticks in both hands, saying d-d-d-d-d."
        }
      }
    ]
  },
  {
    id: 3,
    name: "Nhóm 3 (Group 3)",
    sounds: [
      {
        id: "g",
        sound: "g",
        examples: [
          { word: "gas", translation: "khí ga", meaning: "ga bếp lò", description: "The gas is on." },
          { word: "get", translation: "có được", meaning: "đi lấy đồ", description: "Get the bag." },
          { word: "dog", translation: "con chó", description: "A dog can dig.", meaning: "chữ tận cùng phát âm /g/" }
        ],
        action: {
          vi: "Uốn lượn tay lên và xuống như nước cuộn chảy qua phễu nước bồn tắm g-g-g-g-g.",
          en: "Spiral your hand down like water gurgling down a drain, making a g-g-g-g-g sound."
        }
      },
      {
        id: "o",
        sound: "o",
        examples: [
          { word: "on", translation: "trên", meaning: "ở trên bề mặt", description: "On the rock." },
          { word: "dog", translation: "con chó", meaning: "âm o trong từ dog", description: "The dog." },
          { word: "pot", translation: "nồi", meaning: "nồi nấu canh", description: "A hot pot." }
        ],
        action: {
          vi: "Giơ ngón tay giả vờ gạt nút công tắc tắt/bật đèn tường liên tục dứt khoát kêu o-o-o-o-o.",
          en: "Pretend to flick a light switch on and off, saying o-o-o-o-o."
        }
      },
      {
        id: "u",
        sound: "u",
        examples: [
          { word: "up", translation: "lên", meaning: "đi lên phía trên", description: "Run up the hill." },
          { word: "sun", translation: "mặt trời", meaning: "mặt trời chiếu sáng", description: "The sun." },
          { word: "cup", translation: "cái tách/cúp", meaning: "cốc uống trà nhỏ", description: "A blue cup." }
        ],
        action: {
          vi: "Giơ tay làm động tác mở một chiếc ô dù khi trời mưa và kêu u-u-u-u-u.",
          en: "Pretend to open an umbrella, raising your hands up and saying u-u-u-u-u."
        }
      },
      {
        id: "l",
        sound: "l",
        examples: [
          { word: "leg", translation: "chân", meaning: "bàn chân cái chân", description: "My leg is long." },
          { word: "lip", translation: "môi", meaning: "môi cười tươi", description: "Lick your lip." },
          { word: "log", translation: "khúc gỗ", meaning: "thân cây đã chặt", description: "The cat is on the log." }
        ],
        action: {
          vi: "Liếm từ dưới lên như đang ăn một cây mút kẹo mút ngon tuyệt dứt khoát và nói l-l-l-l-l.",
          en: "Pretend to lick a giant lollipop, moving your tongue up and down, and say l-l-l-l-l."
        }
      },
      {
        id: "f",
        sound: "f",
        examples: [
          { word: "fan", translation: "cái quạt", meaning: "quạt mát", description: "The fan is fast." },
          { word: "fat", translation: "béo", meaning: "mập mạp tròn trịa", description: "A fat pig." },
          { word: "fun", translation: "vui vẻ", meaning: "trò đùa vui", description: "This is fun!" }
        ],
        action: {
          vi: "Chụm hai tay ép ra trước để hơi xì như bong bóng xe xẹp lốp rách hơi kêu f-f-f-f-f.",
          en: "Let your hands float down like a deflating toy fish or pool float and make a quiet f-f-f-f-f breathy sound."
        }
      },
      {
        id: "b",
        sound: "b",
        examples: [
          { word: "bag", translation: "cái túi", meaning: "túi xách tay", description: "A red bag." },
          { word: "bad", translation: "tồi/xấu", meaning: "không tốt", description: "A bad pup." },
          { word: "bed", translation: "cái giường", meaning: "giường ngủ", description: "Get in bed." }
        ],
        action: {
          vi: "Giơ tay giả vờ cầm một chiếc gậy bóng chày đánh thật mạnh trúng quả bóng và nói b-b-b-b-b.",
          en: "Pretend to swing a baseball bat and hit a home-run ball, saying b-b-b-b-b."
        }
      }
    ]
  },
  {
    id: 4,
    name: "Nhóm 4 (Group 4)",
    sounds: [
      {
        id: "ai",
        sound: "ai",
        examples: [
          { word: "rain", translation: "cơ mưa", meaning: "nước mưa rơi", description: "The rain is wet." },
          { word: "fail", translation: "hỏng, trượt", meaning: "không đạt điểm", description: "Never fail." },
          { word: "train", translation: "tàu hoả", meaning: "đoàn tàu dài", description: "A long train." }
        ],
        action: {
          vi: "Đặt khum bàn tay lên tai nghe ngóng hỏi han bất ngờ: ai? ai? ai? (như khi không nghe rõ).",
          en: "Cup your hand over your ear as if you are hard of hearing and say 'ai?'."
        }
      },
      {
        id: "j",
        sound: "j",
        examples: [
          { word: "jam", translation: "mứt quả", meaning: "mứt quết bánh mì", description: "Sweet red jam." },
          { word: "jet", translation: "phản lực", meaning: "chuyên cơ bay nhanh", description: "A fast jet." },
          { word: "jog", translation: "chạy bộ", meaning: "chạy chậm thư giãn", description: "Let's jog." }
        ],
        action: {
          vi: "Lắc lư cơ thể giống như một cốc thạch đông đưa phấp phỏng nhảy múa kêu j-j-j-j-j.",
          en: "Pretend to wobble like a bowl of jelly on a plate, stating j-j-j-j-j."
        }
      },
      {
        id: "oa",
        sound: "oa",
        examples: [
          { word: "boat", translation: "thuyền", meaning: "thuyền buồm trên biển", description: "The boat sails." },
          { word: "coat", translation: "áo khoác", meaning: "áo ấm đại hàn", description: "A big warm coat." },
          { word: "road", translation: "con đường", meaning: "lộ giới cho xe chạy", description: "A long flat road." }
        ],
        action: {
          vi: "Đưa bàn tay lên che miệng ngạc nhiên thốt lên oa! oa! oa! khi thấy điều kì diệu.",
          en: "Bring your hands to your face in surprise, saying 'oa!'."
        }
      },
      {
        id: "ie",
        sound: "ie",
        examples: [
          { word: "tie", translation: "cà vạt/buộc", meaning: "thắt cà vạt", description: "A red tie." },
          { word: "pie", translation: "bánh nướng", meaning: "bánh táo nướng ngọt", description: "A sweet apple pie." },
          { word: "lie", translation: "nằm", meaning: "nằm nghỉ ngơi", description: "Lie on the bed." }
        ],
        action: {
          vi: "Làm động tác giơ tay chào kiểu hải quân và kêu ie-ie-ie (i dài, chào sếp).",
          en: "Salute like a sailor, saying 'ie-ie' (the long i sound)."
        }
      },
      {
        id: "ee",
        sound: "ee",
        examples: [
          { word: "see", translation: "nhìn thấy", meaning: "quan sát thấy", description: "I see a bee." },
          { word: "bee", translation: "con ong", meaning: "ong hút mật", description: "The bee is on the leaf." },
          { word: "jeep", translation: "xe jeep", meaning: "xe mui trần dã ngoại", description: "A fast jeep." }
        ],
        action: {
          vi: "Đưa hai tay lên đầu vẫy như hai tai lừa reo vui mừng rỡ ee-or, ee-or!",
          en: "Put your hands on your head like donkey ears, flapping them up and down, saying ee-or, ee-or!"
        }
      },
      {
        id: "or",
        sound: "or",
        examples: [
          { word: "fork", translation: "cái nĩa/dĩa", meaning: "nĩa gắp thức ăn", description: "Eat with a fork." },
          { word: "born", translation: "sinh ra", meaning: "được chào đời", description: "A baby was born." },
          { word: "horn", translation: "còi/sừng", meaning: "còi xe inh ỏi", description: "The horn is loud." }
        ],
        action: {
          vi: "Hạ hai tai lừa xuống thấp buồn bã thở dài nói ee-or, ee-or, or-or-or!",
          en: "Bring your hands down as donkey ears drop, completing the second part of ee-or, saying 'or-or-or'!"
        }
      }
    ]
  },
  {
    id: 5,
    name: "Nhóm 5 (Group 5)",
    sounds: [
      {
        id: "z",
        sound: "z",
        examples: [
          { word: "zoo", translation: "vườn bách thú", meaning: "nơi nuôi thú hoang dã", description: "Let's go to the zoo." },
          { word: "zip", translation: "tuột khoá dây", meaning: "khoá áo phao", description: "Zip the coat." },
          { word: "buzz", translation: "tiếng vo ve", meaning: "tiếng con ong", description: "The bees buzz." }
        ],
        action: {
          vi: "Dang hai tay nhỏ quạt nhẹ nhanh phấp phới như ong mật bay vo ve kêu z-z-z-z-z.",
          en: "Flap your arms like a tiny buzzing bee, moving around, saying z-z-z-z-z."
        }
      },
      {
        id: "w",
        sound: "w",
        examples: [
          { word: "wet", translation: "ẩm ướt", meaning: "dính nước", description: "The dog is wet." },
          { word: "win", translation: "chiến thắng", meaning: "giành cúp vàng", description: "We can win." },
          { word: "wind", translation: "gió thổi", meaning: "gió luồn khe cửa", description: "The cold wind blows." }
        ],
        action: {
          vi: "Đưa hai bàn tay khum ra phía trước thổi nhẹ như gió thổi ào ào kêu w-w-w-w-w.",
          en: "Blow gently onto your hands, simulating a cool breeze blow, saying w-w-w-w-w."
        }
      },
      {
        id: "ng",
        sound: "ng",
        examples: [
          { word: "sing", translation: "ca hát", meaning: "hát vang lời ca", description: "Sing a sweet song." },
          { word: "ring", translation: "chiếc nhẫn", meaning: "vòng vàng đeo tay", description: "A shiny gold ring." },
          { word: "long", translation: "dài", meaning: "chiều dài sừng sững", description: "A long train." }
        ],
        action: {
          vi: "Gồng hai cơ bắp tay thật mạnh như một vận động viên nâng tạ hạng nặng nói ng-ng-ng.",
          en: "Pretend to lift a very heavy weight over your head, grunting ng-ng-ng."
        }
      },
      {
        id: "v",
        sound: "v",
        examples: [
          { word: "van", translation: "xe tải nhỏ", meaning: "xe đưa đón học sinh", description: "The van is red." },
          { word: "vest", translation: "áo ghi lê", meaning: "áo khoác ghile", description: "He wears a vest." },
          { word: "vet", translation: "bác sĩ thú y", meaning: "khám bệnh chó mèo", description: "Take the pup to the vet." }
        ],
        action: {
          vi: "Cầm một chiếc vô lăng giả vờ lái xe ôm cua tít mù và kêu v-v-v-v-v.",
          en: "Pretend to drive a steering wheel of an electric van, roaring around v-v-v-v-v."
        }
      },
      {
        id: "oo",
        sound: "oo",
        examples: [
          { word: "book", translation: "cuốn sách", meaning: "ô/o ngắn /ʊ/ như trong book, foot", description: "Read a good book." },
          { word: "cool", translation: "mát mẻ", meaning: "ô/o dài /u:/ như trong cool, spoon", description: "It is cool today." },
          { word: "moon", translation: "mặt trăng", meaning: "trăng rằm vằng vặc", description: "The moon is round." }
        ],
        action: {
          vi: "Gật đầu lên xuống như chiếc đồng hồ quả lắc cúc cu kêu: oo (ngắn), oo (dài) liên tục.",
          en: "Move your head back and forth like a cuckoo clock bird, calling oo-oo, oo-oo."
        }
      }
    ]
  },
  {
    id: 6,
    name: "Nhóm 6 (Group 6)",
    sounds: [
      {
        id: "y",
        sound: "y",
        examples: [
          { word: "yes", translation: "vâng/dạ", meaning: "đồng ý tán thành", description: "Yes, I can play." },
          { word: "yell", translation: "la hét lớn", meaning: "hét to tức giận", description: "Do not yell." },
          { word: "yum", translation: "ngon quá", meaning: "biểu cảm ăn ngon", description: "Yum! This pie is good." }
        ],
        action: {
          vi: "Giả vờ xúc một hộp sữa chua dâng lên miệng mút dồi dào reo vui: y-y-y-y (yum!).",
          en: "Pretend to scoop yogurt out of a cup and lick it off a spoon, saying y-y-y-y (yum!)."
        }
      },
      {
        id: "x",
        sound: "x",
        examples: [
          { word: "box", translation: "cái hộp", meaning: "hộp các tông", description: "Put it in the box." },
          { word: "fox", translation: "con cáo", meaning: "cáo rừng mưu mẹo", description: "A red sly fox." },
          { word: "six", translation: "số sáu", meaning: "sáu quả bóng tròn", description: "I have six pins." }
        ],
        action: {
          vi: "Giơ chéo hai tay trước ngực tạo hình chữ X chụp hình tí tách kêu ks-ks-ks-ks-ks.",
          en: "Pretend to take a picture with a camera, clicking the button saying ks-ks-ks."
        }
      },
      {
        id: "ch",
        sound: "ch",
        examples: [
          { word: "chip", translation: "lát khoai mỏng", meaning: "khoai tây chiên", description: "Eat a potato chip." },
          { word: "chin", translation: "cái cằm", meaning: "phần dưới khuôn mặt", description: "Pat your chin." },
          { word: "rich", translation: "giàu có", meaning: "nhiều tiền của cải", description: "A rich man." }
        ],
        action: {
          vi: "Gập cánh tay thụt lò xo giống bánh xe tàu hoả lăn xình xịch ch-ch-ch-ch-ch.",
          en: "Pretend to move elbows back and forth like train wheels, chugging along say ch-ch-ch."
        }
      },
      {
        id: "sh",
        sound: "sh",
        examples: [
          { word: "ship", translation: "tàu thuỷ lớn", meaning: "tàu đi biển khơi", description: "The ship sails fast." },
          { word: "shop", translation: "cửa hiệu", meaning: "cửa hàng tạp hoá", description: "Go to the pet shop." },
          { word: "fish", translation: "con cá", meaning: "cá bơi dưới nước", description: "A blue small fish." }
        ],
        action: {
          vi: "Đặt ngón tay lên môi làm động tác giữ trật tự nhẹ nhàng và xì dài hơi: sh-sh-sh-sh-sh.",
          en: "Put your index finger over your lips to shush someone, saying sh-sh-sh-sh."
        }
      },
      {
        id: "th",
        sound: "th",
        examples: [
          { word: "thin", translation: "mỏng/gầy", meaning: "th-không kêu /θ/ trong thin, math", description: "A thin pin." },
          { word: "this", translation: "cái này", meaning: "th-có kêu /ð/ trong this, that", description: "This is my dog." },
          { word: "that", translation: "cái kia", meaning: "đại từ chỉ vật ở xa", description: "That is a big hill." }
        ],
        action: {
          vi: "Thè nhẹ lưỡi rồi dùng răng cửa kẹp sột soạt thổi hơi th-th-th (ví như chú hề quậy).",
          en: "Pretend to be a naughty clown sticking your tongue out slightly, breathing out th-th."
        }
      }
    ]
  },
  {
    id: 7,
    name: "Nhóm 7 (Group 7)",
    sounds: [
      {
        id: "qu",
        sound: "qu",
        examples: [
          { word: "quick", translation: "nhanh", meaning: "khẩn trương cấp bách", description: "Run quick!" },
          { word: "queen", translation: "nữ hoàng", meaning: "hoàng hậu vương triều", description: "The queen is kind." },
          { word: "quiz", translation: "bài đố vui", meaning: "câu hỏi trắc nghiệm", description: "A fun word quiz." }
        ],
        action: {
          vi: "Chụm hai ngón tay lại trước môi bập bùng như mỏ vịt đang kêu quẹt quẹt qu-qu-qu-qu.",
          en: "Make your hands look like a duck's beak open and closing, saying qu-qu-qu-qu-qu."
        }
      },
      {
        id: "ou",
        sound: "ou",
        examples: [
          { word: "out", translation: "ra ngoài", meaning: "đi ra khỏi phòng", description: "Get out of the mud." },
          { word: "loud", translation: "ầm ĩ", meaning: "tiếng rống inh sọc", description: "Do not yell so loud." },
          { word: "cloud", translation: "đám mây", meaning: "mây trắng trên cao", description: "A big cloud." }
        ],
        action: {
          vi: "Giả vờ châm một chiếc gai nhọn trúng ngón tay đau buốt thụt phắt reo lên: ou! ou! ou!",
          en: "Pretend to prick your finger with a tiny needle and jump back, yelling ou! ou!"
        }
      },
      {
        id: "oi",
        sound: "oi",
        examples: [
          { word: "oil", translation: "dầu ăn/mỏ dầu", meaning: "dầu thô rán bánh", description: "The pot is full of oil." },
          { word: "coin", translation: "đồng xu", meaning: "tiền xu lẻ bóng loáng", description: "I have a gold coin." },
          { word: "join", translation: "tham gia", meaning: "nhập hội chơi chung", description: "Join us in the fun." }
        ],
        action: {
          vi: "Khum bàn tay cạnh miệng ghé sát giả vờ gọi lớn ra đảo khơi tấp nập reo reo: oi! oi! ship ahoy!",
          en: "Cup your hands around your mouth and shout to a sailboat, 'Oi! Ship ahoy!'."
        }
      },
      {
        id: "ue",
        sound: "ue",
        examples: [
          { word: "blue", translation: "màu xanh da trời", meaning: "xanh dương dịu lành", description: "The sky is blue." },
          { word: "clue", translation: "manh mối", meaning: "gợi ý phá án", description: "Find a little clue." },
          { word: "due", translation: "hạn đến hạn", meaning: "hạn nộp bài vở", description: "The book is due." }
        ],
        action: {
          vi: "Vừa chỉ ngón tay về phía trước trân trọng hỏi han ân cần: ue? (you! bạn ơi).",
          en: "Point to someone else while saying 'ue' (it sounds like you!)."
        }
      },
      {
        id: "er",
        sound: "er",
        examples: [
          { word: "her", translation: "của cô ấy", meaning: "sở hữu cách nữ giới", description: "That is her red hat." },
          { word: "under", translation: "dưới", meaning: "phía dưới mái hiên", description: "Under the broad tree." },
          { word: "sister", translation: "chị/em gái", meaning: "chị em ruột thịt", description: "My sweet sister." }
        ],
        action: {
          vi: "Giả làm bộ phận mô tơ cánh quạt gió xay sinh tố, khuấy tay xung quanh kêu er-er-er.",
          en: "Pretend to be a turbine wind-blade or food-blender spinner, rotating hands and saying er-er-er."
        }
      },
      {
        id: "ar",
        sound: "ar",
        examples: [
          { word: "car", translation: "xe ô tô", meaning: "xe hơi bốn bánh", description: "A fast blue car." },
          { word: "star", translation: "ngôi sao", meaning: "sao lấp lánh ban đêm", description: "See the high star." },
          { word: "park", translation: "công viên", meaning: "khu vui chơi cỏ cây", description: "Let's play in the park." }
        ],
        action: {
          vi: "Há to miệng vạch khám răng cười tươi reo vang hỉ hả như cướp biển oai hùng: ar-ar-ar!",
          en: "Open your mouth wide like a friendly pirate or a throat doctor inspection, saying 'ar'!"
        }
      }
    ]
  }
];

// Tricky Words lists grouped by Level
export const trickyWordsList: TrickyWord[] = [
  { word: "the", level: 1, color: "bg-red-100 border-red-300 text-red-700", sentenceVi: "Mặt trời mọc ngoài kia.", sentenceEn: "The sun is hot." },
  { word: "to", level: 1, color: "bg-red-100 border-red-300 text-red-700", sentenceVi: "Đi ra công viên nhé.", sentenceEn: "We go to the park." },
  { word: "be", level: 1, color: "bg-red-100 border-red-300 text-red-700", sentenceVi: "Hãy ngoan ngoãn nhé.", sentenceEn: "Be kind to dogs." },
  { word: "is", level: 1, color: "bg-red-100 border-red-300 text-red-700", sentenceVi: "Con mèo này béo.", sentenceEn: "The cat is fat." },
  { word: "me", level: 1, color: "bg-red-100 border-red-300 text-red-700", sentenceVi: "Bố nhìn con bơi này.", sentenceEn: "Look at me!" },
  { word: "he", level: 1, color: "bg-red-100 border-red-300 text-red-700", sentenceVi: "Cậu ấy thích chú mèo.", sentenceEn: "He is a good kid." },
  { word: "she", level: 2, color: "bg-yellow-100 border-yellow-300 text-yellow-800", sentenceVi: "Cô ấy dắt chú chó đi.", sentenceEn: "She goes to rest." },
  { word: "we", level: 2, color: "bg-yellow-100 border-yellow-300 text-yellow-800", sentenceVi: "Chúng con chiến thắng rồi.", sentenceEn: "We can win this." },
  { word: "was", level: 2, color: "bg-yellow-100 border-yellow-300 text-yellow-800", sentenceVi: "Cơn mưa vừa dứt.", sentenceEn: "The rain was heavy." },
  { word: "my", level: 2, color: "bg-yellow-100 border-yellow-300 text-yellow-800", sentenceVi: "Đây là con chó của con.", sentenceEn: "This is my dog." },
  { word: "you", level: 3, color: "bg-green-100 border-green-300 text-green-700", sentenceVi: "Bạn thật ngoan quá.", sentenceEn: "You are very neat." },
  { word: "they", level: 3, color: "bg-green-100 border-green-300 text-green-700", sentenceVi: "Họ đi câu cá.", sentenceEn: "They sit on logs." },
  { word: "are", level: 3, color: "bg-green-100 border-green-300 text-green-700", sentenceVi: "Các con kiến nhỏ bé.", sentenceEn: "Ants are so small." },
  { word: "all", level: 3, color: "bg-green-100 border-green-300 text-green-700", sentenceVi: "Chúng ta cùng nhảy lên.", sentenceEn: "All of us hop." },
  { word: "here", level: 4, color: "bg-blue-100 border-blue-300 text-blue-700", sentenceVi: "Lại đây với chị nào.", sentenceEn: "Come here to me." },
  { word: "there", level: 4, color: "bg-blue-100 border-blue-300 text-blue-700", sentenceVi: "Có một con ong mật ở đó.", sentenceEn: "There is a bee." },
  { word: "some", level: 4, color: "bg-blue-100 border-blue-300 text-blue-700", sentenceVi: "Con muốn một vài hạt hạch.", sentenceEn: "Give me some nuts." },
  { word: "come", level: 4, color: "bg-blue-100 border-blue-300 text-blue-700", sentenceVi: "Hãy đến chơi trò chơi.", sentenceEn: "Come and play." }
];

// Mapping of primary sound to alternative spellings
export const alternativeSpellings: AlternativeSpelling[] = [
  {
    id: "ay",
    primarySound: "ai",
    spelling: "ay",
    examples: ["play", "day", "say", "tray"],
    rules: "Thường đứng ở cuối từ."
  },
  {
    id: "a_e",
    primarySound: "ai",
    spelling: "a_e",
    examples: ["cake", "gate", "game", "plate"],
    rules: "Quy tắc Magic E: chữ 'e' ở cuối từ kéo dài âm 'a' thành âm nguyên âm dài."
  },
  {
    id: "ea",
    primarySound: "ee",
    spelling: "ea",
    examples: ["tea", "leaf", "meat", "seat"],
    rules: "Phát âm giống hệt âm 'ee'."
  },
  {
    id: "e_e",
    primarySound: "ee",
    spelling: "e_e",
    examples: ["these", "eve", "theme"],
    rules: "Quy tắc Magic E cho nguyên âm E."
  },
  {
    id: "y_ee",
    primarySound: "ee",
    spelling: "y",
    examples: ["happy", "baby", "windy", "sunny"],
    rules: "Đứng ở cuối từ có hai âm tiết trở lên, chữ 'y' phát âm /ee/."
  },
  {
    id: "o_e",
    primarySound: "oa",
    spelling: "o_e",
    examples: ["home", "bone", "rope", "stone"],
    rules: "Quy tắc Magic E cho nguyên âm O."
  },
  {
    id: "ow",
    primarySound: "oa",
    spelling: "ow",
    examples: ["blow", "snow", "grow", "slow"],
    rules: "Chữ 'ow' đôi khi phát âm thành /oa/ ở cuối từ."
  },
  {
    id: "i_e",
    primarySound: "ie",
    spelling: "i_e",
    examples: ["like", "kite", "bike", "time"],
    rules: "Quy tắc Magic E cho nguyên âm I."
  },
  {
    id: "igh",
    primarySound: "ie",
    spelling: "igh",
    examples: ["high", "light", "night", "fight"],
    rules: "Ba chữ ghép 'igh' phát âm tạo thành âm 'ie' nguyên âm dài."
  },
  {
    id: "ew",
    primarySound: "ue",
    spelling: "ew",
    examples: ["few", "new", "grew", "blew"],
    rules: "Chữ cái 'ew' đôi khi nói âm /ue/."
  },
  {
    id: "u_e",
    primarySound: "ue",
    spelling: "u_e",
    examples: ["tube", "cube", "cute", "mule"],
    rules: "Quy tắc Magic E cho nguyên âm U."
  }
];

// Displayable Reading Rules
export const readingRules: ReadingRule[] = [
  {
    id: "magic_e",
    title: "Quy tắc 'Hội ngộ Magic E'",
    rule: "vowel_consonant_e",
    explanation: "Khi chữ cái 'e' đứng ở sau một phụ âm, nó sẽ biến thành 'Magic E' im lặng, nhường năng lượng để nguyên âm đứng trước tự xưng tên chính mình (ví dụ: 'a' thành âm dài /ai/ trong 'game').",
    examples: ["cake", "home", "kite", "cute", "these"]
  },
  {
    id: "two_vowels",
    title: "Hai nguyên âm đi bộ chung (Two Vowels Walking)",
    rule: "two_vowels_walking",
    explanation: "Khi hai nguyên âm đi liền nhau (như 'ai', 'oa', 'ea'), nguyên âm đứng trước làm việc chính (cho phát âm tên dài của nó), nguyên âm thứ hai đi sau im lặng che chở.",
    examples: ["rain", "boat", "meat", "soap"]
  },
  {
    id: "floss_rule",
    title: "Quy tắc răng cưa Floss Rule (f, l, s, z)",
    rule: "double_letters",
    explanation: "Nếu từ có 1 âm tiết, tận cùng bằng âm f, l, s, z theo sau một nguyên âm ngắn, chúng ta cần nhân đôi chữ cái cuối đó.",
    examples: ["buzz", "puff", "bell", "miss"]
  },
  {
    id: "soft_c_g",
    title: "Chữ C mềm và G mềm (Soft C & G)",
    rule: "soft_sounds",
    explanation: "Chữ 'c' đổi thành phát âm /s/ và 'g' đổi thành /j/ khi đứng trực tiếp trước các chữ 'e', 'i', hoặc 'y'.",
    examples: ["cell", "city", "page", "giant"]
  }
];

interface CuratedStory {
  groupId: number;
  title: string;
  theme: string;
  story: string;
  vietnamese: string;
  allowedWords: string[];
}

// 100% verified decodable stories for each milestone level
export const curatedDecodableStories: CuratedStory[] = [
  {
    groupId: 1,
    title: "The Ant on the Pan",
    theme: "mèo",
    story: "An ant sat on a pan. Pat the ant. The ant sat in ink. It was sad.",
    vietnamese: "Một chú kiến ngồi trên một cái chảo. Vỗ nhẹ chú kiến nọ. Kiến ngồi lém bẩn mực. Nó buồn.",
    allowedWords: ["an", "ant", "sat", "on", "a", "pan", "pat", "the", "in", "ink", "it", "was", "sad"]
  },
  {
    groupId: 2,
    title: "A Dog and a Hen",
    theme: "chó",
    story: "Dad had a red hen. The hen sat on a net. A big dog ran to the hen. It hid in a hat.",
    vietnamese: "Bố có một chú gà mái đỏ. Gà mái ngồi trên cái lưới. Một chú chó to chạy lại chỗ gà mái. Nó trốn trong chiếc mũ.",
    allowedWords: ["dad", "had", "a", "red", "hen", "the", "sat", "on", "net", "big", "dog", "ran", "to", "it", "hid", "in", "hat"]
  },
  {
    groupId: 3,
    title: "A Muddy Fun Day",
    theme: "mèo",
    story: "A fat pig dug a big pot. A pup ran on a log. The sun is up. We can run in the mud.",
    vietnamese: "Một chú lợn béo đào một chiếc nồi to. Cún con chạy trên khúc gỗ. Mặt trời lên cao rồi. Chúng ta có thể chạy nhảy trong bùn tơi.",
    allowedWords: ["a", "fat", "pig", "dug", "big", "pot", "pup", "ran", "on", "log", "the", "sun", "is", "up", "we", "can", "run", "in", "mud"]
  },
  {
    groupId: 4,
    title: "A Sleepy Bee in a Boat",
    theme: "ong",
    story: "I see a wet bee in a boat. The boat sails on the road. The bee was in a jeep.",
    vietnamese: "Thấy chú ong ẩm ướt trong khoang thuyền buồm. Con thuyền lướt sóng qua lộ trình. Chú ong vừa ngồi trong chiếc xe jeep.",
    allowedWords: ["i", "see", "a", "wet", "bee", "in", "boat", "the", "sails", "on", "road", "was", "jeep"]
  },
  {
    groupId: 5,
    title: "The Windy Cold Day",
    theme: "gió",
    story: "The wind is cold. We sing a sweet song at the zoo. See the big yellow moon.",
    vietnamese: "Cơn gió se lạnh. Chúng ta cùng đồng thanh bài ca ngọt ngào ở vườn bách thú. Ngước xem vầng trăng rằm tròn vàng thẫm.",
    allowedWords: ["the", "wind", "is", "cold", "we", "sing", "a", "sweet", "song", "at", "zoo", "see", "big", "yellow", "moon"]
  }
];

// Verify if a word is decodable based on a list of mastered phonemes and tricky words
export function filterDecodableWords(text: string, allowedPhonemes: string[], allowedTrickyWords: string[]): { word: string; isDecodable: boolean }[] {
  // Split text by words, cleaning up punctuation
  const words = text.toLowerCase().replace(/[^a-z0-9_\s']/g, "").split(/\s+/).filter(Boolean);
  
  // Tricky words are directly decodable if in mastered tricky list
  // For phonetic words, they must be constructed strictly out of mastered phonemes
  // Let's create a quick phonetic validation
  return words.map(w => {
    // 1. Is it a mastered tricky word?
    if (allowedTrickyWords.includes(w)) {
      return { word: w, isDecodable: true };
    }
    
    // Normal phonological matching
    // We try to segment the word using allowed phonemes.
    // We can do a greedy string matching from left to right of the word.
    let remaining = w;
    let ok = true;
    while (remaining.length > 0) {
      let matched = false;
      // Sort allowed phonemes by length desc to match multi-character phonemes first (like 'sh', 'ch', 'oa', 'ai')
      const sortedPhonemes = [...allowedPhonemes].sort((a, b) => b.length - a.length);
      for (const ph of sortedPhonemes) {
        if (remaining.startsWith(ph)) {
          remaining = remaining.substring(ph.length);
          matched = true;
          break;
        }
      }
      if (!matched) {
        // Try fallback characters like c or k individually if they have "c k" mastered
        const hasCk = allowedPhonemes.includes("c k") || allowedPhonemes.includes("ck") || allowedPhonemes.includes("c") || allowedPhonemes.includes("k");
        if (hasCk && (remaining.startsWith("c") || remaining.startsWith("k"))) {
          remaining = remaining.substring(1);
          matched = true;
        } else {
          ok = false;
          break;
        }
      }
    }
    
    return { word: w, isDecodable: ok };
  });
}

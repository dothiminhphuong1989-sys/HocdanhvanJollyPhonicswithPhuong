import { SoundGroup } from "../types";

export const jollyPhonicsGroups: SoundGroup[] = [
  {
    number: 1,
    name: "Nhóm 1 (s, a, t, i, p, n)",
    youtubeId: "4icYb-aTw9A",
    sounds: [
      {
        sound: "s",
        actionEn: "Weave hand like a snake and say ssssss.",
        actionVi: "Uốn lượn bàn tay như con rắn và phát tiếng ssssss.",
        exampleWords: ["sat", "sun", "sad", "spin"],
        storyVi: "Chú rắn Sam lướt nhẹ trên cỏ cỏ khô kêu ssssss..."
      },
      {
        sound: "a",
        actionEn: "Wiggle fingers on your arm as if ants are crawling on it and say a, a, a!",
        actionVi: "Vờ ngón tay chạy dọc theo cánh tay như kiến bò và kêu a-a-a!",
        exampleWords: ["ant", "apple", "bag", "cat"],
        storyVi: "Bầy kiến nhỏ đang bò leo lên cánh tay, nhột quá, a, a, a!"
      },
      {
        sound: "t",
        actionEn: "Turn your head side to side as if watching tennis and say t, t, t.",
        actionVi: "Quay đầu sang trái sang phải giống như đang xem trận tennis bóng qua lại và kêu t-t-t.",
        exampleWords: ["tap", "tin", "tent", "net"],
        storyVi: "Cả nhà cùng xem một trận đấu quần vợt kịch tính, t-t-t!"
      },
      {
        sound: "i",
        actionEn: "Wiggle your fingers near your nose like whiskers of an ink-spilled mouse and say i, i, i.",
        actionVi: "Vờ lấy móng vuốt gạt lên mũi làm râu chú chuột Inky bị đổ mực dính râu kêu i-i-i.",
        exampleWords: ["ink", "pin", "igloo", "pig"],
        storyVi: "Bé chuột con nghịch ngợm làm đổ lọ mực ra bàn, i-i-i!"
      },
      {
        sound: "p",
        actionEn: "Pretend to puff out candles on a pink pig cake and say p, p, p.",
        actionVi: "Chu miệng thổi nến của chiếc bánh sinh nhật hình chú heo hồng: phà hơi p-p-p.",
        exampleWords: ["pan", "pig", "pot", "map"],
        storyVi: "Nào bé cùng thổi nến mừng sinh nhật chú heo hồng, p-p-p!"
      },
      {
        sound: "n",
        actionEn: "Make airplane wings with your arms, making a continuous nnnnnn sound.",
        actionVi: "Dang hai cánh tay ra như máy bay cất cánh và kêu liên tục nnnnnn.",
        exampleWords: ["net", "nut", "nest", "pen"],
        storyVi: "Tiếng động cơ máy bay trực thăng bay lượn vù vù trên trời, nnnnnn!"
      }
    ],
    starterWords: [
      { word: "sat", segments: ["s", "a", "t"] },
      { word: "pat", segments: ["p", "a", "t"] },
      { word: "tap", segments: ["t", "a", "p"] },
      { word: "pin", segments: ["p", "i", "n"] },
      { word: "tin", segments: ["t", "i", "n"] },
      { word: "pan", segments: ["p", "a", "n"] },
      { word: "nap", segments: ["n", "a", "p"] },
      { word: "sip", segments: ["s", "i", "p"] },
      { word: "pit", segments: ["p", "i", "t"] },
      { word: "spin", segments: ["s", "p", "i", "n"] }
    ]
  },
  {
    number: 2,
    name: "Nhóm 2 (c/k, e, h, r, m, d)",
    youtubeId: "Gx3FBlNBr-0",
    sounds: [
      {
        sound: "c",
        actionEn: "Pretend to play castanets (clicking instruments) and say c, c, c.",
        actionVi: "Búng các ngón tay gõ nhịp như đang dùng nhạc cụ gõ đệm castanets và kêu c-c-c.",
        exampleWords: ["cat", "cap", "cup", "can"],
        storyVi: "Bé cầm chiếc sinh tiền gõ lách cách lách cách vui tai, c-c-c!"
      },
      {
        sound: "k",
        actionEn: "Pretend to play castanets (or fly a kite) and say k, k, k.",
        actionVi: "Giống như âm c, vờ tung tay dâng diều lên trời hoặc gõcastanets và kêu k-k-k.",
        exampleWords: ["kid", "kite", "desk", "kick"],
        storyVi: "Chú diều nhỏ đón gió bay vút lên trời xanh thênh thang, k-k-k!"
      },
      {
        sound: "e",
        actionEn: "Pretend to crack an egg against the side of a bowl and say e, e, e.",
        actionVi: "Vờ đập đôi quả trứng gà đổ vào bát và kêu e-e-e ngắn.",
        exampleWords: ["egg", "hen", "red", "pen"],
        storyVi: "Mẹ đập quả trứng gà vàng óng chuẩn bị làm bánh kem, e-e-e!"
      },
      {
        sound: "h",
        actionEn: "Pretend to pant heavily as if out of breath from running and say h, h, h.",
        actionVi: "Khơm mình đặt tay lên gối thở dốc sau khi chạy bộ mệt mỏi: h-h-h.",
        exampleWords: ["hat", "hen", "hot", "hop"],
        storyVi: "Bé vừa chạy nhảy ngoài sân mệt bở hơi tai, thở dốc h-h-h!"
      },
      {
        sound: "r",
        actionEn: "Pretend to be a puppy shaking a rag, saying rrrrrr.",
        actionVi: "Gầm ghè bắt chước chú cún cưng đang nắm giẻ rách giật lắc đầu dữ dội: rrrrrr.",
        exampleWords: ["rat", "red", "run", "rip"],
        storyVi: "Chú cún vàng giằng xé nghịch chiếc vớ cũ kêu rrrrrr!"
      },
      {
        sound: "m",
        actionEn: "Rub your tummy as if eating delicious food and say mmmmmm.",
        actionVi: "Xoa tay quanh vòng bụng nhỏ sau một bữa ăn thật no và ngon miệng kêu mmmmmm.",
        exampleWords: ["man", "map", "mat", "jam"],
        storyVi: "Món súp cua thơm lừng nóng hổi, ngon quá đi thôi, mmmmmm!"
      },
      {
        sound: "d",
        actionEn: "Pretend to play drums, beating fists up and down and saying d, d, d.",
        actionVi: "Cầm hai dùi gõ trống nhịp nhàng d-d-d.",
        exampleWords: ["dog", "dad", "dig", "and"],
        storyVi: "Bé gõ chiếc trống đồ chơi tưng bừng mừng ngày hội xuân, d-d-d!"
      }
    ],
    starterWords: [
      { word: "cat", segments: ["c", "a", "t"] },
      { word: "kid", segments: ["k", "i", "d"] },
      { word: "hen", segments: ["h", "e", "n"] },
      { word: "red", segments: ["r", "e", "d"] },
      { word: "mad", segments: ["m", "a", "d"] },
      { word: "map", segments: ["m", "a", "p"] },
      { word: "dam", segments: ["d", "a", "m"] },
      { word: "pen", segments: ["p", "e", "n"] },
      { word: "kick", segments: ["k", "i", "c", "k"] },
      { word: "neck", segments: ["n", "e", "c", "k"] }
    ]
  },
  {
    number: 3,
    name: "Nhóm 3 (g, o, u, l, f, b)",
    youtubeId: "yNR5riB5Hnk",
    sounds: [
      {
        sound: "g",
        actionEn: "Spiral hand down like water gurgling down a drain and say g, g, g.",
        actionVi: "Uốn cổ tay hướng xuống như nước xoáy trôi vào lòng cống kêu g-g-g.",
        exampleWords: ["gas", "gap", "dog", "pig"],
        storyVi: "Nước xối cuốn theo bong bóng trôi tuột xuống rãnh nước kêu g-g-g!"
      },
      {
        sound: "o",
        actionEn: "Pretend to turn a light switch on and off and say o, o, o.",
        actionVi: "Bật nút công tắc bóng đèn bật-tắt và nói o-o-o ngắn.",
        exampleWords: ["on", "off", "pot", "dog"],
        storyVi: "Trời tối rồi, bé hãy bật nguồn bóng đèn phòng học nhé, o-o-o!"
      },
      {
        sound: "u",
        actionEn: "Pretend to open an umbrella and say u, u, u.",
        actionVi: "Bắt chước hành động bấm lẫy mở chiếc ô che đầu và nói u-u-u.",
        exampleWords: ["up", "cup", "sun", "cut"],
        storyVi: "Ơ kìa trời đổ mưa rào rồi, nhanh tay bật chiếc ô lên nào, u-u-u!"
      },
      {
        sound: "l",
        actionEn: "Pretend to lick a lollipop and say llllll.",
        actionVi: "Giơ ngón tay vờ làm que kẹo mút và liếm ngon lành nói llllll.",
        exampleWords: ["leg", "log", "lip", "bell"],
        storyVi: "Cây kẹo dâu ngọt ngào mút lẹo thơm phức, llllll!"
      },
      {
        sound: "f",
        actionEn: "Let hands open and close like a deflating toy fish, blowing softly fffff.",
        actionVi: "Áp hai bàn tay lảo đảo như con cá bị xẹp không khí thổi khẽ rít gió fffff.",
        exampleWords: ["fun", "fat", "fit", "off"],
        storyVi: "Mặt hơi phùng ra xì một làn hơi nhẹ từ khóe răng, fffff!"
      },
      {
        sound: "b",
        actionEn: "Pretend to hit a ball with a bat and say b, b, b.",
        actionVi: "Đứng thế chuẩn bị vung chiếc gậy bóng chày vụt trúng quả bóng bay đi kêu b-b-b.",
        exampleWords: ["bat", "bed", "big", "rub"],
        storyVi: "Cú giao bóng chuẩn xác, vụt mạnh quả bóng bay đi, b-b-b!"
      }
    ],
    starterWords: [
      { word: "got", segments: ["g", "o", "t"] },
      { word: "log", segments: ["l", "o", "g"] },
      { word: "cup", segments: ["c", "u", "p"] },
      { word: "sun", segments: ["s", "u", "n"] },
      { word: "big", segments: ["b", "i", "g"] },
      { word: "bat", segments: ["b", "a", "t"] },
      { word: "bed", segments: ["b", "e", "d"] },
      { word: "dog", segments: ["d", "o", "g"] },
      { word: "fun", segments: ["f", "u", "n"] },
      { word: "pig", segments: ["p", "i", "g"] }
    ]
  },
  {
    number: 4,
    name: "Nhóm 4 (ai, j, oa, ie, ee, or)",
    youtubeId: "L2bFqMu3W-g",
    sounds: [
      {
        sound: "ai",
        actionEn: "Cup hand behind ear as if hard of hearing, and say ai?",
        actionVi: "Khum lòng bàn tay sau vành tai rướn người lắng nghe xem ai nói gì kêu ai?",
        exampleWords: ["rain", "nail", "pain", "wait"],
        storyVi: "Hở? Tiếng gì thế nhỉ, con nghe không có rõ lắm đâu, ai?"
      },
      {
        sound: "j",
        actionEn: "Pretend to wobble like jelly on a plate saying j, j, j.",
        actionVi: "Đung đưa hông giống như đĩa thạch dẻo dai đang nảy lên bần bật kêu j-j-j.",
        exampleWords: ["jug", "jam", "jet", "job"],
        storyVi: "Đĩa thạch rau câu ngọt lịm rung rinh trên bàn ăn tròn, j-j-j!"
      },
      {
        sound: "oa",
        actionEn: "Bring hands to cheeks and say oa! as if surprised.",
        actionVi: "Áp hai bàn tay lên má, hai mắt tròn xoe ngạc nhiên kêu oa!",
        exampleWords: ["oak", "boat", "coat", "soap"],
        storyVi: "Ồ! Một chiếc thuyền buồm rực rỡ trôi sông rộng mênh mang, oa!"
      },
      {
        sound: "ie",
        actionEn: "Salute like a sailor and say ie, ie (sound of 'aye aye').",
        actionVi: "Đưa tay sượt thái dương chào tư thế thủy thủ nghiêm trang kêu ie-ie!",
        exampleWords: ["pie", "tie", "die", "lie"],
        storyVi: "Thủy thủ vâng lệnh thuyền trưởng: rõ thưa ngài, ie-ie!"
      },
      {
        sound: "ee",
        actionEn: "Wave hands near ears like donkey ears saying ee, ee.",
        actionVi: "Đưa hai tay lên sát hai bên tai vỗ vẫy nhẹ giống chú lừa kêu tai lừa ee-ee.",
        exampleWords: ["bee", "feet", "see", "seed"],
        storyVi: "Chú lừa ngộ nghĩnh vẫy tai hí vang đồng cỏ lộng gió, ee-ee!"
      },
      {
        sound: "or",
        actionEn: "Wave hands near ears like donkey ears saying or, or (from ee-or).",
        actionVi: "Kết hợp từ điệu tai lừa ee-ee và phát thanh or-or tiếp theo.",
        exampleWords: ["fork", "horn", "corn", "for"],
        storyVi: "Phần sau âm thanh chú lừa kêu dõng dạc trên đồi cỏ, or-or!"
      }
    ],
    starterWords: [
      { word: "rain", segments: ["r", "ai", "n"] },
      { word: "boat", segments: ["b", "oa", "t"] },
      { word: "pie", segments: ["p", "ie"] },
      { word: "bee", segments: ["b", "ee"] },
      { word: "fork", segments: ["f", "or", "k"] },
      { word: "jam", segments: ["j", "a", "m"] },
      { word: "jet", segments: ["j", "e", "t"] },
      { word: "see", segments: ["s", "ee"] },
      { word: "coat", segments: ["c", "oa", "t"] },
      { word: "seed", segments: ["s", "ee", "d"] }
    ]
  },
  {
    number: 5,
    name: "Nhóm 5 (z, w, ng, v, oo, OO)",
    youtubeId: "W0YxU5W4NRk",
    sounds: [
      {
        sound: "z",
        actionEn: "Fold arms and buzz like a bee saying zzzzzz.",
        actionVi: "Co hai cánh tay chụm lại vỗ cánh và rung mình kêu o o o như đàn ong mật: zzzzzz.",
        exampleWords: ["zoo", "zip", "buzz", "zebra"],
        storyVi: "Bầy ong chăm chỉ bay lượn hút mật hoa nhị vàng buổi sáng, zzzzzz!"
      },
      {
        sound: "w",
        actionEn: "Blow onto your hand as if blowing like high wind and say w, w, w.",
        actionVi: "Nâng bàn tay mở ra sát miệng thổi một làn gió mát rượi phát tiếng w-w-w.",
        exampleWords: ["wet", "wind", "wig", "swim"],
        storyVi: "Gió heo may thổi là là kẽ tay mát rượi lành lạnh cổ, w-w-w!"
      },
      {
        sound: "ng",
        actionEn: "Pretend to be a strong weightlifter shouting 'ng...!'",
        actionVi: "Bắt chước vận động viên thể hình giơ tay gồng tạ rặn hết cơ bắp kêu ng-ng...!",
        exampleWords: ["ring", "song", "wing", "king"],
        storyVi: "Cố lên! Nâng quả tạ khổng lồ lên cao quá vai nào, ng...!"
      },
      {
        sound: "v",
        actionEn: "Pretend to drive a car with a steering wheel saying vvvvvv.",
        actionVi: "Hai tay xoay một trục vô lăng xe giả vờ đang đi du ngoạn đường xa kêu vvvvvv.",
        exampleWords: ["van", "vest", "vet", "five"],
        storyVi: "Bé lái xe tải bon bon trên dặm đường trường bằng cát phẳng, vvvvvv!"
      },
      {
        sound: "oo",
        actionEn: "Pretend to bob your head up and down like a cuckoo in a clock, saying oo! (short oo).",
        actionVi: "Nhún cổ rụt đầu làm chú chim cúc cu nhảy ra khỏi chiếc đồng hồ gỗ kêu o-o gắn.",
        exampleWords: ["book", "look", "foot", "cook"],
        storyVi: "Chim cúc cu gật gù báo hiệu đúng thời khắc giữa trưa, oo!"
      },
      {
        sound: "oo-long",
        actionEn: "Pretend to bob your head up and down like a cuckoo in a clock, saying OO! (long oo).",
        actionVi: "Cũng là chú chim cồng gộc nhưng hú vang thanh cao OO ngân vang.",
        exampleWords: ["moon", "spoon", "cool", "zoo"],
        storyVi: "Cánh diều lướt gió vi vu dưới ánh trăng rằm thơ mộng, OO!"
      }
    ],
    starterWords: [
      { word: "van", segments: ["v", "a", "n"] },
      { word: "wet", segments: ["w", "e", "t"] },
      { word: "wing", segments: ["w", "i", "ng"] },
      { word: "ring", segments: ["r", "i", "ng"] },
      { word: "song", segments: ["s", "o", "ng"] },
      { word: "book", segments: ["b", "oo", "k"] },
      { word: "look", segments: ["l", "oo", "k"] },
      { word: "moon", segments: ["m", "oo-long", "n"] },
      { word: "spoon", segments: ["s", "p", "oo-long", "n"] },
      { word: "zip", segments: ["z", "i", "p"] }
    ]
  },
  {
    number: 6,
    name: "Nhóm 6 (y, x, ch, sh, th, TH)",
    youtubeId: "QLT6ZAWCRfA",
    sounds: [
      {
        sound: "y",
        actionEn: "Pretend to eat yogurt from a spoon, licking your lips saying y, y, y.",
        actionVi: "Bắt chước múc một muỗng sữa chua dâu béo ngậy liếm lăm liếm lách: y-y-y.",
        exampleWords: ["yes", "yet", "yum", "yellow"],
        storyVi: "Hũ sữa chua mát lạnh ngon lành bổ dưỡng ghê cơ, y-y-y!"
      },
      {
        sound: "x",
        actionEn: "Pretend to take an X-ray photo with a camera saying ks, ks, ks.",
        actionVi: "Giơ ngón trỏ đè lên má, vờ nhấn nút chụp bức ảnh chụp hồng ngoại X-quang: ks-ks-ks.",
        exampleWords: ["box", "fox", "six", "mix"],
        storyVi: "Giơ tay lên màn huỳnh quang bấm máy 'tách' chụp chiếu xương cốt, ks-ks!"
      },
      {
        sound: "ch",
        actionEn: "Move arms like train pistons, saying ch, ch, ch.",
        actionVi: "Vung gập hai khủy tay xoay vòng như pít-tông đầu tàu xe lửa kéo còi ch-ch-ch.",
        exampleWords: ["chip", "chin", "rich", "much"],
        storyVi: "Xe lửa chở than sầm sập vượt đèo dốc núi trùng điệp, ch-ch-ch!"
      },
      {
        sound: "sh",
        actionEn: "Put your index finger to your lips, whispering shshsh.",
        actionVi: "Đặt ngón trỏ chắn giữa bờ môi khép kín ra chiều dặn dò khẽ khàng: shshsh.",
        exampleWords: ["ship", "fish", "shop", "wish"],
        storyVi: "Bé nhỏ ơi, nói khẽ khàng kẻo làm giật mình nôi em ngủ say, shshsh!"
      },
      {
        sound: "th",
        actionEn: "Stick tongue out slightly, blow softly, buzz the sound (voiced th).",
        actionVi: "Đặt mỏng rìa đầu lưỡi kẹp nhẹ giữa hai kẽ răng, rung hơi rè rè (âm th hữu thanh).",
        exampleWords: ["this", "that", "them", "then"],
        storyVi: "Chỉ tay vào vật phẩm ở gần: cái này này, th-th-this!"
      },
      {
        sound: "th-unvoiced",
        actionEn: "Stick tongue out a bit more, blow cold air out softly (unvoiced th).",
        actionVi: "Cũng là thè lưỡi bám răng nhẹ nhưng thổi làn hơi lướt mỏng gió mát (vô thanh).",
        exampleWords: ["thin", "thick", "bath", "moth"],
        storyVi: "Cả nhà cùng tắm bồn sủi tăm mát lạnh sạch bóng, th-th-bath!"
      }
    ],
    starterWords: [
      { word: "yes", segments: ["y", "e", "s"] },
      { word: "fox", segments: ["f", "o", "x"] },
      { word: "box", segments: ["b", "o", "x"] },
      { word: "chip", segments: ["ch", "i", "p"] },
      { word: "ship", segments: ["sh", "i", "p"] },
      { word: "fish", segments: ["f", "i", "sh"] },
      { word: "thin", segments: ["th-unvoiced", "i", "n"] },
      { word: "this", segments: ["th", "i", "s"] },
      { word: "rich", segments: ["r", "i", "ch"] },
      { word: "six", segments: ["s", "i", "x"] }
    ]
  },
  {
    number: 7,
    name: "Nhóm 7 (qu, ou, oi, ue, er, ar)",
    youtubeId: "QIKcuJFh7zw",
    sounds: [
      {
        sound: "qu",
        actionEn: "Pretend to be ducks and make 'quack quack' duck bills with your hands.",
        actionVi: "Áp bốn ngón tay chụm lại làm chiếc mỏ vịt kêu cạc cạc, qu-qu.",
        exampleWords: ["quick", "queen", "quiz", "quack"],
        storyVi: "Mẹ con chú vịt bầu bì bõm lội ao kêu cạp cạp vang khóm trúc, qu-qu!"
      },
      {
        sound: "ou",
        actionEn: "Pretend to prick your finger with a needle saying ou! (ouch).",
        actionVi: "Rụt tay bóp ngón trỏ đau đớn như vừa bị kim khâu chích trúng: ou! (ouch!).",
        exampleWords: ["out", "loud", "house", "mouse"],
        storyVi: "Ui da! Bị cái gai bưởi đâm sượt nhẹ đầu ngón tay nhức nhối, ou!"
      },
      {
        sound: "oi",
        actionEn: "Cup hands to mouth to shout and say oi, oi! (ship ahoy).",
        actionVi: "Khum lồng hai bàn tay thành cái loa trước môi hô lớn tiếng hò tàu thủy: oi-oi!",
        exampleWords: ["oil", "coin", "boil", "join"],
        storyVi: "Hỡi thủy thủ viễn chinh! Thấy đất liền phía chân trời xa rồi, oi-oi!"
      },
      {
        sound: "ue",
        actionEn: "Point to someone and say 'you!' representing ue (long u sound).",
        actionVi: "Gập ngón trỏ hướng về người bạn hiền lành đối diện và bảo bạn ấy đấy, ue-ue!",
        exampleWords: ["blue", "glue", "due", "clue"],
        storyVi: "Cây keo dán giấy màu thủ công dính chặt dẻo mịn ghê cơ, ue!"
      },
      {
        sound: "er",
        actionEn: "Pretend to roll hands to show a cement mixer going errrrrr.",
        actionVi: "Quay đan lồng hai cổ tay đều đặn gầm rú như máy nhào xi măng công trường rầm rập: errrrr.",
        exampleWords: ["her", "sister", "mixer", "winter"],
        storyVi: "Xe bồn bê tông khổng lồ trộn sầm sập liên tục ngày đêm, errrrr!"
      },
      {
        sound: "ar",
        actionEn: "Open mouth wide like doctor examining your throat saying ar!",
        actionVi: "Há cơ miệng rộng vuông chữ O ngửa mặt lên để nghe bác sĩ rờ khám họng: ar!",
        exampleWords: ["car", "star", "park", "arm"],
        storyVi: "Aaaa bé há to ngoan ngoãn cho bác sĩ kiểm tra amiđan sưng đỏ, ar!"
      }
    ],
    starterWords: [
      { word: "quick", segments: ["qu", "i", "c", "k"] },
      { word: "queen", segments: ["qu", "ee", "n"] },
      { word: "out", segments: ["ou", "t"] },
      { word: "house", segments: ["h", "ou", "s", "e"] },
      { word: "coin", segments: ["c", "oi", "n"] },
      { word: "car", segments: ["c", "ar"] },
      { word: "star", segments: ["s", "t", "ar"] },
      { word: "park", segments: ["p", "ar", "k"] },
      { word: "her", segments: ["h", "er"] },
      { word: "oil", segments: ["oi", "l"] }
    ]
  },
  {
    number: 8,
    name: "Âm Thay Thế /ai/ (ai, ay, a-e)",
    youtubeId: "vBqbe7WubfM",
    sounds: [
      {
        sound: "ai",
        actionEn: "Cup hand behind ear as if hard of hearing, and say ai?",
        actionVi: "Khum lòng bàn tay sau vành tai rướn người lắng nghe xem ai nói gì kêu ai?",
        exampleWords: ["rain", "nail", "pain", "wait"],
        storyVi: "Hở? Tiếng gì thế nhỉ, con nghe không có rõ lắm đâu, ai?"
      },
      {
        sound: "ay",
        actionEn: "Cup hand behind ear like /ai/ but point downwards to signal end word position.",
        actionVi: "Khum tay bên tai tựa như âm /ai/ nhưng chỉ ngón tay xuống đất báo hiệu kết thúc âm.",
        exampleWords: ["play", "day", "say", "gray", "tray"],
        storyVi: "Khi âm /ai/ đứng ở cuối của một từ, nó thường viết bằng hai chữ 'ay' nhé con!"
      },
      {
        sound: "a-e",
        actionEn: "Put finger to lips for silent 'e', then thrust hand forward throwing magic to change /a/ to /ai/.",
        actionVi: "Đặt ngón trỏ lên môi im lặng (chữ e câm) rồi chỉ tay vụt về phía trước ném phép thuật biến chữ 'a' thành /ai/.",
        exampleWords: ["cake", "bake", "lake", "gate", "game"],
        storyVi: "Chữ E kì diệu (Magic E) đứng ở cuối từ nhảy lò cò ném phép thuật biến chữ 'a' dõng dạc thành âm /ai/ kiêu hãnh."
      }
    ],
    starterWords: [
      { word: "play", segments: ["p", "l", "ay"] },
      { word: "day", segments: ["d", "ay"] },
      { word: "say", segments: ["s", "ay"] },
      { word: "gray", segments: ["g", "r", "ay"] },
      { word: "tray", segments: ["t", "r", "ay"] },
      { word: "rain", segments: ["r", "ai", "n"] },
      { word: "nail", segments: ["n", "ai", "l"] },
      { word: "pain", segments: ["p", "ai", "n"] },
      { word: "wait", segments: ["w", "ai", "t"] },
      { word: "cake", segments: ["c", "a-e", "k"] },
      { word: "bake", segments: ["b", "a-e", "k"] },
      { word: "gate", segments: ["g", "a-e", "t"] },
      { word: "game", segments: ["g", "a-e", "m"] }
    ]
  },
  {
    number: 9,
    name: "Âm Thay Thế /ee/ (ee, ea, y)",
    youtubeId: "vBqbe7WubfM",
    sounds: [
      {
        sound: "ee",
        actionEn: "Wave hands near ears like donkey ears saying ee, ee.",
        actionVi: "Đưa hai tay lên sát hai bên tai vỗ vẫy nhẹ giống chú lừa kêu tai lừa ee-ee.",
        exampleWords: ["bee", "feet", "see", "seed"],
        storyVi: "Chú lừa ngộ nghĩnh vẫy tai hí vang đồng cỏ lộng gió, ee-ee!"
      },
      {
        sound: "ea",
        actionEn: "Pretend to inspect a green leaf with your hands.",
        actionVi: "Đưa bàn tay uốn cong chỉ chú chim sâu kiếm lá cây xanh ríu rít.",
        exampleWords: ["leaf", "tea", "eat", "meat", "seat"],
        storyVi: "Nhóm âm 'ea' cũng phát âm là /ee/ (kéo dài) thường xuất hiện trong các từ nói về ăn uống, tự nhiên đấy bé!"
      },
      {
        sound: "y",
        actionEn: "Tickle your chin as if pleased and say ee!",
        actionVi: "Gãi nhẹ cằm cười tươi vui vẻ phấn khích và kêu ee!",
        exampleWords: ["happy", "baby", "funny", "puppy", "windy"],
        storyVi: "Chữ 'y' đáng yêu khi đứng ở cuối từ dài thường mỉm cười biến thành âm /ee/ kéo dài thật sảng khoái!"
      }
    ],
    starterWords: [
      { word: "bee", segments: ["b", "ee"] },
      { word: "see", segments: ["s", "ee"] },
      { word: "feet", segments: ["f", "ee", "t"] },
      { word: "seed", segments: ["s", "ee", "d"] },
      { word: "leaf", segments: ["l", "ea", "f"] },
      { word: "eat", segments: ["ea", "t"] },
      { word: "tea", segments: ["t", "ea"] },
      { word: "meat", segments: ["m", "ea", "t"] },
      { word: "seat", segments: ["s", "ea", "t"] },
      { word: "happy", segments: ["h", "a", "p", "y"] },
      { word: "baby", segments: ["b", "a", "b", "y"] },
      { word: "funny", segments: ["f", "u", "n", "y"] }
    ]
  },
  {
    number: 10,
    name: "Âm Thay Thế /ie/ (ie, igh, i-e, y)",
    youtubeId: "vBqbe7WubfM",
    sounds: [
      {
        sound: "ie",
        actionEn: "Salute like a sailor and say ie, ie (sound of 'aye aye').",
        actionVi: "Đưa tay sượt thái dương chào tư thế thủy thủ nghiêm trang kêu ie-ie!",
        exampleWords: ["pie", "tie", "die", "lie"],
        storyVi: "Thủy thủ vâng lệnh thuyền trưởng: rõ thưa ngài, ie-ie!"
      },
      {
        sound: "igh",
        actionEn: "Point high up to the night sky and say igh.",
        actionVi: "Ngước mắt chỉ tay lên bầu trời đầy sao lấp lánh cao tít kêu igh, igh!",
        exampleWords: ["high", "night", "light", "fight", "right"],
        storyVi: "Ba chữ cái i, g, h đi kề sát nhau thân thiết tạo thành âm /ie/ dõng dạc!"
      },
      {
        sound: "i-e",
        actionEn: "Use index finger as silent 'e' indicator, lifting/pointing up for long /ie/ representation.",
        actionVi: "Nhún vai ra hiệu im lặng cho chữ e câm đầy bí ẩn, chỉ ngón tay chéo nâng âm /i/ lên thành /ie/ kéo dài.",
        exampleWords: ["bike", "kite", "five", "time", "lime"],
        storyVi: "Chú E câm tinh nghịch biến chữ 'i' ngắn thành âm /ie/ kéo dài đầy diệu kỳ."
      },
      {
        sound: "y",
        actionEn: "Pretend to fly like an airplane and say ie!",
        actionVi: "Dang cánh tay bay lượn như chú diều ngẩng cao đầu lướt gió kêu /ie/!",
        exampleWords: ["fly", "sky", "cry", "dry", "my"],
        storyVi: "Với những từ siêu ngắn chỉ có một âm tiết, chữ 'y' ở cuối từ kiêu hãnh tuyên bố dõng dạc mình là âm /ie/ đấy!"
      }
    ],
    starterWords: [
      { word: "pie", segments: ["p", "ie"] },
      { word: "tie", segments: ["t", "ie"] },
      { word: "high", segments: ["h", "igh"] },
      { word: "night", segments: ["n", "igh", "t"] },
      { word: "light", segments: ["l", "igh", "t"] },
      { word: "fight", segments: ["f", "igh", "t"] },
      { word: "right", segments: ["r", "igh", "t"] },
      { word: "bike", segments: ["b", "i-e", "k"] },
      { word: "kite", segments: ["k", "i-e", "t"] },
      { word: "five", segments: ["f", "i-e", "v"] },
      { word: "time", segments: ["t", "i-e", "m"] },
      { word: "fly", segments: ["f", "l", "y"] },
      { word: "sky", segments: ["s", "k", "y"] },
      { word: "my", segments: ["m", "y"] }
    ]
  },
  {
    number: 11,
    name: "Âm Thay Thế /oa/ (oa, ow, o-e)",
    youtubeId: "vBqbe7WubfM",
    sounds: [
      {
        sound: "oa",
        actionEn: "Bring hands to cheeks and say oa! as if surprised.",
        actionVi: "Áp hai bàn tay lên má, hai mắt tròn xoe ngạc nhiên kêu oa!",
        exampleWords: ["oak", "boat", "coat", "soap"],
        storyVi: "Ồ! Một chiếc thuyền buồm rực rỡ trôi sông rộng mênh mang, oa!"
      },
      {
        sound: "ow",
        actionEn: "Pretend to catch light snowflakes falling from sky and say ow!",
        actionVi: "Mở to hai tay hứng những bông tuyết trắng buốt rơi từ đỉnh mây kêu ow!",
        exampleWords: ["snow", "slow", "blow", "grow", "show"],
        storyVi: "Hai chữ cái 'ow' thường đứng ở cuối từ để tạo phong thái kiêu sa cho âm /oa/ tròn trịa."
      },
      {
        sound: "o-e",
        actionEn: "Pretend to look surprised, then wave hands towards a home to trigger Magic E.",
        actionVi: "Nhẹ nhàng ôm hai má kinh ngạc chỉ vào căn nhà ấm cúng ném phép thuật biến thành âm /oa/.",
        exampleWords: ["home", "bone", "cone", "rose", "nose"],
        storyVi: "Phép màu từ chữ E câm thổi bay hơi nóng biến chữ 'o' thành âm /oa/ tròn trịa."
      }
    ],
    starterWords: [
      { word: "boat", segments: ["b", "oa", "t"] },
      { word: "coat", segments: ["c", "oa", "t"] },
      { word: "soap", segments: ["s", "oa", "p"] },
      { word: "snow", segments: ["s", "n", "ow"] },
      { word: "slow", segments: ["s", "l", "ow"] },
      { word: "blow", segments: ["b", "l", "ow"] },
      { word: "grow", segments: ["g", "r", "ow"] },
      { word: "show", segments: ["sh", "ow"] },
      { word: "home", segments: ["h", "o-e", "m"] },
      { word: "bone", segments: ["b", "o-e", "n"] },
      { word: "rose", segments: ["r", "o-e", "s"] },
      { word: "nose", segments: ["n", "o-e", "s"] }
    ]
  },
  {
    number: 12,
    name: "Âm Thay Thế /ue/ (ue, ew, u-e)",
    youtubeId: "vBqbe7WubfM",
    sounds: [
      {
        sound: "ue",
        actionEn: "Point to someone and say 'you!' representing ue (long u sound).",
        actionVi: "Gập ngón trỏ hướng về người bạn hiền lành đối diện và bảo bạn ấy đấy, ue-ue!",
        exampleWords: ["blue", "glue", "due", "clue"],
        storyVi: "Cây keo dán giấy màu thủ công dính chặt dẻo mịn ghê cơ, ue!"
      },
      {
        sound: "ew",
        actionEn: "Make a delighted face looking at a shiny brand-new toy saying ew!",
        actionVi: "Bày tỏ nét mặt vui sướng khi chạm vào một món đồ chơi thông minh cực mới kêu ew!",
        exampleWords: ["few", "new", "grew", "blew", "drew"],
        storyVi: "Tổ hợp 'ew' đại diện cho âm /ue/ (nghe như chữ 'iu') thường hay dùng rộng rãi cuối cụm từ."
      },
      {
        sound: "u-e",
        actionEn: "Point to a small tube and wave hands to make silent-E magic animation.",
        actionVi: "Tạo dáng chỉ tay vào vật dụng hình ống hoặc chiếc bút dễ thương rồi vờ làm ảo thuật biến chữ 'u' thành /ue/.",
        exampleWords: ["tube", "cute", "mule", "huge", "fume"],
        storyVi: "Chữ E cuối từ dồn hết sinh lực ném phép thuật về trước hô biến chữ 'u' thành âm /ue/ siêu ngọt."
      }
    ],
    starterWords: [
      { word: "blue", segments: ["b", "l", "ue"] },
      { word: "glue", segments: ["g", "l", "ue"] },
      { word: "clue", segments: ["c", "l", "ue"] },
      { word: "few", segments: ["f", "ew"] },
      { word: "new", segments: ["n", "ew"] },
      { word: "grew", segments: ["g", "r", "ew"] },
      { word: "blew", segments: ["b", "l", "ew"] },
      { word: "drew", segments: ["d", "r", "ew"] },
      { word: "tube", segments: ["t", "u-e", "b"] },
      { word: "cute", segments: ["c", "u-e", "t"] },
      { word: "mule", segments: ["m", "u-e", "l"] },
      { word: "huge", segments: ["h", "u-e", "g"] }
    ]
  },
  {
    number: 13,
    name: "Âm Thay Thế /er/ (er, ir, ur)",
    youtubeId: "vBqbe7WubfM",
    sounds: [
      {
        sound: "er",
        actionEn: "Pretend to roll hands to show a cement mixer going errrrrr.",
        actionVi: "Quay đan lồng hai cổ tay đều đặn gầm rú như máy nhào xi măng công trường rầm rập: errrrr.",
        exampleWords: ["her", "sister", "mixer", "winter"],
        storyVi: "Xe bồn bê tông khổng lồ trộn sầm sập liên tục ngày đêm, errrrr!"
      },
      {
        sound: "ir",
        actionEn: "Flap your hands/elbows like wings of a little bird chirping ir, ir.",
        actionVi: "Dang hai tay rồi bắt chước chú chim sâu nghiêng đầu đập cánh bay lượn vỗ vỗ kêu ir-ir.",
        exampleWords: ["bird", "girl", "shirt", "skirt", "first"],
        storyVi: "Hầu hết các từ chỉ các sinh vật biết bay hoặc quần áo xinh xắn thường ưa chuộng cách viết 'ir' của âm /er/."
      },
      {
        sound: "ur",
        actionEn: "Sway side to side as if surfing high ocean waves saying ur, ur!",
        actionVi: "Quay lút hông như đang lướt sóng biển dạt dào sướng mê kêu ur-ur!",
        exampleWords: ["surf", "hurt", "burn", "turn", "fur"],
        storyVi: "Các từ đi kèm với hành động thể chất, nóng rực hoặc loài vật lông dày có xu hướng ưa chuộng cách viết 'ur' cho âm /er/ đấy!"
      }
    ],
    starterWords: [
      { word: "her", segments: ["h", "er"] },
      { word: "sister", segments: ["s", "i", "s", "t", "er"] },
      { word: "winter", segments: ["w", "i", "n", "t", "er"] },
      { word: "bird", segments: ["b", "ir", "d"] },
      { word: "girl", segments: ["g", "ir", "l"] },
      { word: "shirt", segments: ["sh", "ir", "t"] },
      { word: "skirt", segments: ["s", "k", "ir", "t"] },
      { word: "first", segments: ["f", "ir", "s", "t"] },
      { word: "surf", segments: ["s", "ur", "f"] },
      { word: "hurt", segments: ["h", "ur", "t"] },
      { word: "burn", segments: ["b", "ur", "n"] },
      { word: "turn", segments: ["t", "ur", "n"] }
    ]
  },
  {
    number: 14,
    name: "Âm Thay Thế /or/ (or, al, aw, au)",
    youtubeId: "vBqbe7WubfM",
    sounds: [
      {
        sound: "or",
        actionEn: "Bring hands to ears like donkey ears saying or, or.",
        actionVi: "Vỗ nhẹ hai tay vờ làm đôi tai chú lừa kêu or-or ngộ nghĩnh.",
        exampleWords: ["for", "born", "fork", "storm"],
        storyVi: "Chú lừa vui vẻ vẫy tai hí vang khúc nhạc lộng gió kêu or-or!"
      },
      {
        sound: "al",
        actionEn: "Pretend to toss a big beachball upwards and say al!",
        actionVi: "Vờ tung một quả bóng bay to tròn lên không trung kêu al!",
        exampleWords: ["ball", "wall", "call", "walk", "talk"],
        storyVi: "Khi đi kề chữ 'l', chữ 'a' thường biến hóa dõng dạc thành âm /or/ tròn trịa như chơi bóng."
      },
      {
        sound: "aw",
        actionEn: "Pretend to hold a big saw to cut wood and say aw, aw!",
        actionVi: "Bắt chước tư thế cầm cưa kéo tay nhịp nhàng cưa gỗ kêu aw-aw!",
        exampleWords: ["saw", "raw", "draw", "straw", "claw"],
        storyVi: "Khi hai chữ 'aw' đứng ở cuối từ thích cùng nhau ngân nga âm /or/ vang cả cánh rừng."
      },
      {
        sound: "au",
        actionEn: "Make a surprised face pointing to custom sauce and say au!",
        actionVi: "Xíu mút má ngạc nhiên nếm thử thìa nước xốt siêu ngon kêu au!",
        exampleWords: ["Paul", "sauce", "haunt", "launch", "fault"],
        storyVi: "Cặp bài trùng 'au' lại ưa thích đứng ở giữa từ để ngân nga giai điệu /or/ trầm ấm."
      }
    ],
    starterWords: [
      { word: "for", segments: ["f", "or"] },
      { word: "born", segments: ["b", "or", "n"] },
      { word: "fork", segments: ["f", "or", "k"] },
      { word: "ball", segments: ["b", "al"] },
      { word: "wall", segments: ["w", "al"] },
      { word: "walk", segments: ["w", "al", "k"] },
      { word: "saw", segments: ["s", "aw"] },
      { word: "draw", segments: ["d", "r", "aw"] },
      { word: "straw", segments: ["s", "t", "r", "aw"] },
      { word: "sauce", segments: ["s", "au", "c_soft", "e"] },
      { word: "launch", segments: ["l", "au", "n", "ch"] }
    ]
  },
  {
    number: 15,
    name: "Âm Thay Thế /oi/ (oi, oy)",
    youtubeId: "vBqbe7WubfM",
    sounds: [
      {
        sound: "oi",
        actionEn: "Cup hands around mouth calling out, 'oi, ship ahoy!'",
        actionVi: "Khum hai tay quanh miệng hướng ra xa gọi vọng 'oi! Tàu ơi!'",
        exampleWords: ["oil", "coin", "join", "soil", "point"],
        storyVi: "Các bạn thủy thủ đi giữa trùng khơi gọi loa vang dội kêu oi, oi!"
      },
      {
        sound: "oy",
        actionEn: "Wave cheerfully at a little boy and say oy!",
        actionVi: "Vẫy tay rạng rỡ chào một cậu bé đáng yêu và kêu oy!",
        exampleWords: ["boy", "toy", "joy", "enjoy", "annoy"],
        storyVi: "Khi âm /oi/ đứng ở cuối của từ, nó thích khoác vai bạn Letter Y tạo thành 'oy' vui vẻ."
      }
    ],
    starterWords: [
      { word: "oil", segments: ["oi", "l"] },
      { word: "coin", segments: ["c", "oi", "n"] },
      { word: "join", segments: ["j", "oi", "n"] },
      { word: "soil", segments: ["s", "oi", "l"] },
      { word: "boy", segments: ["b", "oy"] },
      { word: "toy", segments: ["t", "oy"] },
      { word: "joy", segments: ["j", "oy"] }
    ]
  },
  {
    number: 16,
    name: "Âm Thay Thế /ou/ (ou, ow_ou)",
    youtubeId: "vBqbe7WubfM",
    sounds: [
      {
        sound: "ou",
        actionEn: "Pretend to prick finger on a needle and say ou, ouch!",
        actionVi: "Bấm nhẹ đầu ngón tay vờ như bị kim chọc đau kêu ou, ouch!",
        exampleWords: ["out", "loud", "house", "mouse", "cloud"],
        storyVi: "Nhóm âm 'ou' thường đứng ở giữa từ khi bé kêu đau ouch, ouch!"
      },
      {
        sound: "ow_ou",
        actionEn: "Make a round shape with arms saying ow, like a big cow.",
        actionVi: "Cong tay ôm vòng tròn giả làm chú bò sữa khổng lồ nhai cỏ kêu ow!",
        exampleWords: ["cow", "how", "town", "brown", "down"],
        storyVi: "Khi âm /ou/ đứng ở cuối từ hay kề chữ 'n', nó thường hóa thân thành 'ow' mộc mạc."
      }
    ],
    starterWords: [
      { word: "out", segments: ["ou", "t"] },
      { word: "loud", segments: ["l", "ou", "d"] },
      { word: "house", segments: ["h", "ou", "s", "e"] },
      { word: "cloud", segments: ["c", "l", "ou", "d"] },
      { word: "cow", segments: ["c", "ow_ou"] },
      { word: "how", segments: ["h", "ow_ou"] },
      { word: "town", segments: ["t", "ow_ou", "n"] },
      { word: "brown", segments: ["b", "r", "ow_ou", "n"] },
      { word: "down", segments: ["d", "ow_ou", "n"] }
    ]
  },
  {
    number: 17,
    name: "Âm Thay Thế Soft C & Soft G",
    youtubeId: "vBqbe7WubfM",
    sounds: [
      {
        sound: "c_soft",
        actionEn: "Slide index finger in a sweeping 'S' motion representing the hissing soft C.",
        actionVi: "Lướt ngón trỏ vẽ chữ S mềm mại trong không gian thì thầm dịu dàng như tiếng rắn rít.",
        exampleWords: ["ice", "cell", "city", "face", "pencil"],
        storyVi: "Khi chữ 'c' đi trước các chữ cái e, i, y, nó sẽ mỉm cười biến thành âm /s/ nhẹ nhàng mềm mại."
      },
      {
        sound: "g_soft",
        actionEn: "Pretend to twist open a tiny gemstone jar saying j, j.",
        actionVi: "Nâng niu tay vờ xoay mở chiếc lọ chứa đầy hồng ngọc lấp lánh kêu j, j!",
        exampleWords: ["gem", "giant", "cage", "page", "giraffe"],
        storyVi: "Khi chữ 'g' đứng trước các chị em e, i, y, nó ném phép thuật biến thành âm /j/ dõng dạc."
      }
    ],
    starterWords: [
      { word: "ice", segments: ["i", "c_soft", "e"] },
      { word: "cell", segments: ["c_soft", "e", "l", "l"] },
      { word: "city", segments: ["c_soft", "i", "t", "y"] },
      { word: "face", segments: ["f", "a", "c_soft", "e"] },
      { word: "pencil", segments: ["p", "e", "n", "c_soft", "i", "l"] },
      { word: "gem", segments: ["g_soft", "e", "m"] },
      { word: "giant", segments: ["g_soft", "i", "a", "n", "t"] },
      { word: "cage", segments: ["c", "a", "g_soft", "e"] },
      { word: "page", segments: ["p", "a", "g_soft", "e"] }
    ]
  }
];

// Helper to check if a word can be formed of a list of active alphabets/phonemes
export function isWordBlendable(word: string, unlockedPhonemes: string[]): boolean {
  // Simple check for default groups or words
  // In our actual blending flow, we'll match phonemes, segmenting correctly
  return true;
}

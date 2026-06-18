import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Custom endpoint to serve uploaded Jolly Phonics Group 1-7 letter sounds with correct case/name mapping
app.get("/audio/:filename", (req, res) => {
  const filename = req.params.filename.toLowerCase();
  
  // Comprehensive mapping of Jolly Phonics phonemes to files uploaded by the user
  const AUDIO_MAP: Record<string, string> = {
    // Group 1
    "s.mp3": "s.mp3",
    "a.mp3": "short a.mp3",
    "t.mp3": "t.mp3",
    "i.mp3": "Short i.mp3",
    "p.mp3": "p.mp3",
    "n.mp3": "n.mp3",

    // Group 2
    "c.mp3": "ck.MP3",
    "k.mp3": "ck.MP3",
    "ck.mp3": "ck.MP3",
    "e.mp3": "e.MP3",
    "h.mp3": "h.MP3",
    "r.mp3": "r.MP3",
    "m.mp3": "m.MP3",
    "d.mp3": "d.MP3",

    // Group 3
    "g.mp3": "g.MP3",
    "o.mp3": "o.MP3",
    "u.mp3": "u.MP3",
    "l.mp3": "l.MP3",
    "f.mp3": "f.MP3",
    "b.mp3": "b.MP3",

    // Group 4
    "ai.mp3": "ai.MP3",
    "j.mp3": "j.MP3",
    "oa.mp3": "oa.MP3",
    "ie.mp3": "ie sound.MP3",
    "ee.mp3": "ee sound.MP3",
    "or.mp3": "or sound.MP3",

    // Group 5
    "z.mp3": "z sound.MP3",
    "w.mp3": "w sound.MP3",
    "ng.mp3": "ng.MP3",
    "v.mp3": "v sound.MP3",
    "oo.mp3": "short u sound.MP3", 
    "oo-long.mp3": "long u sound.MP3",

    // Group 6
    "y.mp3": "y sound.MP3",
    "x.mp3": "x sound.MP3",
    "ch.mp3": "ch sound.MP3",
    "sh.mp3": "sh.MP3",
    "th.mp3": "th voice.MP3",
    "th-unvoiced.mp3": "th unvoice.MP3",

    // Group 7
    "qu.mp3": "qu sound.MP3",
    "ou.mp3": "ou.MP3",
    "oi.mp3": "oi.MP3",
    "ue.mp3": "ue.MP3",
    "er.mp3": "er.MP3",
    "ar.mp3": "ar.MP3"
  };

  const targetFilename = AUDIO_MAP[filename] || filename;

  // Attempt 1: Look inside src/components
  const componentsPath = path.join(process.cwd(), "src", "components", targetFilename);
  res.sendFile(componentsPath, (err) => {
    if (!err) return;

    // Attempt 2: Look at workspace root (where the user uploaded them)
    const rootPath = path.join(process.cwd(), targetFilename);
    res.sendFile(rootPath, (err2) => {
      if (!err2) return;

      // Attempt 3: Look for any loose case matches at workspace root
      const exactFilenameObj = Object.values(AUDIO_MAP).find(
        (val) => val.toLowerCase() === targetFilename.toLowerCase()
      );
      if (exactFilenameObj) {
        const extraFallbackPath = path.join(process.cwd(), exactFilenameObj);
        res.sendFile(extraFallbackPath, (err3) => {
          if (!err3) return;
          res.status(404).end();
        });
      } else {
        res.status(404).end();
      }
    });
  });
});

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not defined.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        }
      }
    });
  }
  return aiClient;
}

// Static Phonics Curriculum Fallback Database for premium, offline/fail-silent reliability
const FALLBACK_DATABASE: Record<number, {
  story: string;
  vietnameseStory: string;
  keyWords: { word: string; segments: string[] }[];
  question: string;
  answer: string;
}> = {
  1: {
    story: "Sam sat on a tin. Pat has a pin. A pin is in a pan.",
    vietnameseStory: "Sam ngồi trên một chiếc lon. Pat có một chiếc ghim. Một chiếc ghim nằm trong chiếc chảo.",
    keyWords: [
      { word: "sat", segments: ["s", "a", "t"] },
      { word: "pin", segments: ["p", "i", "n"] },
      { word: "tin", segments: ["t", "i", "n"] },
      { word: "pan", segments: ["p", "a", "n"] }
    ],
    question: "Who sat on a tin?",
    answer: "Sam"
  },
  2: {
    story: "A red hen is in a pen. Dad has a wet map. A sad cat sat on a mat.",
    vietnameseStory: "Một cô gà mái màu đỏ đang ở trong chuồng. Bố có một tấm bản đồ bị ướt. Một chú mèo buồn bã ngồi trên tấm thảm.",
    keyWords: [
      { word: "hen", segments: ["h", "e", "n"] },
      { word: "cat", segments: ["c", "a", "t"] },
      { word: "red", segments: ["r", "e", "d"] },
      { word: "map", segments: ["m", "a", "p"] }
    ],
    question: "Where is the red hen?",
    answer: "In a pen"
  },
  3: {
    story: "A big fat dog is on a log. The sun is hot today. A pig got a cup.",
    vietnameseStory: "Một chú chó to mập đang ở trên khúc gỗ. Mặt trời hôm nay rất nóng. Một chú heo đã lấy được một chiếc cốc.",
    keyWords: [
      { word: "dog", segments: ["d", "o", "g"] },
      { word: "log", segments: ["l", "o", "g"] },
      { word: "sun", segments: ["s", "u", "n"] },
      { word: "cup", segments: ["c", "u", "p"] }
    ],
    question: "What is on a log?",
    answer: "A big dog"
  },
  4: {
    story: "A bee sat on a coat. I see rain on the boat. He has a sweet hot pie.",
    vietnameseStory: "Một chú ong đậu trên chiếc áo khoác. Tớ thấy mưa rơi trên chiếc thuyền. Cậu ấy có một chiếc bánh ngọt ấm nóng.",
    keyWords: [
      { word: "bee", segments: ["b", "ee"] },
      { word: "boat", segments: ["b", "oa", "t"] },
      { word: "rain", segments: ["r", "ai", "n"] },
      { word: "pie", segments: ["p", "ie"] }
    ],
    question: "Where did the bee sit?",
    answer: "On a coat"
  },
  5: {
    story: "Look at the big moon. A wet dog can swim. The king has a ring.",
    vietnameseStory: "Hãy nhìn ông trăng lớn kìa. Một chú chó ướt nhẹp có thể bơi. Nhà vua có một chiếc nhẫn.",
    keyWords: [
      { word: "moon", segments: ["m", "oo-long", "n"] },
      { word: "look", segments: ["l", "oo", "k"] },
      { word: "wing", segments: ["w", "i", "ng"] },
      { word: "ring", segments: ["r", "i", "ng"] }
    ],
    question: "What is in the sky?",
    answer: "The big moon"
  },
  6: {
    story: "Yes, this fish is in a dish. A rich fox is on a ship. The kid has six chips.",
    vietnameseStory: "Vâng, chú cá này đang nằm trong dĩa. Một chú cáo giàu có ở trên một con tàu. Đứa trẻ có sáu miếng khoai tây chiên.",
    keyWords: [
      { word: "fish", segments: ["f", "i", "sh"] },
      { word: "ship", segments: ["sh", "i", "p"] },
      { word: "chips", segments: ["ch", "i", "p", "s"] },
      { word: "fox", segments: ["f", "o", "x"] }
    ],
    question: "How many chips does the kid have?",
    answer: "Six chips"
  },
  7: {
    story: "A quick queen is in the house. Look at the bright star. The boy got a coin.",
    vietnameseStory: "Một nữ hoàng nhanh nhẹn đang ở trong nhà. Hãy nhìn ngôi sao sáng kìa. Cậu bé đã nhận được một đồng xu.",
    keyWords: [
      { word: "queen", segments: ["qu", "ee", "n"] },
      { word: "house", segments: ["h", "ou", "s", "e"] },
      { word: "coin", segments: ["c", "oi", "n"] },
      { word: "star", segments: ["s", "t", "ar"] }
    ],
    question: "Who is in the house?",
    answer: "A quick queen"
  },
  8: {
    story: "Bake a sweet cake today. The dog can play in the clay. We wait at the gate.",
    vietnameseStory: "Hãy nướng một chiếc bánh ngọt hôm nay nào. Chú chó có thể vui chơi trong đất sét. Chúng ta đứng chờ ở cổng nhà.",
    keyWords: [
      { word: "cake", segments: ["c", "a-e", "k"] },
      { word: "play", segments: ["p", "l", "ay"] },
      { word: "gate", segments: ["g", "a-e", "t"] },
      { word: "wait", segments: ["w", "ai", "t"] }
    ],
    question: "What should we bake?",
    answer: "A sweet cake"
  },
  9: {
    story: "The happy baby can eat. I see a green leaf on the seat. Eat the fresh meat.",
    vietnameseStory: "Em bé hạnh phúc có thể ăn rồi. Tớ thấy một chiếc lá xanh trên ghế ngồi. Hãy ăn miếng thịt tươi ngon.",
    keyWords: [
      { word: "happy", segments: ["h", "a", "p", "y"] },
      { word: "eat", segments: ["ea", "t"] },
      { word: "leaf", segments: ["l", "ea", "f"] },
      { word: "green", segments: ["g", "r", "ee", "n"] }
    ],
    question: "Who is eating?",
    answer: "The happy baby"
  },
  10: {
    story: "Fly a beautiful kite in the sky. It is night time now. Speak the truth and do not lie.",
    vietnameseStory: "Hãy thả một chiếc diều tuyệt đẹp trên bầu trời. Bây giờ đã là giờ đêm rồi. Hãy nói sự thật và không nói dối.",
    keyWords: [
      { word: "fly", segments: ["f", "l", "y"] },
      { word: "sky", segments: ["s", "k", "y"] },
      { word: "kite", segments: ["k", "i-e", "t"] },
      { word: "night", segments: ["n", "igh", "t"] }
    ],
    question: "What is flying in the sky?",
    answer: "A beautiful kite"
  },
  11: {
    story: "Let us go home now. Do not run in the white snow. The rose got wet in the storm.",
    vietnameseStory: "Hãy cùng về nhà bây giờ nào. Đừng chạy trên tuyết trắng nhé. Hoa hồng đã bị ướt đẫm trong cơn bão.",
    keyWords: [
      { word: "home", segments: ["h", "o-e", "m"] },
      { word: "rose", segments: ["r", "o-e", "s"] },
      { word: "snow", segments: ["s", "n", "ow"] },
      { word: "slow", segments: ["s", "l", "ow"] }
    ],
    question: "Where should we go?",
    answer: "We should go home"
  },
  12: {
    story: "Look at the cute puppy. The sky is bright blue. I drew a yellow tube.",
    vietnameseStory: "Hãy nhìn chú cún dễ thương kìa. Bầu trời có màu xanh lam sáng bóng. Tớ đã vẽ một ống màu vàng.",
    keyWords: [
      { word: "cute", segments: ["c", "u-e", "t"] },
      { word: "blue", segments: ["b", "l", "ue"] },
      { word: "new", segments: ["n", "ew"] },
      { word: "drew", segments: ["d", "r", "ew"] }
    ],
    question: "What color is the tube?",
    answer: "Yellow"
  },
  13: {
    story: "My sister has a bird. Do not get hurt on the grass. Winter is cold here.",
    vietnameseStory: "Chị gái tớ có một chú chim nhỏ. Đừng để bị thương trên bãi cỏ nhé. Mùa đông ở đây rất lạnh giá.",
    keyWords: [
      { word: "sister", segments: ["s", "i", "s", "t", "er"] },
      { word: "bird", segments: ["b", "ir", "d"] },
      { word: "hurt", segments: ["h", "ur", "t"] },
      { word: "winter", segments: ["w", "i", "n", "t", "er"] }
    ],
    question: "What does my sister have?",
    answer: "A bird"
  },
  14: {
    story: "He saw a tall brick wall. We walk in the big park. Play with a yellow ball.",
    vietnameseStory: "Cậu ấy nhìn thấy một bức tường gạch cao. Chúng ta dạo bước trong công viên lớn. Hãy chơi đùa với một quả bóng màu vàng.",
    keyWords: [
      { word: "saw", segments: ["s", "aw"] },
      { word: "wall", segments: ["w", "al"] },
      { word: "walk", segments: ["w", "al", "k"] },
      { word: "ball", segments: ["b", "al"] }
    ],
    question: "Where do we walk?",
    answer: "In the big park"
  },
  15: {
    story: "The little boy has a coin. Joy is a good toy. Come and join the fun.",
    vietnameseStory: "Cậu bé nhỏ tuổi có một đồng xu. Joy là một món đồ chơi tốt. Hãy đến và tham gia niềm vui cùng chúng tớ nhé.",
    keyWords: [
      { word: "boy", segments: ["b", "oy"] },
      { word: "coin", segments: ["c", "oi", "n"] },
      { word: "join", segments: ["j", "oi", "n"] },
      { word: "toy", segments: ["t", "oy"] }
    ],
    question: "What does the little boy have?",
    answer: "A coin"
  },
  16: {
    story: "A brown cow is slowly walking down. The rain is in the dark cloud. Do not shout out loud.",
    vietnameseStory: "Một chú bò màu nâu đang thong thả đi xuống đồi. Cơn mưa đang ở trong đám mây đen. Đừng hét to lên nhé con.",
    keyWords: [
      { word: "cow", segments: ["c", "ow_ou"] },
      { word: "down", segments: ["d", "ow_ou", "n"] },
      { word: "cloud", segments: ["c", "l", "ou", "d"] },
      { word: "loud", segments: ["l", "ou", "d"] }
    ],
    question: "What color is the cow?",
    answer: "Brown"
  },
  17: {
    story: "Look at his happy face. The giant gem is in the gold cage. Turn the page now.",
    vietnameseStory: "Hãy nhìn vào khuôn mặt hạnh phúc của cậu ấy xem. Viên đá quý khổng lồ đang nằm trong chiếc lồng vàng. Hãy lật trang sách ngay nào.",
    keyWords: [
      { word: "face", segments: ["f", "a", "c_soft", "e"] },
      { word: "gem", segments: ["g_soft", "e", "m"] },
      { word: "cage", segments: ["c", "a", "g_soft", "e"] },
      { word: "page", segments: ["p", "a", "g_soft", "e"] }
    ],
    question: "Where is the giant gem?",
    answer: "In the gold cage"
  }
};

// Retry helper for calling the Gemini API to tackle 503 transient spikes
async function callGeminiWithRetry(client: any, prompt: string, instruction: string, schema: any, retries = 3, delay = 800) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: instruction,
          responseMimeType: "application/json",
          responseSchema: schema,
        }
      });
      return response;
    } catch (err: any) {
      console.warn(`[Gemini Attempt ${i + 1}/${retries} failed]:`, err.message || err);
      if (i === retries - 1) {
        throw err; // Out of retries, reject
      }
      // Wait exponentially
      await new Promise((resolve) => setTimeout(resolve, delay * (i + 1)));
    }
  }
}

// API to generate custom Phonics word and deck short sentences using Gemini
app.post("/api/generate-story", async (req, res) => {
  const { unlockedLetters, groupName, groupNumber } = req.body;

  try {
    if (!unlockedLetters || !Array.isArray(unlockedLetters) || unlockedLetters.length === 0) {
      return res.status(400).json({ error: "Thư mục chữ cái mở khóa không hợp lệ." });
    }

    const currentGroup = groupNumber ? parseInt(groupNumber, 10) : 1;
    const lettersString = unlockedLetters.join(", ");

    const systemInstruction = `You are a professional Jolly Phonics and synthetic phonics curriculum designer. 
Your task is to write exactly 3 simple, fun, and separate short sentences in English, perfectly suitable for a 4-6 year old child learning to decode.
CRITICAL CONSTRAINT: You must ONLY use words that can be easily spelled/sounded out using the following list of unlocked letter-sounds: [${lettersString}].
You are STRICTLY FORBIDDEN from generating words containing any letters, phonemes, or digraphs not included in that list.
However, you can also use a small, restricted set of basic Jolly Phonics tricky/sight words if absolutely necessary to form a sentence, but keep them to an absolute minimum: "the", "a", "is", "he", "she", "to", "go", "no", "on", "in", "has", "it".
Keep the vocabulary extremely simple and child-friendly.
Also provide:
1. Vietnamese translation of the sentences for parents to guide their child.
2. A list of 4 key words from the sentences for the child to practice blending, with their phoneme segments (e.g. for "sat", segments are ["s", "a", "t"]; for a digraph like "fish", segments are ["f", "i", "sh"]).
3. A simple comprehension question in English based on the sentences, with the answer in English.`;

    const prompt = `Generate 3 phonics practice sentences for Jolly Phonics Group ${groupNumber || currentGroup} (${groupName || ""}). Unlocked sounds available: ${lettersString}.`;

    const schema = {
      type: Type.OBJECT,
      properties: {
        story: {
          type: Type.STRING,
          description: "The 3 short English sentences separated by periods or spaces, containing only words made of unlocked letters."
        },
        vietnameseStory: {
          type: Type.STRING,
          description: "The Vietnamese translation of the sentences."
        },
        keyWords: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              word: { type: Type.STRING, description: "The practice word in English. e.g. 'sat'" },
              segments: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Separate phonemes of the word. e.g. ['s', 'a', 't']" }
            },
            required: ["word", "segments"]
          },
          description: "4 practice words extracted from the sentences, segmented into single sounds."
        },
        question: {
          type: Type.STRING,
          description: "A very simple comprehension question in English about the sentences."
        },
        answer: {
          type: Type.STRING,
          description: "The simple answer to the question in English."
        }
      },
      required: ["story", "vietnameseStory", "keyWords", "question", "answer"]
    };

    // Lazy load the Gemini client. If the key is missing altogether, it throws and triggers our fail-silent fallback instantly
    const client = getGeminiClient();

    // Call with retry mechanism
    const response = await callGeminiWithRetry(client, prompt, systemInstruction, schema);
    if (!response || !response.text) {
      throw new Error("Empty response from Gemini API");
    }

    const data = JSON.parse(response.text.trim());
    return res.json({ ...data, isFallback: false });

  } catch (error: any) {
    console.error("Gemini Sentences Generation failed. Triggering Fail-Silent Safe Harbor:", error.message || error);
    
    // Smooth Offline/Fail-Silent safe harbor curriculum selection
    const currentGroup = groupNumber ? parseInt(groupNumber, 10) : 1;
    const fallbackData = FALLBACK_DATABASE[currentGroup] || FALLBACK_DATABASE[1];
    
    // Send standard structure with 200 OK - ensures the UI NEVER breaks or shows an error screen!
    return res.json({
      story: fallbackData.story,
      vietnameseStory: fallbackData.vietnameseStory,
      keyWords: fallbackData.keyWords,
      question: fallbackData.question,
      answer: fallbackData.answer,
      isFallback: true
    });
  }
});

// Serve Vite dev server or static build assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer();

// Web Speech API text-to-speech helper for phonics sounds and full words

const phonemePronunciationMap: Record<string, string> = {
  "s": "ssss",
  "a": "a",           // flat open short a as in ant/apple
  "t": "t",           // crisp unvoiced alveolar plosive /t/, no "teh" or "tuh"
  "i": "ih",          // short i sound as in ink
  "p": "p",           // crisp unvoiced bilabial plosive /p/, no "peh" or "puh"
  "n": "nnnn",        // continuous voiced alveolar nasal /n/
  "c": "k",           // crisp unvoiced velar plosive /k/, no "keh" or "kuh"
  "k": "k",           // crisp unvoiced velar plosive /k/, no "keh" or "kuh"
  "e": "e",           // short front e as in egg
  "h": "h",           // unvoiced glottal breath /h/, no "hah" or "huh"
  "r": "rrr",         // continuous voiced alveolar liquid /r/
  "m": "mmm",         // continuous voiced bilabial nasal /m/, no "muh"
  "d": "d",           // crisp voiced alveolar plosive /d/, no "deh" or "duh"
  "g": "g",           // crisp voiced velar plosive /g/, no "geh" or "guh"
  "o": "o",           // short rounded open-mid o as in octopus / on
  "u": "u",           // short open-mid back u as in umbrella
  "l": "lll",         // continuous voiced lateral liquid /l/
  "f": "fff",         // continuous unvoiced labiodental fricative /f/
  "b": "b",           // crisp voiced bilabial plosive /b/, no "beh" or "buh"
  "ai": "ay",         // long a diphthong as in rain
  "j": "j",           // crisp voiced post-alveolar affricate /dʒ/, no "jeh"
  "oa": "oh",         // long o diphthong as in boat
  "ie": "eye",        // long i diphthong as in pie
  "ee": "eee",        // long e monophthong as in bee
  "or": "or",         // donkey sound or as in fork
  "z": "zzzz",        // continuous voiced alveolar fricative /z/
  "w": "w",           // labio-velar approximant /w/, no "weh" or "wuh"
  "ng": "ng",         // voiced velar nasal /ŋ/ as in ring
  "v": "vvvv",        // continuous voiced labiodental fricative /v/
  "oo": "oo",         // short vowel book
  "oo-long": "oooo",  // long vowel moon
  "y": "y",           // palatal approximant /j/ as in yogurt, no "yeh" or "yuh"
  "x": "ks",          // voiceless consonant cluster /ks/ as in box
  "ch": "ch",         // voiceless post-alveolar affricate /tʃ/ as in chip
  "sh": "shhh",       // voiceless post-alveolar fricative /ʃ/ as in hush
  "th": "th",         // dental fricative (voiced/voiceless) as in this/three
  "th-unvoiced": "th",// dental fricative voiceless
  "qu": "qu",         // unvoiced labialised velar plosive /kw/ as in quack
  "ou": "ow",         // diphthong as in ouch/cow
  "oi": "oy",         // diphthong as in oil/toy
  "ue": "ue",         // long vowel /juː/ as in cue/tube
  "er": "er",         // central rhotic schwa as in mixer
  "ar": "ar"          // open back unrounded rhotic /ɑːr/ as in arm/car
};

// Returns standard speech synthesising voices prioritizing British English (en-GB) female/natural
export const speechConfig = {
  pitch: 1.16, // Natural-sounding, warm child-friendly premium pitch (was 1.30 - lowered slightly to make it speech-natural and avoid tinniness on mobile)
  rate: 0.76   // Patient, clear pace
};

function getEnglishVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  
  if (voices.length === 0) return null;

  // Filter for English voices first
  const enVoices = voices.filter(v => v.lang.toLowerCase().startsWith("en"));
  if (enVoices.length === 0) {
    // Fallback to any english or first voice
    return voices.find(v => v.lang.toLowerCase().includes("en")) || voices[0] || null;
  }

  // Known clear high-quality female English voice names across iOS, Safari, and Chrome Mobile
  const femaleKeywords = [
    "serena",                      // Premium Apple UK female (extremely sweet and clear for kids)
    "samantha",                    // iOS / macOS default clear English female
    "hazel",                      // Apple British female (very clear)
    "google uk english female",    // premium UK female (Android/Chrome)
    "google us english female",    // premium US female (Android/Chrome)
    "google uk english",           // Chrome/Android
    "google us english",           // (always clear female-like)
    "microsoft zira",              // Windows Core English female
    "karen",                       // Apple AU English female
    "moira",                       // Apple IE English female
    "fiona",                       // Apple Scottish English female
    "victoria",                    // US female
    "zara",                        // Apple Australian female voice
    "female"                       // General tag matching any system female voice
  ];

  // Actively bypass deep deep male voice profiles to shield child's listening clarity
  const maleKeywords = [
    "male", "daniel", "glen", "george", "ravi", "david", "james", "richard", "mark", "peter", "microsoft david"
  ];

  // 1. Prioritize preeminent female English voices
  for (const femName of femaleKeywords) {
    const match = enVoices.find(v => {
      const nameLower = v.name.toLowerCase();
      return nameLower.includes(femName) && !maleKeywords.some(m => nameLower.includes(m));
    });
    if (match) return match;
  }

  // 2. Look for any voice with 'female' in its metadata (very common on Android/Chrome TTS)
  const anyFemale = enVoices.find(v => {
    const nameLower = v.name.toLowerCase();
    return (nameLower.includes("female") || nameLower.includes("girl") || nameLower.includes("woman") || nameLower.includes("-f-") || nameLower.includes("f_")) &&
           !maleKeywords.some(m => nameLower.includes(m));
  });
  if (anyFemale) return anyFemale;

  // 3. Keep searching for regular English voices that aren't explicitly male
  const preferredLocales = ["en-gb", "en-us", "en-au", "en-ca"];
  for (const locale of preferredLocales) {
    const match = enVoices.find(v => {
      const nameLower = v.name.toLowerCase();
      return v.lang.toLowerCase() === locale && !maleKeywords.some(m => nameLower.includes(m));
    });
    if (match) return match;
  }

  // 4. Any English voice that does not look male
  const anyNonMale = enVoices.find(v => {
    const nameLower = v.name.toLowerCase();
    return !maleKeywords.some(m => nameLower.includes(m));
  });
  if (anyNonMale) return anyNonMale;

  // 5. Ultimate fallback
  return enVoices[0];
}

let audioCtx: AudioContext | null = null;
const audioBufferCache: Record<string, AudioBuffer> = {};

export function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioCtxClass) {
      audioCtx = new AudioCtxClass();
    }
  }
  return audioCtx;
}

// Unlocks AudioContext and SpeechSynthesis on mobile platforms
export function unlockAudioContext(): Promise<void> {
  return new Promise((resolve) => {
    // 1. Resume AudioContext
    const ctx = getAudioContext();
    if (ctx && ctx.state !== "running") {
      ctx.resume().catch(() => {});
    }
    
    // 2. Play silent utterance to initialize SpeechSynthesis on iOS Safari
    if (typeof window !== "undefined" && window.speechSynthesis) {
      try {
        const silentUtterance = new SpeechSynthesisUtterance("");
        silentUtterance.volume = 0;
        window.speechSynthesis.speak(silentUtterance);
      } catch (e) {
        console.warn("SpeechSynthesis silent unlock failed", e);
      }
    }
    resolve();
  });
}

// Global touch/click trigger to unlock mobile audio output
if (typeof window !== "undefined") {
  const handleUserUnlock = () => {
    unlockAudioContext();
  };
  document.addEventListener("click", handleUserUnlock, { passive: true });
  document.addEventListener("touchstart", handleUserUnlock, { passive: true });
}

export function displayPhoneme(phoneme: string): string {
  if (!phoneme) return "";
  return phoneme
    .replace("_ou", "")
    .replace("_soft", "")
    .replace("-unvoiced", "")
    .replace("-long", "")
    .trim();
}

export async function speakPhoneme(phoneme: string): Promise<void> {
  let soundKey = phoneme.toLowerCase().trim();
  
  // Mapping alternative spellings to their primary sounds
  const spellingMap: Record<string, string> = {
    "ay": "ai",
    "a-e": "ai",
    "a_e": "ai",
    "ea": "ee",
    "igh": "ie",
    "i-e": "ie",
    "i_e": "ie",
    "ow": "oa",
    "o-e": "oa",
    "o_e": "oa",
    "ew": "ue",
    "u-e": "ue",
    "u_e": "ue",
    "ir": "er",
    "ur": "er",
    "oy": "oi",
    "al": "or",
    "aw": "or",
    "au": "or",
    "ow_ou": "ou",
    "c_soft": "s",
    "g_soft": "j"
  };
  
  if (spellingMap[soundKey]) {
    soundKey = spellingMap[soundKey];
  }
  
  const audioUrl = `/audio/${soundKey}.mp3`;
  
  // Force pre-emptive resume of sound engine on interaction
  const ctx = getAudioContext();
  if (ctx && ctx.state === "suspended") {
    try {
      await ctx.resume();
    } catch (e) {
      console.warn("Could not resume AudioContext inside speakPhoneme", e);
    }
  }

  // All Jolly Phonics sounds uploaded by the user for groups 1-7
  const ALL_SOUNDS = [
    "s", "a", "t", "i", "p", "n",
    "c", "k", "ck", "e", "h", "r", "m", "d",
    "g", "o", "u", "l", "f", "b",
    "ai", "j", "oa", "ie", "ee", "or",
    "z", "w", "ng", "v", "oo", "oo-long",
    "y", "x", "ch", "sh", "th", "th-unvoiced",
    "qu", "ou", "oi", "ue", "er", "ar"
  ];

  if (ALL_SOUNDS.includes(soundKey) && ctx) {
    try {
      let buffer: AudioBuffer;
      if (audioBufferCache[soundKey]) {
        buffer = audioBufferCache[soundKey];
      } else {
        const response = await fetch(audioUrl);
        if (!response.ok) {
          throw new Error(`Fetch failed: ${response.status}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        buffer = await ctx.decodeAudioData(arrayBuffer);
        audioBufferCache[soundKey] = buffer;
      }
      
      // Perform Web Audio node play to bypass iOS Audio tag restrictions
      await new Promise<void>((resolvePlay) => {
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.onended = () => resolvePlay();
        source.start(0);
      });
      return;
    } catch (error) {
      console.warn(`Web Audio API failed for ${soundKey}, using TTS fallback`, error);
    }
  }

  // Fallback to TTS if custom file loading failed or not in Group 1
  await speakFallbackTTS(soundKey, phoneme);
}

function speakFallbackTTS(soundKey: string, originalPhoneme: string): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      resolve();
      return;
    }

    window.speechSynthesis.cancel();

    const textToSpeak = phonemePronunciationMap[soundKey] || originalPhoneme;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    utterance.lang = "en-GB";
    utterance.rate = speechConfig.rate * 0.9; // Friendly slower pace for individual phonemes
    utterance.pitch = speechConfig.pitch;     // Sweeter high pitch configuration

    const voice = getEnglishVoice();
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    window.speechSynthesis.speak(utterance);
  });
}

export function speakWord(word: string, rate = speechConfig.rate): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      resolve();
      return;
    }

    window.speechSynthesis.cancel();

    // Clean word from optional specifiers (like "e" in "house" being silent or special characters)
    const cleanWord = word.replace("-unvoiced", "").replace("-long", "").trim();
    const utterance = new SpeechSynthesisUtterance(cleanWord);
    
    utterance.lang = "en-GB";
    utterance.rate = rate; // Friendly, accessible pace
    utterance.pitch = speechConfig.pitch;  // Friendly pitch from config

    const voice = getEnglishVoice();
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    window.speechSynthesis.speak(utterance);
  });
}

// Speaks standard encouragement in Vietnamese or English
export function speakEncouragement(phraseVi: string, phraseEn = "Well done!"): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      resolve();
      return;
    }
    window.speechSynthesis.cancel();
    
    // Speak English encouragement with British accent
    const utterance = new SpeechSynthesisUtterance(phraseEn);
    utterance.lang = "en-GB";
    utterance.rate = speechConfig.rate * 1.1; // spoken slightly faster and with higher energy
    utterance.pitch = speechConfig.pitch * 1.05; // extra happy higher pitch

    const voice = getEnglishVoice();
    if (voice) utterance.voice = voice;

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    window.speechSynthesis.speak(utterance);
  });
}

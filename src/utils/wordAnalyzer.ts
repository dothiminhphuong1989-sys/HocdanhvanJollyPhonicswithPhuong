/**
 * Word pronunciation analyzer for Jolly Phonics display & audio sequence alignment 
 * This workflow decouples the visual graphemes (tiles) from the audibly triggered sequence.
 */

export interface WordAnalysis {
  display: string[]; // Grapheme tiles displayed on screen
  audio: string[];   // Corresponding Jolly Phonics sound mp3 identifiers to trigger
}

// Comprehensive mapping of predefined Jolly Phonics starter words
const exactWordMap: Record<string, WordAnalysis> = {
  // Group 1
  "sat": { display: ["s", "a", "t"], audio: ["s", "a", "t"] },
  "pat": { display: ["p", "a", "t"], audio: ["p", "a", "t"] },
  "tap": { display: ["t", "a", "p"], audio: ["t", "a", "p"] },
  "pin": { display: ["p", "i", "n"], audio: ["p", "i", "n"] },
  "tin": { display: ["t", "i", "n"], audio: ["t", "i", "n"] },
  "pan": { display: ["p", "a", "n"], audio: ["p", "a", "n"] },
  "nap": { display: ["n", "a", "p"], audio: ["n", "a", "p"] },
  "sip": { display: ["s", "i", "p"], audio: ["s", "i", "p"] },
  "pit": { display: ["p", "i", "t"], audio: ["p", "i", "t"] },
  "spin": { display: ["s", "p", "i", "n"], audio: ["s", "p", "i", "n"] },

  // Group 2
  "cat": { display: ["c", "a", "t"], audio: ["c", "a", "t"] },
  "kid": { display: ["k", "i", "d"], audio: ["k", "i", "d"] },
  "hen": { display: ["h", "e", "n"], audio: ["h", "e", "n"] },
  "red": { display: ["r", "e", "d"], audio: ["r", "e", "d"] },
  "mad": { display: ["m", "a", "d"], audio: ["m", "a", "d"] },
  "map": { display: ["m", "a", "p"], audio: ["m", "a", "p"] },
  "dam": { display: ["d", "a", "m"], audio: ["d", "a", "m"] },
  "pen": { display: ["p", "e", "n"], audio: ["p", "e", "n"] },
  "kick": { display: ["k", "i", "ck"], audio: ["k", "i", "ck"] },
  "neck": { display: ["n", "e", "ck"], audio: ["n", "e", "ck"] },

  // Group 3
  "got": { display: ["g", "o", "t"], audio: ["g", "o", "t"] },
  "log": { display: ["l", "o", "g"], audio: ["l", "o", "g"] },
  "cup": { display: ["c", "u", "p"], audio: ["c", "u", "p"] },
  "sun": { display: ["s", "u", "n"], audio: ["s", "u", "n"] },
  "big": { display: ["b", "i", "g"], audio: ["b", "i", "g"] },
  "bat": { display: ["b", "a", "t"], audio: ["b", "a", "t"] },
  "bed": { display: ["b", "e", "d"], audio: ["b", "e", "d"] },
  "dog": { display: ["d", "o", "g"], audio: ["d", "o", "g"] },
  "fun": { display: ["f", "u", "n"], audio: ["f", "u", "n"] },
  "pig": { display: ["p", "i", "g"], audio: ["p", "i", "g"] },

  // Group 4
  "rain": { display: ["r", "ai", "n"], audio: ["r", "ai", "n"] },
  "boat": { display: ["b", "oa", "t"], audio: ["b", "oa", "t"] },
  "pie": { display: ["p", "ie"], audio: ["p", "ie"] },
  "bee": { display: ["b", "ee"], audio: ["b", "ee"] },
  "fork": { display: ["f", "or", "k"], audio: ["f", "or", "k"] },
  "jam": { display: ["j", "a", "m"], audio: ["j", "a", "m"] },
  "jet": { display: ["j", "e", "t"], audio: ["j", "e", "t"] },
  "see": { display: ["s", "ee"], audio: ["s", "ee"] },
  "coat": { display: ["c", "oa", "t"], audio: ["c", "oa", "t"] },
  "seed": { display: ["s", "ee", "d"], audio: ["s", "ee", "d"] },

  // Group 5
  "van": { display: ["v", "a", "n"], audio: ["v", "a", "n"] },
  "wet": { display: ["w", "e", "t"], audio: ["w", "e", "t"] },
  "wing": { display: ["w", "i", "ng"], audio: ["w", "i", "ng"] },
  "ring": { display: ["r", "i", "ng"], audio: ["r", "i", "ng"] },
  "song": { display: ["s", "o", "ng"], audio: ["s", "o", "ng"] },
  "book": { display: ["b", "oo", "k"], audio: ["b", "oo", "k"] },
  "look": { display: ["l", "oo", "k"], audio: ["l", "oo", "k"] },
  "moon": { display: ["m", "oo", "n"], audio: ["m", "oo-long", "n"] },
  "spoon": { display: ["s", "p", "oo", "n"], audio: ["s", "p", "oo-long", "n"] },
  "zip": { display: ["z", "i", "p"], audio: ["z", "i", "p"] },

  // Group 6
  "yes": { display: ["y", "e", "s"], audio: ["y", "e", "s"] },
  "fox": { display: ["f", "o", "x"], audio: ["f", "o", "x"] },
  "box": { display: ["b", "o", "x"], audio: ["b", "o", "x"] },
  "chip": { display: ["ch", "i", "p"], audio: ["ch", "i", "p"] },
  "ship": { display: ["sh", "i", "p"], audio: ["sh", "i", "p"] },
  "fish": { display: ["f", "i", "sh"], audio: ["f", "i", "sh"] },
  "thin": { display: ["th", "i", "n"], audio: ["th-unvoiced", "i", "n"] },
  "this": { display: ["th", "i", "s"], audio: ["th", "i", "s"] },
  "rich": { display: ["r", "i", "ch"], audio: ["r", "i", "ch"] },
  "six": { display: ["s", "i", "x"], audio: ["s", "i", "x"] },

  // Group 7
  "quick": { display: ["qu", "i", "ck"], audio: ["qu", "i", "ck"] },
  "queen": { display: ["qu", "ee", "n"], audio: ["qu", "ee", "n"] },
  "out": { display: ["ou", "t"], audio: ["ou", "t"] },
  "house": { display: ["h", "ou", "s", "e"], audio: ["h", "ou", "s", ""] },
  "coin": { display: ["c", "oi", "n"], audio: ["c", "oi", "n"] },
  "car": { display: ["c", "ar"], audio: ["c", "ar"] },
  "star": { display: ["s", "t", "ar"], audio: ["s", "t", "ar"] },
  "park": { display: ["p", "ar", "k"], audio: ["p", "ar", "k"] },
  "her": { display: ["h", "er"], audio: ["h", "er"] },
  "oil": { display: ["oi", "l"], audio: ["oi", "l"] },

  // Group 8 (ai, ay, a-e)
  "play": { display: ["p", "l", "ay"], audio: ["p", "l", "ai"] },
  "day": { display: ["d", "ay"], audio: ["d", "ai"] },
  "say": { display: ["s", "ay"], audio: ["s", "ai"] },
  "gray": { display: ["g", "r", "ay"], audio: ["g", "r", "ai"] },
  "tray": { display: ["t", "r", "ay"], audio: ["t", "r", "ai"] },
  "nail": { display: ["n", "ai", "l"], audio: ["n", "ai", "l"] },
  "pain": { display: ["p", "ai", "n"], audio: ["p", "ai", "n"] },
  "wait": { display: ["w", "ai", "t"], audio: ["w", "ai", "t"] },
  "cake": { display: ["c", "a", "k", "e"], audio: ["c", "ai", "k", ""] },
  "bake": { display: ["b", "a", "k", "e"], audio: ["b", "ai", "k", ""] },
  "gate": { display: ["g", "a", "t", "e"], audio: ["g", "ai", "t", ""] },
  "game": { display: ["g", "a", "m", "e"], audio: ["g", "ai", "m", ""] },

  // Group 9 (ee, ea, y)
  "feet": { display: ["f", "ee", "t"], audio: ["f", "ee", "t"] },
  "leaf": { display: ["l", "ea", "f"], audio: ["l", "ee", "f"] },
  "eat": { display: ["ea", "t"], audio: ["ee", "t"] },
  "tea": { display: ["t", "ea"], audio: ["t", "ee"] },
  "meat": { display: ["m", "ea", "t"], audio: ["m", "ee", "t"] },
  "seat": { display: ["s", "ea", "t"], audio: ["s", "ee", "t"] },
  "happy": { display: ["h", "a", "pp", "y"], audio: ["h", "a", "p", "ee"] },
  "baby": { display: ["b", "ai", "b", "y"], audio: ["b", "ai", "b", "ee"] },
  "funny": { display: ["f", "u", "n", "y"], audio: ["f", "u", "n", "ee"] },

  // Group 10 (ie, igh, i-e, y)
  "tie": { display: ["t", "ie"], audio: ["t", "ie"] },
  "high": { display: ["h", "igh"], audio: ["h", "ie"] },
  "night": { display: ["n", "igh", "t"], audio: ["n", "ie", "t"] },
  "light": { display: ["l", "igh", "t"], audio: ["l", "ie", "t"] },
  "fight": { display: ["f", "igh", "t"], audio: ["f", "ie", "t"] },
  "right": { display: ["r", "igh", "t"], audio: ["r", "ie", "t"] },
  "bike": { display: ["b", "i", "k", "e"], audio: ["b", "ie", "k", ""] },
  "kite": { display: ["k", "i", "t", "e"], audio: ["k", "ie", "t", ""] },
  "five": { display: ["f", "i", "v", "e"], audio: ["f", "ie", "v", ""] },
  "time": { display: ["t", "i", "m", "e"], audio: ["t", "ie", "m", ""] },
  "fly": { display: ["f", "l", "y"], audio: ["f", "l", "ie"] },
  "sky": { display: ["s", "k", "y"], audio: ["s", "k", "ie"] },
  "my": { display: ["m", "y"], audio: ["m", "ie"] },

  // Group 11 (oa, ow, o-e)
  "soap": { display: ["s", "oa", "p"], audio: ["s", "oa", "p"] },
  "snow": { display: ["s", "n", "ow"], audio: ["s", "n", "oa"] },
  "slow": { display: ["s", "l", "ow"], audio: ["s", "l", "oa"] },
  "blow": { display: ["b", "l", "ow"], audio: ["b", "l", "oa"] },
  "grow": { display: ["g", "r", "ow"], audio: ["g", "r", "oa"] },
  "show": { display: ["sh", "ow"], audio: ["sh", "oa"] },
  "home": { display: ["h", "o", "m", "e"], audio: ["h", "oa", "m", ""] },
  "bone": { display: ["b", "o", "n", "e"], audio: ["b", "oa", "n", ""] },
  "rose": { display: ["r", "o", "s", "e"], audio: ["r", "oa", "z", ""] },
  "nose": { display: ["n", "o", "s", "e"], audio: ["n", "oa", "z", ""] },

  // Group 12 (ue, ew, u-e)
  "blue": { display: ["b", "l", "ue"], audio: ["b", "l", "ue"] },
  "glue": { display: ["g", "l", "ue"], audio: ["g", "l", "ue"] },
  "clue": { display: ["c", "l", "ue"], audio: ["c", "l", "ue"] },
  "few": { display: ["f", "ew"], audio: ["f", "ue"] },
  "new": { display: ["n", "ew"], audio: ["n", "ue"] },
  "grew": { display: ["g", "r", "ew"], audio: ["g", "r", "ue"] },
  "blew": { display: ["b", "l", "ew"], audio: ["b", "l", "ue"] },
  "drew": { display: ["d", "r", "ew"], audio: ["d", "r", "ue"] },
  "tube": { display: ["t", "u", "b", "e"], audio: ["t", "ue", "b", ""] },
  "cute": { display: ["c", "u", "t", "e"], audio: ["c", "ue", "t", ""] },
  "mule": { display: ["m", "u", "l", "e"], audio: ["m", "ue", "l", ""] },
  "huge": { display: ["h", "u", "g", "e"], audio: ["h", "ue", "j", ""] },

  // Group 13 (er, ir, ur)
  "sister": { display: ["s", "i", "s", "t", "er"], audio: ["s", "i", "s", "t", "er"] },
  "winter": { display: ["w", "i", "n", "t", "er"], audio: ["w", "i", "n", "t", "er"] },
  "bird": { display: ["b", "ir", "d"], audio: ["b", "er", "d"] },
  "girl": { display: ["g", "ir", "l"], audio: ["g", "er", "l"] },
  "shirt": { display: ["sh", "ir", "t"], audio: ["sh", "er", "t"] },
  "skirt": { display: ["s", "k", "ir", "t"], audio: ["s", "k", "er", "t"] },
  "first": { display: ["f", "ir", "s", "t"], audio: ["f", "er", "s", "t"] },
  "surf": { display: ["s", "ur", "f"], audio: ["s", "er", "f"] },
  "hurt": { display: ["h", "ur", "t"], audio: ["h", "er", "t"] },
  "burn": { display: ["b", "ur", "n"], audio: ["b", "er", "n"] },
  "turn": { display: ["t", "ur", "n"], audio: ["t", "er", "n"] },

  // Group 14 (or, al, aw, au)
  "ball": { display: ["b", "a", "ll"], audio: ["b", "or", "l"] },
  "wall": { display: ["w", "a", "ll"], audio: ["w", "or", "l"] },
  "walk": { display: ["w", "a", "l", "k"], audio: ["w", "or", "k"] },
  "saw": { display: ["s", "aw"], audio: ["s", "or"] },
  "draw": { display: ["d", "r", "aw"], audio: ["d", "r", "or"] },
  "straw": { display: ["s", "t", "r", "aw"], audio: ["s", "t", "r", "or"] },
  "sauce": { display: ["s", "au", "c", "e"], audio: ["s", "or", "s", ""] },
  "launch": { display: ["l", "au", "n", "ch"], audio: ["l", "or", "n", "ch"] },

  // Group 15 (oi, oy)
  "join": { display: ["j", "oi", "n"], audio: ["j", "oi", "n"] },
  "soil": { display: ["s", "oi", "l"], audio: ["s", "oi", "l"] },
  "boy": { display: ["b", "oy"], audio: ["b", "oi"] },
  "toy": { display: ["t", "oy"], audio: ["t", "oi"] },
  "joy": { display: ["j", "oy"], audio: ["j", "oi"] },

  // Group 16 (ou, ow_ou)
  "loud": { display: ["l", "ou", "d"], audio: ["l", "ou", "d"] },
  "cloud": { display: ["c", "l", "ou", "d"], audio: ["c", "l", "ou", "d"] },
  "cow": { display: ["c", "ow"], audio: ["c", "ou"] },
  "how": { display: ["h", "ow"], audio: ["h", "ou"] },
  "town": { display: ["t", "ow", "n"], audio: ["t", "ou", "n"] },
  "brown": { display: ["b", "r", "ow", "n"], audio: ["b", "r", "ou", "n"] },
  "down": { display: ["d", "ow", "n"], audio: ["d", "ou", "n"] },

  // Group 17
  "ice": { display: ["i", "c", "e"], audio: ["ie", "s", ""] },
  "cell": { display: ["c", "e", "ll"], audio: ["s", "e", "l"] },
  "city": { display: ["c", "i", "t", "y"], audio: ["s", "i", "t", "ee"] },
  "face": { display: ["f", "a", "c", "e"], audio: ["f", "ai", "s", ""] },
  "pencil": { display: ["p", "e", "n", "c", "i", "l"], audio: ["p", "e", "n", "s", "i", "l"] },
  "gem": { display: ["g", "e", "m"], audio: ["j", "e", "m"] },
  "giant": { display: ["g", "i", "a", "n", "t"], audio: ["j", "ie", "a", "n", "t"] },
  "cage": { display: ["c", "a", "g", "e"], audio: ["c", "ai", "j", ""] },
  "page": { display: ["p", "a", "g", "e"], audio: ["p", "ai", "j", ""] },
};

/**
 * Custom algorithmic rules to resolve displays & audios for any potential words dynamically
 * (e.g. ones generated by Gemini AI).
 */
export function analyzeWord(word: string, fallbackSegments?: string[]): WordAnalysis {
  const normalized = word.toLowerCase().trim();
  
  let result: WordAnalysis;

  // 1. Check exact map first
  if (exactWordMap[normalized]) {
    result = {
      display: [...exactWordMap[normalized].display],
      audio: [...exactWordMap[normalized].audio]
    };
  } else {
    // 2. Failover to algorithmically map segment files
    const segments = fallbackSegments || normalized.split("");

    const display: string[] = [];
    const audio: string[] = [];

    // Rules to dynamically build display vs audio arrays
    for (let idx = 0; idx < segments.length; idx++) {
      const origSeg = segments[idx];
      let displaySeg = origSeg;
      let audioSeg = origSeg;

      // Convert standard phonics descriptors
      if (origSeg === "th-unvoiced") {
        displaySeg = "th";
        audioSeg = "th-unvoiced";
      } else if (origSeg === "oo-long") {
        displaySeg = "oo";
        audioSeg = "oo-long";
      } else if (origSeg === "c_soft") {
        displaySeg = "c";
        audioSeg = "s";
      } else if (origSeg === "g_soft") {
        displaySeg = "g";
        audioSeg = "j";
      } else if (origSeg === "a-e") {
        displaySeg = "a"; // Display 'a' tile, plays 'ai'
        audioSeg = "ai";
      } else if (origSeg === "i-e") {
        displaySeg = "i"; // Display 'i' tile, plays 'ie'
        audioSeg = "ie";
      } else if (origSeg === "o-e") {
        displaySeg = "o"; // Display 'o' tile, plays 'oa'
        audioSeg = "oa";
      } else if (origSeg === "u-e") {
        displaySeg = "u"; // Display 'u' tile, plays 'ue'
        audioSeg = "ue";
      } else if (origSeg === "ow_ou") {
        displaySeg = "ow";
        audioSeg = "ou";
      } else if (origSeg === "y" && idx === segments.length - 1 && segments.length > 3) {
        // 'y' at the end of longer words typically represents 'ee' sound
        displaySeg = "y";
        audioSeg = "ee";
      } else if (origSeg === "y" && idx === segments.length - 1 && segments.length <= 3) {
        // 'y' at the end of extremely short words typically represents 'ie' sound
        displaySeg = "y";
        audioSeg = "ie";
      } else if (origSeg === "ea") {
        displaySeg = "ea";
        audioSeg = "ee";
      } else if (origSeg === "ay") {
        displaySeg = "ay";
        audioSeg = "ai";
      } else if (origSeg === "ew") {
        displaySeg = "ew";
        audioSeg = "ue";
      } else if (origSeg === "ir" || origSeg === "ur") {
        displaySeg = origSeg;
        audioSeg = "er";
      } else if (origSeg === "al" || origSeg === "aw" || origSeg === "au") {
        displaySeg = origSeg;
        audioSeg = "or";
      } else if (origSeg === "oy") {
        displaySeg = "oy";
        audioSeg = "oi";
      } else if (origSeg === "ow") {
        displaySeg = "ow";
        audioSeg = "oa";
      } else if (origSeg === "igh") {
        displaySeg = "igh";
        audioSeg = "ie";
      }

      display.push(displaySeg);
      audio.push(audioSeg);
    }
    result = { display, audio };
  }

  // Guarantee matching lengths by padding audio array with silent entries
  while (result.audio.length < result.display.length) {
    result.audio.push("");
  }

  return result;
}

export interface PhonicsSound {
  sound: string;        // The spelling (e.g. "s", "ai", "sh")
  actionEn: string;     // Jolly phonics action description in English
  actionVi: string;     // Jolly phonics action description in Vietnamese
  exampleWords: string[]; // Example word list
  storyVi: string;      // Simple story context in Vietnamese
}

export interface SoundGroup {
  number: number;
  name: string;
  youtubeId?: string; // YouTube video ID for group songs
  sounds: PhonicsSound[];
  starterWords: {
    word: string;
    segments: string[]; // e.g. ["s", "a", "t"]
  }[];
}

export interface MasteredWord {
  word: string;
  groupNumber: number;
  timestamp: number;
}

export interface AppProgress {
  unlockedGroups: number[]; // e.g. [1, 2]
  starsCount: number;
  masteredWords: string[];
}

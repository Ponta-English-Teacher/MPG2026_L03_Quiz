// ============================================================
//  MPG2026 – L02 Question Bank
//  End-of-Class Quiz – Lesson 2
//  Edit this file to update or add questions for future lessons.
// ============================================================

const QUIZ_META = {
  courseID: "MPG2026",
  lessonID: "L02",
  quizID:   "MPG2026_L02",
  title:    "Modern Pronunciation and Grammar 2026",
  subtitle: "End-of-Class Quiz – Lesson 2",
};

// Section definitions (used for result breakdown)
const SECTIONS = [
  { name: "Part of Speech in Context",  questions: [1,2,3,4,5,6,7,8] },
  { name: "Error Correction",           questions: [9,10,11,12,13,14] },
  { name: "Structure Awareness",        questions: [15,16,17,18,19] },
  { name: "Word Order",                 questions: [20,21,22,23,24] },
  { name: "Dictation",                  questions: [25,26,27,28] },
  { name: "Dictation + Analysis",       questions: [29,30] },
];

// Comment bands (score out of 30)
const COMMENT_BANDS = [
  { min: 27, max: 30, comment: "Excellent work. You have a strong grasp of grammar function and structure." },
  { min: 23, max: 26, comment: "Good job. You understand most key points. Keep refining your accuracy." },
  { min: 18, max: 22, comment: "Nice try. You have a solid start, but review how parts of speech function in sentences." },
  { min: 13, max: 17, comment: "Keep working. Focus on how words change their role depending on their position in a sentence." },
  { min:  0, max: 12, comment: "Work harder next time. Review parts of speech, sentence structure, and error correction carefully." },
];
const CLOSING_NOTE = "Understanding how words function in sentences makes you a stronger reader, writer, and listener. Keep going.";

// ============================================================
//  Question data
//  type: "mc" | "dragdrop" | "dictation" | "dictation_analysis"
// ============================================================
const QUESTIONS = [

  // ── Section 1: Part of Speech in Context ───────────────────
  // Same word, different functions — more applied than L01
  {
    id: 1, section: 1, type: "mc",
    stem: "In <em>The run was exhausting</em>, what part of speech is <em>run</em>?",
    options: { A: "verb", B: "noun", C: "adjective" },
    correct: "B",
    explanation: "<em>Run</em> is the subject of the sentence here, functioning as a noun.",
  },
  {
    id: 2, section: 1, type: "mc",
    stem: "In <em>She has a kind heart</em>, what part of speech is <em>kind</em>?",
    options: { A: "verb", B: "adverb", C: "adjective" },
    correct: "C",
    explanation: "<em>Kind</em> describes the noun <em>heart</em>, so it is an adjective.",
  },
  {
    id: 3, section: 1, type: "mc",
    stem: "In <em>He spoke kindly to her</em>, what part of speech is <em>kindly</em>?",
    options: { A: "adjective", B: "adverb", C: "noun" },
    correct: "B",
    explanation: "<em>Kindly</em> modifies the verb <em>spoke</em>, so it is an adverb.",
  },
  {
    id: 4, section: 1, type: "mc",
    stem: "In <em>The fast train left early</em>, what part of speech is <em>fast</em>?",
    options: { A: "adverb", B: "verb", C: "adjective" },
    correct: "C",
    explanation: "<em>Fast</em> describes the noun <em>train</em>, so it is an adjective here.",
  },
  {
    id: 5, section: 1, type: "mc",
    stem: "In <em>She runs fast</em>, what part of speech is <em>fast</em>?",
    options: { A: "adjective", B: "adverb", C: "noun" },
    correct: "B",
    explanation: "<em>Fast</em> modifies the verb <em>runs</em>, so it is an adverb here. Notice that <em>fast</em> is both an adjective and an adverb depending on its function.",
  },
  {
    id: 6, section: 1, type: "mc",
    stem: "In <em>They elected him their leader</em>, what part of speech is <em>their</em>?",
    options: { A: "pronoun", B: "determiner", C: "conjunction" },
    correct: "B",
    explanation: "<em>Their</em> comes before the noun <em>leader</em> and identifies whose leader — it functions as a determiner.",
  },
  {
    id: 7, section: 1, type: "mc",
    stem: "In <em>He is either tired or hungry</em>, what part of speech is <em>either...or</em>?",
    options: { A: "preposition", B: "conjunction", C: "determiner" },
    correct: "B",
    explanation: "<em>Either...or</em> is a correlative conjunction connecting two adjectives.",
  },
  {
    id: 8, section: 1, type: "mc",
    stem: "In <em>Wow, that was amazing!</em>, what part of speech is <em>Wow</em>?",
    options: { A: "adverb", B: "interjection", C: "verb" },
    correct: "B",
    explanation: "<em>Wow</em> expresses a sudden emotion and has no grammatical connection to the rest of the sentence — it is an interjection.",
  },

  // ── Section 2: Error Correction ────────────────────────────
  // Find the wrong word and choose the correct replacement
  {
    id: 9, section: 2, type: "mc",
    stem: "<em>She sang the song beautiful.</em> — Which word should replace <em>beautiful</em>?",
    options: { A: "beauty", B: "beautifully", C: "beautify" },
    correct: "B",
    explanation: "<em>Beautiful</em> is an adjective but here it modifies the verb <em>sang</em>. An adverb is needed: <em>beautifully</em>.",
  },
  {
    id: 10, section: 2, type: "mc",
    stem: "<em>He looked at her angry.</em> — Which word should replace <em>angry</em>?",
    options: { A: "angrily", B: "anger", C: "angered" },
    correct: "A",
    explanation: "<em>Angry</em> is an adjective but here it modifies the verb <em>looked</em>. An adverb is needed: <em>angrily</em>.",
  },
  {
    id: 11, section: 2, type: "mc",
    stem: "<em>The news made him sadly.</em> — Which word should replace <em>sadly</em>?",
    options: { A: "sad", B: "sadness", C: "sadden" },
    correct: "A",
    explanation: "After <em>make + object</em>, an adjective complement is needed, not an adverb. <em>Sad</em> describes the state of <em>him</em>.",
  },
  {
    id: 12, section: 2, type: "mc",
    stem: "<em>She speaks English very good.</em> — Which word should replace <em>good</em>?",
    options: { A: "goodly", B: "well", C: "better" },
    correct: "B",
    explanation: "<em>Good</em> is an adjective. To modify the verb <em>speaks</em>, the adverb <em>well</em> is needed.",
  },
  {
    id: 13, section: 2, type: "mc",
    stem: "<em>He remained calmly during the meeting.</em> — Which word should replace <em>calmly</em>?",
    options: { A: "calm", B: "calming", C: "calmed" },
    correct: "A",
    explanation: "<em>Remain</em> is a linking verb. It takes an adjective complement, not an adverb. <em>Calm</em> describes the state of the subject.",
  },
  {
    id: 14, section: 2, type: "mc",
    stem: "<em>They found the movie bored.</em> — Which word should replace <em>bored</em>?",
    options: { A: "bore", B: "boring", C: "boredom" },
    correct: "B",
    explanation: "The movie is the source of boredom, not the receiver. <em>Boring</em> describes what the movie is like. <em>Bored</em> would describe the people watching it.",
  },

  // ── Section 3: Structure Awareness ─────────────────────────
  {
    id: 15, section: 3, type: "mc",
    stem: "In <em>The girl with red shoes is my sister</em>, what is the whole subject?",
    options: { A: "The girl", B: "The girl with red shoes", C: "red shoes" },
    correct: "B",
    explanation: "<em>With red shoes</em> is a prepositional phrase modifying <em>girl</em>. The whole subject includes the noun and its modifier.",
  },
  {
    id: 16, section: 3, type: "mc",
    stem: "In <em>Running every morning keeps him healthy</em>, what is the subject?",
    options: { A: "Running every morning", B: "him", C: "healthy" },
    correct: "A",
    explanation: "<em>Running every morning</em> is a gerund phrase functioning as the subject of the sentence.",
  },
  {
    id: 17, section: 3, type: "mc",
    stem: "In <em>It is important to study grammar</em>, what does <em>it</em> refer to?",
    options: { A: "Nothing — it is a dummy subject", B: "grammar", C: "studying" },
    correct: "A",
    explanation: "<em>It</em> here is a dummy (or empty) subject. The real subject is the infinitive phrase <em>to study grammar</em>.",
  },
  {
    id: 18, section: 3, type: "mc",
    stem: "In <em>She gave the students who passed a prize</em>, what is the direct object?",
    options: { A: "the students", B: "who passed", C: "a prize" },
    correct: "C",
    explanation: "<em>The students</em> is the indirect object. <em>A prize</em> is the direct object — the thing that was given.",
  },
  {
    id: 19, section: 3, type: "mc",
    stem: "In <em>Although he was tired, he finished the report</em>, what is the main clause?",
    options: { A: "Although he was tired", B: "he finished the report", C: "the report" },
    correct: "B",
    explanation: "<em>Although he was tired</em> is a subordinate clause. <em>He finished the report</em> is the main clause that can stand alone.",
  },

  // ── Section 4: Word Order ───────────────────────────────────
  {
    id: 20, section: 4, type: "dragdrop",
    instruction: "Arrange the words to make a correct sentence.",
    blocks: ["He", "is", "rarely", "late"],
    correct: ["He", "is", "rarely", "late"],
  },
  {
    id: 21, section: 4, type: "dragdrop",
    instruction: "Arrange the words to make a correct sentence.",
    blocks: ["She", "found", "the exam", "difficult"],
    correct: ["She", "found", "the exam", "difficult"],
  },
  {
    id: 22, section: 4, type: "dragdrop",
    instruction: "Arrange the words to make a correct sentence.",
    blocks: ["The teacher", "made", "the students", "repeat the sentence"],
    correct: ["The teacher", "made", "the students", "repeat the sentence"],
  },
  {
    id: 23, section: 4, type: "dragdrop",
    instruction: "Arrange the words to make a correct sentence.",
    blocks: ["I", "have just", "had", "my hair", "cut"],
    correct: ["I", "have just", "had", "my hair", "cut"],
  },
  {
    id: 24, section: 4, type: "dragdrop",
    instruction: "Arrange the words to make a correct sentence.",
    blocks: ["The man", "standing by the door", "is", "my teacher"],
    correct: ["The man", "standing by the door", "is", "my teacher"],
  },

  // ── Section 5: Dictation ────────────────────────────────────
  // Targeting common phonological difficulties for Japanese learners:
  // /r/ vs /l/, /θ/, weak syllables, homophones, connected speech
  {
    id: 25, section: 5, type: "dictation",
    audio: "audio/q25.mp3",
    correct: "She rarely arrives on time",
    note: "Focus on the /r/ sound in <em>rarely</em> and <em>arrives</em>, and the weak ending <em>-ly</em>.",
  },
  {
    id: 26, section: 5, type: "dictation",
    audio: "audio/q26.mp3",
    correct: "The weather affects whether we go",
    note: "<em>Weather</em> and <em>whether</em> sound the same but have different meanings and spellings.",
  },
  {
    id: 27, section: 5, type: "dictation",
    audio: "audio/q27.mp3",
    correct: "He insisted that she be present at the meeting",
    note: "Notice the subjunctive <em>be</em> — not <em>is</em>. Listen carefully to weak syllables in connected speech.",
  },
  {
    id: 28, section: 5, type: "dictation",
    audio: "audio/q28.mp3",
    correct: "Their theory about the theme is thoroughly thought out",
    note: "Focus on the <em>/θ/</em> sound in <em>their</em>, <em>theory</em>, <em>the</em>, <em>theme</em>, <em>thoroughly</em>, and <em>thought</em>.",
  },

  // ── Section 6: Dictation + Analysis ────────────────────────
  {
    id: 29, section: 6, type: "dictation_analysis",
    audio: "audio/q29.mp3",
    correct: "The window broken by the storm has been repaired",
    analysisQuestion: "What is <em>broken</em> in this sentence?",
    options: { A: "main verb", B: "adjective modifying window", C: "adverb" },
    correctAnalysis: "B",
    explanation: "<em>Broken by the storm</em> is a participial phrase describing <em>window</em>. The main verb of the sentence is <em>has been repaired</em>.",
    note: "Listen for the participial phrase that modifies the subject.",
  },
  {
    id: 30, section: 6, type: "dictation_analysis",
    audio: "audio/q30.mp3",
    correct: "Having finished her work she went home early",
    analysisQuestion: "What is <em>Having finished her work</em>?",
    options: { A: "the main subject", B: "an adverbial phrase modifying the main clause", C: "a noun clause" },
    correctAnalysis: "B",
    explanation: "<em>Having finished her work</em> is a perfect participial phrase. It modifies the main clause <em>she went home early</em> by explaining what happened before.",
    note: "Listen for the participial phrase at the beginning of the sentence.",
  },
];
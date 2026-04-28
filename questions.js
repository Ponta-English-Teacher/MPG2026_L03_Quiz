// ============================================================
//  MPG2026 – L03 Question Bank
//  End-of-Class Quiz – Lesson 3
// ============================================================

const QUIZ_META = {
  courseID: "MPG2026",
  lessonID: "L03",
  quizID:   "MPG2026_L03",
  title:    "Modern Pronunciation and Grammar 2026",
  subtitle: "End-of-Class Quiz – Lesson 3",
};

const SECTIONS = [
  { name: "Sentence Pattern Identification", questions: [1,2,3,4,5,6,7,8] },
  { name: "Error Identification",            questions: [9,10,11,12,13] },
  { name: "Structure Awareness",             questions: [14,15,16,17,18,19] },
  { name: "Word Order",                      questions: [20,21,22,23,24] },
  { name: "Dictation",                       questions: [25,26,27,28] },
  { name: "Dictation + Analysis",            questions: [29,30] },
];

const COMMENT_BANDS = [
  { min: 27, max: 30, comment: "Excellent work. You have a strong understanding of sentence patterns and structure." },
  { min: 23, max: 26, comment: "Good job. You understand most key patterns. Keep refining your accuracy." },
  { min: 18, max: 22, comment: "Nice try. Review the SVOO vs SVOC distinction and sentence element identification." },
  { min: 13, max: 17, comment: "Keep working. Focus on how the equality test helps you identify SVOO and SVOC." },
  { min:  0, max: 12, comment: "Work harder next time. Review all five sentence patterns and the equality test carefully." },
];
const CLOSING_NOTE = "Understanding sentence patterns helps you read, write, and listen more accurately. Keep going.";

const QUESTIONS = [

  // ── Section 1: Sentence Pattern Identification ─────────────
  {
    id: 1, section: 1, type: "mc",
    stem: "What is the sentence pattern? <em>She slept.</em>",
    options: { A: "SVC", B: "SV", C: "SVO" },
    correct: "B",
    explanation: "Teacher's Insight: 'Slept' is complete alone — no object, no complement needed. The verb needs nothing after it. / 「slept」は単独で完結しています。目的語も補語も必要ありません。動詞の後に何も必要ない場合はSVです。",
  },
  {
    id: 2, section: 1, type: "mc",
    stem: "What is the sentence pattern? <em>He seems tired.</em>",
    options: { A: "SV", B: "SVO", C: "SVC" },
    correct: "C",
    explanation: "Teacher's Insight: 'Seem' is a linking verb. 'Tired' is an adjective complement describing the subject 'he'. He = tired. / 「seem」は連結動詞です。「tired」は主語「he」を説明する形容詞補語です。he = tired → SVCです。",
  },
  {
    id: 3, section: 1, type: "mc",
    stem: "What is the sentence pattern? <em>She gave him a gift.</em>",
    options: { A: "SVO", B: "SVOO", C: "SVOC" },
    correct: "B",
    explanation: "Teacher's Insight: Check the relationship between the two nouns. 'Him' does not become 'a gift' — he receives it. Two different things → SVOO. / 2つの名詞の関係を確認しましょう。「him」が「a gift」になるわけではなく、受け取る関係です。異なるものを指す場合はSVOOです。",
  },
  {
    id: 4, section: 1, type: "mc",
    stem: "What is the sentence pattern? <em>They found the room empty.</em>",
    options: { A: "SVOO", B: "SVO", C: "SVOC" },
    correct: "C",
    explanation: "Teacher's Insight: 'Empty' comes after the object 'the room' and describes its state. The room = empty → SVOC. / 「empty」は目的語「the room」の後に来て、その状態を説明しています。the room = empty → SVOCです。",
  },
  {
    id: 5, section: 1, type: "mc",
    stem: "What is the sentence pattern? <em>She made him a good teacher.</em>",
    options: { A: "SVOO", B: "SVOC", C: "SVO" },
    correct: "B",
    explanation: "Teacher's Insight: 'Him' and 'a good teacher' refer to the same person — she turned him into a good teacher. Equality test: him = a good teacher → YES → SVOC. / 「him」と「a good teacher」は同一人物を指しています。等号テスト：him = a good teacher → YES → SVOCです。",
  },
  {
    id: 6, section: 1, type: "mc",
    stem: "What is the sentence pattern? <em>She made him a sandwich.</em>",
    options: { A: "SVOC", B: "SVO", C: "SVOO" },
    correct: "C",
    explanation: "Teacher's Insight: 'Him' and 'a sandwich' are two different things — she made a sandwich for him. Equality test: him = a sandwich → NO → SVOO. / 「him」と「a sandwich」は異なるものです。彼のためにサンドイッチを作ったということです。等号テスト：him = a sandwich → NO → SVOOです。",
  },
  {
    id: 7, section: 1, type: "mc",
    stem: "What is the sentence pattern? <em>He called her a taxi.</em>",
    options: { A: "SVOC", B: "SVOO", C: "SVO" },
    correct: "B",
    explanation: "Teacher's Insight: 'Her' and 'a taxi' are two different things — he ordered a taxi for her. She is not the taxi. Equality test: her = a taxi → NO → SVOO. / 「her」と「a taxi」は異なるものです。彼女のためにタクシーを呼んだということです。等号テスト：her = a taxi → NO → SVOOです。",
  },
  {
    id: 8, section: 1, type: "mc",
    stem: "What is the sentence pattern? <em>He called her a liar.</em>",
    options: { A: "SVOO", B: "SVC", C: "SVOC" },
    correct: "C",
    explanation: "Teacher's Insight: 'Her' and 'a liar' refer to the same person — he is saying that she IS a liar. Equality test: her = a liar → YES → SVOC. / 「her」と「a liar」は同一人物を指しており、彼女が嘘つきだと言っています。等号テスト：her = a liar → YES → SVOCです。",
  },

  // ── Section 2: Error Identification ────────────────────────
  {
    id: 9, section: 2, type: "mc",
    stem: "Choose the underlined part that contains a grammatical error.<br><br>The research <u><b>(a) conducted</b></u> by the team of scientists <u><b>(b) have produced</b></u> results that <u><b>(c) challenge</b></u> the existing <u><b>(d) theories</b></u> on climate change.",
    options: { A: "(a) conducted", B: "(b) have produced", C: "(c) challenge", D: "(d) theories" },
    correct: "B",
    explanation: "Teacher's Insight: The subject is 'research' (singular), so the verb should be 'has produced' not 'have produced'. Pay attention to the head noun of the subject, not the nearest noun. / 主語は「research」（単数）なので、動詞は「have produced」ではなく「has produced」が正解です。近くにある名詞ではなく、主語の中心となる名詞に注目しましょう。文の意味：科学者チームによって行われた研究は、気候変動に関する既存の理論に異議を唱える結果を生み出した。",
  },
  {
    id: 10, section: 2, type: "mc",
    stem: "Choose the underlined part that contains a grammatical error.<br><br>She remained <u><b>(a) calmly</b></u> despite the <u><b>(b) mounting</b></u> pressure from <u><b>(c) her colleagues</b></u> and <u><b>(d) supervisors</b></u>.",
    options: { A: "(a) calmly", B: "(b) mounting", C: "(c) her colleagues", D: "(d) supervisors" },
    correct: "A",
    explanation: "Teacher's Insight: 'Remain' is a linking verb. After a linking verb, an adjective is needed, not an adverb. 'Calmly' should be 'calm'. / 「remain」は連結動詞です。連結動詞の後には副詞ではなく形容詞が必要です。「calmly」は「calm」でなければなりません。文の意味：彼女は同僚や上司からの高まるプレッシャーにもかかわらず、冷静を保った。",
  },
  {
    id: 11, section: 2, type: "mc",
    stem: "Choose the underlined part that contains a grammatical error.<br><br>The professor found <u><b>(a) the students' presentation</b></u> <u><b>(b) convinced</b></u> and <u><b>(c) well-organized</b></u>, <u><b>(d) praising</b></u> their research methods.",
    options: { A: "(a) the students' presentation", B: "(b) convinced", C: "(c) well-organized", D: "(d) praising" },
    correct: "B",
    explanation: "Teacher's Insight: 'Find + object + complement' (SVOC). The presentation is the source of conviction, not the receiver — so 'convincing' is needed, not 'convinced'. Compare: 'The students were convinced' where the students receive the feeling. / 「find＋目的語＋補語」（SVOC）の構文です。プレゼンが説得力の源なので「convincing」が必要です。文の意味：教授は学生のプレゼンテーションを説得力があり、よく整理されていると感じ、研究方法を称賛した。",
  },
  {
    id: 12, section: 2, type: "mc",
    stem: "Choose the underlined part that contains a grammatical error.<br><br>The noise from the construction site kept <u><b>(a) the residents</b></u> <u><b>(b) wakened</b></u> <u><b>(c) throughout</b></u> the <u><b>(d) entire</b></u> night.",
    options: { A: "(a) the residents", B: "(b) wakened", C: "(c) throughout", D: "(d) entire" },
    correct: "B",
    explanation: "Teacher's Insight: 'Keep + object + adjective' (SVOC). 'Wakened' is a past participle meaning 'was woken up' but here an adjective describing the residents' ongoing state is needed. The correct word is 'awake'. / 「keep＋目的語＋形容詞」（SVOC）の構文です。「wakened」は過去分詞ですが、ここでは住民の継続的な状態を表す形容詞が必要です。正しい語は「awake」です。文の意味：工事現場の騒音が住民を一晩中目覚めさせ続けた。",
  },
  {
    id: 13, section: 2, type: "mc",
    stem: "Choose the underlined part that contains a grammatical error, or choose (d) if there is no error.<br><br>The board <u><b>(a) unanimously</b></u> elected <u><b>(b) her</b></u> <u><b>(c) chairwoman</b></u> of the newly established international committee.",
    options: { A: "(a) unanimously", B: "(b) her", C: "(c) chairwoman", D: "(d) No error" },
    correct: "D",
    explanation: "Teacher's Insight: This sentence is correct. 'Elect + object + complement' (SVOC) — 'her' is the object and 'chairwoman' is the complement telling us what she became. / この文は正しいです。「elect＋目的語＋補語」（SVOC）の構文で、「her」が目的語、「chairwoman」が彼女が何になったかを示す補語です。文の意味：委員会は全会一致で彼女を新設された国際委員会の委員長に選出した。",
  },

  // ── Section 3: Structure Awareness ─────────────────────────
  {
    id: 14, section: 3, type: "mc",
    stem: "What is the sentence pattern? <em>I found an interesting book.</em>",
    options: { A: "SVOC", B: "SVC", C: "SVO" },
    correct: "C",
    explanation: "Teacher's Insight: 'An interesting book' is one noun phrase — the whole thing is the object. 'Interesting' is just an adjective inside the noun phrase, not a complement after the object. / 「an interesting book」はひとつの名詞句で、全体が目的語です。「interesting」は名詞句の中の形容詞であり、目的語の後の補語ではありません。SVOです。",
  },
  {
    id: 15, section: 3, type: "mc",
    stem: "What is the sentence pattern? <em>I found the book interesting.</em>",
    options: { A: "SVO", B: "SVOC", C: "SVOO" },
    correct: "B",
    explanation: "Teacher's Insight: 'Interesting' comes AFTER the object 'the book' and describes it. The book = interesting → SVOC. Compare Q14 — same words, different position, different pattern. / 「interesting」は目的語「the book」の後に来てそれを説明しています。the book = interesting → SVOC。Q14と比較しましょう。同じ単語でも位置が変わるとパターンが変わります。",
  },
  {
    id: 16, section: 3, type: "mc",
    stem: "In <em>I feel good</em>, what is <em>good</em>?",
    options: { A: "adverb modifying feel", B: "object of feel", C: "complement describing the subject" },
    correct: "C",
    explanation: "Teacher's Insight: 'Feel' is a linking verb. After linking verbs, always use an adjective, not an adverb. 'Good' describes the subject 'I'. Compare: 'She dances well' where 'well' is an adverb modifying an action verb. / 「feel」は連結動詞です。連結動詞の後には常に形容詞を使います。「good」は主語「I」を説明しています。「She dances well」では「well」が動作動詞を修飾する副詞です。",
  },
  {
    id: 17, section: 3, type: "mc",
    stem: "In <em>She kept him waiting</em>, what is <em>waiting</em>?",
    options: { A: "main verb", B: "object complement describing him", C: "adverb" },
    correct: "B",
    explanation: "Teacher's Insight: 'Keep + object + -ing' (SVOC). 'Waiting' describes the ongoing state of 'him' — he is the one waiting. The main verb is 'kept'. / 「keep＋目的語＋-ing」（SVOC）の構文です。「waiting」は「him」の継続的な状態を表しており、待っているのは彼です。主動詞は「kept」です。",
  },
  {
    id: 18, section: 3, type: "mc",
    stem: "In <em>To learn grammar is important</em>, what is <em>To learn grammar</em>?",
    options: { A: "object", B: "adverb", C: "subject" },
    correct: "C",
    explanation: "Teacher's Insight: An infinitive phrase can function as the subject of a sentence. 'To learn grammar' tells us what is important — it is the subject. Compare: 'It is important to learn grammar' where 'it' is a dummy subject. / 不定詞句は文の主語として機能することができます。「To learn grammar」は何が重要かを示しており、主語です。「It is important to learn grammar」では「it」が形式主語です。",
  },
  {
    id: 19, section: 3, type: "mc",
    stem: "In <em>The man standing by the door is my teacher</em>, what is <em>standing by the door</em>?",
    options: { A: "main verb of the sentence", B: "participial phrase modifying the man", C: "object of the sentence" },
    correct: "B",
    explanation: "Teacher's Insight: 'Standing by the door' is a participial phrase describing 'the man' — it tells us which man. The main verb of the sentence is 'is'. / 「standing by the door」は「the man」を修飾する分詞句で、どの男性かを示しています。文の主動詞は「is」です。",
  },

  // ── Section 4: Word Order ───────────────────────────────────
  {
    id: 20, section: 4, type: "dragdrop",
    instruction: "Arrange the words to make a correct sentence.",
    blocks: ["She", "gave", "him", "a beautiful gift"],
    correct: ["She", "gave", "him", "a beautiful gift"],
  },
  {
    id: 21, section: 4, type: "dragdrop",
    instruction: "Arrange the words to make a correct sentence.",
    blocks: ["The teacher", "made", "the students", "happy"],
    correct: ["The teacher", "made", "the students", "happy"],
  },
  {
    id: 22, section: 4, type: "dragdrop",
    instruction: "Arrange the words to make a correct sentence.",
    blocks: ["He", "found", "the exam", "really difficult"],
    correct: ["He", "found", "the exam", "really difficult"],
  },
  {
    id: 23, section: 4, type: "dragdrop",
    instruction: "Arrange the words to make a correct sentence.",
    blocks: ["They", "elected", "her", "the new president"],
    correct: ["They", "elected", "her", "the new president"],
  },
  {
    id: 24, section: 4, type: "dragdrop",
    instruction: "Arrange the words to make a correct sentence.",
    blocks: ["The coach", "kept", "the players", "running", "until dark"],
    correct: ["The coach", "kept", "the players", "running", "until dark"],
  },

  // ── Section 5: Dictation ────────────────────────────────────
  {
    id: 25, section: 5, type: "dictation",
    audio: "audio/q25.mp3",
    correct: "She gave him a beautiful gift",
    note: "SVOO pattern. Focus on connected speech — 'gave him a' links together smoothly.",
  },
  {
    id: 26, section: 5, type: "dictation",
    audio: "audio/q26.mp3",
    correct: "The teacher made the students happy",
    note: "SVOC pattern. Focus on weak syllables in 'the' and natural sentence rhythm.",
  },
  {
    id: 27, section: 5, type: "dictation",
    audio: "audio/q27.mp3",
    correct: "He found the exam really difficult",
    note: "SVOC pattern. Focus on /r/ in 'really' and the weak ending '-ly'.",
  },
  {
    id: 28, section: 5, type: "dictation",
    audio: "audio/q28.mp3",
    correct: "They elected her the new president",
    note: "SVOC with noun complement. Focus on /l/ in 'elected' and weak syllables.",
  },

  // ── Section 6: Dictation + Analysis ────────────────────────
  {
    id: 29, section: 6, type: "dictation_analysis",
    audio: "audio/q29.mp3",
    correct: "The coach kept the players running until dark",
    analysisQuestion: "What is <em>running</em> in this sentence?",
    options: { A: "main verb of the sentence", B: "object complement describing the players", C: "gerund functioning as subject" },
    correctAnalysis: "B",
    explanation: "Teacher's Insight: 'Keep + object + -ing' (SVOC). 'Running' describes the ongoing state of 'the players' — they are the ones running. The main verb is 'kept'. / 「keep＋目的語＋-ing」（SVOC）の構文です。「running」は「the players」の継続的な状態を表しており、走っているのは選手たちです。主動詞は「kept」です。文の意味：コーチは選手たちを暗くなるまで走らせ続けた。",
    note: "SVOC pattern. Focus on connected speech and the -ing ending.",
  },
  {
    id: 30, section: 6, type: "dictation_analysis",
    audio: "audio/q30.mp3",
    correct: "She found the lecture surprisingly interesting",
    analysisQuestion: "What is <em>surprisingly interesting</em> in this sentence?",
    options: { A: "adverb modifying the verb", B: "object complement describing the lecture", C: "subject complement" },
    correctAnalysis: "B",
    explanation: "Teacher's Insight: 'Find + object + complement' (SVOC). 'Surprisingly interesting' comes after the object 'the lecture' and describes it. The lecture = surprisingly interesting → SVOC. / 「find＋目的語＋補語」（SVOC）の構文です。「surprisingly interesting」は目的語「the lecture」の後に来てそれを説明しています。the lecture = surprisingly interesting → SVOCです。文の意味：彼女はその講義が驚くほど興味深いと感じた。",
    note: "SVOC pattern. Focus on the adverb 'surprisingly' modifying the adjective 'interesting'.",
  },
];
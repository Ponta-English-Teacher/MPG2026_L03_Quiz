# MPG2026 Orientation Quiz

A standalone, mobile-friendly web quiz for **Modern Pronunciation and Grammar 2026**.

---

## Folder Structure

```
grammar-orientation-quiz/
├── index.html        ← Main page (start, quiz, results)
├── style.css         ← All styling
├── script.js         ← Quiz logic (navigation, checking, submission)
├── questions.js      ← All 30 questions + metadata (edit here)
├── Code.gs           ← Google Apps Script backend
├── README.md         ← This file
└── audio/
    ├── q25.mp3       ← Dictation: "The student reads a book."
    ├── q26.mp3       ← Dictation: "She is very happy."
    ├── q27.mp3       ← Dictation: "They gave him a gift."
    ├── q28.mp3       ← Dictation: "She quickly finished her homework."
    ├── q29.mp3       ← Dictation: "The book sold in the store doesn't sell well."
    └── q30.mp3       ← Dictation: "The man standing by the door is my teacher."
```

---

## Audio Files

Place your `.mp3` files in the `audio/` folder.  
File names **must** match the paths defined in `questions.js` (`audio: "audio/q25.mp3"` etc.).

Record or generate audio for the six dictation sentences, then save them as:

| File | Sentence |
|------|----------|
| q25.mp3 | The student reads a book. |
| q26.mp3 | She is very happy. |
| q27.mp3 | They gave him a gift. |
| q28.mp3 | She quickly finished her homework. |
| q29.mp3 | The book sold in the store doesn't sell well. |
| q30.mp3 | The man standing by the door is my teacher. |

---

## How to Open Locally

1. Put all files in the same folder (including the `audio/` subfolder).
2. Open `index.html` in a modern browser.
3. For audio to work, serve via a local web server (browsers block audio on `file://`):
   ```bash
   # Python 3
   python3 -m http.server 8000
   # Then open: http://localhost:8000
   ```
   Or use VS Code's **Live Server** extension.

---

## Changing CourseID / LessonID / QuizID for Future Lessons

Open `questions.js` and edit the top block:

```js
const QUIZ_META = {
  courseID: "MPG2026",   // ← Change for a different course
  lessonID: "L02",       // ← Increment each lesson
  quizID:   "MPG2026_L02", // ← Match courseID_lessonID
  title:    "Modern Pronunciation and Grammar 2026",
  subtitle: "Listening & Grammar Quiz – Lesson 2",
};
```

The frontend, spreadsheet payload, and progress-save key all update automatically.

---

## How to Update Questions

All 30 questions live in the `QUESTIONS` array in `questions.js`.

### Multiple choice question

```js
{
  id: 1, section: 1, type: "mc",
  stem: "A word that names a person, place, thing, or idea is called a:",
  options: { A: "verb", B: "noun", C: "adverb" },
  correct: "B",
  explanation: "A noun names a person, place, thing, or idea.",
},
```

### Drag and drop question

```js
{
  id: 20, section: 4, type: "dragdrop",
  instruction: "Arrange the words to make a correct sentence.",
  blocks: ["The student", "reads", "a book"],
  correct: ["The student", "reads", "a book"],
},
```

### Dictation question

```js
{
  id: 25, section: 5, type: "dictation",
  audio: "audio/q25.mp3",
  correct: "The student reads a book",
  note: "This is a basic SVO sentence.",
},
```

### Dictation + analysis question

```js
{
  id: 29, section: 6, type: "dictation_analysis",
  audio: "audio/q29.mp3",
  correct: "The book sold in the store doesn't sell well",
  analysisQuestion: "What is <em>sold</em>?",
  options: { A: "main verb", B: "adjective modifying book", C: "noun" },
  correctAnalysis: "B",
  explanation: "<em>Sold in the store</em> describes <em>book</em>.",
  note: "Listen carefully to distinguish the two uses of sell/sold.",
},
```

To add a question: copy the matching template above, give it the next `id`, and add its `id` to the right section in the `SECTIONS` array at the top of `questions.js`.

To remove a question: delete its object from `QUESTIONS` and remove its `id` from `SECTIONS`.

---

## Google Apps Script Backend (Code.gs)

1. Open [script.google.com](https://script.google.com) and create a new project.
2. Paste the contents of `Code.gs`.
3. Deploy → **New deployment** → Type: **Web app**  
   - Execute as: **Me**  
   - Who has access: **Anyone**
4. Copy the deployment URL and paste it into `script.js` as `SCRIPT_URL`.
5. The first submission will automatically create a **Responses** sheet with headers.

---

## Score Grouping Reference

| Section | Questions | Max |
|---------|-----------|-----|
| Part of Speech by Function | Q1–Q8   | 8  |
| Function in a Sentence     | Q9–Q14  | 6  |
| Structure Awareness        | Q15–Q19 | 5  |
| Drag and Drop              | Q20–Q24 | 5  |
| Dictation                  | Q25–Q28 | 4  |
| Dictation + Analysis       | Q29–Q30 | 2  |
| **Total**                  |         | **30** |

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Audio does not play | Serve via HTTP, not `file://`. Check file names match `questions.js`. |
| Spreadsheet not saving | Check the GAS deployment URL in `script.js`. Redeploy GAS if needed. |
| Progress lost on refresh | Check browser allows localStorage (not private/incognito mode). |
| Drag and drop not working | Try click-to-move instead (click a token, then click the target zone). |

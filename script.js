/* ============================================================
   MPG2026 Quiz – script.js
   Vanilla JS, no dependencies.
   ============================================================ */

"use strict";

// ── Backend URL ────────────────────────────────────────────────
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzwYEyvjjSGGh--CH8xu-kp2cMC27k9YeulJS-mlsR03eNVa7E3PHrpyHJniJv8FuomMw/exec";

// ── State ──────────────────────────────────────────────────────
const state = {
  studentID: "",
  name:      "",
  current:   0,           // 0-based index
  answers:   {},          // { questionId: { value, checked, correct } }
  checked:   {},          // { questionId: true } — which questions have been checked
  dragState: {},          // { questionId: [ordered tokens] }
  attempt:   0,   // ← ADD THIS LINE
};

// ── DOM refs ───────────────────────────────────────────────────
const $ = id => document.getElementById(id);

// ── Screens ───────────────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));
  $(id).classList.remove("hidden");
}

// ── Normalise dictation answer ─────────────────────────────────
function normaliseDictation(str) {
  return str
    .toLowerCase()
    .replace(/[.,!?;:'"]/g, "")   // remove punctuation
    .replace(/\s+/g, " ")          // collapse spaces
    .trim();
}

// ── Strip HTML tags for plain text (feedback) ──────────────────
function stripHTML(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || "";
}

// ── Comment band lookup ────────────────────────────────────────
function getComment(score) {
  for (const band of COMMENT_BANDS) {
    if (score >= band.min && score <= band.max) return band.comment;
  }
  return COMMENT_BANDS[COMMENT_BANDS.length - 1].comment;
}

// ── Section for question id ───────────────────────────────────
function getSectionInfo(qId) {
  return SECTIONS.find(s => s.questions.includes(qId));
}

// ── Score calculation ─────────────────────────────────────────
function calcScore() {
  let total = 0;
  for (const q of QUESTIONS) {
    const ans = state.answers[q.id];
    if (ans && ans.correct) total++;
  }
  return total;
}

// ============================================================
//  QUESTION RENDERING
// ============================================================

function renderQuestion(index) {
  const q = QUESTIONS[index];
  const container = $("question-container");
  container.innerHTML = "";

  // ── Progress bar ──
  const pct = Math.round(((index + 1) / QUESTIONS.length) * 100);
  $("progress-fill").style.width = pct + "%";
  $("progress-text").textContent = `Question ${index + 1} of ${QUESTIONS.length}`;
  $("progress-pct").textContent  = pct + "%";

  // ── Section label ──
  const secInfo = getSectionInfo(q.id);
  const sectionEl = document.createElement("div");
  sectionEl.className = "section-label";
  sectionEl.textContent = secInfo ? secInfo.name.toUpperCase() : "";
  container.appendChild(sectionEl);

  // ── Question number ──
  const numEl = document.createElement("div");
  numEl.className = "question-number";
  numEl.textContent = `Q${q.id}`;
  container.appendChild(numEl);

  // ── Dispatch to type-specific renderer ──
  if (q.type === "mc")                renderMC(q, container);
  else if (q.type === "dragdrop")     renderDragDrop(q, container);
  else if (q.type === "dictation")    renderDictation(q, container);
  else if (q.type === "dictation_analysis") renderDictationAnalysis(q, container);

  // ── Nav buttons ──
  $("btn-back").disabled = (index === 0);
  $("btn-next").textContent =
    index === QUESTIONS.length - 1 ? "Finish Quiz" : "Next →";
}

// ── Multiple Choice ────────────────────────────────────────────
function renderMC(q, container) {
  const stem = document.createElement("div");
  stem.className = "question-stem";
  stem.innerHTML = q.stem;
  container.appendChild(stem);

  const list = document.createElement("div");
  list.className = "options-list";

  const saved    = state.answers[q.id];
  const isChecked = state.checked[q.id];

  for (const [key, label] of Object.entries(q.options)) {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.dataset.key = key;
    btn.innerHTML = `<span class="option-key">${key}</span> ${label}`;

    if (saved && saved.value === key) btn.classList.add("selected");
    if (isChecked) {
      btn.disabled = true;
      if (key === q.correct) btn.classList.add("correct-ans");
      else if (saved && saved.value === key && key !== q.correct)
        btn.classList.add("wrong-ans");
    } else {
      btn.addEventListener("click", () => {
        list.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        state.answers[q.id] = { value: key, checked: false, correct: false };
        saveProgress();
      });
    }
    list.appendChild(btn);
  }
  container.appendChild(list);

  // Check button
  if (!isChecked) {
    const checkRow = document.createElement("div");
    checkRow.className = "check-btn-row";
    const checkBtn = document.createElement("button");
    checkBtn.className = "btn btn-accent";
    checkBtn.textContent = "Check";
    checkBtn.addEventListener("click", () => checkMC(q, container, list));
    checkRow.appendChild(checkBtn);
    container.appendChild(checkRow);
  }

  // Feedback (restore if already checked)
  const fb = document.createElement("div");
  fb.className = "feedback-box";
  fb.id        = `fb-${q.id}`;
  container.appendChild(fb);

  if (isChecked && saved) {
    showMCFeedback(q, fb, saved.value);
  }
}

function checkMC(q, container, list) {
  const selected = list.querySelector(".option-btn.selected");
  if (!selected) { alert("Please select an answer first."); return; }

  const chosen  = selected.dataset.key;
  const isRight = chosen === q.correct;

  state.answers[q.id] = { value: chosen, checked: true, correct: isRight };
  state.checked[q.id] = true;
  saveProgress();

  // Disable all, colour them
  list.querySelectorAll(".option-btn").forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.key === q.correct) btn.classList.add("correct-ans");
    else if (btn.dataset.key === chosen) btn.classList.add("wrong-ans");
  });

  // Remove check button
  container.querySelector(".check-btn-row")?.remove();

  const fb = $(`fb-${q.id}`);
  showMCFeedback(q, fb, chosen);
}

function showMCFeedback(q, fb, chosen) {
  const isRight = chosen === q.correct;
  fb.classList.add("visible", isRight ? "correct" : "incorrect");
  fb.innerHTML = `
    <div class="feedback-verdict">${isRight ? "✓ Correct" : "✗ Incorrect"}</div>
    <div class="feedback-detail">
      Correct answer: <strong>${q.correct}. ${q.options[q.correct]}</strong><br>
      ${q.explanation}
    </div>`;
}

// ── Drag and Drop ─────────────────────────────────────────────
function renderDragDrop(q, container) {
  const stem = document.createElement("div");
  stem.className = "question-stem";
  stem.textContent = q.instruction;
  container.appendChild(stem);

  const hint = document.createElement("div");
  hint.className = "drag-instruction";
  hint.textContent = "Drag the blocks into the correct order.";
  container.appendChild(hint);

  const isChecked = state.checked[q.id];
  const savedOrder = state.dragState[q.id];

  // Current arrangement and pool state
  let arranged, pool;
  if (savedOrder) {
    arranged = [...savedOrder];
    pool = [];
  } else {
    arranged = [];
    // Shuffle pool
    pool = [...q.blocks].sort(() => Math.random() - 0.5);
  }

  // Answer zone
  const ansLabel = document.createElement("div");
  ansLabel.className = "drag-zone-label";
  ansLabel.textContent = "Your sentence";
  container.appendChild(ansLabel);

  const ansZone = document.createElement("div");
  ansZone.className = "drag-answer-zone";
  ansZone.id = `ans-zone-${q.id}`;
  container.appendChild(ansZone);

  // Pool zone
  const poolLabel = document.createElement("div");
  poolLabel.className = "drag-zone-label";
  poolLabel.textContent = "Word blocks";
  container.appendChild(poolLabel);

  const poolZone = document.createElement("div");
  poolZone.className = "drag-pool-zone";
  poolZone.id = `pool-zone-${q.id}`;
  container.appendChild(poolZone);

  function makeToken(text, inAnswer) {
    const token = document.createElement("span");
    token.className = "drag-token";
    token.textContent = text;
    token.draggable = !isChecked;
    token.dataset.text = text;

    if (!isChecked) {
      // Click to move between zones
      token.addEventListener("click", () => {
        if (inAnswer) {
          poolZone.appendChild(token);
          inAnswer = false;
        } else {
          ansZone.appendChild(token);
          inAnswer = true;
        }
        persistDragState(q.id, ansZone);
      });

      // Drag events
      token.addEventListener("dragstart", e => {
        token.classList.add("dragging");
        e.dataTransfer.setData("text/plain", text);
        e.dataTransfer.setData("source", inAnswer ? "answer" : "pool");
      });
      token.addEventListener("dragend", () => {
        token.classList.remove("dragging");
        persistDragState(q.id, ansZone);
      });
    } else {
      token.classList.add("locked");
    }
    return token;
  }

  // Populate zones
  if (savedOrder && savedOrder.length) {
    savedOrder.forEach(text => ansZone.appendChild(makeToken(text, true)));
    // pool has whatever's NOT in ansZone
    pool.forEach(text => poolZone.appendChild(makeToken(text, false)));
  } else {
    pool.forEach(text => poolZone.appendChild(makeToken(text, false)));
  }

  // Drop zone listeners
  [ansZone, poolZone].forEach(zone => {
    zone.addEventListener("dragover", e => {
      e.preventDefault();
      zone.classList.add("drag-over");
    });
    zone.addEventListener("dragleave", () => zone.classList.remove("drag-over"));
    zone.addEventListener("drop", e => {
      e.preventDefault();
      zone.classList.remove("drag-over");
      const text   = e.dataTransfer.getData("text/plain");
      const source = e.dataTransfer.getData("source");
      const destIsAnswer = zone.id === `ans-zone-${q.id}`;

      // Find the token in its current home and move it
      const allTokens = document.querySelectorAll(`[data-text="${CSS.escape(text)}"]`);
      for (const tok of allTokens) {
        zone.appendChild(tok);
        break;
      }
      persistDragState(q.id, ansZone);
    });
  });

  // Check button
  if (!isChecked) {
    const checkRow = document.createElement("div");
    checkRow.className = "check-btn-row";
    const checkBtn = document.createElement("button");
    checkBtn.className = "btn btn-accent";
    checkBtn.textContent = "Check";
    checkBtn.addEventListener("click", () => checkDragDrop(q, container, ansZone));
    checkRow.appendChild(checkBtn);
    container.appendChild(checkRow);
  }

  // Feedback restore
  const fb = document.createElement("div");
  fb.className = "feedback-box";
  fb.id        = `fb-${q.id}`;
  container.appendChild(fb);

  if (isChecked) {
    const ans = state.answers[q.id];
    showDragFeedback(q, fb, ans ? ans.correct : false, ans ? ans.value : []);
  }
}

function persistDragState(qId, ansZone) {
  const tokens = [...ansZone.querySelectorAll(".drag-token")].map(t => t.dataset.text);
  state.dragState[qId] = tokens;
  // Mark as not-checked (in case they keep editing)
  if (!state.checked[qId]) saveProgress();
}

function checkDragDrop(q, container, ansZone) {
  const arranged = [...ansZone.querySelectorAll(".drag-token")].map(t => t.dataset.text);
  if (arranged.length === 0) { alert("Please arrange at least one block first."); return; }

  const isRight = JSON.stringify(arranged) === JSON.stringify(q.correct);
  state.answers[q.id]  = { value: arranged, checked: true, correct: isRight };
  state.checked[q.id]  = true;
  state.dragState[q.id] = arranged;
  saveProgress();

  // Lock all tokens
  container.querySelectorAll(".drag-token").forEach(t => {
    t.draggable  = false;
    t.classList.add("locked");
    t.style.cursor = "default";
  });

  container.querySelector(".check-btn-row")?.remove();

  const fb = $(`fb-${q.id}`);
  showDragFeedback(q, fb, isRight, arranged);
}

function showDragFeedback(q, fb, isRight, arranged) {
  fb.classList.add("visible", isRight ? "correct" : "incorrect");
  const correctStr = q.correct.join(" ");
  const givenStr   = Array.isArray(arranged) ? arranged.join(" ") : arranged;
  fb.innerHTML = `
    <div class="feedback-verdict">${isRight ? "✓ Correct" : "✗ Incorrect"}</div>
    <div class="feedback-detail">
      ${!isRight ? `Correct order: <strong>${correctStr}</strong>` : ""}
    </div>`;
}

// ── Dictation ─────────────────────────────────────────────────
function renderDictation(q, container) {
  const stem = document.createElement("div");
  stem.className = "question-stem";
  stem.textContent = "Listen and write the sentence you hear.";
  container.appendChild(stem);

  // Audio row
  const audioRow = document.createElement("div");
  audioRow.className = "audio-player-row";

  const playBtn = document.createElement("button");
  playBtn.className = "audio-play-btn";
  playBtn.innerHTML = "▶ Play Audio";

  const audio = new Audio(q.audio);
  playBtn.addEventListener("click", () => { audio.currentTime = 0; audio.play(); });

  const hint = document.createElement("span");
  hint.className = "audio-hint";
  hint.textContent = "You may replay as many times as you like.";

  audioRow.appendChild(playBtn);
  audioRow.appendChild(hint);
  container.appendChild(audioRow);

  // Text input
  const input = document.createElement("textarea");
  input.className    = "dictation-input";
  input.placeholder  = "Type what you hear…";
  input.rows         = 2;
  const saved        = state.answers[q.id];
  const isChecked    = state.checked[q.id];
  if (saved) input.value = saved.value || "";
  if (isChecked) input.disabled = true;
  container.appendChild(input);

  input.addEventListener("input", () => {
    state.answers[q.id] = { value: input.value, checked: false, correct: false };
    saveProgress();
  });

  // Check button
  if (!isChecked) {
    const checkRow = document.createElement("div");
    checkRow.className = "check-btn-row";
    const checkBtn = document.createElement("button");
    checkBtn.className = "btn btn-accent";
    checkBtn.textContent = "Check";
    checkBtn.addEventListener("click", () => checkDictation(q, container, input));
    checkRow.appendChild(checkBtn);
    container.appendChild(checkRow);
  }

  const fb = document.createElement("div");
  fb.className = "feedback-box";
  fb.id        = `fb-${q.id}`;
  container.appendChild(fb);

  if (isChecked && saved) showDictationFeedback(q, fb, saved.value);
}

function checkDictation(q, container, input) {
  const typed = input.value.trim();
  if (!typed) { alert("Please write the sentence first."); return; }

  const isRight = normaliseDictation(typed) === normaliseDictation(q.correct);
  state.answers[q.id] = { value: typed, checked: true, correct: isRight };
  state.checked[q.id] = true;
  saveProgress();

  input.disabled = true;
  container.querySelector(".check-btn-row")?.remove();

  const fb = $(`fb-${q.id}`);
  showDictationFeedback(q, fb, typed);
}

function showDictationFeedback(q, fb, typed) {
  const isRight = normaliseDictation(typed) === normaliseDictation(q.correct);
  fb.classList.add("visible", isRight ? "correct" : "incorrect");
  fb.innerHTML = `
    <div class="feedback-verdict">${isRight ? "✓ Correct" : "✗ Incorrect"}</div>
    <div class="feedback-detail">
      <strong>Your answer:</strong> ${typed}<br>
      <strong>Correct sentence:</strong> ${q.correct}<br>
      <em>${q.note}</em>
    </div>`;
}

// ── Dictation + Analysis ──────────────────────────────────────
function renderDictationAnalysis(q, container) {
  // Dictation part
  const stem = document.createElement("div");
  stem.className = "question-stem";
  stem.textContent = "Listen and write the sentence you hear.";
  container.appendChild(stem);

  const audioRow = document.createElement("div");
  audioRow.className = "audio-player-row";
  const playBtn = document.createElement("button");
  playBtn.className = "audio-play-btn";
  playBtn.innerHTML = "▶ Play Audio";
  const audio = new Audio(q.audio);
  playBtn.addEventListener("click", () => { audio.currentTime = 0; audio.play(); });
  const hint = document.createElement("span");
  hint.className = "audio-hint";
  hint.textContent = "You may replay as many times as you like.";
  audioRow.appendChild(playBtn);
  audioRow.appendChild(hint);
  container.appendChild(audioRow);

  const input = document.createElement("textarea");
  input.className   = "dictation-input";
  input.placeholder = "Type what you hear…";
  input.rows        = 2;
  const saved       = state.answers[q.id];
  const isChecked   = state.checked[q.id];
  if (saved) input.value = saved.dictValue || "";
  if (isChecked) input.disabled = true;
  container.appendChild(input);

  input.addEventListener("input", () => {
    const existing = state.answers[q.id] || {};
    state.answers[q.id] = { ...existing, dictValue: input.value, checked: false, correct: false };
    saveProgress();
  });

  // Separator
  const sep = document.createElement("hr");
  sep.className = "analysis-separator";
  container.appendChild(sep);

  // Analysis sub-question
  const analysisLabel = document.createElement("div");
  analysisLabel.className = "analysis-label";
  analysisLabel.textContent = "Analysis question";
  container.appendChild(analysisLabel);

  const aStem = document.createElement("div");
  aStem.className = "question-stem";
  aStem.innerHTML = q.analysisQuestion;
  aStem.style.fontSize = "1rem";
  container.appendChild(aStem);

  const list = document.createElement("div");
  list.className = "options-list";

  for (const [key, label] of Object.entries(q.options)) {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.dataset.key = key;
    btn.innerHTML = `<span class="option-key">${key}</span> ${label}`;

    if (saved && saved.analysisValue === key) btn.classList.add("selected");
    if (isChecked) {
      btn.disabled = true;
      if (key === q.correctAnalysis) btn.classList.add("correct-ans");
      else if (saved && saved.analysisValue === key && key !== q.correctAnalysis)
        btn.classList.add("wrong-ans");
    } else {
      btn.addEventListener("click", () => {
        list.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        const existing = state.answers[q.id] || {};
        state.answers[q.id] = { ...existing, analysisValue: key };
        saveProgress();
      });
    }
    list.appendChild(btn);
  }
  container.appendChild(list);

  // Check button
  if (!isChecked) {
    const checkRow = document.createElement("div");
    checkRow.className = "check-btn-row";
    const checkBtn = document.createElement("button");
    checkBtn.className = "btn btn-accent";
    checkBtn.textContent = "Check";
    checkBtn.addEventListener("click", () => checkDictationAnalysis(q, container, input, list));
    checkRow.appendChild(checkBtn);
    container.appendChild(checkRow);
  }

  const fb = document.createElement("div");
  fb.className = "feedback-box";
  fb.id        = `fb-${q.id}`;
  container.appendChild(fb);

  if (isChecked && saved) showDictationAnalysisFeedback(q, fb, saved.dictValue, saved.analysisValue);
}

function checkDictationAnalysis(q, container, input, list) {
  const typed    = input.value.trim();
  const selBtn   = list.querySelector(".option-btn.selected");
  if (!typed) { alert("Please write the sentence first."); return; }
  if (!selBtn)  { alert("Please select an analysis answer."); return; }

  const aChosen  = selBtn.dataset.key;
  const dictOK   = normaliseDictation(typed) === normaliseDictation(q.correct);
  const analysOK = aChosen === q.correctAnalysis;
  const isRight  = dictOK && analysOK;

  state.answers[q.id] = {
    dictValue: typed, analysisValue: aChosen,
    checked: true, correct: isRight, dictOK, analysOK
  };
  state.checked[q.id] = true;
  saveProgress();

  input.disabled = true;
  list.querySelectorAll(".option-btn").forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.key === q.correctAnalysis) btn.classList.add("correct-ans");
    else if (btn.dataset.key === aChosen) btn.classList.add("wrong-ans");
  });
  container.querySelector(".check-btn-row")?.remove();

  const fb = $(`fb-${q.id}`);
  showDictationAnalysisFeedback(q, fb, typed, aChosen);
}

function showDictationAnalysisFeedback(q, fb, dictTyped, aChosen) {
  const dictOK  = normaliseDictation(dictTyped) === normaliseDictation(q.correct);
  const analysOK = aChosen === q.correctAnalysis;
  const isRight  = dictOK && analysOK;

  fb.classList.add("visible", isRight ? "correct" : "incorrect");
  fb.innerHTML = `
    <div class="feedback-verdict">${isRight ? "✓ Correct" : "✗ Incorrect"}</div>
    <div class="feedback-detail">
      <strong>Your sentence:</strong> ${dictTyped || "(none)"}<br>
      <strong>Correct sentence:</strong> ${q.correct}<br>
      <strong>Correct analysis:</strong> ${q.correctAnalysis}. ${q.options[q.correctAnalysis]}<br>
      <em>${q.explanation}</em>
    </div>`;
}

// ============================================================
//  NAVIGATION
// ============================================================

function goTo(index) {
  if (index < 0 || index >= QUESTIONS.length) return;
  state.current = index;
  saveProgress();
  renderQuestion(index);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ── Finish Quiz ───────────────────────────────────────────────
function finishQuiz() {
  const score   = calcScore();
  const total   = QUESTIONS.length;
  const pct     = Math.round((score / total) * 100);
  const comment = getComment(score);

  renderResultScreen(score, total, pct, comment);
  showScreen("result-screen");
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Send to spreadsheet
  submitToSpreadsheet(score, pct, comment);
  
  state.attempt = (state.attempt || 0) + 1;
}

// ============================================================
//  RESULT SCREEN
// ============================================================

function renderResultScreen(score, total, pct, comment) {
  const rs = $("result-screen");
  rs.innerHTML = `
    <div class="card">
      <div class="result-header">
        <h2>Quiz Results</h2>
        <div class="student-info">${state.name} &nbsp;|&nbsp; ID: ${state.studentID}</div>
        <div class="student-info" style="margin-top:4px;font-size:0.82rem;color:var(--color-muted)">
          ${QUIZ_META.quizID}
        </div>
      </div>

      <div class="score-display">
        <div class="score-circle">
          <span class="score-number">${score}</span>
          <span class="score-total">out of ${total}</span>
        </div>
        <div class="score-percent">${pct}%</div>
      </div>

      <div class="comment-box">
        <div>${comment}</div>
        <div class="closing-note">${CLOSING_NOTE}</div>
      </div>

      ${renderBreakdown()}
      ${renderReview()}

      <div id="submit-msg" class="submit-msg pending">⏳ Saving to spreadsheet…</div>

      <div class="text-center mt-20">
        <button class="btn btn-secondary" onclick="restartQuiz()">Retake Quiz</button>
      </div>
    </div>`;
}

function renderBreakdown() {
  let html = `<div class="breakdown-title">Section Breakdown</div>
    <table class="breakdown-table">
      <thead><tr><th>Section</th><th>Score</th><th>%</th></tr></thead>
      <tbody>`;

  for (const sec of SECTIONS) {
    let secScore = 0;
    const secTotal = sec.questions.length;
    for (const qId of sec.questions) {
      const ans = state.answers[qId];
      if (ans && ans.correct) secScore++;
    }
    const secPct = Math.round((secScore / secTotal) * 100);
    html += `<tr>
      <td>${sec.name}</td>
      <td>${secScore} / ${secTotal}</td>
      <td>${secPct}%</td>
    </tr>`;
  }
  html += `</tbody></table>`;
  return html;
}

function renderReview() {
  const wrong = QUESTIONS.filter(q => {
    const ans = state.answers[q.id];
    return !ans || !ans.correct;
  });

  if (wrong.length === 0) return `<div class="review-title" style="color:var(--color-success)">✓ Perfect score! All answers correct.</div>`;

  let html = `<div class="review-title">Review: Questions to revisit</div>`;
  for (const q of wrong) {
    const ans = state.answers[q.id];
    html += `<div class="review-item">
      <div class="review-q-num">Question ${q.id} – ${getSectionInfo(q.id)?.name || ""}</div>`;

    if (q.type === "mc") {
      html += `<div class="review-stem">${q.stem}</div>
        <div class="review-row"><span class="review-label">Your answer:</span>
          <span class="given">${ans?.value ? `${ans.value}. ${q.options[ans.value]}` : "(not answered)"}</span></div>
        <div class="review-row"><span class="review-label">Correct:</span>
          <span class="correct">${q.correct}. ${q.options[q.correct]}</span></div>
        <div class="review-row"><span class="review-label">Note:</span>
          <span>${q.explanation}</span></div>`;
    } else if (q.type === "dragdrop") {
      html += `<div class="review-stem">${q.instruction}</div>
        <div class="review-row"><span class="review-label">Your order:</span>
          <span class="given">${Array.isArray(ans?.value) ? ans.value.join(" ") : "(not answered)"}</span></div>
        <div class="review-row"><span class="review-label">Correct:</span>
          <span class="correct">${q.correct.join(" ")}</span></div>`;
    } else if (q.type === "dictation") {
      html += `<div class="review-stem">Dictation</div>
        <div class="review-row"><span class="review-label">Your answer:</span>
          <span class="given">${ans?.value || "(not answered)"}</span></div>
        <div class="review-row"><span class="review-label">Correct:</span>
          <span class="correct">${q.correct}</span></div>
        <div class="review-row"><span class="review-label">Note:</span>
          <span>${q.note}</span></div>`;
    } else if (q.type === "dictation_analysis") {
      html += `<div class="review-stem">Dictation + Analysis</div>
        <div class="review-row"><span class="review-label">Your sentence:</span>
          <span class="given">${ans?.dictValue || "(not answered)"}</span></div>
        <div class="review-row"><span class="review-label">Correct:</span>
          <span class="correct">${q.correct}</span></div>
        <div class="review-row"><span class="review-label">Analysis:</span>
          <span class="correct">${q.correctAnalysis}. ${q.options[q.correctAnalysis]}</span></div>
        <div class="review-row"><span class="review-label">Note:</span>
          <span>${stripHTML(q.explanation)}</span></div>`;
    }
    html += `</div>`;
  }
  return html;
}

// ============================================================
//  SPREADSHEET SUBMISSION
// ============================================================

function buildPayload(score, pct, comment) {
  const payload = {
    Timestamp:  new Date().toISOString(),
    CourseID:   QUIZ_META.courseID,
    LessonID:   QUIZ_META.lessonID,
    QuizID:     QUIZ_META.quizID,
    StudentID:  state.studentID,
    Name:       state.name,
    Attempt: (state.attempt || 0) + 1,
    Score:      score,
    Percentage: pct + "%",
    Comment:    comment,
  };

  for (const q of QUESTIONS) {
    const ans    = state.answers[q.id];
    const colKey = `Q${q.id}`;
    if (!ans) { payload[colKey] = ""; continue; }

    if (q.type === "mc") {
      payload[colKey] = ans.value || "";
    } else if (q.type === "dragdrop") {
      payload[colKey] = ans.correct ? "correct" : "incorrect";
    } else if (q.type === "dictation") {
      payload[colKey] = ans.value || "";
    } else if (q.type === "dictation_analysis") {
      payload[colKey] = `${ans.dictValue || ""} | analysis: ${ans.analysisValue || ""}`;
    }
  }
  return payload;
}

async function submitToSpreadsheet(score, pct, comment) {
  const payload = buildPayload(score, pct, comment);

  try {
await fetch(SCRIPT_URL, {
  method: "POST",
  mode: "no-cors",
  headers: {
    "Content-Type": "text/plain;charset=utf-8"
  },
  body: JSON.stringify(payload)
});


  const msgEl = $("submit-msg");
if (msgEl) {
  msgEl.className = "submit-msg success";
  msgEl.textContent = "✓ Result saved to spreadsheet.";
}
} catch (err) {
  console.error("Submission error:", err);
  const msgEl = $("submit-msg");
  if (msgEl) {
    msgEl.className = "submit-msg failure";
    msgEl.textContent =
      "⚠ Result shown, but saving to spreadsheet may have failed. Please check the spreadsheet.";
  }
}
}
// ============================================================
//  PERSISTENCE (localStorage)
// ============================================================

const LS_KEY = `quiz_progress_${QUIZ_META.quizID}`;

function saveProgress() {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify({
      studentID: state.studentID,
      name:      state.name,
      current:   state.current,
      answers:   state.answers,
      checked:   state.checked,
      dragState: state.dragState,
    }));
  } catch (e) { /* storage may be full */ }
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) { return null; }
}

function saveStudentInfo(id, name) {
  try {
    localStorage.setItem("mpg_student_id",   id);
    localStorage.setItem("mpg_student_name", name);
  } catch (e) {}
}

function loadStudentInfo() {
  return {
    id:   localStorage.getItem("mpg_student_id")   || "",
    name: localStorage.getItem("mpg_student_name") || "",
  };
}

// ============================================================
//  RESTART / RESET
// ============================================================

function restartQuiz() {
  if (!confirm("Restart the quiz? Your progress will be cleared.")) return;
  localStorage.removeItem(LS_KEY);
  state.answers  = {};
  state.checked  = {};
  state.dragState = {};
  state.current  = 0;
  showScreen("start-screen");
}

// ============================================================
//  INITIALISATION
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // ── Header ──
  $("header-course-code").textContent = QUIZ_META.courseID;
  $("header-quiz-title").textContent  = QUIZ_META.subtitle;

  // ── Start Screen ──
  $("quiz-title").textContent    = QUIZ_META.title;
  $("quiz-subtitle").textContent = QUIZ_META.subtitle;

  // Pre-fill student info from localStorage
  const info = loadStudentInfo();
  $("input-student-id").value = info.id;
  $("input-name").value       = info.name;

  // Start button
  $("btn-start").addEventListener("click", () => {
    const id   = $("input-student-id").value.trim();
    const name = $("input-name").value.trim();

    if (!id)   { $("input-student-id").focus(); alert("Please enter your Student ID."); return; }
    if (!name) { $("input-name").focus();       alert("Please enter your name.");       return; }

    state.studentID = id;
    state.name      = name;
    saveStudentInfo(id, name);

    // Restore saved progress (same student)
    const saved = loadProgress();
    if (saved && saved.studentID === id) {
      state.answers   = saved.answers   || {};
      state.checked   = saved.checked   || {};
      state.dragState = saved.dragState || {};
      state.current   = saved.current   || 0;
    } else {
      state.answers   = {};
      state.checked   = {};
      state.dragState = {};
      state.current   = 0;
    }

    showScreen("quiz-screen");
    renderQuestion(state.current);
  });

  // ── Navigation buttons ──
  $("btn-back").addEventListener("click", () => {
    if (state.current > 0) goTo(state.current - 1);
  });

  $("btn-next").addEventListener("click", () => {
    if (state.current < QUESTIONS.length - 1) {
      goTo(state.current + 1);
    } else {
      finishQuiz();
    }
  });
});

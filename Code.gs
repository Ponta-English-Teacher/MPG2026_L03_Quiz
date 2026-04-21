// ============================================================
//  Code.gs – MPG2026 Quiz Backend
//  Google Apps Script Web App
//
//  Deploy as:
//    Execute as: Me
//    Who has access: Anyone
//
//  The spreadsheet must have a sheet named "Responses".
//  Column headers will be written automatically on first use.
// ============================================================

const SHEET_NAME = "Responses";

// Expected column order (must match frontend payload keys)
const COLUMNS = [
  "Timestamp", "CourseID", "LessonID", "QuizID",
  "StudentID", "Name",
  "Q1","Q2","Q3","Q4","Q5","Q6","Q7","Q8","Q9","Q10",
  "Q11","Q12","Q13","Q14","Q15","Q16","Q17","Q18","Q19","Q20",
  "Q21","Q22","Q23","Q24","Q25","Q26","Q27","Q28","Q29","Q30",
  "Score", "Percentage", "Comment"
];

// ── Entry point ────────────────────────────────────────────────
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000); // wait up to 10 s for exclusive access

  try {
    const body = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet();

    ensureHeaders(sheet);
    appendRow(sheet, body);

    return jsonResponse({ result: "success" });
  } catch (err) {
    return jsonResponse({ result: "error", error: err.message });
  } finally {
    lock.releaseLock();
  }
}

// Allow simple GET ping for debugging
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", message: "MPG2026 Quiz backend is live." }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── Helpers ────────────────────────────────────────────────────
function getOrCreateSheet() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  let sheet   = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  return sheet;
}

function ensureHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS);
    sheet.getRange(1, 1, 1, COLUMNS.length)
      .setFontWeight("bold")
      .setBackground("#2c4a6e")
      .setFontColor("#ffffff");
    sheet.setFrozenRows(1);
  }
}

function appendRow(sheet, data) {
  const row = COLUMNS.map(col => {
    const val = data[col];
    return val !== undefined && val !== null ? val : "";
  });
  sheet.appendRow(row);
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

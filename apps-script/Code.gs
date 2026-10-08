/**
 * Recebe as confirmações do convite e grava uma linha por resposta
 * na aba "Confirmações" da planilha a que este script está ligado.
 */
const SHEET_NAME = 'Confirmações';
const HEADER = ['Data/hora', 'Nome', 'Vai?', 'Pessoas', 'Acompanhantes', 'WhatsApp', 'Recado'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getSheet_();
    const p = (e && e.parameter) || {};
    const vai = p.presenca === 'sim';
    const pessoas = vai ? Math.min(Math.max(parseInt(p.pessoas, 10) || 1, 1), 5) : 0;
    sheet.appendRow([
      new Date(),
      clean_(p.nome, 120),
      vai ? 'Sim' : 'Não',
      pessoas,
      vai ? clean_(p.acompanhantes, 1000) : '',
      clean_(p.whatsapp, 30),
      clean_(p.recado, 600),
    ]);
    return json_({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json_({ ok: true, info: 'Convite Claudete 50: use POST para confirmar.' });
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADER);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADER.length).setFontWeight('bold');
  }
  return sheet;
}

// Corta o tamanho e impede que um texto começando com = + - @ vire fórmula.
function clean_(value, max) {
  const s = String(value || '').trim().slice(0, max);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

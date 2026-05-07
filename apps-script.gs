/**
 * COMO REIMPLANTAR após alterar este arquivo:
 *
 * 1. No Apps Script: Implantar → Gerenciar implantações
 * 2. Clique no lápis (editar) na implantação existente
 * 3. Em "Versão" escolha "Nova versão"
 * 4. Salve — a URL permanece a mesma, não precisa alterar o index.html.
 */

var SPREADSHEET_ID = '1czjNI9uKTfIsRzO3PBwR_2VyBWfdsRuIZ3PFFrWEkCE';

var CABECALHOS = [
  'Data/Hora',
  'Nome',
  'E-mail',
  'Telefone/WhatsApp',
  'Município/UF',
  'Escola',
  'Rede de Ensino',
  'Função/Cargo',
  'Nível de Ensino',
  'Familiaridade SAEB (1–5)',
  'Expectativas'
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp
      .openById(SPREADSHEET_ID)
      .getActiveSheet();

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(CABECALHOS);
      sheet.getRange(1, 1, 1, CABECALHOS.length)
        .setFontWeight('bold')
        .setBackground('#1a2a50')
        .setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    }

    /* Dados chegam como FormData — lidos via e.parameter */
    var d = e.parameter;

    sheet.appendRow([
      new Date().toLocaleString('pt-BR', { timeZone: 'America/Recife' }),
      d.nome          || '',
      d.email         || '',
      d.telefone      || '',
      d.municipio     || '',
      d.escola        || '',
      d.rede          || '',
      d.cargo         || '',
      d.nivel         || '',
      d.familiaridade || '',
      d.expectativas  || ''
    ]);

    lock.releaseLock();

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    lock.releaseLock();
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', msg: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
        <a href="oficina.html" class="btn-primary" style="margin-top:24px;font-size:1rem;padding:13px 32px">        <a href="oficina.html" class="btn-primary" style="margin-top:24px;font-size:1rem;padding:13px 32px">
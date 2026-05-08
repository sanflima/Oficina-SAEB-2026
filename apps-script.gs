/**
 * COMO REIMPLANTAR após alterar este arquivo:
 *
 * 1. No Apps Script: Implantar → Gerenciar implantações
 * 2. Clique no lápis (editar) na implantação existente
 * 3. Em "Versão" escolha "Nova versão"
 * 4. Salve — a URL permanece a mesma, não precisa alterar o HTML.
 */

var SPREADSHEET_ID = '1czjNI9uKTfIsRzO3PBwR_2VyBWfdsRuIZ3PFFrWEkCE';
var EMAIL_DESTINO  = 'sanflima12@gmail.com';

/* ── Função de teste — execute uma vez no editor para autorizar o Gmail ── */
function testarEmail() {
  MailApp.sendEmail({
    to:       EMAIL_DESTINO,
    subject:  '✅ Teste — Oficina SAEB funcionando',
    htmlBody: '<h2>Teste de e-mail</h2><p>Se chegou aqui, o envio automático está funcionando!</p>'
  });
  Logger.log('E-mail enviado para ' + EMAIL_DESTINO);
}

/* ── Roteador principal ── */
function doPost(e) {
  var d = e.parameter;
  if (d.tipo === 'oficina') {
    return handleOficina(d);
  }
  return handleInscricao(d);
}

/* ── Inscrição (comportamento original) ── */
function handleInscricao(d) {
  var CABECALHOS = [
    'Data/Hora','Nome','E-mail','Telefone/WhatsApp','Município/UF',
    'Escola','Rede de Ensino','Função/Cargo','Nível de Ensino',
    'Familiaridade SAEB (1–5)','Expectativas'
  ];

  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Inscrições')
                || SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(CABECALHOS);
      sheet.getRange(1,1,1,CABECALHOS.length)
           .setFontWeight('bold').setBackground('#1a2a50').setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([
      new Date().toLocaleString('pt-BR', {timeZone:'America/Recife'}),
      d.nome||'', d.email||'', d.telefone||'', d.municipio||'',
      d.escola||'', d.rede||'', d.cargo||'', d.nivel||'',
      d.familiaridade||'', d.expectativas||''
    ]);
    lock.releaseLock();
    return ContentService.createTextOutput(JSON.stringify({status:'ok'}))
           .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    lock.releaseLock();
    return ContentService.createTextOutput(JSON.stringify({status:'error',msg:err.message}))
           .setMimeType(ContentService.MimeType.JSON);
  }
}

/* ── Respostas da Oficina ── */
function handleOficina(d) {
  var CABECALHOS = [
    'Data/Hora','Participante','Escola','Turmas',
    'Palavra SAEB','Expectativa',
    'Nível estimado','Justificativa','Habilidades N6','Dificuldade N7/8',
    'Questão','Descritor','Nível questão','Por que erram','Estratégia','Recurso',
    'Padrão SABE','Confrontação','Base mais','Base menos','Instrumento','Conselho',
    'Aprendizado','Descritor a mudar','Compromisso','Avaliação (estrelas)','Sugestões'
  ];

  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    var ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName('Respostas Oficina');
    if (!sheet) {
      sheet = ss.insertSheet('Respostas Oficina');
      sheet.appendRow(CABECALHOS);
      sheet.getRange(1,1,1,CABECALHOS.length)
           .setFontWeight('bold').setBackground('#0d4a8a').setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    }

    var agora = new Date().toLocaleString('pt-BR', {timeZone:'America/Recife'});

    sheet.appendRow([
      agora,
      d.nome||'', d.escola||'', d.turma||'',
      d.palavra||'', d.expectativa||'',
      d.nivel||'', d.nivel_por||'', d.nivel6_ja||'', d.nivel78_dif||'',
      d.qst||'', d.q_descritor||'', d.q_nivel||'', d.q_erro||'', d.q_estrategia||'', d.q_recurso||'',
      d.padrao||'', d.confronto||'', d.base_mais||'', d.base_menos||'', d.instrumento||'', d.conselho||'',
      d.r1||'', d.r2||'', d.r3||'', d.nota||'0', d.r5||''
    ]);

    /* ── Envia e-mail para Sandro ── */
    var assunto = '📋 Nova resposta da Oficina SAEB — ' + (d.nome||'Participante') + ' (' + agora + ')';
    var corpo =
      '<h2 style="color:#0d4a8a">Oficina SAEB — Nova Resposta Recebida</h2>' +
      '<p><strong>Data/Hora:</strong> ' + agora + '</p>' +
      '<hr>' +
      '<p><strong>Participante:</strong> ' + (d.nome||'—') + '</p>' +
      '<p><strong>Escola:</strong> ' + (d.escola||'—') + '</p>' +
      '<p><strong>Turmas:</strong> ' + (d.turma||'—') + '</p>' +
      '<hr>' +
      '<h3>Atividade 1 — Palavra SAEB</h3>' +
      '<p><strong>Palavra:</strong> ' + (d.palavra||'—') + '</p>' +
      '<p><strong>Expectativa:</strong> ' + (d.expectativa||'—') + '</p>' +
      '<h3>Atividade 2 — Escala de Proficiência</h3>' +
      '<p><strong>Nível estimado:</strong> ' + (d.nivel||'—') + '</p>' +
      '<p><strong>Justificativa:</strong> ' + (d.nivel_por||'—') + '</p>' +
      '<p><strong>Habilidades N6:</strong> ' + (d.nivel6_ja||'—') + '</p>' +
      '<p><strong>Dificuldade N7/8:</strong> ' + (d.nivel78_dif||'—') + '</p>' +
      '<h3>Atividade 3 — Questão</h3>' +
      '<p><strong>Alternativa:</strong> ' + (d.qst||'—') + '</p>' +
      '<p><strong>Descritor:</strong> ' + (d.q_descritor||'—') + '</p>' +
      '<p><strong>Nível:</strong> ' + (d.q_nivel||'—') + '</p>' +
      '<p><strong>Por que erram:</strong> ' + (d.q_erro||'—') + '</p>' +
      '<p><strong>Estratégia:</strong> ' + (d.q_estrategia||'—') + '</p>' +
      '<p><strong>Recurso:</strong> ' + (d.q_recurso||'—') + '</p>' +
      '<h3>Atividade 4 — Padrão SABE</h3>' +
      '<p><strong>Padrão:</strong> ' + (d.padrao||'—') + '</p>' +
      '<p><strong>Confrontação:</strong> ' + (d.confronto||'—') + '</p>' +
      '<p><strong>Base mais praticada:</strong> ' + (d.base_mais||'—') + '</p>' +
      '<p><strong>Base menos praticada:</strong> ' + (d.base_menos||'—') + '</p>' +
      '<p><strong>Instrumento avaliativo:</strong> ' + (d.instrumento||'—') + '</p>' +
      '<p><strong>Dado para Conselho:</strong> ' + (d.conselho||'—') + '</p>' +
      '<h3>Saída Reflexiva</h3>' +
      '<p><strong>Aprendizado:</strong> ' + (d.r1||'—') + '</p>' +
      '<p><strong>Descritor a mudar:</strong> ' + (d.r2||'—') + '</p>' +
      '<p><strong>Compromisso:</strong> ' + (d.r3||'—') + '</p>' +
      '<p><strong>Avaliação:</strong> ' + (d.nota||'0') + ' estrela(s)</p>' +
      '<p><strong>Sugestões:</strong> ' + (d.r5||'—') + '</p>' +
      '<hr><p style="color:#888;font-size:12px">Enviado automaticamente pela Oficina SAEB 2026 — PROFMAT/UNIVASF</p>';

    MailApp.sendEmail({
      to:       EMAIL_DESTINO,
      subject:  assunto,
      htmlBody: corpo
    });

    lock.releaseLock();
    return ContentService.createTextOutput(JSON.stringify({status:'ok'}))
           .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    lock.releaseLock();
    return ContentService.createTextOutput(JSON.stringify({status:'error',msg:err.message}))
           .setMimeType(ContentService.MimeType.JSON);
  }
}
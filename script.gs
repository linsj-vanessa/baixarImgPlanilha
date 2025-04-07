function baixarImagensSimplificado() {
  const NOME_ABA = 'Folha1'; // Nome da aba da planilha
  const COLUNA_NOME = 3;     // Coluna C: onde está o nome da imagem
  const COLUNA_LINK = 6;     // Coluna F: onde está o hyperlink da imagem
  const COLUNA_STATUS = 7;   // Coluna G: onde será registrado o status
  const LINHA_INICIAL = 2;   // Linha onde começam os dados
  const LIMITE_POR_EXECUCAO = 20;

  // ID da pasta no Drive onde as imagens serão salvas
  const ID_PASTA_DESTINO = 'COLE_SEU_ID_AQUI';

  const planilha = SpreadsheetApp.getActiveSpreadsheet();
  const aba = planilha.getSheetByName(NOME_ABA);
  const ultimaLinha = aba.getLastRow();

  const nomes = aba.getRange(LINHA_INICIAL, COLUNA_NOME, ultimaLinha - 1, 1).getValues();
  const linksRichText = aba.getRange(LINHA_INICIAL, COLUNA_LINK, ultimaLinha - 1, 1).getRichTextValues();
  const status = aba.getRange(LINHA_INICIAL, COLUNA_STATUS, ultimaLinha - 1, 1).getValues();

  const pastaDestino = DriveApp.getFolderById(ID_PASTA_DESTINO);
  let processados = 0;
  let totalOK = 0;

  for (let i = 0; i < nomes.length; i++) {
    if (status[i][0] === 'OK') {
      totalOK++;
      continue;
    }

    const nomeOriginal = nomes[i][0];
    const richText = linksRichText[i][0];
    const urlOriginal = richText ? richText.getLinkUrl() : null;

    // Validação
    if (!nomeOriginal || !urlOriginal || !urlOriginal.startsWith('http')) {
      aba.getRange(i + LINHA_INICIAL, COLUNA_STATUS).setValue('ERRO: campo vazio ou link inválido');
      continue;
    }

    // Extrai o ID do Google Drive
    const match = urlOriginal.match(/\/file\/d\/([a-zA-Z0-9_-]+)\//);
    const fileId = match ? match[1] : null;
    if (!fileId) {
      aba.getRange(i + LINHA_INICIAL, COLUNA_STATUS).setValue('ERRO: link não é do drive');
      continue;
    }

    const urlImagem = `https://drive.google.com/uc?export=download&id=${fileId}`;
    const nomeArquivo = removerAcentosECaracteres(nomeOriginal.trim());

    try {
      const resposta = UrlFetchApp.fetch(urlImagem);
      const blob = resposta.getBlob();
      const extensao = blob.getContentType().split('/')[1] || 'jpg';
      const nomeFinal = `${nomeArquivo}.${extensao}`;
      pastaDestino.createFile(blob.setName(nomeFinal));
      aba.getRange(i + LINHA_INICIAL, COLUNA_STATUS).setValue('OK');
      totalOK++;
      processados++;
    } catch (erro) {
      aba.getRange(i + LINHA_INICIAL, COLUNA_STATUS).setValue('ERRO: ' + erro.message);
    }

    if (processados >= LIMITE_POR_EXECUCAO) break;
  }

  // Se todas as linhas foram processadas, remove o gatilho
  const statusAtualizados = aba.getRange(LINHA_INICIAL, COLUNA_STATUS, nomes.length, 1).getValues();
  const aindaTem = statusAtualizados.some(([s]) => !s || (s !== 'OK' && !s.toString().startsWith('ERRO')));
  if (!aindaTem) {
    const gatilhos = ScriptApp.getProjectTriggers();
    for (const g of gatilhos) {
      if (g.getHandlerFunction() === 'baixarImagensSimplificado') {
        ScriptApp.deleteTrigger(g);
      }
    }
    Logger.log("✔️ Todas as imagens foram processadas. Gatilho removido.");
  }
}

// Remove acentos, espaços e caracteres inválidos
function removerAcentosECaracteres(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ç/g, "c").replace(/Ç/g, "C")
    .replace(/[^a-zA-Z0-9 _-]/g, "")
    .replace(/\s+/g, "_");
}

// Cria o gatilho para rodar automaticamente a cada 5 minutos
function criarGatilhoParaBaixarImagens() {
  ScriptApp.newTrigger('baixarImagensSimplificado')
    .timeBased()
    .everyMinutes(5)
    .create();
}

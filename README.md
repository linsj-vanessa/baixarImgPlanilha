# Automação: Download de Imagens via Google Planilhas

Este projeto automatiza o processo de **download de imagens** listadas em uma **Google Planilha**, onde os links estão formatados como **texto com hyperlink** (ex: "Foto").

As imagens são baixadas automaticamente e salvas em uma pasta do Google Drive, usando o nome de outra coluna como referência.

---

## 🚀 Funcionalidades

- ✅ Percorre linha por linha da planilha (a partir da linha 2)
- 🔗 Extrai o link real das imagens contidas em rich text (hiperlink)
- 📂 Baixa as imagens e salva em uma pasta no Google Drive
- 🏷️ Nomeia os arquivos com base em outro campo da planilha (sem acentos ou caracteres especiais)
- ✏️ Marca automaticamente na planilha o status do download: `OK` ou `ERRO`
- ⏱️ Roda de forma automática a cada 5 minutos até concluir todas as imagens

---

## 🛠️ Tecnologias Utilizadas

- [Google Apps Script](https://developers.google.com/apps-script)
- Google Sheets (Planilhas Google)
- Google Drive API (nativa)

---

## 🧪 Exemplo de Planilha
![print-planilha](https://github.com/user-attachments/assets/54c59de7-3957-4991-8742-2331a681e985)


---

## 🧰 Como Usar

1. **Prepare sua planilha** no seguinte formato:
   - Coluna **C**: Nome da imagem
   - Coluna **F**: Texto com hyperlink (ex: "Foto")
   - Coluna **G**: Deixe vazia — o script marcará o status automaticamente
   - Ou altere o código para as suas colunas

2. No código, edite a linha com o ID da pasta de destino no Google Drive:
   
```javascript
const ID_PASTA_DESTINO = 'SEU_ID_AQUI';


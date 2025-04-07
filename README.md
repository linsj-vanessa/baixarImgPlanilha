# Automação para Download de Imagens via Google Planilhas

Este projeto foi criado para automatizar o download de imagens listadas em uma planilha do Google Sheets, onde os links estão em formato de hyperlink ("Foto"). As imagens são salvas em uma pasta específica do Google Drive.

## ⚙️ Funcionalidades

- Percorre uma planilha linha por linha a partir da linha 2 (pulando os títulos)
- Extrai o link de imagens da Coluna F
- Usa o conteúdo da Coluna C como nome da imagem (sem acentos ou caracteres especiais)
- Salva todas as imagens em uma pasta do Google Drive
- Cria uma marcação automática na planilha com status de OK ou erro
- Executa de forma automática a cada 5 minutos até terminar.

## 🛠️ Tecnologias

- Google Apps Script
- Google Sheets
- Google Drive

## 🧪 Exemplo de Planilha

| Nome da Imagem | ... | Link da Imagem |
|----------------|-----|----------------|
| Coluna com algum nome | ... | [Foto](https://drive.google.com/file/d/...) |

## 📁 Estrutura do Projeto

- `script.gs`: Código completo do projeto
- `exemplos/estrutura-da-planilha.png`: Exemplo de como a planilha deve estar estruturada

## 🚀 Como Usar

1. Crie uma planilha com a estrutura acima ou adapte a sua planilha
2. Copie o código de `script.gs` no editor do Google Apps Script
3. Substitua o ID da pasta de destino pelo seu
4. Execute a função `criarGatilhoParaBaixarImagens()` para iniciar

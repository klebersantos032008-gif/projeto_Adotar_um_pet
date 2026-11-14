# 🐾 Adote um Pet

Site estático desenvolvido como projeto em grupo da faculdade, com o objetivo de conectar cães e gatos resgatados a pessoas interessadas em adoção responsável.

## 📋 Sobre o projeto

O **Adote um Pet** apresenta animais disponíveis para adoção, explica o processo de adoção, os requisitos necessários e oferece um formulário de contato para quem deseja adotar.

## ✨ Funcionalidades

- **Listagem de pets** com filtros por espécie (cachorro/gato) e porte (pequeno/médio/grande)
- **Sistema de favoritos** — permite marcar pets favoritos, salvos no navegador (`localStorage`)
- **Modo escuro/claro** — alternância de tema salva entre visitas
- **Formulário de adoção** com seleção do pet de interesse e dados do interessado
- **FAQ** com perguntas frequentes sobre o processo de adoção
- Layout **responsivo** para desktop e dispositivos móveis

## 🛠️ Tecnologias utilizadas

- **HTML5**
- **CSS3** (variáveis CSS para temas claro/escuro, Flexbox e Grid)
- **JavaScript** (DOM, eventos e `localStorage`)

## 📁 Estrutura do projeto

O repositório mantém o registro evolutivo do desenvolvimento e a versão final unificada do site:

```text
├── README.md
├── HISTORICO DO PROJETO/           # Registro das versões anteriores do desenvolvimento
│   ├── PROJETO FRONT 1.0/          # Estrutura inicial (inicio.html)
│   ├── PROJETO FRONT 1.1/          # Refinamento da página inicial (inicio.html)
│   ├── PROJETO FRONT 1.2/          # Inclusão das demais páginas e imagens
│   ├── PROJETO FRONT 1.3/          # Ajustes estruturais nas páginas HTML
│   └── PROJETO FRONT 1.5/          # Versão pré-unificação (adição de CSS, JS e notas)
│
└── PROJETO ATUALIZADO/             # Versão final e unificada do projeto
    ├── inicio.html                 # Página inicial
    ├── pets.html                   # Listagem de pets com filtros e favoritos
    ├── comoadotar.html             # Passo a passo, requisitos e FAQ
    ├── sobre.html                  # Sobre a organização, missão e valores
    ├── contato.html                # Formulário de adoção
    ├── style.css                   # Estilos gerais e tema claro/escuro
    ├── script.js                   # Lógica de filtros, favoritos e modo escuro
    └── imagens/
        ├── banner-pets.jpg
        ├── gata.jpg
        ├── cachorro-pequeno-porte.jpg
        ├── cachorro-pequeno-porte3.jpg
        ├── cachorro-medio-porte.jpg
        ├── cachorro-grande-porte.jpg
        └── cachorro-grande-porte2.jpg
```

> ⚠️ **Importante:** Para visualizar a versão final do site, utilize sempre os arquivos dentro da pasta **`PROJETO ATUALIZADO/`**. As imagens devem permanecer na subpasta `imagens/` para que os caminhos no HTML e CSS funcionem corretamente.

## ▶️ Como executar

1. Baixe ou clone este repositório:
   ```bash
   git clone https://github.com
   ```
2. Acesse a pasta **`PROJETO ATUALIZADO`**
3. Abra o arquivo **`inicio.html`** diretamente no navegador

Ou, se preferir usar um servidor local (recomendado para evitar problemas de caminho de arquivos):

```bash
# Com a extensão Live Server (VS Code)
# Abra a pasta "PROJETO ATUALIZADO", clique com o botão direito em inicio.html > "Open with Live Server"
```

## 👥 Integrantes do grupo

- Kleber Henrique Santos do Nascimento
- Guilherme Alberto Afonso dos Santos
- Arthur Lucas de Souza
- Rogério Ortencio Cupertino de Lima
- Livia Daroz Mendonça

## 📄 Licença

Projeto acadêmico sem fins lucrativos, desenvolvido para fins educacionais.
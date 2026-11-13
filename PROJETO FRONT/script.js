document.addEventListener("DOMContentLoaded", function () {
  const raiz = document.documentElement;
  const escalaSalva = Number(localStorage.getItem("escalaTexto"));
  let escalaTexto = Number.isFinite(escalaSalva) && escalaSalva
    ? Math.min(1.5, Math.max(0.8, escalaSalva))
    : 1;

  function aplicarEscalaTexto() {
    raiz.style.setProperty("--escala-texto", escalaTexto);
    localStorage.setItem("escalaTexto", String(escalaTexto));
  }

  aplicarEscalaTexto();

  document.querySelectorAll("[data-fonte]").forEach(function (botao) {
    botao.addEventListener("click", function () {
      const ajuste = botao.dataset.fonte === "aumentar" ? 0.1 : -0.1;
      escalaTexto = Math.min(1.5, Math.max(0.8, Math.round((escalaTexto + ajuste) * 10) / 10));
      aplicarEscalaTexto();
    });
  });

  const botaoContraste = document.querySelector("#btn-contraste");
  if (botaoContraste) {
    const contrasteSalvo = localStorage.getItem("altoContraste") === "sim";
    document.body.classList.toggle("alto-contraste", contrasteSalvo);
    botaoContraste.setAttribute("aria-pressed", String(contrasteSalvo));

    botaoContraste.addEventListener("click", function () {
      const ativo = document.body.classList.toggle("alto-contraste");
      botaoContraste.setAttribute("aria-pressed", String(ativo));
      localStorage.setItem("altoContraste", ativo ? "sim" : "nao");
    });
  }

  const btnModo = document.querySelector("#btn-modo");

  if (btnModo) {
    const atualizarControleModo = function () {
      const escuro = document.body.classList.contains("modo-escuro");
      btnModo.setAttribute("aria-checked", String(escuro));
      btnModo.setAttribute("aria-label", escuro ? "Ativar modo claro" : "Ativar modo escuro");
    };

    if (localStorage.getItem("modoEscuro") === "sim") {
      document.body.classList.add("modo-escuro");
    }

    atualizarControleModo();
    btnModo.addEventListener("click", function () {
      document.body.classList.toggle("modo-escuro");
      localStorage.setItem(
        "modoEscuro",
        document.body.classList.contains("modo-escuro") ? "sim" : "nao"
      );
      atualizarControleModo();
    });
  }

  const filtroEspecie = document.querySelector("#filtro-especie");
  const filtroPorte = document.querySelector("#filtro-porte");
  const pets = document.querySelectorAll(".card-pet");
  const botaoVerFavoritos = document.querySelector("#ver-favoritos");
  const botoesFavoritos = document.querySelectorAll(".btn-favorito");
  let favoritos = JSON.parse(localStorage.getItem("petsFavoritos") || "[]");
  let mostrandoFavoritos = false;

  function atualizarPets() {
    if (!filtroEspecie || !filtroPorte) return;

    pets.forEach(function (pet) {
      const nome = pet.querySelector("h3").textContent.trim();
      const combinaEspecie =
        filtroEspecie.value === "todos" ||
        filtroEspecie.value === pet.dataset.especie;
      const combinaPorte =
        filtroPorte.value === "todos" ||
        filtroPorte.value === pet.dataset.porte;
      const combinaFavoritos =
        !mostrandoFavoritos || favoritos.includes(nome);

      pet.hidden = !(combinaEspecie && combinaPorte && combinaFavoritos);
    });
  }

  botoesFavoritos.forEach(function (botao) {
    const card = botao.closest(".card-pet");
    const nome = card.querySelector("h3").textContent.trim();

    function atualizarBotao() {
      const salvo = favoritos.includes(nome);
      botao.classList.toggle("favoritado", salvo);
      botao.setAttribute("aria-pressed", String(salvo));
      botao.setAttribute(
        "aria-label",
        (salvo ? "Remover " : "Adicionar ") + nome + " " +
          (salvo ? "dos" : "aos") + " favoritos"
      );
      botao.textContent = salvo ? "♥" : "♡";
    }

    atualizarBotao();
    botao.addEventListener("click", function () {
      favoritos = favoritos.includes(nome)
        ? favoritos.filter(function (item) { return item !== nome; })
        : favoritos.concat(nome);
      localStorage.setItem("petsFavoritos", JSON.stringify(favoritos));
      atualizarBotao();
      atualizarPets();
    });
  });

  if (filtroEspecie && filtroPorte) {
    filtroEspecie.addEventListener("change", atualizarPets);
    filtroPorte.addEventListener("change", atualizarPets);
  }

  if (botaoVerFavoritos) {
    botaoVerFavoritos.setAttribute("aria-pressed", "false");
    botaoVerFavoritos.addEventListener("click", function () {
      mostrandoFavoritos = !mostrandoFavoritos;
      botaoVerFavoritos.setAttribute("aria-pressed", String(mostrandoFavoritos));
      botaoVerFavoritos.textContent = mostrandoFavoritos
        ? "Ver todos os pets"
        : "♥ Meus favoritos";
      atualizarPets();
    });
  }

  const seletorPet = document.querySelector("#pet");
  if (seletorPet) {
    const petDaUrl = new URLSearchParams(window.location.search).get("pet");
    if (petDaUrl && Array.from(seletorPet.options).some(function (option) {
      return option.value === petDaUrl;
    })) {
      seletorPet.value = petDaUrl;
    }
  }

  const formulario = document.querySelector("#form-adocao");
  const confirmacao = document.querySelector("#confirmacao-formulario");
  if (formulario && confirmacao) {
    formulario.addEventListener("submit", function (event) {
      event.preventDefault();
      confirmacao.textContent =
        "Pedido simulado com sucesso. Este protótipo acadêmico não envia nem armazena seus dados.";
      confirmacao.hidden = false;
    });
  }
});
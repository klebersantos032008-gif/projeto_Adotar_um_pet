document.addEventListener("DOMContentLoaded", function() 
{

    /*botão para alterar do modo escuro e claro*/

    const btnModo = document.querySelector("#btn-modo")

    /*armazena a escolha*/
    if (localStorage.getItem("modoEscuro") === "sim") 
    {
        document.body.classList.add("modo-escuro")
        btnModo.textContent = "☀️"
    }

    btnModo.addEventListener("click", function() 
    {
        document.body.classList.toggle("modo-escuro")

        const escuro = document.body.classList.contains("modo-escuro")

        if (escuro) 
            {
            btnModo.textContent = "☀️"
            localStorage.setItem("modoEscuro", "sim")
        } 
        else 
        {
            btnModo.textContent = "🌙"
            localStorage.setItem("modoEscuro", "nao")
        }
    })


    // botõoes e conteúdo para acessbilidade

    const btnAumentar = document.querySelector("#aumentar-fonte")
    const btnDiminuir = document.querySelector("#diminuir-fonte")
    const btnContraste = document.querySelector("#alto-contraste")

    
    let tamanhoFonte = parseInt(localStorage.getItem("tamanhoFonte")) || 100

    function aplicarFonte() 
    {
        document.documentElement.style.fontSize = tamanhoFonte + "%"
        localStorage.setItem("tamanhoFonte", tamanhoFonte)
    }

    aplicarFonte()

    btnAumentar.addEventListener("click", function() 
    {
        if (tamanhoFonte < 150) {
            tamanhoFonte += 10
            aplicarFonte()
        }
    })

    btnDiminuir.addEventListener("click", function() 
    {
        if (tamanhoFonte > 80) {
            tamanhoFonte -= 10
            aplicarFonte()
        }
    })

    if (localStorage.getItem("altoContraste") === "sim") 
    {
        document.body.classList.add("alto-contraste")
        btnContraste.setAttribute("aria-pressed", "true")
    }

    btnContraste.addEventListener("click", function() 
    {
        const ativo = document.body.classList.toggle("alto-contraste")

        btnContraste.setAttribute("aria-pressed", ativo)
        localStorage.setItem("altoContraste", ativo ? "sim" : "nao")
    })

    // Encontrar os filtros de especie

    const filtroEspecie = document.querySelector("#filtro-especie");
    const filtroPorte = document.querySelector("#filtro-porte");

    //Seleciona todos os cards de animais
    const pets = document.querySelectorAll(".card-pet")

    // Seleciona os botões de favoritos e lista 
    const botoesFavoritos = document.querySelectorAll(".btn-favorito")
    const botaoVerfavoritos = document.querySelector("#ver-favoritos")
    
    //Controla se a lista esta mostrando apenas os favoritos
    let mostrandoFavoritos = false

    //Recupera os favoritos salvos no navegador
    let favoritos = JSON.parse(localStorage.getItem("petsFavoritos")) || []

    //Percorre todos os botões de favoritos
    //adicionado conteudo de acessibilidade para leitor de tela
    botoesFavoritos.forEach(function(botao) 
    {

        //Encontra o card e o nome do animal correspondente ao botão
        const card = botao.closest(".card-pet")
        const nomePet = card.querySelector("h3").textContent

        // Descrição acessível do botão
        botao.setAttribute("aria-label", "Favoritar " + nomePet)
        botao.setAttribute("aria-pressed", "false")

        //Verifica se o animal ja esta salvo nos favoritos
        if(favoritos.includes(nomePet))
        {
            botao.classList.add("favoritado");
            botao.textContent = "♥";
            botao.setAttribute("aria-pressed", "true") 
        }

        //Adicionar um evento de click ao bptão de favorito
        botao.addEventListener("click",function()
        {
            //Verificar se o animal ja está na lista de favoritos
            if(favoritos.includes(nomePet))
            {
                // Remover o animal da lista de favoritos
                favoritos = favoritos.filter(function(nome)
                {
                    return nome !== nomePet
                })

                //Alterar o coração para indicar que não esta favoritado
                botao.classList.remove("favoritado")
                botao.textContent = "♡"
                botao.setAttribute("aria-pressed", "false")
            }
            else {
                /*Adicionar o animal á lista de favoritos e 
                 Alterar o coração para indicar que está favoritado*/
                favoritos.push(nomePet)
                botao.classList.add("favoritado")
                botao.textContent = "♥"
                botao.setAttribute("aria-pressed", "true")
            }

            /*Salva a lista atualizada no amazenamento do navegador
            /e atualiza os animais exibidos*/
            localStorage.setItem("petsFavoritos",JSON.stringify(favoritos))
             atualizarPets()

        })
    })

    //Verifica se os filtros existem na pagina
    if (!filtroEspecie || !filtroPorte){
        return
        }

    //Função responsável por filtrar e atualizar os animais exibidos
    function atualizarPets(){

    //Percorrer todos os cads de Animais 
    pets.forEach(function(pet)
    {

    //Obter o nome, a especie e o porte de cada animal
    const nomePet = pet.querySelector("h3").textContent
    const especiePet = pet.dataset.especie
    const portepet = pet.dataset.porte

    //Obter os valores selecionados nos filtros
    const especieselecionada = filtroEspecie.value
    const porteselecionado = filtroPorte.value


    //verifica se o animal corresponde á especie selecionada
    const combinaEspecie =
        especieselecionada === "todos" || especieselecionada === especiePet

    //verifica se o animal corresponde ao porte selecionada
    const combinaPorte = 
        porteselecionado === "todos" || porteselecionado === portepet

    //Verifica se o animal está nos favoritos quando estiver ativado
    const combinaFavoritos = 
        !mostrandoFavoritos || favoritos.includes(nomePet)

    //Exibir o animal somente se ele atender a todos os criterios
    if (combinaEspecie && combinaPorte && combinaFavoritos)
    {
        pet.style.display = ""
    }

    //Ocultar o animal que não atender aos criterios
    else
    {
        pet.style.display = "none"
    }
    })
}


    // Executar a função quando o usuário alterar o filtro de porte e especie
    filtroEspecie.addEventListener("change", atualizarPets)
    filtroPorte.addEventListener("change", atualizarPets)

    //Adicionar entre mostrar todos os animais e somente os favoritos
    botaoVerfavoritos.addEventListener("click",function()
    {

        //Alternar entre mostrar todos os animais e somente os favoritos
        mostrandoFavoritos = !mostrandoFavoritos;

        //Alterar o texto do botão conforme a visualização escolhia
        if (mostrandoFavoritos)
        {
            botaoVerfavoritos.textContent = "Ver todos os pets"
        }
        else 
        {
            botaoVerfavoritos.textContent = "❤️ Meus Favoritos"
        }
        atualizarPets() 
    })
             
})

            
        
        

    

    
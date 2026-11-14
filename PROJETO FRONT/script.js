document.addEventListener("DOMContentLoaded", function() {

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
    botoesFavoritos.forEach(function(botao) {

        //Encontra o card e o nome do animal correspondente ao botão
        const card = botao.closest(".card-pet")
        const nomePet = card.querySelector("h3").textContent

        //Verifica se o animal ja esta salvo nos favoritos
        if(favoritos.includes(nomePet)){
           botao.classList.add("favoritado");
            botao.textContent = "♥"; 
        }

        //Adicionar um evento de click ao bptão de favorito
        botao.addEventListener("click",function(){


            //Verificar se o animal ja está na lista de favoritos
            if(favoritos.includes(nomePet)){

                // Remover o animal da lista de favoritos
                favoritos = favoritos.filter(function(nome){
                    return nome !== nomePet
                })

                //Alterar o coração para indicar que não esta favoritado
                botao.classList.remove("favoritado")
                botao.textContent = "♡"
            }
            else {
                /*Adicionar o animal á lista de favoritos e 
                 Alterar o coração para indicar que está favoritado*/
                favoritos.push(nomePet)
                botao.classList.add("favoritado")
                botao.textContent = "♥"
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
        pets.forEach(function(pet){

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
            if (combinaEspecie && combinaPorte && combinaFavoritos){
                pet.style.display = ""
            }

            //Ocultar o animal que não atender aos criterios
            else{
                pet.style.display = "none"
            }
        })
    }


        // Executar a função quando o usuário alterar o filtro de porte e especie
        filtroEspecie.addEventListener("change", atualizarPets)
        filtroPorte.addEventListener("change", atualizarPets)

        //Adicionar entre mostrar todos os animais e somente os favoritos
        botaoVerfavoritos.addEventListener("click",function(){

        //Alternar entre mostrar todos os animais e somente os favoritos
        mostrandoFavoritos = !mostrandoFavoritos;

            //Alterar o texto do botão conforme a visualização escolhia
            if (mostrandoFavoritos){
                botaoVerfavoritos.textContent = "Ver todos os pets"
            }
            else {
                botaoVerfavoritos.textContent = "❤️ Meus Favoritos"
            }
             
        //Atualizar a lista de animais exibidos    
        atualizarPets()
        })

    })

    



            
        
        

    

    
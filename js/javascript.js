//global const info api 
const pokemonName = document.querySelector('.pokemon_name')
const pokemonData = document.querySelector('.pokemon_number')
const pokemonImage = document.querySelector('.pokemon_image')
//global const info api search and buttons
const form = document.querySelector('.form')
const input = document.querySelector('.input_search')
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

//responsavel por adiantar e retroceder os pokemons pelos buttons prev e next
let searchPokemon = 1

//responsavel pela busca do pokemon
const fetchPokemon = async (pokemon) => {
    //resposta da api
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    //variavel de validação
    if (APIResponse.status === 200){
        //converter os dados da api em JSON para obter os dados desejados
        const data = await APIResponse.json()
        //retorno para uso em outra função
        return data
    }
}

//responsavel por renderizar em tela os dados
const renderPokemon = async (pokemon) => {
    //renderiza sinal de carregando
    pokemonName.innerHTML = 'Loading...'
    pokemonData.innerHTML = ''
    //faz a busca dos dados no fecth
    const data = await fetchPokemon(pokemon)

    //variavel de validação
    if (data){
        //renderizar o nome do pokemon
        pokemonName.innerHTML = data.name
        //renderizar o numero do pokemon
        pokemonData.innerHTML = data.id
        //renderizar a imagem do pokemon
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        //faz a contagem a partir do pokemon atual
        searchPokemon = data.id
    } else {
        pokemonData.innerHTML = "Not Found 😓"
        pokemonName.innerHTML = ''
        //retira a imagem caso não haja nenuma a se mostrar 
        pokemonImage.src = './images/pokeicon.png'
    }
}

//responsavel pelo campo input realizar e devolver as buscas de numero e nome
form.addEventListener('submit', (e)=>{
    e.preventDefault()
    //renderiza o que for passado pelo input
    renderPokemon(input.value.toLowerCase())
    //limpa o input
    input.value = ''
    
})

buttonPrev.addEventListener('click', (e)=>{
    if (searchPokemon > 1){
        searchPokemon -=1
        renderPokemon(searchPokemon)
    }
    //limpa o input
    input.value = ''
    
})

buttonNext.addEventListener('click', (e)=>{
    searchPokemon +=1
    renderPokemon(searchPokemon)
    //limpa o input
    input.value = ''
    
})
renderPokemon(searchPokemon)


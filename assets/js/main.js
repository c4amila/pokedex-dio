
const pokemonLi = document.getElementById('pokemonLi')
let loadMoreButton = document.getElementById('LoadMoreButton')
const maxRecords = 151
const limit = 5
let offset = 0;

function loadPokemonItens(offset, limit) {     
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        //join é um separador
        const newHTML = pokemons.map((pokemon) => 
        `<li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.numb}</span>
            <span class="name">${pokemon.name}</span>
    
            <div class="detail-pokemon">
                <ol id="pokemonLi" class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
             </ol>
    
                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
                 
            </div>  
    
        </li>`).join('')
        pokemonLi.innerHTML += newHTML
        //for não é recomendado 
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})


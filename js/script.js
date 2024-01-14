// Seleção de elementos
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonName = document.querySelector(".pokemon__name");
const pokemonImg = document.querySelector(".pokemon__img");

const form = document.querySelector(".form");
const input = document.querySelector(".input__search");

const prevButton = document.querySelector(".btn-prev");
const nextButton = document.querySelector(".btn-next");

let searchPokemon = 1;

// Funções
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
    
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImg.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        searchPokemon = data.id;
    } else {
        pokemonName.innerHTML = 'Não encontrado :C';
        pokemonNumber.innerHTML = '';
        pokemonImg.style.display = 'none';
    }
}

// Eventos
form.addEventListener('submit', (e) => {
    e.preventDefault();

    renderPokemon(input.value.toLowerCase());    
    input.value = '';
});

prevButton.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }    
});

nextButton.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
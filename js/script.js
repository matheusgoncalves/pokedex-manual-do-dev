const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonName = document.querySelector(".pokemon__name");
const pokemonImg = document.querySelector(".pokemon__img");

const form = document.querySelector(".form");
const input = document.querySelector(".input__search");

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
    } else {
        pokemonName.innerHTML = 'Não encontrado :C';
        pokemonNumber.innerHTML = '';
        pokemonImg.style.display = 'none';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    renderPokemon(input.value.toLowerCase());    
    input.value = '';
});

renderPokemon('1');
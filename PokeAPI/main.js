document.addEventListener('DOMContentLoaded', () => {
    const randomId = Math.floor(Math.random() * (800 - 1 + 1)) + 1;
    getData(randomId)
})

async function getData(id){
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        const data = await res.json()
        const pokemon = {
            id: id,
            name: data.name,
            img: data.sprites.other.home.front_default,
            exp: data.base_experience,
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            special: data.stats[3].base_stat,
        }
        showPokemon(pokemon)
}

const showPokemon = (pokemon) =>{
    const template = document.getElementById('template').content
    const fragment = document.createDocumentFragment()
    const container = document.getElementById('container')
    const clone = template.cloneNode(true)
    container.innerHTML = ''

    clone.querySelector('.card-boddy-img').setAttribute('src', pokemon.img)
    clone.querySelector('#name').innerHTML = 
        `${pokemon.name} <span>${pokemon.hp}hp</span>`
    clone.querySelector('#exp').innerText = pokemon.exp + ' exp'
    clone.querySelector('#attack').innerText = pokemon.attack + 'K'
    clone.querySelector('#special-attack').innerText = pokemon.special + 'K'
    clone.querySelector('#defense').innerText = pokemon.defense + 'K'

    fragment.appendChild(clone)
    container.appendChild(fragment)
}


document.addEventListener('click', (e) => {
    if (e.target.classList.contains('myButton')) {
        e.preventDefault()
        const inputSearch = document.getElementById('myInput')
        const newId = inputSearch.value
        if (!isNaN(newId) && parseInt(newId) <= 800 && parseInt(newId) >= 1) {
            getData(newId)
        } else {
            alert('Enter a number between 1 and 800')
        }
        
        
    }
})

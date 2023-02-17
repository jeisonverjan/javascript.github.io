document.addEventListener('DOMContentLoaded', () => {
    
    // A random integer between 1 and 800
    const randomId = Math.floor(Math.random() * (800 - 1 + 1)) + 1;
   
    // Main function wich get the data from an external API
    getData(randomId)
})

async function getData(id){
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    
        // Receive the data and convert it to json format
        const data = await res.json()
        
        // Object that represent the record extracted
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
        // Call the fuction whichc show the data in the front end
        showPokemon(pokemon)
}

const showPokemon = (pokemon) =>{
    // Get the html elements 
    const template = document.getElementById('template').content
    // create a new fragment
    const fragment = document.createDocumentFragment()
    // Elment where the data is gonna be in.
    const container = document.getElementById('container')
    const clone = template.cloneNode(true)
    // empty the container so that there is no duplicate information.
    container.innerHTML = ''

    // Insert data into the fragment clone
    clone.querySelector('.card-boddy-img').setAttribute('src', pokemon.img)
    clone.querySelector('#name').innerHTML = 
        `${pokemon.name} <span>${pokemon.hp}hp</span>`
    clone.querySelector('#exp').innerText = pokemon.exp + ' exp'
    clone.querySelector('#attack').innerText = pokemon.attack + 'K'
    clone.querySelector('#special-attack').innerText = pokemon.special + 'K'
    clone.querySelector('#defense').innerText = pokemon.defense + 'K'

    // Insert the clone into the container
    fragment.appendChild(clone)
    container.appendChild(fragment)
}


// Fuction to search records by ID, receive an integer
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

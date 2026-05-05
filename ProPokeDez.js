//<a href=""><img src="https://img.pokemondb.net/sprites/x-y/normal/bulbasaur.png" alt="Bulbasaur"></a>


async function loadData() {
    try {
        const response = await fetch('./proPokeDez.json');
        const data = await response.json();

        const nombre_001 = document.getElementById('nombre_001');
        nombre_001.textContent = data.Bulbasaur[2].name1;

    } catch (error) {
        console.error('Error loading JSON:', error);
    }
    
}

loadData()

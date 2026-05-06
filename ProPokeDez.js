//<a href=""><img src="https://img.pokemondb.net/sprites/x-y/normal/bulbasaur.png" alt="Bulbasaur"></a>
const go_Kanto = document.getElementById("go_Kanto")
const home_Section = document.getElementById("home_Section")
const kanto_Region_Section = document.getElementById("kanto_Region_Section")


let current_charateristic

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
go_Kanto.addEventListener('click', goToKantoFunction)

loadData()



function goToKantoFunction() {
    home_Section.style.display = "none"
    kanto_Region_Section.style.display = "flex"
}


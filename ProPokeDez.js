//<a href=""><img src="https://img.pokemondb.net/sprites/x-y/normal/bulbasaur.png" alt="Bulbasaur"></a>
const go_Kanto = document.getElementById("go_Kanto")
const home_Section = document.getElementById("home_Section")
const kanto_Region_Section = document.getElementById("kanto_Region_Section")

let cardPoke = document.querySelectorAll('.cardPoke')
let overlay = document.getElementById('modalOverlay');



function iniciarPagina() {
    go_Kanto.addEventListener('click', goToKantoFunction)
}

//async function loadData() {
//    try {
 //       const response = await fetch('./proPokeDez.json');
  //      const data = await response.json();
//
 //   } catch (error) {
  //      console.error('Error loading JSON:', error);
   // }
    
//}
//loadData() I want 

cardPoke.forEach((card) => {
  card.addEventListener('click', () => {
    overlay.classList.add('is-visible');
  });
});


function goToKantoFunction() {
    home_Section.style.display = "none"
    kanto_Region_Section.style.display = "flex"
}

window.addEventListener('click', (event) => {
  if(overlay.classList == 'overlay-container is-visible' && event.target == overlay) {
    overlay.classList.remove('is-visible');
  }

});

window.addEventListener("load", iniciarPagina())


//<a href=""><img src="https://img.pokemondb.net/sprites/x-y/normal/bulbasaur.png" alt="Bulbasaur"></a>
const go_Kanto = document.getElementById("go_Kanto")
const home_Section = document.getElementById("home_Section")
const kanto_Region_Section = document.getElementById("kanto_Region_Section")
const openBtn = document.getElementById('openBtn');
const overlay = document.getElementById('modalOverlay');




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
//loadData()



openBtn.addEventListener('click', () => {
  overlay.classList.add('is-visible');
});

overlay.addEventListener('click', (event) => {
  if (event.target === overlay) {
    overlay.classList.remove('is-visible');
  }
});

function goToKantoFunction() {
    home_Section.style.display = "none"
    kanto_Region_Section.style.display = "flex"
}



window.addEventListener("load", iniciarPagina())

//window.addEventListener('click', (event) => {
 //   const x = event.clientX;
 //   const y = event.clientY;
 //   console.log(`Click coordinates - X: ${x}, Y: ${y}`);
//});
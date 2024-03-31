//Elementos Html
const BotonEmpezar = document.getElementById("empezar");
const barraProgreso = document.querySelector("#barraProgreso div");
const correctasElement = document.querySelector("#correctas span");
const incorrectasElement = document.querySelector("#incorrectas span");
const ppmElement = document.querySelector("#ppm span");
const final = document.querySelector("#final");
const botonReiniciar = document.querySelector("#final button");
const PalabraContainer = document.getElementById("palabraActual");
const input = document.querySelector("input");
let jugando = false;

//Variables
const tiempojuego = 60;
let letrasCorrecta;
let letrasIncorrectas;
let palabrasTerminadas;
let listaLetras = [];
let indiceActual;

//Funciones
function empezar(){
  jugando = true;
  PalabraContainer.classList.toggle("escondido", false);
  palabra();
  letrasCorrecta = 0;
  letrasIncorrectas = 0;
  palabrasTerminadas = 0;
  final.classList.toggle("escondido", true)
  listaLetras[indiceActual].classList.toggle("letraActual")
  barraProgreso.classList.toggle("completarTiempo", true)
  BotonEmpezar.classList.toggle("escondido", true)

}

function palabra(){

  if(listaLetras.length > 0) listaLetras.forEach(letra => PalabraContainer.removeChild(letra));
  const palabraElegida = Math.floor(Math.random()*palabrasArray.length);
  const palabraLetra = palabrasArray[palabraElegida];
  listaLetras = [];
  indiceActual = 0;
  for (let i = 0; i < palabraLetra.length; i++) {
    const letraElement = document.createElement("span");
    letraElement.textContent = palabraLetra[i];
    PalabraContainer.appendChild(letraElement);
    listaLetras.push(letraElement);
  }
 
}

function crearLetraEfecto(element){

  element.classList.toggle("invisible", true);
  const letra = element.textContent;
  const posicionLetra = element.getBoundingClientRect();
  const nuevaLetra = document.createElement("span");
  nuevaLetra.style = `
  left: ${posicionLetra.left}px;
  top: ${posicionLetra.top}px;  
  `;

  nuevaLetra.classList.add("desaparecer");
  nuevaLetra.textContent = letra;
  document.body.appendChild(nuevaLetra); 
};

//Eventos
BotonEmpezar.addEventListener("click",() => empezar())
botonReiniciar.addEventListener("click",() => empezar())


barraProgreso.addEventListener("animationend", () =>{
   jugando = false
   final.classList.toggle("escondido", false)
   barraProgreso.classList.toggle("completarTiempo", false)
   correctasElement.textContent = letrasCorrecta
   incorrectasElement.textContent = letrasIncorrectas
   ppmElement.textContent = palabrasTerminadas*(60/tiempojuego);
   PalabraContainer.classList.toggle("escondido", true);
})


//Ejecuccion

input.focus();

document.documentElement.style.setProperty("--tiempo", tiempojuego + "s")
//palabra();

input.addEventListener("input",(event) => {

    if(!jugando){
      if(event.data === " ") empezar();
      return
    }

    if (event.data === listaLetras[indiceActual].textContent) {

    crearLetraEfecto(listaLetras[indiceActual]); 
    indiceActual++;
    letrasCorrecta++;
    if(indiceActual === listaLetras.length){

      palabra();
      palabrasTerminadas++;

    }
    listaLetras[indiceActual].classList.toggle("letraActual")
}
    else{

      letrasIncorrectas++;

}

});
input.addEventListener("blur", () => input.focus());
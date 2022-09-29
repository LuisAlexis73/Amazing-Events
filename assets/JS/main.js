
const URI = 'https://amazing-events.herokuapp.com/api/events'

let cards = document.getElementById("cardHome")

let eventos = []

cargarDatos(URI)

function cargarDatos(url){
  fetch(url).then(respuesta => respuesta.json()).then(data =>{
    eventos = data.events
    pintarCards(eventos)
    pintarCheck(eventos)
  })
}

function pintarCards(array){
  cards.innerHTML = ""
  if(array.length == 0){
    let cartelError = document.createElement('div')
    cartelError.className = 'cartel-error'
    cartelError.innerHTML = `<p> search error. event not found</p>`
    cards.appendChild(cartelError)
  } else{
    array.forEach(card1 => {
      let div = document.createElement('div')
      div.className = "cardEvents"
      div.style.width = "18rem"
      div.innerHTML = `<img src="${card1.image}" class="card-img-top card-mobile" alt="...">
      <div class="card-body">
      <h5 class="card-title">${card1.name} </h5>
      <p class="card-text">${card1.category} </p>
      <div class="precio-vermas d-flex justify-content-around align-items-center">
      <p>$ ${card1.price}</p>
      <a href="details.html?id=${card1.name}" class="btn">More Details</a>
      </div>
      </div>`
      cards.appendChild(div)
    });
  }
}


let categoria = document.getElementById('categorias')

function pintarCheck(){
  let categoriaCheck = []
  eventos.forEach(event =>{
    if(!categoriaCheck.includes(event.category)){   
      categoriaCheck.push(event.category)            
    } 
  });
  categoriaCheck.forEach(check => {
    let divCheck = document.createElement('div')
    divCheck.className = "contenedor-checks"
    divCheck.innerHTML=  `
    <label for="${check}"> ${check}
    </label> 
    <input type="checkbox" value="${check}" id="${check}" >
    `
    categoria.appendChild(divCheck)
  });
}


function verificarSeleccion(array){
  let checkBuscado = []
  let checkButton = document.querySelectorAll("input[type= 'checkbox']")
  let check1 = Array.from(checkButton)
  let seleccionados = check1.filter(checkBox => checkBox.checked).map(check => check.value)
  checkBuscado = array.filter(evento => seleccionados.includes(evento.category))

  if(checkBuscado.length == 0){
    return array
  }else{
    return checkBuscado
  }
}

categoria.addEventListener('change', ()=>{
  let primerFiltro = verificarSeleccion(eventos)
  let segundoFiltro = filtrarPorInput(primerFiltro, buscar.value)
  pintarCards(segundoFiltro, 'cardHome')
})


let buscar = document.getElementById('search')

function filtrarPorInput(array, text){
  let arrayFiltrado = array.filter(elemento => elemento.name.toLowerCase().includes(text.toLowerCase()))
  return arrayFiltrado
}

buscar.addEventListener('keyup', ()=>{
  let datosBuscados = filtrarPorInput(eventos, buscar.value)
  let datosFiltrados = verificarSeleccion(datosBuscados)
  pintarCards(datosFiltrados, 'cardHome')
})



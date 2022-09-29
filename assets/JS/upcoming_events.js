var URI = 'https://amazing-events.herokuapp.com/api/events'

let cardEvent = document.getElementById('cardEvents')

let eventos = []
let cDate = []

cargarDatos(URI)

function cargarDatos(url){
  fetch(url).then(respuesta => respuesta.json()).then(data =>{
    eventos = data.events
    cDate = data.currentDate
    pintarCards(eventos)
    pintarCheck(eventos)
  })
}

function pintarCards(futuros){
  cardEvent.innerHTML = ""
  if(futuros.length == 0){
    let cartelError = document.createElement('div')
    cartelError.className = 'cartel-error'
    cartelError.innerHTML = `<p> search error. event not found</p>`
    cardEvent.appendChild(cartelError)
  }else{
    futuros.filter(evento => evento.date >= cDate)
    .forEach(evento => {
      let div = document.createElement('div')
      div.className = 'cardEvents'
      div.style.width = '18rem'
      div.innerHTML = `<img src="${evento.image}"  
      class="card-img-top" alt="...">
      <div class="card-body">
      <h5 class="card-title">${evento.name}</h5>
      <p class="card-text">${evento.category}</p>
      <div class="precio-vermas d-flex justify-content-around align-items-center">
      <p>$ ${evento.price}</p>
      <a href="details.html?id=${evento.name}" class="btn">More Details</a>
      </div>
      </div>`
      cardEvent.appendChild(div)
    });
  }
    
}
// pintarCards(eventos)

let upComingCategorie = document.getElementById('categorias')

function pintarCheck(){
  let categoriaCheck = []
  eventos.forEach(event =>{
    if(!categoriaCheck.includes(event.category)){   
      categoriaCheck.push(event.category)            
    }
  });
  categoriaCheck.forEach(check => {
    let div = document.createElement('div')
    div.className = "contenedor-checks"
    div.innerHTML=  `
    <label for="${check}"> ${check}
    </label> 
    <input type="checkbox" value="${check}" id="${check}" >
    `
    upComingCategorie.appendChild(div)
  });
}
// pintarCheck()


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

upComingCategorie.addEventListener('change', ()=>{
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


var URI = "https://amazing-events.herokuapp.com/api/events"

let cardDetails = document.getElementById('details')

let params = location.search
let id = new URLSearchParams(params).get('id')

let eventos = []
cargarDatos(URI)

function cargarDatos(URL){
    fetch(URL).then(respuesta => respuesta.json()).then(data =>{
        eventos = data.events
        pintarDetailCard(id)
    })
}

function pintarDetailCard(detailId){
    let eventFind = eventos.find(elemento => elemento.name == detailId)
    let div = document.createElement('div')
    div.className = 'detailsCard'
    if(eventFind.assistance != undefined){
        div.innerHTML = `
        <div class="img-details">
            <img src='${eventFind.image}' class="card-img">
        </div>
        <div class="card-descripcion">
            <h5 >${eventFind.name}</h5>
            <h6>${eventFind.category}:</h6>
            <p >Description: ${eventFind.description}</p>
            <p >Place: ${eventFind.place}</p>
            <p>Date: ${eventFind.date}</p>
            <p>Location: ${eventFind.place}</p>
            <p>Capacity: ${eventFind.capacity}</p>
            <p>Assistance: ${eventFind.assistance}</p>
            <p>Price: ${eventFind.price}</p>
        </div>`
        cardDetails.appendChild(div)
    }else{
        div.innerHTML = `
        <div class="img-details">
            <img src='${eventFind.image}' class="card-img">
        </div>
        <div class="card-descripcion">
            <h5 >${eventFind.name}</h5>
            <h6>${eventFind.category}:</h6>
            <p >Description: ${eventFind.description}</p>
            <p >Place: ${eventFind.place}</p>
            <p>Date: ${eventFind.date}</p>
            <p>Location: ${eventFind.place}</p>
            <p>Capacity: ${eventFind.capacity}</p>
            <p>Assistance: ${eventFind.estimate}</p>
            <p>Price: ${eventFind.price}</p>
        </div>`
        cardDetails.appendChild(div)
    }
}


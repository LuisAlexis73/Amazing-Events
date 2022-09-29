var URI = "https://amazing-events.herokuapp.com/api/events"

let lowestPersentage = document.getElementById('lowestPersentage')
let largerCapacity = document.getElementById('largerCapacity')
let highestPercentage = document.getElementById('highestPercentage')
let upcommingCategories = document.getElementById('upcommingCategories')
let pastCategories = document.getElementById('pastCategories')

let eventos = []
let cDate = []
let attendance = []
let upcoming = []
let past = []

cargarDatos(URI)

function cargarDatos(URL){
    fetch(URL).then(respuesta => respuesta.json()).then(data =>{
        eventos = data.events
        cDate = data.currentDate
        upcoming = eventos.filter(evento => evento.date >= cDate)
        past = eventos.filter(evento => evento.date <= cDate)
        pintarRow(eventos)
        ordenarPorPorcentaje(eventos)
        ingresosYAsistencias(eventos)
        tableStats(eventos, upcommingCategories)
        tableStats(past, pastCategories)
    })
}

function ordenarPorPorcentaje(evento){
    evento.forEach(elemento => {
        if(elemento.assistance != undefined){
            attendanceCalc =  Math.round(((elemento.assistance) * 100) / elemento.capacity)
            attendance.push([elemento.name, attendanceCalc])   
        }
    })
    attendance.sort(function(a, b){
        return b[1] - a[1]
    })
    lowestPersentage.innerText = (attendance[attendance.length-1]) + ' %'
    highestPercentage.innerText = (attendance[0]) + ' %'
}

function pintarRow(array){
    array.sort(function (a, b){
        return b.capacity - a.capacity
    })
    
    largerCapacity.innerText = (array[0].name)
}

function ingresosYAsistencias(array){
    let categorias = []
    let arrayStats= []
    array.forEach(evento => {
        if(!categorias.includes(evento.category)){
            categorias.push(evento.category)
        }
    })
    
    categorias.forEach(categoria => {
        let eventosFilteredTable = array.filter(evento => evento.category == categoria)
        let ingresos = eventosFilteredTable.map(evento => ((evento.assistance ?evento.assistance :evento.estimate) * evento.price))
        let totalIngresos = ingresos.reduce((actual, siguiente) => actual = actual + siguiente, 0)
        
        let porcentajeAsistencia = eventosFilteredTable.map(evento => (evento.assistance ?evento.assistance :evento.estimate) / evento.capacity)
        let promedioAsistencias = Math.round((porcentajeAsistencia.reduce((actual , siguiente)=> actual = actual + siguiente, 0) / porcentajeAsistencia.length)*100)
        arrayStats.push([categoria,totalIngresos,promedioAsistencias])
    })
    return arrayStats
}

function tableStats(array, contenedor){
    let eventStats = ingresosYAsistencias(array)
    eventStats.forEach(eventStats =>{
        let fila = document.createElement('tr')
        fila.innerHTML =   
        `
            <td>${eventStats[0]}</td>
            <td>$ ${eventStats[1]}</td>
            <td>${eventStats[2]}%</td>
        `
        contenedor.appendChild(fila)
    })
}

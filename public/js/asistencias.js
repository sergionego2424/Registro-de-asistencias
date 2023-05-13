const tabla = document.getElementById('tabla-asistencias');
const id = document.getElementById('id')
const fecha = document.getElementById('fecha');
console.log('asistencias')
window.onload = () => {
    datos(id.value, fecha.value);   
    listener()    
}


const listener = () => {
    const inputs = document.getElementsByClassName('input-search');

    for(let i = 0; i < inputs.length ; i++){
        inputs[i].addEventListener('keypress' , () => {
            const id = inputs[0].value;
            const fecha = inputs[1].value;
            datos(id, fecha)
        })
    }
}

const datos = (idEmpleado, FechaEmpleado)=>{
    while (tabla.firstChild) {
            tabla.removeChild(tabla.lastChild);        
    }
    const resultados = fetch(`getAsistencias?id=${idEmpleado}&fecha=${FechaEmpleado}`)
        .then((res) => {
            return res.json()
        }).then(data => {

            const tr1 = document.createElement('tr')
                
                const tdIdTitulo = document.createElement('td')
                tdIdTitulo.innerHTML = "ID";
                tr1.appendChild(tdIdTitulo)
           
                
                const tdLatTitulo = document.createElement('td')
                tdLatTitulo.innerHTML = "LAT";
                tr1.appendChild(tdLatTitulo)

                
                const tdLonTitutlo = document.createElement('td')
                tdLonTitutlo.innerHTML = "LON";
                tr1.appendChild(tdLonTitutlo)

                
                const tdFechaTitutlo = document.createElement('td')
                tdFechaTitutlo.innerHTML = "FECHA";
                tr1.appendChild(tdFechaTitutlo)

                
                const tdHoraTitulo = document.createElement('td')
                tdHoraTitulo.innerHTML = "HORA";
                tr1.appendChild(tdHoraTitulo)

                
                const tdTipoTitulo = document.createElement('td')
                tdTipoTitulo.innerHTML = "TIPO";
                tr1.appendChild(tdTipoTitulo)

                tabla.appendChild(tr1)

            for(let i = 0 ; i < data[0].length ; i++){
                

                const tr = document.createElement('tr')
                
                const tdId = document.createElement('td')
                tdId.innerHTML = data[0][i].idEmpleado;
                tr.appendChild(tdId)

                const tdLat = document.createElement('td');
                tdLat.innerText = data[0][i].lat
                tr.appendChild(tdLat)

                const tdLon = document.createElement('td');
                tdLon.innerText = data[0][i].lon
                tr.appendChild(tdLon)

                const tdFecha = document.createElement('td');
                tdFecha.innerText = data[0][i].fecha
                tr.appendChild(tdFecha)

                const tdHora = document.createElement('td');
                tdHora.innerText = data[0][i].hora
                tr.appendChild(tdHora)

                const tdTipo = document.createElement('td');
                tdTipo.innerText = data[0][i].tipo
                tr.appendChild(tdTipo)

                tabla.appendChild(tr)
            }
        })
}
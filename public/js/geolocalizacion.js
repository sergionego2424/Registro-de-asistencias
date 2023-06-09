const btnAsistencia = document.getElementById('btnAsistencia');
const btnSalida = document.getElementById('btnSalida')
const email = document.getElementById('email');

const fecha = () => {
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    const date = hoy.toLocaleDateString();

    return date.split('/').reverse().join().replaceAll(',', "-")
}


const insertAsistencia = (url = "", data = {}) => {
    // Default options are marked with *
    fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
   
}

btnAsistencia.addEventListener('click', () => {
    const today = new Date();
    const now = today.toLocaleTimeString('en-US');

    navigator.geolocation.getCurrentPosition((position) => {
        const result = {
            lat: position.coords.latitude.toString(),
            lon: position.coords.longitude.toString(),
            email: email.innerHTML,
            date: fecha(),
            hora: now
        }



        confirmarLugar(25.441923,-100.860815, result)

        
    }, (error) => {
        console.log(error)
    });
})

btnSalida.addEventListener('click', () => {
    const today = new Date();
    const now = today.toLocaleTimeString('en-US');

    navigator.geolocation.getCurrentPosition((position) => {
        const result = {
            lat: position.coords.latitude.toString(),
            lon: position.coords.longitude.toString(),
            email: email.innerHTML,
            date: fecha(),
            hora: now
        }

        console.log(result)

        insertAsistencia("/salida",  result)

        
    }, (error) => {
        console.log(error)
    });
})

    
const confirmarLugar = (latEmpleado, lonEmpleado, result) => {
    fetch('getLugares').then(response => {
        return response.json()
    }).then(data => {
        for(let i = 0 ;  i< data[0].length ;  i++){
            console.log("-------" + data[0][i].nombre + "--------")
            console.log('------lat--------')
            console.log(latEmpleado >= data[0][i].lat1 )
            console.log(latEmpleado <= data[0][i].lat2 )

            console.log('------lon--------')
            console.log(lonEmpleado >=  data[0][i].lon2 )
            console.log(lonEmpleado <=  data[0][i].lon1 )
            if(latEmpleado >= data[0][i].lat1  &&  latEmpleado <= data[0][i].lat2){
                if(lonEmpleado >= data[0][i].lon2 && lonEmpleado <= data[0][i].lon1){
                    console.log(data[0][i].nombre)
                    alert("Has registrado asistencia en " + data[0][i].nombre)
                    insertAsistencia("/asistencia",  result)
                }else{
                    alert("No estas dentro de los limites permitidos")
                    console.log("No estas dentro de los limites permitidos");
                }
            }
        }
    })
    
} 


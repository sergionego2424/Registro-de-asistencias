let map;
let markers = [];

const createMarker = (coord, name, empleado,hora)=>{
    if(name == "Entrada"){
        const marker = new google.maps.Marker({
            position: coord,
            map:map,
            icon: "Icon/entrar.png",
        })

        const infoWindow = new google.maps.InfoWindow();
        let html = `<h3>Entrada</h3>
        <p>Empleado: `+empleado+`</p>
        <p>Hora: `+hora+`</p>`;
        google.maps.event.addListener(marker,"click",()=>{
            infoWindow.setContent(html);
            infoWindow.open(map,marker);
        })
        
        markers.push(marker)
    }
    if (name == "Salida"){
        const marker = new google.maps.Marker({
            position: coord,
            map:map,
            icon: "Icon/salir.png",
        })

        const infoWindow = new google.maps.InfoWindow();
        let html = `<h3>Salida</h3>
        <p>Empleado: `+empleado+`</p>
        <p>Hora: `+hora+`</p>`;
        google.maps.event.addListener(marker,"click",()=>{
            infoWindow.setContent(html);
            infoWindow.open(map,marker);
        })

        markers.push(marker)
    }
}

const createLocationMarkers = ()=>{
    registros.forEach(registro => {
        let coord = new google.maps.LatLng(registro.lat, registro.lng);
        let name = registro.name;
        let empleado = registro.Empleado;
        let hora = registro.hora;
        createMarker(coord,name, empleado, hora);
    })
}

function initMap(){
    let ubicacionActual = {lat: 41.390205, lng: 2.154007}

    map = new google.maps.Map(document.getElementById("map"),{
        center:ubicacionActual,
        zoom: 14
    })

    const marker = new google.maps.Marker({
        position: ubicacionActual,
        map:map,
    })

    const infoWindow = new google.maps.InfoWindow();
        let html = `<h3>Ubicacion Actual</h3>`;
        google.maps.event.addListener(marker,"click",()=>{
            infoWindow.setContent(html);
            infoWindow.open(map,marker);
        })

    createLocationMarkers();    
}


const tabla = document.getElementById('tabla-empleados');
window.onload = () => {
    const resultados = fetch('getEmpleados')
        .then((res) => {
            return res.json()
        }).then(data => {
            const empleados = data[0];
            for(let i = 0 ; i < empleados.length; i++){
                console.log(empleados[i])
                const tr = document.createElement('tr')
                
                const tdId = document.createElement('td')
                tdId.innerHTML = empleados[i].IdEmpleado
                tr.appendChild(tdId)

                const tdNombre = document.createElement('td')
                tdNombre.innerHTML = empleados[i].nombre
                tr.appendChild(tdNombre)

                const tdApellidos = document.createElement('td')
                tdApellidos.innerHTML = empleados[i].apellidos
                tr.appendChild(tdApellidos)

                const tdCorreo = document.createElement('td')
                tdCorreo.innerHTML = empleados[i].correo
                tr.appendChild(tdCorreo)

                const tdEliminar = document.createElement('td')
                const btnEliminar = document.createElement('button')
                btnEliminar.textContent ="Eliminar" 
                btnEliminar.setAttribute('class' , "btnEliminar")
                btnEliminar.name = empleados[i].IdEmpleado
                tdEliminar.appendChild(btnEliminar)
                tr.appendChild(tdEliminar)

                tabla.appendChild(tr)
            }
    
        })
        
}


const eliminarEmpleado = () => {
    const btn = document.getElementsByClassName('btnEliminar');
    for(let i = 0 ;  i <  btn.length ; i++){
        btn[i].addEventListener('click' , () => {
            const idEmpleado = btn[i].getAttribute('name')

            fetch('eliminarEmpleado?idEmpleado=' + idEmpleado).then((response) => {
                  
            })
            
            location.reload(true)  
        })
    }
}

const modificarEmpleado = () => {
    const idUsuario = document.getElementById('idUsuario');
    const btnModificar = document.getElementById('btnModificar')
    const nombre =  document.getElementById('nombre');
    const apellidos = document.getElementById('apellidos');
    const emial = document.getElementById('email');

    idUsuario.addEventListener('keypress', () => {
        setTimeout(()=> {
            const idEmpleado = idUsuario.value
            fetch('getEmpleadoById?idEmpleado=' + idEmpleado).then(result => {
                return result.json();
            }).then(data => {
               nombre.value = data[0][0].nombre;
                apellidos.value = data[0][0].apellidos;
                email.value = data[0][0].correo;
            }).catch(error => {
                console.log('no existe el usuario')
            })
        },200)
        
    })

    btnModificar.addEventListener('click', () => {
        const objeto = {
            id : idUsuario.value,
            nombre : nombre.value,
            apellidos : apellidos.value,
            email : email.value
        }

        console.log(objeto)
    })
}

modificarEmpleado();

setTimeout(()=> {
    eliminarEmpleado()
},1000)
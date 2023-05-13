const {insertAsistencia, insertarSalida, getAsistencias} = require('../controller/asistencia');
const {inicioSesion,inicioSesionAdministrador} = require('../controller/inicioSesion');
const {insertarEmpleadoNuevo, getListEmpleados, eliminarEmpleado, getEmpleadoById, updateEmpleado} = require('../controller/empleado');
const {registrarse} = require('../controller/registrar')

const express = require('express');
const router = express.Router()


router.get('/' , (req, res) => {
    


    /*res.render('index', {
        nombre : req.session.nombre,
        id : req.session.ID
    })
    */

    res.render('index');
})

router.get("/Login" , (req, res) => {

    if(req.query.error){
        res.render('Login', {
            error : "No concide con ningun usuario"
        })
    }else{
        res.render('Login')
    }
})

router.post("/Login" , (req, res) => {
    const usuario = {
        email : req.body.usuario,
        password : req.body.password
    }
    //`spIniciarSesion`(@p0, @p1)
    const contador = inicioSesion(usuario,req, res)
    
})
router.get("/RegistrarAsistencia" , (req, res) => {
    console.log(req.session)
    res.render('RegistrarAsistencia', {
        email : req.session.email
    })
    
})



router.get("/signup" , (req, res) => {
    if(req.query.error){
        res.render('signup', {
            error : "No concide con ningun usuario"
        })
    }
    else if(req.query.pass){
        res.render('signup', {
            error : "Las contraseñas no coinciden"
        })
    }
    else if(req.query.correcto){
        res.render('signup', {
            correcto : "Se a registrado correctamente!"
        })
    }
    else{
        res.render('signup')
    }
})

router.post("/signup" , (req, res) => {
    
    //`spIniciarSesion`(@p0, @p1)
    const contador = registrarse(req.body,req, res)
    
})


router.get("/Inicio" , (req, res) => {
    res.render('Inicio')
})

router.get("/AdministracionInicio" , (req, res) => {
    if(req.query.error){
        res.render('AdministracionInicio', {
            error : "No concide con ningun usuario"
        })
    }else{
        res.render('AdministracionInicio')
    }
})
router.post("/AdministracionInicio" , (req, res) => {

    const usuario = {
        usuario : req.body.usuario,
        password : req.body.password
    }

    const contador = inicioSesionAdministrador(usuario,req, res)

})

router.get("/MenuAdmin" , (req, res) => {
    res.render('MenuAdmin')
})
router.get("/RegistrarEmpleado" , (req, res) => {
    if(req.query.insertado){
        res.render('RegistrarEmpleado', {
            ok : "El usuario ya se ha insertado"
        })
    }else{
        res.render('RegistrarEmpleado')
    }
})

router.post("/RegistrarEmpleado" , (req, res) => {

    const usuario = {
        nombre : req.body.nombre,
        apellidos : req.body.apellidos,
        email : req.body.email
    }
    
    console.log(usuario)

    const contador = insertarEmpleadoNuevo(usuario,req, res)

})

router.post('/asistencia' , (req, res) => {
    
    insertAsistencia( req.body)
})
router.post('/salida' , (req, res) => {
    
    insertarSalida( req.body)
})


router.get("/localizacion" , (req, res) => {
    res.render('localizacion')
})


router.use("/Empleados" , (req, res) => {
    res.render('Empleados')
})

router.get("/getEmpleados" , (req, res) => {
    getListEmpleados(req, res)
})

router.get("/eliminarEmpleado" , (req, res) => {
    console.log(req.query)
    const idEmpleado = req.query.idEmpleado;

    eliminarEmpleado(req, res, idEmpleado)
})
router.get("/getEmpleadoById" , (req, res) => {
    const idEmpleado = req.query.idEmpleado;

    getEmpleadoById(req, res, idEmpleado)
})


router.post("/updateEmpleado" , (req, res) => {


    updateEmpleado(req, res, req.body)
})


router.use("/Asistencias" , (req, res) => {
    res.render('Asistencias')
})

router.get("/getAsistencias" , (req, res) => {
    getAsistencias(req, res, req.query)
})



module.exports = router;
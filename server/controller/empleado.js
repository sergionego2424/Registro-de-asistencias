
const config = require('./conexion.js')
const {ip} = require('./variablesGlobales.js');
var mysql = require('mysql');



const insertarEmpleadoNuevo = (empleado = {},req, res) => {
    console.log(empleado)
  
    var con = mysql.createConnection({
      host: ip,
      user: "root",
      password: "",
      database : 'Empresa'
    });
    let contador = 0;
     con.connect(function(err) {
      if (err) throw err;
        con.query(`CALL spInsertarEmpleado(?,?, ?)`,[empleado.nombre, empleado.apellidos, empleado.email], function (err, result, fields) {
        res.redirect('RegistrarEmpleado?insertado=true')
        con.end()
      });
    })
  }


  const getListEmpleados = (req, res) => {
   
    var con = mysql.createConnection({
      host: ip,
      user: "root",
      password: "",
      database : 'Empresa'
    });
    let contador = 0;
     con.connect(function(err) {
      if (err) throw err;
        con.query(`CALL spGetEmpleados`, function (err, result, fields) {
        console.log(result)
        res.send(
          result
        )
          //res.redirect('RegistrarEmpleado?insertado=true')
        con.end()
      });
    })
  }

  const eliminarEmpleado = (req, res, idEmpleado) => {
   
    var con = mysql.createConnection({
      host: ip,
      user: "root",
      password: "",
      database : 'Empresa'
    });
    let contador = 0;
     con.connect(function(err) {
      if (err) throw err;
        con.query(`DELETE FROM empleado WHERE IdEmpleado = ${idEmpleado}`, function (err, result, fields) {
        if(err) throw err
          
        con.end()
      });
    })
  }

  const getEmpleadoById = (req, res, idEmpleado) => {
   
    var con = mysql.createConnection({
      host: ip,
      user: "root",
      password: "",
      database : 'Empresa'
    });
    let contador = 0;
     con.connect(function(err) {
      if (err) throw err;
        con.query(`CALL spGetEmpleadoByID (?)`,[idEmpleado], function (err, result, fields) {
        if(err) throw err
        res.send(result)
        con.end()
      });
    })
  }

  const updateEmpleado = (req, res, empleado) => {
    console.log('update')
    console.log(empleado.email)
    var con = mysql.createConnection({
      host: ip,
      user: "root",
      password: "",
      database : 'Empresa'
    });
    let contador = 0;
     con.connect(function(err) {
      if (err) throw err;
        con.query(`CALL spUpdateEmpleado (?, ?, ? ,?)`,[empleado.idUsuario, empleado.nombre, empleado.apellidos, empleado.email], function (err, result, fields) {
        if(err) throw err
        res.redirect('Empleados')
        con.end()
      });
    })
  }

  
  module.exports = {insertarEmpleadoNuevo, getListEmpleados,eliminarEmpleado,getEmpleadoById, updateEmpleado}
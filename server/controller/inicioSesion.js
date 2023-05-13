const config = require('./conexion.js')
const {ip} = require('./variablesGlobales.js');
var mysql = require('mysql');



const inicioSesion = (empleado = {},req, res) => {


    var con = mysql.createConnection({
      host: ip,
      user: "root",
      password: "",
      database : 'Empresa'
    });
    let contador = 0;
     con.connect(function(err) {
      if (err) throw err;
        con.query(`CALL spIniciarSesion(?,?)`,[empleado.email, empleado.password], function (err, result, fields) {
        if (err) throw err; 
        contador = result[0][0].contador;
        if(contador == 1){
            req.session.email = empleado.email;
            res.redirect('RegistrarAsistencia')
        }else{
          console.log('error')
            res.redirect('Login?error=true')
        }
        con.end()
      });
    })
}

const inicioSesionAdministrador = (empleado = {},req, res) => {
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
      con.query(`CALL spIniciarSesionAdministrador(?,?)`,[empleado.usuario, empleado.password], function (err, result, fields) {
      if (err) throw err; 
      contador = result[0][0].contador;
      if(contador == 1){
          req.session.email = empleado.email;
          res.redirect('MenuAdmin')
      }else{
        console.log('error')
          res.redirect('AdministracionInicio?error=true')
      }
      con.end()
    });
  })
}

module.exports = {inicioSesion, inicioSesionAdministrador}
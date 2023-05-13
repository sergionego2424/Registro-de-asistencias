const config = require('./conexion.js')
const {ip} = require('./variablesGlobales.js');
var mysql = require('mysql');




const registrarse = (empleado = {},req, res) => {
  console.log(empleado)

  var con = mysql.createConnection({
    host: ip,
    user: "root",
    password: "",
    database : 'Empresa'
  });
  let contador = 0;
  console.log(empleado)
   if(empleado.password1 == empleado.password2){
    con.connect(function(err) {
        if (err) throw err;
          con.query(`CALL spRegistrarse(?,?)`,[empleado.correo, empleado.password1], function (err, result, fields) {
          if (err) res.redirect('signup?error=true'); 
              
            res.redirect('signup?correcto=true')
          
          con.end()
        });
      })
   }else{
    console.log('error')
    res.redirect('signup?pass=true')
   }
}

module.exports = {registrarse}
const config = require('./conexion.js')
const {ip} = require('./variablesGlobales.js');
var mysql = require('mysql');


const getLuagres = (req, res) => {
    
    var con = mysql.createConnection({
      host: ip,
      user: "root",
      password: "",
      database : 'Empresa'
    });
    
    con.connect(function(err) {
      if (err) throw err;
      con.query(`CALL spGetLugares` , function (err, result) {
        if (err) throw err;
        console.log(result)
        res.send(result)
        con.end()
      });
    });
    //con.end()
}

module.exports = {getLuagres}
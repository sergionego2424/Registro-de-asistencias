const config = require('./conexion.js')
const {ip} = require('./variablesGlobales.js');
var mysql = require('mysql');



const insertAsistencia = (objAsistencia = {}) => {
    
  console.log(objAsistencia)
    var con = mysql.createConnection({
      host: ip,
      user: "root",
      password: "",
      database : 'Empresa'
    });
    
    con.connect(function(err) {
      if (err) throw err;
      con.query(`CALL   spInsertarAsistencia( ?, ?, ?, ?, ?)`, [objAsistencia.email, objAsistencia.lat, objAsistencia.lon, objAsistencia.date, objAsistencia.hora], function (err, result) {
        if (err) throw err;
        con.end()
      });
    });
    //con.end()
}



const insertarSalida = (objAsistencia = {}) => {
    
  console.log(objAsistencia)
    var con = mysql.createConnection({
      host: ip,
      user: "root",
      password: "",
      database : 'Empresa'
    });
    
    con.connect(function(err) {
      if (err) throw err;
      con.query(`CALL   spInsertarSalida( ?, ?, ?, ?, ?)`, [objAsistencia.email, objAsistencia.lat, objAsistencia.lon, objAsistencia.date, objAsistencia.hora], function (err, result) {
        if (err) throw err;
        con.end()
      });
    });
    //con.end()
}

const getAsistencias = (req, res, informacion) => {
    
    var con = mysql.createConnection({
      host: ip,
      user: "root",
      password: "",
      database : 'Empresa'
    });
    
    con.connect(function(err) {
      if (err) throw err;
      con.query(`CALL spGetListaAsistencia(?, ?)`,[informacion.id, informacion.fecha] , function (err, result) {
        if (err) throw err;
        res.send(result)
        con.end()
      });
    });
    //con.end()
}

module.exports = { insertAsistencia, insertarSalida, getAsistencias}
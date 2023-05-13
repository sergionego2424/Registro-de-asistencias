require('./server/controller/asistencia')

const router = require('./server/routes/routes');

const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const session = require("express-session");

const app = express();
const PORT = 3000;

app.set('views', 'server/views');
app.set('view engine', 'hbs');

hbs.registerPartials('server/views/partials')

app.use(session({
    secret: "987f4bd6d4315c20b2ec70a46ae846d19d0ce563450c02c5b1bc71d5d580060b",
    saveUninitialized: true,
    resave: true,
}));

app.use(session({
  secret: "123",
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 60000,
    }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/", router);
app.use(express.static('./public'))

app.listen(PORT, () => {
    console.log('el servidor esta corriendo en el puerto ' + PORT);
})
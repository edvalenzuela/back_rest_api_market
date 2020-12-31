//morgan : middleware detalles de servicios
//bodyParser : formato json de respuestas
//cookieParser: guardar cookies

const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const expressValidator = require("express-validator");
require('dotenv').config({
    path: 'variables.env'
});

// Cors para el Http
const cors = require('cors');

//conectar mongodb
// new
const db = async () => {
    try {
        const success = await mongoose.connect(process.env.DB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('DB Connected');
    } catch (error) {
        console.log(`Error DB ${error}`);
    }
}
db();

// old
// mongoose.Promise = global.Promise;
// mongoose
//     .connect(process.env.DB_URL, {
//         useNewUrlParser: true,
//         useCreateIndex: true
//     }).then(() => console.log("DB Connected"));

//crear el servidor
const app = express();

//validaciones
app.use(expressValidator());

//habilitar cors
app.use(cors());

//habilitar express(bodyparser)
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//rutas de la app
app.use('/', routes());

//carpeta publica de las imagenes
app.use(express.static('uploads'));

// puerto
const port = process.env.PORT || 5000;

// escuchando el puerto
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
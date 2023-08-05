const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// --- database remoto --- //
// const postgres = require('postgres');
// require('dotenv').config();

// const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
// const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

// const sql = postgres(URL, { ssl: 'require' });

// ----- //

app.use(bodyParser.urlencoded({ extended: false })) // permite apenas dados simples
app.use(bodyParser.json()) // formato json no body


const rotaTenis = require('./routes/tenis')
app.use('/tenis', rotaTenis)

const rotaPedido = require('./routes/pedido')
app.use('/pedido', rotaPedido)

const rotaUsuario = require('./routes/usuario')
app.use('/user', rotaUsuario)

// const rotaUser = require
// app.use('/user', rotaUser)



module.exports = app


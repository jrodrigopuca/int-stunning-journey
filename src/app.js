/**
 * @author: jarp
 * @summary: API/REST para consultar clima, considerar:
 * - pronóstico actual (ciudad actual)
 * - próximos 5 días (ciudad actual)
 * - de otras ciudades seleccionables
 * - test
 */



//---------------- inicializar -------------------------
const {port} = require('./config')
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes')
const path = require('path');

//---------------- inicializar server-------------------------
const app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


app.listen(process.env.PORT, ()=>{
    console.info(`El server está funcionando en http://localhost:${port}`);
})

app.use('/v1', routes)
app.use('/docs', express.static(path.join(__dirname, 'public'))) // mostrar documentación

module.exports= app;
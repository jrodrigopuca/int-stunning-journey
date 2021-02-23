const express = require('express')
const router = express.Router()
const controller = require('../controllers')
const {showResults} = require('../global')


//---------------- Rutas para /v1/... -------------------------
router.get('/', (req, res)=>{
    res.json(showResults(true,'Bienvenid@ a Stunning Journey'));
})

/**
 * @description: en base a la ip del usuario
 * traer el nombre del lugar donde vive.
 */
router.get('/location', controller.getLocation)
router.get('/current/', controller.getWeather)
router.get('/current/:otherCity', controller.getWeather)
router.get('/forecast/', controller.getForecast)
router.get('/forecast/:otherCity', controller.getForecast)

module.exports = router
const express = require('express')
const router = express.Router()
const controller = require('../controllers')
const {showResults} = require('../global')


//---------------- Rutas para /v1/... -------------------------
router.get('/', (req, res)=>{
    res.json(showResults(true,'Bienvenid@ a Stunning Journey'));
})

router.post('/location', controller.getLocation)


module.exports = router
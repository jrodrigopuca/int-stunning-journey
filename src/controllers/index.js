const fetch = require('node-fetch')
const {showResults} = require('../global')

const getLocation = (req, res)=>{
    const {ip}=req.body
    try {
        fetch(`http://ip-api.com/json/${ip}`)
            .then(localRes=>localRes.json())
            .then(json=> res.json(showResults(true,json)))

    } catch (error) {
        console.log(error.message)
        res.json(showResults(false,'Error en la consulta'))
    }
    

} 

module.exports={
    getLocation
}
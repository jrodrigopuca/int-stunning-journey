const fetch = require('node-fetch')
const {showResults} = require('../global')

const getLocation = async(req, res)=>{
    const {ip}=req.body
    try {
        await fetch(`http://ip-api.com/json/${ip}`)
            .then(localRes=>localRes.json())
            .then(json=> 
                res.json(
                    json.status === "success"?
                        showResults(true,json):
                        showResults(false,"No hay datos disponibles para esta IP")
                ))

    } catch (error) {
        console.log(error.message)
        res.json(showResults(false,'Error en la consulta'))
    }
} 

const getWeather = async(req,res)=>{
    
}


module.exports={
    getLocation
}
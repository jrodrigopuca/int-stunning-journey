const fetch = require('node-fetch')
const {weatherKey } = require('../config')
const {showResults} = require('../global')


/**
 * @function getLocation
 * @description: Controller para traer la ubicación del usuario
 * @returns {result,data}
 */
const getLocation = async(req,res)=>{
    try {
        res.json(showResults(true,await getLocationService()));
    } catch (error) {
        res.json(showResults(false,"Error en traer ubicación"))
    }
}

/**
 * @function getLocationService
 * @description: función para llamar al IP API para traer los datos de ubicación según la IP 
 * @returns {city,region,country}
 */
const getLocationService = ()=>{
    return fetch(`http://ip-api.com/json/`)
            .then(localRes=>localRes.json())
            .then(json=> 
                {
                    if (json.status === "success"){
                        return ({
                            city:json.city,
                            region:json.regionName,
                            country:json.country,                       
                        })
                    }else{
                        throw new Error('Error al buscar ubicación');
                    }
                })   
            .catch(error=>console.log(error))
}

/**
 * @function formatDays: forma para mostrar solo los datos que nos interesa
 * @param {forecast} forecast: objeto que tiene los datos del pronostico 
 */
const formatDays = (forecast)=>{
    return {
            maxTemp: forecast.day.maxtemp_c,
            minTemp: forecast.day.mintemp_c,
            maxWind: forecast.day.maxwind_kph,
            changeOfRain: forecast.day.daily_change_of_rain,
            condition: forecast.day.condition.text,
            icon: forecast.day.condition.icon
        };
}

/**
 * @function getWeatherService: función para llamar al API del Clima
 * @description: Se considera:
 *          - si el usuario especifica ciudad, en caso que no se busca la ciudad actual
 *          - si el usuario especifica dias, se mostrará pronostico (para ciudad actual o especificada)
 * @param {*} res: respuesta 
 * @param {*} specialCity (opcional): si lo especifica trae los datos de la ciudad, sino trae la ciudad actual
 * @param {*} days (opcional): traer pronostico para los X días
 * @returns {city,region,country,temperature, weather,icon,forecast,lastUpdate}: datos filtrados a mostrar
 */
const getWeatherService= async(res,specialCity,days)=>{
    isSetDays=days?`&days=${days}`:"";
    specialCity=specialCity || (await getLocationService()).city; 

        try {
            await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${weatherKey}&q=${specialCity}${isSetDays}`)
            .then(localRes=>localRes.json())
            .then(json=>{
                if (json.error){throw new Error('Error al traer ubicación')}
                forecast=days?json.forecast.forecastday.map(formatDays):[];

                res.json(showResults(true, 
                    {
                        city:json.location.name,
                        region:json.location.region,
                        country:json.location.country,
                        temperature:json.current.temp_c,
                        weather:json.current.condition.text,
                        icon:json.current.condition.icon,
                        forecast:forecast,
                        lastUpdate:json.current.last_updated,
                    }
                ));
            })
            .catch(error=>res.json(showResults(false,error.message)))
        } catch (error) {
            res.json(showResults(false,'consulta rechazada'))
        }
}


/**
 * @function getWeather: traer datos del clima considerando que la ciudad es opcional en el endpoint
 * @returns {result,data}
 */
const getWeather = async(req,res)=>{
    const {otherCity} = req.params;
    await getWeatherService(res,otherCity,null);
}

/**
 * @function getForecast: traer datos del pronostico considerando que la ciudad es opcional en el endpoint
 * @returns {result,data}
 */
const getForecast = async(req,res)=>{
    const {otherCity} = req.params;
    await getWeatherService(res,otherCity,5);
}

module.exports={
    getLocation,
    getWeather,
    getForecast
}
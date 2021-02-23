/**
 * @description:
 * Configuraciones comunes para el proyecto
 */

const dotenv= require('dotenv');
dotenv.config();

module.exports={
    port: process.env.PORT,
    weatherKey: process.env.WEATHER_KEY,
    serverUrl:process.env.SERVER_URL
}

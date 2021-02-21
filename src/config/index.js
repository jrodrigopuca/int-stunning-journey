/**
 * @description:
 * Configuraciones comunes para el proyecto
 */

const dotenv= require('dotenv');
dotenv.config();

module.exports={
    port: process.env.PORT
}

/**
 * @method showResults: para devolver de una forma uniforme cualquier petición
 * @param isOK: true/false según lo devuelto por la petición 
 * @param data: valores devueltos
 * @returns json con estructura en común para cualquier petición
 */
const showResults = (isOK,data)=>{
    return {result: isOK, data: data};
}

module.exports={
    showResults
}
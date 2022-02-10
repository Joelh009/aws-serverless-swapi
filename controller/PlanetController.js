const ApiUtils = require("../common/utils/ApiUtils");
const PlanetService = require("../service/PlanetService");
const Messages = require("../common/constants/messagesConstants"); 
const AppValidator = require("../common/validator/AppValidator");
const SchemaValidator = require('../common/schemas/PlanetValidator');

module.exports.listar = async (event, context, callback) => {

    try {
        var data = await PlanetService.getAllPlanets();
        console.log('PlanetController->listar - data',data);
        return ApiUtils.buildResponse(Messages.MSG_EXITO_GET_PLANETS, data);
    } catch (error) {
        console.log('PlanetController->listar - error',error);
        return ApiUtils.buildErrorResponse(event, error);
    }
    
}

module.exports.listarPorId = async (event, context, callback) => {

    try {
        console.log('event1',event);
        var data = await PlanetService.getPlanetById(event);
        console.log('PlanetController->listarPorId - data',data);
        return ApiUtils.buildResponse(Messages.MSG_EXITO_GET_PEOPLE_BY_ID, data);
    } catch (error) {
        console.log('PlanetController->listarPorId - error',error);
        return ApiUtils.buildErrorResponse(event, error);
    }
    
}

module.exports.registrar = async (event, context, callback) => {

    try {
        await AppValidator.validateRequest(event, SchemaValidator.validateRegister());
        var result = await PlanetService.registerPlanet(event);
        console.log('PlanetController->registrar - result',result);
        return ApiUtils.buildResponse(Messages.MSG_EXITO_REG_PLANET, null);
    } catch (error) {
        console.log('PlanetController->registrar - error',error);
        return ApiUtils.buildErrorResponse(event, error);
    }
    
}

module.exports.actualizar = async (event, context, callback) => {

    try {
        await AppValidator.validateRequest(event, SchemaValidator.validateUpdate());
        var result = await PlanetService.updatePlanet(event);
        console.log('PlanetController->actualizar - result',result);
        return ApiUtils.buildResponse(Messages.MSG_EXITO_UPD_PLANET, null);
    } catch (error) {
        console.log('PlanetController->actualizar - error',error);
        return ApiUtils.buildErrorResponse(event, error);
    }
    
}

module.exports.eliminar = async (event, context, callback) => {

    try {
        console.log('event1',event);
        var result = await PlanetService.deletePlanet(event);
        console.log('PlanetController->eliminar - result',result);
        return ApiUtils.buildResponse(Messages.MSG_EXITO_DLT_PLANET, null);
    } catch (error) {
        console.log('PlanetController->eliminar - error',error);
        return ApiUtils.buildErrorResponse(event, error);
    }
    
}

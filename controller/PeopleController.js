const ApiUtils = require("../common/utils/ApiUtils");
const PeopleService = require("../service/PeopleService");
const Messages = require("../common/constants/messagesConstants"); 

module.exports.listar = async (event, context, callback) => {

    try {
        var data = await PeopleService.getPeople();
        return ApiUtils.buildResponse(Messages.MSG_EXITO_GET_PEOPLE, data);
    } catch (error) {
        console.log('PeopleController->listar - error',error);
        return ApiUtils.buildErrorResponse(event, error);
    }
    
}

module.exports.listarPorId = async (event, context, callback) => {

    try {
        console.log('event1',event);
        var data = await PeopleService.getPeopleById(event);
        console.log('PeopleController->listarPorId - data',data);
        return ApiUtils.buildResponse(Messages.MSG_EXITO_GET_PEOPLE_BY_ID, data);
    } catch (error) {
        console.log('PeopleController->listarPorId - error',error);
        return ApiUtils.buildErrorResponse(event, error);
    }
}

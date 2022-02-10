const ApiUtils = require('../common/utils/ApiUtils');
const SwapiClient = require('../client/SwapiClient');
const PersonaResponse = require('../common/translate/PersonaResponse');
const HttpConstants = require('../common/constants/httpConstants');
const ErrorConstants = require('../common/constants/errorConstants');
const BusinessError = require('../models/error/BusinessError');
const People = require('../common/translate/people');
const map = require('lodash');

class PersonaService {

    static async getPeople() {

        let data = await SwapiClient.getAllPeople();
        console.log(data);
        var personasEncontradas = [];
        if(data.results){
            var personas = data.results;
            personasEncontradas = map(personas, x => People.translate(x));
        }
        
        return personasEncontradas;
    }

    static async getPeopleById(event) {

        var req = ApiUtils.getPathParameters(event);
        console.log('PersonaService - getPeopleById: req ',req);
        console.log('PersonaService - getPeopleById: isNaN ', isNaN(req.id));
        if(isNaN(req.id)){
            throw new BusinessError({
                code: ErrorConstants.PATH_NOT_VALID.code,
                httpCode: HttpConstants.STATUS_BAD_REQUEST.code,
                messages: ErrorConstants.PATH_NOT_VALID.message
            });
        }
        let res = await SwapiClient.getPeopleById(req.id);
        console.log('PersonaService - getPeopleById: Data ',res);

        var personaEncontrada = {};
        if(res.status){
            personaEncontrada = new PersonaResponse(res.data); 
        }
        return personaEncontrada;
    }
}
module.exports = PersonaService;
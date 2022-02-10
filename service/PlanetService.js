const ApiUtils = require('../common/utils/ApiUtils');
const PlanetDB = require('../database/PlanetDB');
const Planet = require('../models/constructor/Planet');
const BusinessError = require('../models/error/BusinessError');
const HttpConstants = require('../common/constants/httpConstants');
const ErrorConstants = require('../common/constants/errorConstants');
class PlanetService {

    static async registerPlanet (event){
        var data = ApiUtils.getRequest(event);
        console.log("PlanetService->registerPlanet - data",data);
        let result = await PlanetDB.registerPlanet(data);
        console.log("PlanetService->registerPlanet - result",result);
        return result;
    }

    static async updatePlanet (event){
        var data = ApiUtils.getRequest(event);
        console.log("PlanetService->updatePlanet - data",data);
        let resGet = await PlanetDB.getPlanetById(data.id);
        console.log("PlanetService->deletePlanet - resGet",resGet);
        let result;
        if(resGet.id){
            result = await PlanetDB.updatePlanet(data);
            console.log("PlanetService->updatePlanet - result",result);
        }
        else{
            throw new BusinessError({
                code: ErrorConstants.DB_NO_DATA_ID.code,
                httpCode: HttpConstants.STATUS_NOT_FOUND.code,
                messages: ErrorConstants.DB_NO_DATA_ID.message,
            });
        }
        
        return result;
    }

    static async deletePlanet (event){
        var req = ApiUtils.getPathParameters(event);
        console.log('PlanetService - deletePlanet: req ',req);
        if(!req.id){
            throw new BusinessError({
                code: ErrorConstants.PATH_NOT_VALID.code,
                httpCode: HttpConstants.STATUS_BAD_REQUEST.code,
                messages: ErrorConstants.PATH_NOT_VALID.message
            });
        }
        let resGet = await PlanetDB.getPlanetById(req.id);
        console.log("PlanetService->deletePlanet - resGet",resGet);
        let result;
        if(resGet.id){
            result = await PlanetDB.deletePlanet(req.id);
            console.log("PlanetService->deletePlanet - result",result);
        }
        else{
            throw new BusinessError({
                code: ErrorConstants.DB_NO_DATA_ID.code,
                httpCode: HttpConstants.STATUS_NOT_FOUND.code,
                messages: ErrorConstants.DB_NO_DATA_ID.message,
            });
        }
        
        return result;
    }

    static async getAllPlanets (){
        let data = await PlanetDB.getAllPlanets();
        console.log("PlanetService->getAllPlanets - data",data);
        var planets = [];
        if(data.Count > 0){
            var planetsTemp = data.Items;
            planetsTemp.forEach(function name(plnt) {
                var planet = new Planet(plnt);
                planets.push(planet);
            });
        }
        else{
            throw new BusinessError({
                code: ErrorConstants.DB_NO_DATA.code,
                httpCode: HttpConstants.STATUS_NOT_FOUND.code,
                messages: ErrorConstants.DB_NO_DATA.message,
            });
        }
        return planets;
    }

    static async getPlanetById (event){

        var req = ApiUtils.getPathParameters(event);
        console.log('PlanetService - getPlanetById: req ',req);
        if(!req.id){
            throw new BusinessError({
                code: ErrorConstants.PATH_NOT_VALID.code,
                httpCode: HttpConstants.STATUS_BAD_REQUEST.code,
                messages: ErrorConstants.PATH_NOT_VALID.message
            });
        }
        let data = await PlanetDB.getPlanetById(req.id);
        if(!data.id){
            throw new BusinessError({
                code: ErrorConstants.DB_NO_DATA_ID.code,
                httpCode: HttpConstants.STATUS_NOT_FOUND.code,
                messages: ErrorConstants.DB_NO_DATA_ID.message,
            });
        }
        console.log("PlanetService->getPlanetById - data",data);
        var planet = new Planet(data);
        
        return planet;
    }
}

module.exports = PlanetService;

const Dynamo = require('../common/database/DynamoConnection');
const BusinessError = require('../models/error/BusinessError');
const HttpConstants = require('../common/constants/httpConstants');
const ErrorConstants = require('../common/constants/errorConstants');
const Planet = require('../models/constructor/Planet');
const DateUtil = require('../common/utils/DateUtil');
const uuid = require('uuid');
const PLANET_TABLE = process.env.PLANET_TABLE;
class PlanetDB {

    static async registerPlanet(parameters) {

        try {
            parameters.id = uuid.v4();
            parameters.creado = DateUtil.getDateTimeNow();
            parameters.actualizado = '';
            const data = new Planet(parameters);
            console.log('data', data);
            return await Dynamo.write(data, PLANET_TABLE);

        } catch (error) {
            console.log('Error en PlanetDB - registerPlanet: ', error);  
            throw new BusinessError({
                code: ErrorConstants.DB_ERROR.code,
                httpCode: HttpConstants.STATUS_INTERNAL_SERVER_ERROR.code,
                messages: ErrorConstants.DB_ERROR.message,
            });
        }
        
    }

    static async updatePlanet(parameters) {

        try {


            parameters.actualizado = DateUtil.getDateTimeNow();

            const data = new Planet(parameters);
            console.log('data', data);
            return await Dynamo.updatePlanet(data, PLANET_TABLE);

        } catch (error) {
            console.log('Error en PlanetDB - updatePlanet: ', error);  
            throw new BusinessError({
                code: ErrorConstants.DB_ERROR.code,
                httpCode: HttpConstants.STATUS_INTERNAL_SERVER_ERROR.code,
                messages: ErrorConstants.DB_ERROR.message,
            });
        }
        
    }

    static async deletePlanet(id) {

        try {

            console.log('id', id);
            return await Dynamo.delete(id, PLANET_TABLE);

        } catch (error) {
            console.log('Error en PlanetDB - deletePlanet: ', error);  
            throw new BusinessError({
                code: ErrorConstants.DB_ERROR.code,
                httpCode: HttpConstants.STATUS_INTERNAL_SERVER_ERROR.code,
                messages: ErrorConstants.DB_ERROR.message,
            });
        }
        
    }

    static async getAllPlanets() {
      
        try {
            return await Dynamo.getAll(PLANET_TABLE);
        } catch (error) {
            console.log('Error en PlanetDB - getAllPlanets: ', error);  
            throw new BusinessError({
                code: ErrorConstants.DB_ERROR.code,
                httpCode: HttpConstants.STATUS_INTERNAL_SERVER_ERROR.code,
                messages: ErrorConstants.DB_ERROR.message,
            });
        }
        
    }

    static async getPlanetById(id) {
      
        try {
            console.log('id', id);    
            return await Dynamo.get(id,PLANET_TABLE);
        } catch (error) {
            console.log('Error en PlanetDB - getPlanetById: ', error);  
            throw new BusinessError({
                code: ErrorConstants.DB_ERROR.code,
                httpCode: HttpConstants.STATUS_INTERNAL_SERVER_ERROR.code,
                messages: ErrorConstants.DB_ERROR.message,
            });
        }
        
    }
}

module.exports = PlanetDB;

const joi = require('joi');

class PlanetValidator {

    static validateRegister() {
        const schema = joi.object().keys({
            nombre: joi.string().min(1).required(),
            periodo_rotacion : joi.number().integer().min(1).required(),
            periodo_orbital : joi.number().integer().min(1).required(),
            diametro: joi.number().integer().min(1).required(),
            clima: joi.string().min(1).required(),
            gravedad: joi.string().min(1).required(),
            terreno: joi.string().min(1).required(),
            superficie_agua: joi.number().integer().min(1).required(),
            poblacion: joi.number().min(1).required(),
            residentes: joi.array().items(joi.string()).required(),
            peliculas: joi.array().items(joi.string()).required(), 
            url: joi.string().empty('').required()
            
        }).required();
        return schema;
    }

    static validateUpdate() {
        const schema = joi.object().keys({
            id: joi.string().min(1).required(),
            nombre: joi.string().min(1).required(),
            periodo_rotacion : joi.number().integer().min(1).required(),
            periodo_orbital : joi.number().integer().min(1).required(),
            diametro: joi.number().integer().min(1).required(),
            clima: joi.string().min(1).required(),
            gravedad: joi.string().min(1).required(),
            terreno: joi.string().min(1).required(),
            superficie_agua: joi.number().integer().min(1).required(),
            poblacion: joi.number().min(1).required(),
            residentes: joi.array().items(joi.string()).required(),
            peliculas: joi.array().items(joi.string()).required(), 
            url: joi.string().empty('').required()
            
        }).required();
        return schema;
    }

}

module.exports = PlanetValidator;
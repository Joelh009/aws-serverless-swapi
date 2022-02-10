module.exports = {
    DATA_NOT_VALID: { code: 'DataNotValid' },
    PATH_NOT_VALID: { code: 'PathNotValid', message: 'El path no es válido'},
    HEADER_NOT_VALID: { code: 'HeaderNotValid', message: 'La cabecera de la solicitud no tiene el formato adecuado' },
    BODY_NOT_VALID: { code: 'BodyNotValid', message: 'El cuerpo de la solicitud no tiene el formato adecuado' },
    DB_ERROR: { code: 'DbError', message: 'Error en la db' },
    DB_NO_DATA_ID: { code: 'DbNoDataID', message: 'Sin registros para el id' },
    DB_NO_DATA: { code: 'DbNoData', message: 'Sin registros en la BD' },
    SERVICE_CONECTION_ERROR: { code: 'ServiceConectionError', message:'Error en el api de SWAPI' },
  };
  
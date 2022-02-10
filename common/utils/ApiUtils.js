const AWS = require('aws-sdk');
const HttpConstants = require('../constants/httpConstants');
const BusinessError = require('../../models/error/BusinessError');
const ErrorConstants = require('../constants/errorConstants');

class ApiUtils {
  
  
  static getRequest(event) {
    let request;
    console.log(event);
    if (event.body) {
      request = JSON.parse(event.body);
    } else {
      request = event;
    }
    return request;
  }

  static getPayloadRequest(event) {
    const request = this.getRequest(event);
    return request;
  }

  static getPathParameters(event){
    let request;
    console.log(event);
    if (event.pathParameters) {
      request = {
        id: event.pathParameters.id
      };
    }
    return request;
  }

  static buildResponse(mensaje, payload) {
    const obj = {
        codMensaje: 0,
        desMensaje: mensaje,
        datos: payload
    };

    console.log('buildResponse obj',obj);
    const response = {
      statusCode: HttpConstants.STATUS_OK.code,
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json; charset=utf-8' ,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Methods': 'GET,POST'
      },
    };
    console.log('response',response);
    return response;
  }

  static buildErrorResponse(event, error) {
    const obj = {
        codMensaje: -1,
        desMensaje: error.messages,
        datos: null
    };

    const response = {
      statusCode: error.httpCode,
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json; charset=utf-8' ,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Methods': 'GET,POST'
      },
    };
    return response;
  }

  static getResponse(event) {
    let response;
    if (event.body) {
      ({ response } = JSON.parse(event.body));
    } else {
      ({ response } = event);
    }

    if (!response) {
      throw new BusinessError({
        code: ErrorConstants.BODY_NOT_VALID.code,
        httpCode: HttpConstants.STATUS_BAD_REQUEST.code,
        messages: [ErrorConstants.BODY_NOT_VALID.message],
      });
    }
    return response;
  }

}

module.exports = ApiUtils;

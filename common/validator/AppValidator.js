const Joi = require('joi');
const ErrorConstants = require('../constants/errorConstants');
const HttpConstants = require('../constants/httpConstants');
const BusinessError = require('../../models/error/BusinessError');
const ApiUtils = require('../utils/ApiUtils');

class AppValidator {
  static async validateRequest(event, schema) {
    const request = ApiUtils.getRequest(event);
    this._validateBody(request);
    const payload = ApiUtils.getPayloadRequest(event);
    
    if (schema) {
      this._validate(schema, payload);
    }

  }

  static _validateHeader(event) {
    
    if (!event.headers.Authorization || !event.headers.ApiKey) {
      throw new BusinessError({
        code: ErrorConstants.HEADER_NOT_VALID.code,
        httpCode: HttpConstants.STATUS_BAD_REQUEST.code,
        messages: [ErrorConstants.HEADER_NOT_VALID.message],
      });
    }
  }

  static _validateBody(request) {
    if (!request) {
      throw new BusinessError({
        code: ErrorConstants.BODY_NOT_VALID.code,
        httpCode: HttpConstants.STATUS_BAD_REQUEST.code,
        messages: [ErrorConstants.BODY_NOT_VALID.message],
      });
    }
  }

  static _validateRequest(request) {
    const schema = Joi.object().keys({
      trace: Joi.required(),
      payload: Joi.required(),
    });

    this._validate(schema, request);
  }

  static _validate(schema, src) {
    
    const validation = schema.validate(src,{
      allowUnknown: true,
      abortEarly: false
    });

    if (validation.error) {
      const messagesError = [];
      validation.error.details.forEach((value) => {
        messagesError.push(value.message);
      });

      throw new BusinessError({
        code: ErrorConstants.DATA_NOT_VALID.code,
        httpCode: HttpConstants.STATUS_BAD_REQUEST.code,
        messages: messagesError,
      });
    }
  }
}

module.exports = AppValidator;
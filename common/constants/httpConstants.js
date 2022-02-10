module.exports = {
    STATUS_OK: { code: 200, description: 'OK' },
    STATUS_CREATED: { code: 201, description: 'CREATED' },
    STATUS_NO_CONTENT: { code: 204, description: 'NO CONTENT' },
  
    STATUS_BAD_REQUEST: { code: 400, description: 'BAD REQUEST' },
    STATUS_UNAUTHORIZED: { code: 401, description: 'UNAUTHORIZED' },
    STATUS_FORBIDDEN: { code: 403, description: 'FORBIDDEN' },
    STATUS_NOT_FOUND: { code: 404, description: 'NOT FOUND' },
    STATUS_UNPROCESSABLE_ENTITY: { code: 422, description: 'UNPROCESSABLE ENTITY' },
  
    STATUS_INTERNAL_SERVER_ERROR: { code: 500, description: 'INTERNAL SERVER ERROR' },
    STATUS_NOT_IMPLEMENTED: { code: 501, description: 'NOT IMPLEMENTED' },
    STATUS_BAD_GATEWAY: { code: 502, description: 'BAD GATEWAY' },
    STATUS_GATEWAY_TIMEOUT: { code: 504, description: 'GATEWAY TIMEOUT' }
    
};
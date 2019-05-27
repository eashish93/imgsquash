

// TODO: loose check: `options` must be object.
// See : https://httpstatuses.com/ for more status codes
const errors = {

    badRequest(res, opts) {
        return res.status(400).json(Object.assign({
            code: 400,
            success: false,
            type: 'bad-request',
            message: 'The request could not be understood'
        }, opts))
    },

    unauthorized(res, opts) {
        return res.status(401).json(Object.assign({
            code: 401,
            success: false,
            type: 'unauthorized',
            message: 'You are not authorized to make this request'
        }, opts))
    },

    forbidden(res, opts) {
        return res.status(403).json(Object.assign({
            code: 403,
            success: false,
            type: 'forbidden',
            message: 'You cannot access this endpoint'
        }, opts))
    },

    notFound(res, opts) {
        return res.status(404).json(Object.assign({
            code: 404,
            success: false,
            type: 'not-found',
            message: 'The requested resource (or url) could not be found.'
        }, opts))
    },

    entityTooLarge(res, opts) {
        return res.status(413).json(Object.assign({
            code: 413,
            success: false,
            type: 'file-too-large',
            message: 'Maximum file limit exceeded'
        }, opts))
    },

    uriTooLarge(res, opts) {
        return res.status(414).json(Object.assign({
            code: 414,
            success: false,
            type: 'uri-too-large',
            message: 'Request url too large to handle'
        }, opts))
    },

    unsupportedMediaType(res, opts) {
        return res.status(415).json(Object.assign({
            code: 415,
            success: false,
            type: 'unsupported-media-type',
            message: 'Media type is not supported. Please select valid image file (jpeg, png)'
        }, opts))
    },

    unprocessableEntity(res, opts) {
        return res.status(422).json(Object.assign({
            code: 422,
            success: false,
            type: 'unprocessable-entity',
            message: 'Unable to process the request entity'
        }, opts))
    },

    tooManyRequest(res, opts) {
        return res.status(429).json(Object.assign({
            code: 429,
            success: false,
            type: 'too-many-request',
            message: 'Hold On, you are sending too much request'
        }, opts))
    },

    internalServer(res, opts) {
        return res.status(500).json(Object.assign({
            code: 500,
            success: false,
            type: 'internal-error',
            message: 'The server has encountered an error'
        }, opts))
    },

    tokenRevocation(res, opts) {
        return res.status(503).json(Object.assign({
            code: 503,
            success: false,
            type: 'token-invalid',
            message: 'Token is no longer valid'
        }, opts))
    }

}


module.exports = errors;

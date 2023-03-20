class HttpError extends Error{
    constructor (message, errorCode) {
        super(message); 
        this.code = errorCode;
    }
}

const errorMsg = (resource, idType) =>
    `No ${resource} found for the provided ${idType} ID.`; 

export { HttpError, errorMsg };

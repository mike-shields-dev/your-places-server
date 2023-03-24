class HttpError extends Error{
    constructor (message, errorCode) {
        super(message); 
        this.code = errorCode;
    }
}

const httpError500 = new HttpError(
    'Something went wrong, please try again.', 
    500
);

const errorMsg = (resource, idType) =>
    `No ${resource} found for the provided ${idType} ID.`; 

export { HttpError, errorMsg, httpError500 };

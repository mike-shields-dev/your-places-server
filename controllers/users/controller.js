import HttpError from '../../models/http-error.js';
import data from './users-data.json' assert { type: "json" };

const errorMsg = (resource, idType) =>
    `No ${resource} found for the provided ${idType} ID.`; 

const getUserById = (req, res, next) => {
    const foundUser =
        data.find(({ id }) => id === req.params.uid);
    
    if (foundUser) {
        return res.json(foundUser);
    }
    
    next(new HttpError(errorMsg('user', 'user')));
};

export { getUserById };

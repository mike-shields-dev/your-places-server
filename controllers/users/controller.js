import { HttpError, errorMsg } from '../../models/http-error.js';
import data from './users-data.json' assert { type: "json" };

const getUserById = (req, res, next) => {
    const foundUser =
        data.find(({ id }) => id === req.params.uid);
    
    if (foundUser) {
        return res.json(foundUser);
    }
    
    next(new HttpError(errorMsg('user', 'user')));
};

export { getUserById };

import { v4 as uuid } from 'uuid';
import { HttpError, errorMsg } from '../../models/http-error.js';
import data from './users-data.json' assert { type: "json" };

let users = [...data];

const getAllUsers = (req, res, next) => {
    res.status(200).json({ users });
};

const getUserById = (req, res, next) => {
    const user =
        data.find(({ id }) => id === req.params.uid);
    
    if (user) {
        return res.json(user);
    }
    
    next(new HttpError(errorMsg('user', 'user')));
};

const createUser = (req, res, next) => {
    const {
        name,
        email,
        image,
    } = req.body;

    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        // should send user to account recovery endpoint?
        
        return res.status(200).json({ message: 'Email already exists.'})
    }

    const newUser = {
        id: uuid(),
        name,
        email,
        image,
        places: [ 0 ],
    };

    users.push(newUser);

    res.sendStatus(201);
};

export { createUser, getAllUsers, getUserById };

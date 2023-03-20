import { v4 as uuid } from 'uuid';
import { HttpError, errorMsg } from '../../models/http-error.js';
import data from './users-data.json' assert { type: "json" };

let users = [...data];

const getAllUsers = (req, res, next) => {
    res.json({ users });
};

const createUser = (req, res, next) => {
    const {
        name,
        email,
        password,
    } = req.body;

    const foundUser = users.find(user => user.email === email);

    if (foundUser) {        
        return res.status(200).json({
            message: 'Email already exists.'
        });
    }

    const newUser = {
        id: uuid(),
        name,
        email,
        password,
    };

    users.push(newUser);

    res.status(201).json({ user: newUser });
};

const loginUser = (req, res, next) => {
    const { email, password } = req.body;

    const foundUser = users.find(user => user.email === email);

    if (!foundUser || foundUser.password !== password) {
        throw new HttpError('Could not identify user.', 401);
    }

    res.json({ message: 'logged in' });
};

export { createUser, loginUser, getAllUsers };

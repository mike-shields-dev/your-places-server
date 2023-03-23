import { validationResult } from 'express-validator';
import { v4 as uuid } from 'uuid';

import User from '../../models/user.js';
import { HttpError } from '../../models/http-error.js';
import data from './users-data.json' assert { type: "json" };

let users = data;

const getAllUsers = (req, res, next) => {
    res.json({ users });
};

const createUser = async (req, res, next) => {
    const { errors } = validationResult(req);

    if (errors.length > 0) {

        return res.status(422).json({
            message: 'Invalid data provided.',
            details:
            errors.map(({ param, msg }) => `${param} ${msg}`),
        });
    }
    
    const newUser = new User(req.body);

    try {
        await newUser.save()
    } catch (error) {
        return next(new HttpError(
            error.errors.email.message, 
            500
        ));
    }

    res.status(201).json({ user: newUser });
};

const loginUser = (req, res, next) => {
    const { errors } = validationResult(req);

    if (errors.length > 0) {

        return res.status(422).json({
            message: 'Invalid data provided.',
            details:
            errors.map(({ param, msg }) => `${param} ${msg}`),
        });
    }

    const { email, password } = req.body;

    const foundUser = users.find(user => user.email === email);

    if (!foundUser || foundUser.password !== password) {
        throw new HttpError('Could not identify user.', 401);
    }

    res.json({ message: 'logged in' });
};

export { createUser, loginUser, getAllUsers };

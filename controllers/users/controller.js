import { validationResult } from 'express-validator';

import User from '../../models/user.js';
import { HttpError, httpError500 } from '../../models/http-error.js';

const getAllUsers = async (req, res, next) => {
    let allUsers;
    
    try {
        allUsers = await User
            .find({}, '-password');

    } catch (err) {
        return next(httpError500);
    }

    return res
        .status(200)
        .json({ 
            users: allUsers.map(user => 
                user.toObject({ getters: true })
            )
        });
};

const createUser = async (req, res, next) => {
    const { errors } = validationResult(req);

    if (errors.length > 0) {
        return next(
            new HttpError(
                `Invalid data provided, please check your data.`,
                422,
            )
        );
    }

    const {
        name, 
        email,
        password,
        image,
    } = req.body;

    let existingUser;
    
    try {
        existingUser = await User.findOne({ email });

    } catch (error) {
        return next(httpError500);
    }

    if(existingUser) {
        return next(
            new HttpError(
                'User already exists, please login instead.',
                422,
            )
        )
    }

    const user = new User({
        name, 
        email, 
        password,
        image: req.file.path,
        places: [],
    });

    const newUser = new User(user);

    try {
        await newUser.save();

    } catch (error) {
        
        return next(
            new HttpError(
                'Sign up failed. Please try again.'
            )
        )
    }

    return res
        .status(201)
        .json({ 
            user: newUser.toObject({ getters: true })
        });
};

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    let foundUser;

    try {
        foundUser = await User.findOne({ email });

    } catch (error) {
        
        return next(httpError500);
    }

    if (!foundUser || 
        foundUser.password !== password
    ) {
        return next(
            new HttpError(
                'Could not identify user.', 
                401
            )
        );
    }

    res.json({ user: foundUser.toObject({ getters: true })});
};

export { createUser, loginUser, getAllUsers };

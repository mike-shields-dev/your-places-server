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

        return res
            .status(422)
            .json({
                message: 'Invalid data provided.',
                details: errors.map(
                    ({ param, msg }) => 
                    `${param} ${msg}`
                ),
            });
    }

    const {
        name, 
        email,
        password,
        image,
    } = req.body;

    const user = new User({
        name, 
        email, 
        password,
        image: image || 'https://api.multiavatar.com/Binx Bond.png',
        places: [],
    });

    const newUser = new User(user);

    try {
        await newUser.save()

    } catch (error) {
        
        return next(httpError500);
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

    res.json({ message: 'logged in' });
};

export { createUser, loginUser, getAllUsers };

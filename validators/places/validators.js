import { check } from 'express-validator';

const checkIsProvided = field =>
    check(field)
        .not().isEmpty()
        .withMessage('must be provided.');

const checkHasMinLength = (field, length) =>
    check(field)
        .isLength({ min: length})
        .withMessage(`must have minimum length ${length}.`);


const createPlaceValidator = () => [
    checkIsProvided('title'),
    checkHasMinLength('description', 5),
    checkIsProvided('address'),
];

const updatePlaceValidator = () => [
    checkIsProvided('title'),
    checkHasMinLength('description', 5),
];
    
export { createPlaceValidator, updatePlaceValidator };

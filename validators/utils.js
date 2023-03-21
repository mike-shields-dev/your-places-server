import { check } from 'express-validator';

const checkStrongPassword = field => {
    const MIN_LEN = 8;
    const MIN_LOWER = 1;
    const MIN_UPPER = 1;
    const MIN_NUMBERS = 1;
    const MIN_SYMBOLS = 1;
    
    return (
        check(field)
            .isStrongPassword()
            .withMessage([
                `must have a minimum length of ${MIN_LEN}`,
                ` must have at least ${MIN_LOWER} lower case letter`,
                ` ${MIN_UPPER} upper case letter`,
                ` ${MIN_NUMBERS} number`,
                ` and ${MIN_SYMBOLS} symbol.`,
            ])
    )
}

const checkIsEmail = field => 
    check(field)
        .toLowerCase()
        .isEmail()
        .withMessage('must be valid email address.');

const checkIsProvided = field =>
    check(field)
        .not().isEmpty()
        .withMessage('must be provided.');

const checkHasMinLength = (field, length) =>
    check(field)
        .isLength({ min: length})
        .withMessage(`must have minimum length ${length}.`);

export {
    checkIsProvided,
    checkHasMinLength,
    checkIsEmail,
    checkStrongPassword,
};

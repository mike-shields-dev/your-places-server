import { checkHasMinLength, checkIsProvided } from "../utils.js";

const validateCreatePlace = () => [
    checkIsProvided('title'),
    checkHasMinLength('description', 5),
    checkIsProvided('address'),
];

const validateUpdatePlace = () => [
    checkIsProvided('title'),
    checkHasMinLength('description', 5),
];
    
export { validateCreatePlace, validateUpdatePlace };

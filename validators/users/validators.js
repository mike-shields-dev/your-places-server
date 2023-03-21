import { checkIsEmail, checkIsProvided, checkStrongPassword } from "../utils.js";

const validateCreateUser = () => [
    checkIsProvided('name'),
    checkIsEmail('email'),
    checkStrongPassword('password'),
];

export { validateCreateUser };

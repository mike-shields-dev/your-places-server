import { Schema, model, Types } from "mongoose";

async function isEmailTaken(email) {
    const user = await this.constructor.findOne({ email });
    
    return !user;
}

const userSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true, minLength: 8 },
    image: { type: String, required: true },
    places: [{ type: Types.ObjectId, required: true, ref: 'Place' }],
    email: {
        type: String,
        validate: {
            validator: isEmailTaken,
            message: 'Email already registered, please sign in.',
        },
        required: true,
        unique: true,
    },
});

const User = model('User', userSchema);

export default User;

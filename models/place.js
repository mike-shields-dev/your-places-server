import { Schema, model } from "mongoose";

const placeSchema = new Schema({
    title: { type: String,required: true },
    description: { type: String,required: true },
    image: { type: String,required: true },
    address: { type: String,required: true },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    }, 
    creator: { type: String,required: true }
});

const Place = model('Place', placeSchema);

export default Place;
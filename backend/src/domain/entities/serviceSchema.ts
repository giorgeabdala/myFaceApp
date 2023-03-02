import {Schema, model} from "mongoose";


const serviceSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});


export const ServiceSchema = model('ServiceSchema', serviceSchema, 'technician');

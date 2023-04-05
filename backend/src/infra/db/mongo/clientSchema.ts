import {Schema} from 'mongoose';


    export const clientSchema: Schema = new Schema({
        _id: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        name: {
            firstName: {
                type: String,
                required: true
            },
            //TODO: alterar opção de lastname após implementação do front
            lastName: {
                type: String,
                required: false
            }
        },
        cellPhone: {
            DDD: {
                type: String,
                required: true,
                index: true
            },
            phone: {
                type: String,
                required: true,
                index: true
            }

        },
        email: {
            type: String,
            required: false,
            index: true
        }

    });









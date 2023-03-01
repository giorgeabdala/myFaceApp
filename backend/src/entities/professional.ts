import {User} from "./user";
import {Phone} from "./phone";
import {Email} from "./email";

export class Professional implements User {

    constructor(readonly name: string, readonly cellPhone: Phone, readonly email: Email, readonly id?: number ) {
        if (!this.validateName(name)) throw new Error('Nome inválido');
    }


    private validateName(name: string): boolean {
        return name.length >= 2;
    }

}


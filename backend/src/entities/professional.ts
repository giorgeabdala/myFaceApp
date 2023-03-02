import {User} from "./user";
import {Phone} from "./phone";
import {Email} from "./email";

export class Professional implements User {


    private constructor(readonly name: string, readonly cellPhone: Phone,  private email: Email, readonly id?: number ) {}

    public static create(name: string, DDD: string, number: string, emailAddress: string, id?: number): Professional {
        if (!this.validateName(name)) throw new Error('Nome inválido');
        return new Professional(name, Phone.create(DDD, number), Email.create(emailAddress), id);
    }


    private static validateName(name: string): boolean {
        return name.length >= 2;
    }

}


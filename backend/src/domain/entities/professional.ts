import {User} from "./user";
import {Phone} from "./phone";
import {Email} from "./email";
import { Ok, Err, Result } from 'ts-results';

export class Professional implements User {


    private constructor(readonly id: string, readonly name: string, readonly cellPhone: Phone, readonly email: Email ) {}

    public static create(id: string, name: string, DDD: string, number: string, emailAddress: string): Result<Professional, string> {
        const phoneOrError = Phone.create(DDD, number);
        const emailOrError = Email.create(emailAddress);
        const validName = this.validateName(name);

        if (phoneOrError.err) return new Err('Invalid phone number');
        if (!validName) return new Err('Nome inválido');
        if (emailOrError.err) return new Err('Invalid email');

        return Ok<Professional>(new Professional(id,name, phoneOrError.unwrap(), emailOrError.unwrap()))
    }

    private static validateName(name: string): boolean {
        return name.length >= 2 ;
    }

    public getId(): string {
        return this.id;
    }

    public getEmail(): string {
        return this.email.address
    }

}


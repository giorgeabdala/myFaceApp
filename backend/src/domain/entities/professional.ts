import {User} from "./user";
import {Phone} from "./phone";
import {Email} from "./email";
import { Ok, Err, Result } from 'ts-results';
import Name from "./Name";


export class Professional implements User {
    private constructor(readonly id: string, readonly name: Name, readonly cellPhone: Phone, readonly _email: Email, readonly calendarId?: string) {}

    public static create(id: string, firstName: string, lastName: string, DDD: string, phone: string, emailAddress: string, calendarId?: string): Result<Professional, string> {
        const phoneOrError = Phone.create(DDD, phone);
        const emailOrError = Email.create(emailAddress);
        const nameOrError= Name.create(firstName, lastName);

        if (phoneOrError.err) return new Err('Invalid phone number');
        if (emailOrError.err) return new Err('Invalid email');
        if (nameOrError.err) return new Err(nameOrError.val);


        const professional = new Professional(id, nameOrError.unwrap(),
            phoneOrError.unwrap(),
            emailOrError.unwrap(),
            calendarId);

        return Ok(professional);
    }

    public get email(): string {
        return this._email.address
    }

    public get firstName(): string {
        return this.name.first;
    }

    public get lastName(): string {
        return this.name.last;
    }

    public get DDD(): string {
        return this.cellPhone.DDD;
    }

    public get phone(): string {
        return this.cellPhone.phone;
    }

    public get fullName(): string {
        return this.name.first + ' ' + this.name.last;
    }



}


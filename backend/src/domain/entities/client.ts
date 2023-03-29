import {User} from "./user";
import {Phone} from "./phone";
import {Email} from "./email";
import { Ok, Err, Result } from 'ts-results';
import Name from "./Name";

export class Client implements User {

    private constructor(readonly id: string, readonly name: Name, readonly cellPhone: Phone, readonly _email?: Email) {}

    public static create(id: string, firstName: string, lastName: string, DDD: string, phone: string, emailAddress?: string): Result<Client, string> {
        const phoneOrError = Phone.create(DDD, phone);
        const emailOrError = emailAddress ? Email.create(emailAddress) : Ok(undefined);
        const nameOrError = Name.create(firstName, lastName);

        if (phoneOrError.err) return new Err('Invalid phone phone');
        if (nameOrError.err) return new Err('Invalid name');
        if (emailOrError.err) return new Err('Invalid email');
        return new Ok(new Client(id,nameOrError.unwrap(),phoneOrError.unwrap(), emailOrError.unwrap()));
    }


        public get email(): string {
            return this._email?.address;
        }

        public get firstName(): string {
            return this.name.first;
        }

        public get lastName(): string {
            return this.name.last;
        }



}
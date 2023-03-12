import {User} from "./user";
import {Phone} from "./phone";
import {Email} from "./email";
import { Ok, Err, Result } from 'ts-results';
import Name from "./Name";

export class Client implements User {
private annotations: string = '';

    private constructor(readonly id: string, readonly name: Name, readonly cellPhone: Phone, readonly _email?: Email) {}

    public static create(id: string, firstName: string, lastName: string, DDD: string, number: string, emailAddress?: string): Result<Client, string> {
        const phoneOrError = Phone.create(DDD, number);
        const emailOrError = emailAddress ? Email.create(emailAddress) : Ok(undefined);
        const nameOrError = Name.create(firstName, lastName);

        if (phoneOrError.err) return new Err('Invalid phone number');
        if (nameOrError.err) return new Err('Invalid name');
        if (emailOrError.err) return new Err('Invalid email');
        return new Ok(new Client(id,nameOrError.unwrap(),phoneOrError.unwrap(), emailOrError.unwrap()));
    }



        setAnnotations(annotations: string) {
            this.annotations = annotations;
        }

        getAnnotations(): string {
            return this.annotations;
        }

        public get email(): string {
            if (!this._email) return undefined;
            if (!this._email.address) return undefined;
            return this._email.address;
        }

        public get firstName(): string {
            return this.name.first;
        }

        public get lastName(): string {
            return this.name.last;
        }



}
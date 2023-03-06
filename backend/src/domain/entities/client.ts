import {User} from "./user";
import {Phone} from "./phone";
import {Email} from "./email";
import { Ok, Err, Result } from 'ts-results';

export class Client implements User {
private annotations: string = '';

    private constructor(readonly id: string, readonly name: string, readonly cellPhone: Phone, readonly email?: Email) {}

    public static create(id: string, name: string, DDD: string, number: string, emailAddress?: string): Result<Client, string> {
        const phoneOrError = Phone.create(DDD, number);
        const emailOrError = emailAddress ? Email.create(emailAddress) : Ok(undefined);
        const isvalidName = this.isValidName(name);

        if (phoneOrError.err) return new Err('Invalid phone number');
        if (!isvalidName) return new Err('Invalid name');
        if (emailOrError.err) return new Err('Invalid email');
        return new Ok(new Client(id,name,phoneOrError.unwrap(), emailOrError.unwrap()));
    }

        private static isValidName(name: string): boolean {
            return name.length >= 2 ;
        }

        setAnnotations(annotations: string) {
            this.annotations = annotations;
        }

        getAnnotations(): string {
            return this.annotations;
        }

        public get Email(): string {
            if (!this.email) return undefined;
            if (!this.email.address) return undefined;
            return this.email.address;
        }



}
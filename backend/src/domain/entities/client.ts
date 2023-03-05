import {User} from "./user";
import {Phone} from "./phone";
import {Email} from "./email";
import {Result} from "../../utils/result";

export class Client implements User {
private annotations: string = '';
private email: Email;


    private constructor(readonly id:  string, readonly name: string, readonly cellPhone: Phone,  readonly emailOrError?: Email) {}

    public static create(id: string, name: string, DDD: string, number: string, emailAddress?: string): Result<Client> {
        const phoneOrError = Phone.create(DDD, number);
        const emailOrError = emailAddress ? Email.create(emailAddress) : Result.ok<Email>();
        const isvalidName = this.isValidName(name);

        if (phoneOrError.isFailure) return Result.fail('Invalid phone number');
        if (!isvalidName) return Result.fail('Invalid name');
        if (emailOrError.isFailure) return Result.fail('Invalid email');
        return Result.ok<Client>(new Client(id,name, phoneOrError.getValue(), emailOrError.getValue()))
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
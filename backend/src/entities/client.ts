import {User} from "./user";
import {Phone} from "./phone";
import {Email} from "./email";
import {Result} from "../utils/result";

export class Client implements User {
private annotations: string = '';
private email: Email;


    private constructor(readonly name: string, readonly cellPhone: Phone,  readonly emailOrError?: Email, readonly id?: number) {}

    public static create(name: string, DDD: string, number: string, emailAddress?: string, id?: number): Result<Client> {
        const phoneOrError = Phone.create(DDD, number);
        const emailOrError = emailAddress ? Email.create(emailAddress) : Result.ok<Email>();
        const isvalidName = this.isValidName(name);

        if (phoneOrError.isFailure) return Result.fail('Invalid phone number');
        if (!isvalidName) return Result.fail('Invalid name');
        if (emailOrError.isFailure) return Result.fail('Invalid email');
        return Result.ok<Client>(new Client(name, phoneOrError.getValue(), emailOrError.getValue(), id))
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



}
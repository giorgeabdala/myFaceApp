import {User} from "./user";
import {Phone} from "./phone";
import {Email} from "./email";
import {Result} from "../utils/result";

export class Professional implements User {


    private constructor(readonly name: string, readonly cellPhone: Phone,  private email: Email, readonly id?: number ) {}

    public static create(name: string, DDD: string, number: string, emailAddress: string, id?: number): Result<Professional> {
        const phoneOrError = Phone.create(DDD, number);
        const emailOrError = Email.create(emailAddress);
        const validName = this.validateName(name);

        if (phoneOrError.isFailure) return Result.fail('Invalid phone number');
        if (!validName) return Result.fail('Invalid name');
        if (emailOrError.isFailure) return Result.fail('Invalid email');

        return Result.ok<Professional>(new Professional(name, phoneOrError.getValue(), emailOrError.getValue(), id))
    }

    private static validateName(name: string): boolean {
        return name.length >= 2 ;
    }

}


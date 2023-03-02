import {User} from "./user";
import {Phone} from "./phone";
import {Email} from "./email";
import {Result} from "../../utils/result";

export class Professional implements User {


    private constructor(readonly id: string, readonly name: string, readonly cellPhone: Phone,  private email: Email ) {}

    public static create(id: string, name: string, DDD: string, number: string, emailAddress: string): Result<Professional> {
        const phoneOrError = Phone.create(DDD, number);
        const emailOrError = Email.create(emailAddress);
        const validName = this.validateName(name);

        if (phoneOrError.isFailure) return Result.fail('Invalid phone number');
        if (!validName) return Result.fail('Invalid name');
        if (emailOrError.isFailure) return Result.fail('Invalid email');

        return Result.ok<Professional>(new Professional(id,name, phoneOrError.getValue(), emailOrError.getValue()))
    }

    private static validateName(name: string): boolean {
        return name.length >= 2 ;
    }

}


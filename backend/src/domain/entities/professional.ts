import {User} from "./user";
import {Phone} from "./phone";
import {Email} from "./email";
import {Result} from "../../utils/result";

export class Professional implements User {


    private constructor(readonly id: string, readonly name: string, readonly cellPhone: Phone, readonly email: Email ) {}

    public static create(id: string, name: string, DDD: string, number: string, emailAddress: string): Result<Professional> {
        const phoneOrError = Phone.create(DDD, number);
        const emailOrError = Email.create(emailAddress);
        const validName = this.validateName(name);

        if (phoneOrError.isFailure) return Result.fail('Invalid phone number');
        if (!validName) return Result.fail('Nome inválido');
        if (emailOrError.isFailure) return Result.fail('Invalid email');

        return Result.ok<Professional>(new Professional(id,name, phoneOrError.getValue(), emailOrError.getValue()))
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


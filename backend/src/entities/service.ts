import {Result} from "../utils/result";

export class Service {

    private constructor(readonly name: string, readonly description: string) {}

    public static create(name: string, description: string): Result<Service> {
        if (!this.validateName(name)) return Result.fail('Invalid name');
        if (!this.validateDescription(description)) return Result.fail('Invalid description');

        return Result.ok(new Service(name, description));
    }

    private static validateName(name: string): boolean {
        return name.length >= 5;
    }

    private static validateDescription(description: string): boolean {
        return description.length <= 100;
    }




}
import { Ok, Err, Result } from 'ts-results';

export class Service {

    private constructor(readonly id: string, readonly name: string, readonly description: string) {}

    public static create(id: string, name: string, description: string): Result<Service, string> {
        if (!this.validateName(name)) return new Err('Invalid name');
        if (!this.validateDescription(description)) return new Err('Invalid description');

        return Ok(new Service(id,name, description));
    }

    private static validateName(name: string): boolean {
        return name.length >= 5;
    }

    private static validateDescription(description: string): boolean {
        return description.length <= 100;
    }




}
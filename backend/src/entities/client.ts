import {User} from "./user";
import {Phone} from "./phone";
import {Email} from "./email";

export class Client implements User {
private annotations: string = '';


    private constructor(readonly name: string, DDD: string, readonly cellPhone: Phone,  readonly email?: Email, readonly id?: number) {}

        public static create(name: string, DDD: string, number: string, emailAddress?: string, id?: number): Client {
            if (!this.isValidName(name)) throw new Error('Invalid name');
            const phone = Phone.create(DDD, number);
            const email = emailAddress ? Email.create(emailAddress) : undefined

            return new Client(name, DDD, phone, email, id);
        }

        private static isValidName(name: string): boolean {
            return name.length >= 2;
        }

        setAnnotations(annotations: string) {
            if (!this.isValidAnnotations(annotations)) throw new Error('Invalid annotations');
            this.annotations = annotations;
        }

        getAnnotations(): string {
            return this.annotations;
        }

        private isValidAnnotations(annotations: string): boolean {
            return annotations.length >= 5;
        }


}
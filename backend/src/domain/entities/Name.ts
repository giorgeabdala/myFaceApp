import {Err, Ok, Result} from "ts-results";


export default class Name {
    private constructor(readonly first: string, readonly last: string) {}

    //TODO: retirar opção de lastname após implementação do front
    public static create(firstName: string, lastName?: string): Result<Name, string> {
        if (!this.isValid(firstName)) return new Err('Nome inválido');
        if (!this.isValid(lastName)) return new Err('Sobre nome inválido');
        return Ok(new Name(firstName, lastName));
    }

    private static isValid(name: string): boolean {
        return name.length >= 2 ;
    }


}

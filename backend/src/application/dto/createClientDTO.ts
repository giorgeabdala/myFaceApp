export class CreateClientInput {
    constructor(readonly name: string, readonly DDD: string, readonly number: string, readonly email?: string) {}
}

export class CreateClientOutput {
    constructor(readonly id: string, readonly name: string, readonly DDD: string, readonly number: string, readonly email?: string) {}
}



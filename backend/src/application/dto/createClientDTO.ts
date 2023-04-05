export class CreateClientInput {
    constructor(readonly firstName, readonly lastName: string, readonly DDD: string, readonly phone: string, readonly email?: string) {}
}

export class CreateClientOutput {
    constructor(readonly id: string, readonly firstName, readonly lastName: string, readonly DDD: string, readonly phone: string, readonly email?: string) {}
}



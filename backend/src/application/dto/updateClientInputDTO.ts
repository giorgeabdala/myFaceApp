export class UpdateClientInput {
    constructor(
        readonly id: string,
        readonly firstName: string,
        readonly lastName: string,
        readonly DDD: string,
        readonly number: string,
        readonly email: string
    ) {}
}

export class UpdateClientOutput {
    constructor(
        readonly id: string,
        readonly firstName: string,
        readonly lastName: string,
        readonly DDD: string,
        readonly number: string,
        readonly email: string
    ) {}
}
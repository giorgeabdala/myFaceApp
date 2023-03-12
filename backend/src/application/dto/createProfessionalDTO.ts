export  class CreateProfessionalInput {
    constructor(
        readonly firstName,
        readonly lastName: string,
        readonly DDD: string,
        readonly number: string,
        readonly email: string
    ) {}

}

export class CreateProfessionalOutput {
    constructor( readonly id: string,
                 readonly firstName,
                 readonly lastName: string,
                 readonly DDD: string,
                 readonly number: string,
                 readonly email: string)
    {}
}
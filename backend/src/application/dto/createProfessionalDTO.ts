export  class CreateProfessionalInput {
    constructor(
        readonly name: string,
        readonly DDD: string,
        readonly number: string,
        readonly email: string
    ) {}

}

export class CreateProfessionalOutput {
    constructor( readonly id: string,
                 readonly name: string,
                 readonly DDD: string,
                 readonly number: string,
                 readonly email: string)
    {}
}
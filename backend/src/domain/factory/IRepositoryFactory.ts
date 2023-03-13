import {IProfessionalRepository} from "../adapters/IProfessionalRepository";
import IClientRepository from "../adapters/IClientRepository";
import {IAppointmentRepository} from "../adapters/IAppointmentRepository";


export default interface IRepositoryFactory {
    createAppointmentsRepository(): IAppointmentRepository;
    createClientRepository(): IClientRepository;
    createProfessionalRepository(): IProfessionalRepository;

}
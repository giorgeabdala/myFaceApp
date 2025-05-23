import IRepositoryFactory from "../../domain/factory/IRepositoryFactory";
import {IProfessionalRepository} from "../../domain/adapters/IProfessionalRepository";
import {IAppointmentRepository} from "../../domain/adapters/IAppointmentRepository";
import IClientRepository from "../../domain/adapters/IClientRepository";
import AppointmentRepositoryMemory from "../repository/memory/AppointmentRepositoryMemory";
import ClientRepositoryMemory from "../repository/memory/ClientRepositoryMemory";
import ProfessionalRepositoryMemory from "../repository/memory/ProfessionalRepositoryMemory";


export default class MemoryRepositoryFactory implements IRepositoryFactory {

    private appointmentRepository: IAppointmentRepository;
    private professionalRepository: IProfessionalRepository;
    private clientRepository: IClientRepository;


    getAppointmentsRepository(): IAppointmentRepository {
        if(!this.appointmentRepository) this.appointmentRepository = new AppointmentRepositoryMemory();
        return this.appointmentRepository;
    }


    getClientRepository(): IClientRepository {
        if(!this.clientRepository) this.clientRepository = new ClientRepositoryMemory();
        return this.clientRepository;
    }

    getProfessionalRepository(): IProfessionalRepository {
        if(!this.professionalRepository) this.professionalRepository = new ProfessionalRepositoryMemory();
        return this.professionalRepository;
    }

}
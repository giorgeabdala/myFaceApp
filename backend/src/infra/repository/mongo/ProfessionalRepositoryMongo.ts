import {IProfessionalRepository} from "../../../domain/adapters/IProfessionalRepository";
import {Professional} from "../../../domain/entities/professional";
import IConnection from "../../../domain/adapters/IConnection";
import {ProfessionalSchema} from "../../db/mongo/professionalSchema";


export default class ProfessionalRepositoryMongo implements IProfessionalRepository {
    private readonly connection: IConnection;

    constructor(connection: IConnection) {
        this.connection = connection;
    }

    async delete(professional: Professional): Promise<void> {
        const db = await this.connection.connect();
        const professionalModel = db.model('ProfessionalSchema', ProfessionalSchema, 'professional');
        await professionalModel.deleteOne({"_id": professional.id});
    }

    async findByEmail(email: string): Promise<Professional> | undefined {
        const db = await this.connection.connect();
        const professionalModel = await db.model('ProfessionalSchema', ProfessionalSchema, 'professional');
        const professionalDocument = await professionalModel.findOne({email: email});
        if (!professionalDocument) return null;
        return Professional.create(professionalDocument.id,
            professionalDocument.name.firstName,
            professionalDocument.name.lastName,
            professionalDocument.cellPhone.DDD,
            professionalDocument.cellPhone.phone,
            professionalDocument.email,
            professionalDocument.calendarId).unwrap();
    }

    async findById(id: string): Promise<Professional> | undefined {
        const db = await this.connection.connect();
        const professionalModel = await db.model('ProfessionalSchema', ProfessionalSchema, 'professional');
        const professionalDocument = await professionalModel.findById(id);
        if (!professionalDocument) return null;
        return Professional.create(professionalDocument.id,
            professionalDocument.name.firstName,
            professionalDocument.name.lastName,
            professionalDocument.cellPhone.DDD,
            professionalDocument.cellPhone.phone,
            professionalDocument.email,
            professionalDocument.calendarId).unwrap();
    }

    async save(professional: Professional): Promise<void> {
        const db = await this.connection.connect();
        const professionalModel = db.model('ProfessionalSchema', ProfessionalSchema, 'professional');
        const professionalDocument = new professionalModel(professional.toObject());
        await professionalDocument.save();
    }

    async findAll(): Promise<Professional[]> {
        const db = await this.connection.connect();
        const professionalModel = await db.model('ProfessionalSchema', ProfessionalSchema, 'professional');
        const professionalDocuments = await professionalModel.find();
        if (!professionalDocuments) return null;
        return professionalDocuments.map(professionalDocument => {
            return Professional.create(professionalDocument.id,
                professionalDocument.name.firstName,
                professionalDocument.name.lastName,
                professionalDocument.cellPhone.DDD,
                professionalDocument.cellPhone.phone,
                professionalDocument.email,
                professionalDocument.calendarId).unwrap();
        } );

    }

    async update(professional: Professional): Promise<Professional> {
        const db = await this.connection.connect();
        const professionalModel = db.model('ProfessionalSchema', ProfessionalSchema, 'professional');
        return professionalModel.updateOne({_id: professional.id}, professional.toObject());

    }



}
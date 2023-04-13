import 'dotenv/config';
import axios from "axios";
import IWhatsAppNotificationService from "../../../domain/adapters/IWhatsAppNotificationService";
import {Err, Ok, Result} from "ts-results";
const API_URL = process.env.WHATS_API_URI;
const API_KEY = process.env.API_KEY;

export default class WhatsAppNotificationServiceCodeChat implements IWhatsAppNotificationService {
    private readonly headers = {"apikey": API_KEY};
    private readonly requestBody = {
        number: "",
        options: {delay: 900},
        textMessage: {text: ""}
    };

    async send(DDD: string, number: string, message: string): Promise<Result<Response, Response>> {
        const phone = `55${DDD}${number}`;
        this.requestBody.number = phone;
        this.requestBody.textMessage.text = message;
        const axiosResponse = await axios.post(API_URL, this.requestBody, {headers: this.headers});
        const response = new Response(axiosResponse.data);
        if (response.status === 200) return new Ok(response);
        return new Err(response);
    }

    buildMessage(clientName: string, appointmentDate: string, appointmentHour: string): string {
        return `Oi ${clientName}
Tudo bem?
Passando para lembrar que *Amanhã, ${appointmentDate} as ${appointmentHour}hrs* você tem um horário agendado para extensão de cílios.
Rua Rio Xingu, 625 - Sobrado 8 Bairro Alto.
            
Por gentileza, confirme sua presença.`;
  }

}

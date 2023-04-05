import IWhatsAppNotificationService from "../../domain/adapters/IWhatsAppNotificationService";
import axios from "axios";
import {Err, Ok, Result} from "ts-results";
import tokenMeta from "../../credentials/meta/token.meta.json";

const endpoint = 'https://graph.facebook.com/v16.0/116366861390558/messages';
const headers = {
    'Authorization': 'Bearer ' + tokenMeta.token,
    'Content-Type': 'application/json',
};
const data = {
    'messaging_product': 'whatsapp',
    'to': '5541995691111',
    'type': 'template',
    'template': {
        'name': 'confirmacao_agendamento',
        'language': {
            'code': 'pt_BR',
        },
        'components': [
            {
                'type': 'body',
                'parameters': [
                    {
                        'type': 'text',
                        'text': '<nome_do_cliente>',
                    },
                    {
                        'type': 'text',
                        'text': '<data_do_agendamento>',
                    },
                    {
                        'type': 'text',
                        'text': '<horario_do_agendamento>',
                    }
                ],
            } ],
    },
};

const hello_world =
     {
    'messaging_product': 'whatsapp',
    'to': '5541995691111',
    'type': 'template',
    'template': {
        'name': 'hello_world',
        'language': {
            'code': 'en_US',
        },
    },
};

export default  class WhatsAppNotificationServiceOficial implements IWhatsAppNotificationService {

    public async send(DDD: string, number: string, clientName: string, appointmentDate: string, appointmentHour: string): Promise<Result<Response, Response>> {
        data.to = '55' + DDD + number;
        data.template.components[0].parameters[0].text = clientName;
        data.template.components[0].parameters[1].text = appointmentDate;
        data.template.components[0].parameters[2].text = appointmentHour;
        const axiosResponse = await axios.post(endpoint, hello_world, {headers: headers});
        const response = new Response(axiosResponse.data);
        if (response.status === 200) return new Ok(response);

        return new Err(response);

}

}
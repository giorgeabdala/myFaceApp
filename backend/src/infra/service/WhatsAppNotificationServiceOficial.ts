import IWhatsAppNotificationService from "../../domain/adapters/IWhatsAppNotificationService";
import axios from "axios";
import {Err, Ok, Result} from "ts-results";

const endpoint = 'https://graph.facebook.com/v15.0/116366861390558/messages';
const headers = {
    'Authorization': 'Bearer EAAfUan3WpakBAIk9leunZADJnhAfJHYaMIZAtvO8AFZAxljbZCWZAMjwOIQ4iTclDHc8BqqseaYVQMbOFZBPZAZBCSb1080aY3H9JBK0hKT1GysrpkSCZA8q01wDFntHrAMQjTKIq2pYICwm5ou1kZAcKSzaEsujGLHAKZAlsGnyl4uAu2Ifex1BwNxGHZADJfYqOYZCj6FEovwrB2AZDZD',
    'Content-Type': 'application/json',
};
const data = {
    'messaging_product': 'whatsapp',
    'to': '',
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
                        'text': 'Nome do cliente',
                    },
                    {
                        'type': 'text',
                        'text': 'Data do agendamento',
                    },
                    {
                        'type': 'text',
                        'text': 'Horário do agendamento',
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

    constructor() {}

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
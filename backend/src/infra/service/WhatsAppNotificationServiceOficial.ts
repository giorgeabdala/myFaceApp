import IWhatsAppNotificationService from "../../domain/adapters/IWhatsAppNotificationService";
import axios from "axios";

const endpoint = 'https://graph.facebook.com/v15.0/116366861390558/messages';
const headers = {
    'Authorization': 'Bearer EAAfUan3WpakBAIk9leunZADJnhAfJHYaMIZAtvO8AFZAxljbZCWZAMjwOIQ4iTclDHc8BqqseaYVQMbOFZBPZAZBCSb1080aY3H9JBK0hKT1GysrpkSCZA8q01wDFntHrAMQjTKIq2pYICwm5ou1kZAcKSzaEsujGLHAKZAlsGnyl4uAu2Ifex1BwNxGHZADJfYqOYZCj6FEovwrB2AZDZD',
    'Content-Type': 'application/json',
};
const data = {
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

    public async send(DDD: string, number: string, message: string): Promise<void> {
        const response = await axios.post(endpoint, data, {headers: headers});
        console.log(response.data);
}

}
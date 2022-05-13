import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerChangedAddressEvent from "../customer-changed-address.event";

export default class EnviaConsoleLogHandler implements EventHandlerInterface<CustomerChangedAddressEvent>{
    handle(event: CustomerChangedAddressEvent): void {
        const street = event.eventData.address.street;
        const number = event.eventData.address.number;
        const zip = event.eventData.address.zip;
        const city = event.eventData.address.city;

        console.log(`Endereço do cliente: 
        ${event.eventData.id}, 
        ${event.eventData.name} 
        alterado para: 
        ${event.eventData.address.street},
        ${event.eventData.address.number},
        ${event.eventData.address.zip},
        ${event.eventData.address.city},
        `)
    }
}
import CustomerChangedAddressEvent from "../customer/customer-changed-address.event";
import CustomerCreatedEvent from "../customer/customer-created.event";
import EnviaConsoleLogHandler from "../customer/handler/envia-console-log.handler.ts";
import EnviaConsoleLog1Handler from "../customer/handler/envia-console-log1.handler";
import EnviaConsoleLog2Handler from "../customer/handler/envia-console-log2.handler.ts";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
    it("Should register an event handler (product)", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    });
    it("Should unregister an event handler (product)", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
    });
    it("Should unregister all event handlers (product)", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
    });
    it("Should notify all event handlers (product)", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Product 1 descreption",
            price: 10,
        })

        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });
    it("Should register an event handler (customer)", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler1 = new EnviaConsoleLog1Handler();
        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);

        const eventHandler2 = new EnviaConsoleLog2Handler();
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler1);

        const eventHandler = new EnviaConsoleLogHandler();
        eventDispatcher.register("CustomerChangedAddressEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]).toMatchObject(eventHandler);
    });
    it("Should unregister an event handler (customer)", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler1 = new EnviaConsoleLog1Handler();
        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);

        eventDispatcher.unregister("CustomerCreatedEvent", eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(0);

        const eventHandler2 = new EnviaConsoleLog2Handler();
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);

        eventDispatcher.unregister("CustomerCreatedEvent", eventHandler2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(0);

        const eventHandler = new EnviaConsoleLogHandler();
        eventDispatcher.register("CustomerChangedAddressEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("CustomerChangedAddressEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"].length).toBe(0);
    });
    it("Should unregister all event handlers (customer)", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler1 = new EnviaConsoleLog1Handler();
        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);

        eventDispatcher.unregisterAll();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined();

        const eventHandler2 = new EnviaConsoleLog2Handler();
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler2);

        eventDispatcher.unregisterAll();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined();
        
        const eventHandler = new EnviaConsoleLogHandler();
        eventDispatcher.register("CustomerChangedAddressEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();
        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"]).toBeUndefined();
    });
    it("Should notify all event handlers (product)", () => {
        const eventDispatcher = new EventDispatcher();
        
        const eventHandler1 = new EnviaConsoleLog1Handler();
        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);

        const customerCreatedEvent1 = new CustomerCreatedEvent({
            id: "1",
            name: "Um",
        })

        eventDispatcher.notify(customerCreatedEvent1);

        expect(spyEventHandler1).toHaveBeenCalled();

        const eventHandler2 = new EnviaConsoleLog2Handler();
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

        const customerCreatedEvent2 = new CustomerCreatedEvent({
            id: "1",
            name: "Um",
        })

        eventDispatcher.notify(customerCreatedEvent2);

        expect(spyEventHandler2).toHaveBeenCalled();

        const eventHandler = new EnviaConsoleLogHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerChangedAddressEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]).toMatchObject(eventHandler);

        const customerChangedAddressEvent = new CustomerChangedAddressEvent({
            id: "1",
            address: "Um",
        })

        eventDispatcher.notify(customerChangedAddressEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });
});
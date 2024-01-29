import { IService } from "../../entities/contact";
import { IContact } from "../../presences";
import { IPresenceSubscriber, IPublicPresenceSubscription } from "./presence.subscriptions";
export declare class PresenceSubscriberDecorator implements IPresenceSubscriber {
    private inner;
    constructor(inner: IPresenceSubscriber);
    subscribe(contactSubscriptions: IPublicPresenceSubscription<IContact>[], servicesSubscriptions: IPublicPresenceSubscription<IService>[]): Promise<boolean>;
    unsubscribe(contactSubscriptions: IPublicPresenceSubscription<IContact>[], servicesSubscriptions: IPublicPresenceSubscription<IService>[]): Promise<boolean>;
    updateToken(idToken: string): void;
}

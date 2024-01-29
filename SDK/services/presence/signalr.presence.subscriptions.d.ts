import { IPresenceSubscriber, IPublicPresenceSubscription } from "./presence.subscriptions";
import { PresenceSubscriptionsInitSettings } from "../../entities/presence.entities";
import { IContact } from "../../presences";
import { IService } from "../../entities/contact";
export declare class SignalrPresenceSubscriber implements IPresenceSubscriber {
    private _hub;
    constructor(settings: PresenceSubscriptionsInitSettings);
    unsubscribe(contactSubscriptions: IPublicPresenceSubscription<IContact>[], servicesSubscriptions: IPublicPresenceSubscription<IService>[]): Promise<boolean>;
    subscribe(contactSubscriptions: IPublicPresenceSubscription<IContact>[], servicesSubscriptions: IPublicPresenceSubscription<IService>[]): Promise<boolean>;
    updateToken(idToken: string): void;
    private statusChanged;
}

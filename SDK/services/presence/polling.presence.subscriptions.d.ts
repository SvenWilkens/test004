import { IPresenceSubscriber, IPublicPresenceSubscription } from "./presence.subscriptions";
import { PresenceSubscriptionsInitSettings } from "../../entities/presence.entities";
import { IService } from "../../entities/contact";
import { IContact } from "../../presences";
export declare class PollingPresenceSubscriber implements IPresenceSubscriber {
    private _settings;
    private _pollingEntityByPublicUserId;
    private _pollingEntityByPublicServiceId;
    private _retryInterval;
    private _retryFactory;
    private getKey;
    constructor(_settings: PresenceSubscriptionsInitSettings);
    subscribe(contactSubscriptions: IPublicPresenceSubscription<IContact>[], servicesSubscriptions: IPublicPresenceSubscription<IService>[]): Promise<boolean>;
    unsubscribe(contactSubscriptions: IPublicPresenceSubscription<IContact>[], servicesSubscriptions: IPublicPresenceSubscription<IService>[]): Promise<boolean>;
    updateToken(idToken: string): void;
    private sendUpdates;
    private getUpdates;
    private getContactToSubscribe;
}

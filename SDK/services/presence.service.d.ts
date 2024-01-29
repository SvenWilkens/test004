import { InitPresenceSettings } from "../entities/initSettings";
import { UsersServicesPresenceSubscriptionsOffType, UsersServicesPresenceSubscriptionsOnType } from "./presence/presence.subscriptions";
export declare class PresenceService {
    private _presenceSubscriptions;
    private _inited;
    private _idToken;
    Off(subscriptions: UsersServicesPresenceSubscriptionsOffType): Promise<boolean>;
    On(subscriptions: UsersServicesPresenceSubscriptionsOnType): Promise<boolean>;
    init(initSettings: InitPresenceSettings): Promise<PresenceService>;
    updateToken(idToken: string): void;
    private getPresenceSubscriptions;
    private get initialized();
    private throwIfNotInitialized;
    private getContactToSubscribe;
}

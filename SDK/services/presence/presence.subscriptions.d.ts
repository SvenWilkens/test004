import { IContact, IService } from "../../entities/contact";
import { PresenceCallbacks } from "../../entities/presence.entities";
export interface IPresenceCallBack {
    callbacks: PresenceCallbacks;
}
export type UsersServicesPresenceSubscriptionsOffType = (IPublicPresenceSubscription<IContact> | IPublicPresenceSubscription<IService>)[] | (IContact | IService)[];
export type UsersServicesPresenceSubscriptionsOnType = (IPublicPresenceSubscription<IContact> | IPublicPresenceSubscription<IService>)[];
export type IPublicPresenceSubscription<Type> = Type & IPresenceCallBack;
export interface IPresenceSubscriber {
    subscribe(contactSubscriptions: IPublicPresenceSubscription<IContact>[], servicesSubscriptions: IPublicPresenceSubscription<IService>[]): Promise<boolean>;
    unsubscribe(contactSubscriptions: IPublicPresenceSubscription<IContact>[], servicesSubscriptions: IPublicPresenceSubscription<IService>[]): Promise<boolean>;
    updateToken(idToken: string): void;
}

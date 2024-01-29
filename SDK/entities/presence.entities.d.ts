import { MultipleContactApi } from "../services/api/multi-api.service";
import { IPublicPresenceSubscription } from "../services/presence/presence.subscriptions";
import { IApiGenericError } from "./api.entities";
import { IContact, IService } from "./contact";
export interface IServicePresence extends IService {
    availabilityStatus: string;
}
export interface IContactPresence extends IContact {
    presenceStatus: PresenceStatus;
}
export type IPublicPresence = IServicePresence | IContactPresence;
export interface IContactPresenceResponse {
    users: IContactPresence[];
    services: IServicePresence[];
}
export interface IContactPresenceRequest {
    users: IContact[];
    services: IService[];
}
export interface IServicePresenceRequest {
}
export interface PresenceCallbacks {
    onChanged?: (presence: IContactPresence | IServicePresence) => void;
}
export type PresenceStatus = "PresenceUnknown" | "Available" | "AvailableIdle" | "Away" | "BeRightBack" | "Busy" | "BusyIdle" | "DoNotDisturb" | "Offline";
export declare class PresenceSubscriptionsInitSettings {
    api: MultipleContactApi;
    retryDelays: number[];
    constructor(api: MultipleContactApi, retryDelays?: number[]);
}
export interface SignalrSubscription {
    contactSubscriptions: IPublicPresenceSubscription<IContact>[];
    serviceSubscriptions: IPublicPresenceSubscription<IService>[];
    statusChanged: (state: PresenceConnection, signalrError?: Error, apiError?: IApiGenericError) => Promise<void>;
}
export type PresenceConnection = "Disconnected" | "Connecting" | "Connected" | "Disconnecting" | "Reconnecting";
export declare function presenceChanged(first: IPublicPresence, second: IPublicPresence): boolean;

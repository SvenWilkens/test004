import { SignalrSubscription } from "../../entities/presence.entities";
import { IKick, IScheduleMeetingAndInvite } from "../base/contracts";
export declare class HubInitSettings {
    signalrUrl: string;
    widgetKey: string;
    retryDelays: number[];
    constructor(signalrUrl: string, widgetKey: string, retryDelays?: number[]);
    getUniqueId(): string;
    isEqual(other: HubInitSettings): boolean;
    copy(): HubInitSettings;
}
export declare class HubFactory {
    private static _hubByUniqueId;
    static create(settings: HubInitSettings): Hub;
}
export declare class Hub {
    private _settings;
    private _idToken;
    private _storage;
    constructor(_settings: HubInitSettings);
    private _connection;
    private _onError;
    private _startRetry;
    private _retryFactory;
    private _signalrEntityByPublicUserId;
    private _signalrEntityByPublicServiceId;
    private getKey;
    subscribe(value: SignalrSubscription): Promise<void>;
    unsubscribeById(contactId: string): Promise<void>;
    unsubscribe(value: SignalrSubscription): Promise<void>;
    updateToken(idToken: string): Promise<void>;
    private subscribeToPresence;
    private getContactsToSubscribe;
    private setupConnection;
    private closeConnection;
    private connect;
    private _meetingCallbacksByPublicId;
    scheduleMeetingAndInvite(schedule: IScheduleMeetingAndInvite): Promise<void>;
    stopMeetingAndKick(kick: IKick): Promise<void>;
    private setupRetryAndStart;
    private clearConnection;
    private getUrl;
    private onErrorHappened;
    private onPresenceChanged;
    private _scheduledMeeting;
    getMeetingUrl(): Promise<{
        meetingLink: string;
    }>;
    getThreadId(): Promise<string>;
    private onConversationChanged;
    private onEvent;
    private onClose;
    private onReconnecting;
    private onReconnected;
}

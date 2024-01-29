import { ChatStatus, ContactStatus } from '../../entities/contactStatus';
import { IAcsToken, IAcsEnvirionment, IApiEnvironment, IMeetingInfo } from "../../entities/api.entities";
import { UserDetails, UserDetailsChat } from '../../entities/userDetails';
import { IPublicContact } from '../../entities/contact';
import { CustomerDetails } from '../../entities/customerDetails';
import { DtmfTone } from '../../entities/dtmfTone';
export interface ContactApiSettings {
    apiUrl: string;
    widgetKey: string;
    contact: IPublicContact;
    idToken?: string;
}
export interface IContactApi {
    getAcsEnvironment(): Promise<IAcsEnvirionment>;
    getApiEnvironment(): Promise<IApiEnvironment>;
    getToken(): Promise<IAcsToken>;
    getThreadId(): Promise<string>;
    getSessionId(): string;
    startChat(client: UserDetails, abortController: AbortController): any;
    stopChat(keepalive: boolean, force?: boolean): any;
    getChatStatus(): Promise<ChatStatus>;
    inviteChat(): Promise<boolean>;
    scheduleMeetingAndInvite(client: UserDetails, abortController: AbortController): Promise<IMeetingInfo>;
    getContext(): Promise<{
        meetingLink: string;
        everyoneCanSkipLobby: boolean;
    }>;
    getContactStatus(): Promise<ContactStatus>;
    getServiceStatus(): Promise<Map<string, ContactStatus>>;
    sendDtmfTone(tone: DtmfTone): Promise<void>;
    stopMeetingAndKick(): Promise<boolean>;
    updateAuthorizationToken(idToken: string): void;
    checkParticipants(): any;
    schedule(client: UserDetails, abortController: AbortController): Promise<IMeetingInfo>;
    invite(customer: CustomerDetails, abortController: AbortController): Promise<void>;
}
export declare class ContactApi implements IContactApi {
    private _initSettings;
    private _acsSettings;
    private _idToken;
    private _apiId;
    private _storage;
    constructor(settings: ContactApiSettings);
    schedule(client: UserDetails, abortController: AbortController): Promise<IMeetingInfo>;
    invite(customer: CustomerDetails, abortController: AbortController): Promise<void>;
    updateAuthorizationToken(idToken: string | null): void;
    getApiEnvironment(): Promise<IApiEnvironment>;
    getToken(): Promise<IAcsToken>;
    getAcsEnvironment(): Promise<IAcsEnvirionment>;
    scheduleMeetingAndInvite(client: UserDetails, abortController: AbortController): Promise<IMeetingInfo>;
    startChat(client: UserDetailsChat, abortController: AbortController): Promise<any>;
    inviteChat(): Promise<boolean>;
    stopChat(keepalive?: boolean, force?: boolean): Promise<boolean>;
    stopMeetingAndKick(): Promise<boolean>;
    getMeetingUrl(): Promise<{
        meetingLink: string;
    }>;
    getContext(): Promise<{
        meetingLink: string;
        everyoneCanSkipLobby: boolean;
    }>;
    getThreadId(): Promise<string>;
    getAccessToken(): Promise<string>;
    getContactStatus(): Promise<ContactStatus>;
    getChatStatus(): Promise<ChatStatus>;
    getServiceStatus(): Promise<Map<string, ContactStatus>>;
    checkParticipants(): Promise<unknown>;
    sendDtmfTone(tone: DtmfTone): Promise<void>;
    private getPublicId;
    private put;
    private post;
    private get;
    private getHeaders;
    private getUrl;
    private fetchBody;
    private throwError;
    getSessionId(): any;
}

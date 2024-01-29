import { IAcsEnvirionment, IApiEnvironment, IAcsToken, IMeetingInfo } from "../../entities/api.entities";
import { ChatStatus } from "../../entities/contactStatus";
import { CustomerDetails } from "../../entities/customerDetails";
import { DtmfTone } from "../../entities/dtmfTone";
import { UserDetails, UserDetailsChat } from "../../entities/userDetails";
import { ContactStatus } from "../../presences";
import { ContactApiSettings, IContactApi } from "./api.service";
export declare class AsyncContactApi implements IContactApi {
    private _settings;
    private _hub;
    private _api;
    private _scheduledMeeting;
    private _pendingSchedule;
    constructor(_settings: ContactApiSettings);
    inviteChat(): Promise<boolean>;
    getChatStatus(): Promise<ChatStatus>;
    checkParticipants(): void;
    schedule(client: UserDetails, abortController: AbortController): Promise<IMeetingInfo>;
    invite(customer: CustomerDetails, abortController: AbortController): Promise<void>;
    getAcsEnvironment(): Promise<IAcsEnvirionment>;
    getApiEnvironment(): Promise<IApiEnvironment>;
    getToken(): Promise<IAcsToken>;
    getSessionId(): any;
    getContext(): Promise<{
        meetingLink: string;
        everyoneCanSkipLobby: boolean;
    }>;
    getThreadId(): Promise<string>;
    sendDtmfTone(tone: DtmfTone): Promise<void>;
    scheduleMeetingAndInvite(client: UserDetails, _: AbortController): Promise<IMeetingInfo>;
    startChat(client: UserDetailsChat, abortController: AbortController): Promise<any>;
    stopChat(): Promise<boolean>;
    getServiceStatus(): Promise<Map<string, ContactStatus>>;
    private onReconnected;
    private onConversationChanged;
    getContactStatus(): Promise<ContactStatus>;
    stopMeetingAndKick(): Promise<boolean>;
    updateAuthorizationToken(idToken: string): void;
}

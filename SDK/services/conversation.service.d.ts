import { DevicesSettings } from "../entities/deviceSettings";
import { UserDetails, UserDetailsChat } from "../entities/userDetails";
import { CallOptions } from "../entities/callOptions";
import { ConversationSubscriptions } from "./conversation.subscriptions";
import { ChatStatus, ContactStatus, ServiceStatus } from "../entities/contactStatus";
import { CallResult } from "../entities/callResult";
import { IPublicContact } from "../entities/contact";
import { CallInformation } from "../entities/callinformation";
import { IContactPresence } from "../entities/presence.entities";
import { RestoredMessage } from "../entities/message";
import { DtmfTone } from "../entities/dtmfTone";
export interface ConversationServiceSettings {
    apiUrl: string;
    widgetKey: string;
    contact?: IPublicContact;
    idToken?: string;
    enableAsync: boolean;
}
export declare class ConversationService {
    private _settings;
    private _subscriptions;
    private _callAgent;
    private _deviceManager;
    private _callService;
    private _chatService;
    private _participantsService;
    private _contactId;
    private _userDetails;
    private _multiApi;
    private _callClient;
    private _abortController;
    private _isCallSupported;
    private _acsUserId;
    constructor(_settings: ConversationServiceSettings, _subscriptions: ConversationSubscriptions);
    startConversation(userDetails: UserDetails, contactId?: string, isAudioOnly?: boolean): Promise<string>;
    startChatConversation(userDetails: UserDetailsChat, contactId?: string): Promise<string>;
    startCall(options: CallOptions): Promise<CallResult>;
    stopCall(internal: boolean): Promise<boolean>;
    stopChat(): Promise<boolean>;
    changeCamera(): Promise<string>;
    toggleVideo(): Promise<string | undefined>;
    updateDevices(devices: DevicesSettings): Promise<void>;
    toggleMute(mute: boolean): Promise<void>;
    toggleScreenSharing(enable: boolean): Promise<void>;
    sendDtmfTone(tone: DtmfTone): Promise<void>;
    sendTypingNotification(): Promise<boolean>;
    sendReadReceipt(messageId: string): Promise<void>;
    sendMessage(message: {
        text: string;
    }): Promise<string>;
    editMessage(messageId: string, message: {
        text: string;
    }): Promise<never>;
    deleteMessage(messageId: string): Promise<never>;
    getRestoredMessages(): Promise<RestoredMessage[]>;
    updateToken(idToken: string | null): void;
    getContactStatus(contact: string): Promise<ContactStatus>;
    getServiceStatus(contact: string): Promise<ServiceStatus>;
    getChatStatus(contact: string): Promise<ChatStatus>;
    getContactPresence(contact: string): Promise<IContactPresence>;
    private createModalitiesServices;
    getCallState(): CallInformation;
    private subscribeCallEvents;
    private onCallFinished;
    private handleConversationFinished;
    private throwIfServiceNotInited;
    private throwIfCallAlreadyStarted;
    private stopChatOnPageLeaving;
}

/**
 * @module InteractSdk
 */
import { DevicesSettings } from "./entities/deviceSettings";
import { errors } from "./entities/errors";
import { Participant } from "./entities/participant";
import { CallOptions } from "./entities/callOptions";
import { InitPresenceSettings, InitConversationSettings, InitSettings, MultipleContactInitSettings } from "./entities/initSettings";
import { UserDetails, UserDetailsChat } from "./entities/userDetails";
import { CallCallbacks } from "./entities/callCallbacks";
import { ChatCallbacks } from "./entities/chatCallbacks";
import { ParticipantCallbacks } from "./entities/participantCallbacks";
import { BaseMessage, DeletedMessage, EditedMessage, Message, RestoredMessage, Sender } from "./entities/message";
import { ScreenSharingCallbacks } from "./entities/screenSharingCallbacks";
import { IPresenceCallBack, IPublicPresenceSubscription, UsersServicesPresenceSubscriptionsOffType, UsersServicesPresenceSubscriptionsOnType } from "./services/presence/presence.subscriptions";
import { ChatStatus, ContactStatus, ServiceStatus } from "./entities/contactStatus";
import { ErrorHandler, ErrorMessage, ErrorMessageSeverity } from "./entities/conversationConfig";
import { CallResult } from "./entities/callResult";
import { IContact, IService } from "./entities/contact";
import { IContactPresence, IServicePresence, PresenceCallbacks, PresenceStatus } from "./entities/presence.entities";
import { CallInformation } from "./entities/callinformation";
import { DtmfTone } from "./entities/dtmfTone";
export default class Interact {
    private _conversationService;
    private _conversationSubscriptions;
    private _presenceService;
    private static _presenceServiceStatic;
    private _initSettings;
    static presence: {
        /**
         * Unsubscribe from presence events
         */
        off: (subscriptions: UsersServicesPresenceSubscriptionsOffType) => Promise<boolean>;
        /**
         * Subscribe with callbacks to the presence events
         * @param subscriptions Contains presence callbacks for particular user
         */
        on: (subscriptions: UsersServicesPresenceSubscriptionsOnType) => Promise<boolean>;
        /**
         * init the presences  settings
         * @param initSettings  initial setup parameters
         */
        init: (initSettings: InitPresenceSettings) => Promise<void>;
    };
    /**
     * Subscribe for errors from static methods
     * @param handler Handler for errors
     */
    static errors(handler: ErrorHandler): Promise<void>;
    /**
     * Receive details about contact and it availability
     *  @param initSettings initial setup parameters to access to api
     *  @returns contact status
     */
    static getContactStatus(initSettings: InitConversationSettings): Promise<ContactStatus>;
    /**
     * Receive details about contacts and it availability
     *  @param initSettings initial setup parameters to access to api
     *  @returns map of id and contact status
     */
    static getMultipleContactStatus(initSettings: MultipleContactInitSettings): Promise<Map<string, ContactStatus>>;
    /**
     * Receive details about contact presence
     *  @param initSettings initial setup parameters to access to api
     *  @returns contact presence
     */
    static getContactPresence(initSettings: InitConversationSettings): Promise<IContactPresence>;
    /**
     * Receive details about contacts presence
     *  @param initSettings initial setup parameters to access to api
     *  @returns contacts presence
     */
    static getMultipleContactPresence(initSettings: MultipleContactInitSettings): Promise<Array<IContactPresence>>;
    /**
     *  Set Authorization token for each request. Only for one tenant solutions
     *  @param idToken tokenId
     */
    static useAuthorization(idToken: string | null): void;
    conversation: {
        callChanged: {
            /**
             * Unsubscribe from  call events
             */
            off: () => void;
            /**
             * Subscribe with callbacks to the call events
             * @param callCallbacks Contains call callbacks
             */
            on: (callCallbacks: CallCallbacks) => void;
        };
        participantsChanged: {
            /**
             * Unsubscribe from  participant events
             */
            off: () => void;
            /**
             * Subscribe with callbacks to the participant events
             * @param participantCallbacks Contains participant callbacks
             */
            on: (participantCallbacks: ParticipantCallbacks) => void;
        };
        chat: {
            /**
             * Unsubscribe from  chat events
             */
            off: () => void;
            /**
             * Subscribe with callbacks to the participant events
             * @param messagesCallbacks Contains chat callbacks
             */
            on: (messagesCallbacks: ChatCallbacks) => void;
        };
        errors: {
            /**
             * Unsubscribe from  errors events
             */
            off: () => void;
            /**
             * Subscribe with callbacks to the participant events
             * @param errors Callback that handle an error message from the {@link errors}
             */
            on: (onError: (er: typeof errors) => void) => void;
        };
        screenSharing: {
            /**
             * Unsubscribe from  screensharing events
             */
            off: () => void;
            /**
             * Subscribe with callbacks to the screen sharing events
             * @param screenSharingCallBacks Contains screen sharing callbacks
             */
            on: (screenSharingCallBacks: ScreenSharingCallbacks) => void;
        };
    };
    presence: {
        /**
         * Unsubscribe from presence events
         */
        off: (subscriptions: UsersServicesPresenceSubscriptionsOffType) => Promise<boolean>;
        /**
         * Subscribe with callbacks to the presence events
         * @param subscriptions Contains presence callbacks for particular user
         */
        on: (subscriptions: UsersServicesPresenceSubscriptionsOnType) => Promise<boolean>;
    };
    /**
     * Create instance of sdk to work with conversation
     * @param initSettings  initial setup parameters
     */
    constructor(initSettings: InitConversationSettings);
    /**
     * Receive details about contact and it availability
     *
     *  @returns contact status
     */
    getContactStatus(contact: string): Promise<ContactStatus>;
    /**
     * Receive details about contact and it availability
     *
     *  @returns service status
     */
    getServiceStatus(serviceId: string): Promise<ServiceStatus>;
    getChatStatus(contactId: string): Promise<ChatStatus>;
    /**
    * Receive details about contact presence
    *
    *  @returns contact presence
    */
    getContactPresence(contact: string): Promise<IContactPresence>;
    /**
     *  Set Authorization token for each request. Only for one tenant solutions
     *
     */
    setAuthorization(idToken: string | null): void;
    /**
     * init the presences  settings
     * @param type  type of the connection to getting presences
     */
    initPresence(type: "signalR" | "polling"): Promise<void>;
    /**
     * Init the conversation with teams agent
     * @param userDetails  User information for the conversation
     * @param contact Contact Id. It's used in cases default contactId was not provided in constructor
     * @param isAudioOnly By default false. Specify if call could be started without checking permissions for video device
     * @returns unique session id
     */
    startConversation(userDetails: UserDetails, contact?: string, isAudioOnly?: boolean): Promise<string>;
    /**
     * Init the conversation with teams agent
     * @param userDetails  User information for the conversation
     * @param contact ServiceId or ContactId. It's used in cases default contactId was not provided in constructor
     * @returns unique session id
     */
    startChatConversation(userDetails: UserDetailsChat, contact?: string): Promise<string>;
    /**
     * Stop chat only conversation
     *
     */
    stopChat(): Promise<boolean>;
    /**
     * Start call in the active conversation
     * @param options Call options
     * @return state of the call after connection
     */
    startCall(options: CallOptions): Promise<CallResult>;
    /**
     * Stop call and conversation
     */
    stopCall(): Promise<boolean>;
    /**
     * Enable or disable self video stream
     * @returns id of enabled video device or undefined if camera is disabled
     */
    toggleVideo(): Promise<string | undefined>;
    /**
     * Enable next camera
     *  @returns id of enabled video device
     */
    changeCamera(): Promise<string>;
    /**
     * Update media devices which are using on the call
     *   @param options Call options
     */
    updateDevices(options: CallOptions): Promise<void>;
    /**
     * Mute or unmute client speakers
     * @param mute State of the speakers
     */
    toggleMute(mute: boolean): Promise<void>;
    /**
     * Send dtmf tone to the A/V call with service
     * @param tone dtmf tone
     */
    sendDtmfTone(tone: DtmfTone): Promise<void>;
    /**
     * Send message to the conversation
     *  @param message Text of the message
     *  @returns The unique id of the sent message
     */
    sendMessage(message: {
        text: string;
    }): Promise<string>;
    /**
     * Send message to the conversation
     *  @param messageId Id of the deleted message
     */
    deleteMessage(messageId: string): Promise<void>;
    /**
    * Send message to the conversation
    * @param messageId id of the updated message
    *  @param message Updated text of the message
    */
    editMessage(messageId: string, message: {
        text: string;
    }): Promise<void>;
    /**
     * Send notification about typing event to the conversation
     * @returns True if the typing message notification could be sent, otherwise false.
     */
    sendTypingNotification(): Promise<boolean>;
    /**
     * @hidden
     * Send notification that message was read
     * @param messageId Id of the read message
     */
    sendReadReceipt(messageId: string): Promise<void>;
    /**
     * Enable or disable self screen sharing
     * @param enableScreenSharing state of the self screensharing
     */
    toggleScreenSharing(enableScreenSharing: boolean): Promise<void>;
    /**
     * Get information about active call
     * @returns call status
     */
    getCallState(): CallInformation;
    /**
     * Get all messages from current conversation, including own participant messages
     * @returns array of restored messages
     */
    getRestoredMessages(): Promise<RestoredMessage[]>;
}
export { InitSettings, InitPresenceSettings, InitConversationSettings, MultipleContactInitSettings, Participant, UserDetails, UserDetailsChat, CallOptions, errors, ErrorHandler, ErrorMessage, ErrorMessageSeverity, DevicesSettings, CallCallbacks, ParticipantCallbacks, ChatCallbacks, ScreenSharingCallbacks, PresenceCallbacks, Message, Sender, IServicePresence, IContactPresence, UsersServicesPresenceSubscriptionsOffType, UsersServicesPresenceSubscriptionsOnType, ContactStatus, ServiceStatus, CallResult, CallInformation, IService, IContact, PresenceStatus, IPresenceCallBack, IPublicPresenceSubscription, DtmfTone, RestoredMessage, ChatStatus, BaseMessage, EditedMessage, DeletedMessage };

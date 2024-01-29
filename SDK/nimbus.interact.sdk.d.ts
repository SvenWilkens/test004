export declare interface BaseMessage {
    /** Message id. This Id is server generated */
    id: string;
    /**Date when message was created */
    createdOn: Date;
    /**Type of the message. Possible types are "Text" and "RichText/Html". */
    type: string;
    /** Message sender information */
    sender: Sender;
}

export declare interface CallCallbacks {
    /** The callback will be called after this call is be established */
    onStart: () => void;
    /** The callback wil be called after this call is be finished */
    onStop: () => void;
    /** The callback wil be called after the participant with @param id will start or stop his video */
    onRemoteVideo: (isActive: boolean, id: string) => void;
    /** The callback wil be called after the client will join the call lobby */
    inLobby?: () => void;
    /** The callback will be called on starting transferring call process*/
    onTransferStarted?: () => void;
    /** The callback will be called after transferring will be finished*/
    onTransferFinished?: () => void;
}

export declare interface CallInformation {
    /**
     * Get the state of this Call.
     */
    state: 'None' | 'Connecting' | 'Ringing' | 'Connected' | 'LocalHold' | 'RemoteHold' | 'InLobby' | 'Disconnecting' | 'Disconnected' | 'EarlyMedia';
    /**
     * Whether screen sharing is on.
     */
    isScreenSharingOn: boolean;
    /**
     * Whether local user is muted, locally or remotely.
     */
    isAudioMuted: boolean;
    /**
     * Whether local video is on.
     */
    isVideoMuted: boolean;
}

export declare interface CallOptions {
    /** Selected devices used in the call */
    devices: DevicesSettings;
    /** Id of the html element where video tag with self video stream would be placed.*/
    selfVideoId?: string;
    /** Id of the html element where video tag with remote video streams would be placed.
     * There will be separate video stream for each remote participant*/
    videoId?: string;
    /** Id of the html element where video tag with screen sharing stream would be placed.*/
    screenSharingId?: string;
    /** Name which should be used instead of agents name in all events*/
    replacedAgentName?: string;
}

export declare interface CallResult {
    /** is video enabled */
    video: boolean;
}

export declare interface ChatCallbacks {
    /** The callback will called after a message from the remote participant is received */
    onMessageReceived: (message: Message) => void;
    /** The callback will called after a message from the remote participant is received */
    onMessageDeleted?: (message: Message) => void;
    /** The callback will called after a message from the remote participant is received */
    onMessageEdited?: (message: Message) => void;
    /** The callback is called when the remote participant has starting typing */
    onTypingParticipantAdded?: (participant: Participant) => void;
    /** The callback is called when the remote participant is not typing for several seconds */
    onTypingParticipantRemoved?: (participant: Participant) => void;
    /** The callback is called after chat will be finished */
    onStopChat?: () => void;
}

export declare interface ChatStatus {
    /** Indicate if there was active chat conversation with this contact before page was reloaded */
    isAlive: boolean;
}

export declare interface ContactStatus {
    /** Is the contact enable*/
    isEnabled: boolean;
    /** The name of contact */
    displayName: string;
    /** Is the CORS check enabled and domain is valid */
    isValid: boolean;
    /** Indicate if there was active conversation with this contact before page was reloaded */
    isMeetingAlive: boolean;
    modality: {
        /** Indicate if audio/video calls are allowed */
        isAudioVideoAllowed: boolean;
        /** Indicate if chat is allowed */
        isInstantMessagingAllowed: boolean;
    };
}

export declare interface DeletedMessage extends BaseMessage {
    /**Date when message was deleted */
    deletedOn: Date;
}

export declare interface DevicesSettings {
    /** Video input device id, should be placed to start call as Video*/
    videoId?: string;
    /** Audio output device id */
    speakerId?: string;
    /** Audio input device id */
    microphoneId?: string;
}

export declare interface DtmfTone {
    /** Allowed dtmf tones */
    tone: "Zero" | "One" | "Two" | "Three" | "Four" | "Five" | "Six" | "Seven" | "Eight" | "Nine" | "Star" | "A" | "B" | "C" | "D" | "Flash";
    /** sequence number of tone in the call */
    sequenceId: number;
}

export declare interface EditedMessage extends BaseMessage {
    /** Message content */
    content: string;
    /**Date when message was edited */
    editedOn: Date;
}

export declare type ErrorHandler = (errorMessage: ErrorMessage) => void;

export declare class ErrorMessage {
    id: string;
    details: string;
    severity: ErrorMessageSeverity;
    publicId?: string;
    sessionId?: string;
    constructor(id: string, details: string, severity: ErrorMessageSeverity, publicId?: string, sessionId?: string);
    static Low(id: string, details: string | Error): ErrorMessage;
    static High(id: string, details: string | Error, publicId?: string, sessionId?: string): ErrorMessage;
}

export declare type ErrorMessageSeverity = "Low" | "High";

export declare const errors: {
    CANT_START_CONVERSATION: string;
    CANT_START_CALL: string;
    CALL_DECLINED: string;
    CALL_NOT_STARTED: string;
    CALL_ALREADY_STARTED: string;
    SOMETHING_WRONG: string;
    CHAT_NOT_STARTED: string;
    SEND_MESSAGE: string;
    UPDATE_MESSAGE: string;
    PARTICIPANT_CONNECT_ERROR: string;
    TYPING_NOTIFICATION: string;
    EMPTY_MESSAGE: string;
    CANT_SUBSCRIBE_PRESENCE: string;
    CANT_UNSUBSCRIBE_PRESENCE: string;
    CANT_UPDATE_TOKEN: string;
    PRESENCE_RECONNECTING: string;
    PRESENCE_CONNECTED: string;
    PRESENCE_DISCONNECTED: string;
    WIDGETKEY_INVALID: string;
    WIDGETKEY_MISSED: string;
    TENANT_DISABLED: string;
    PUBLIC_KEY_MISSED: string;
    CONTACT_INVALID: string;
    PRESENCE_CONTACT_INVALID: string;
    PRESENCE_CONTACT_DISABLED: string;
    CONNECTION_ERROR: string;
    ACCESSTOKEN_INVALID: string;
    ACCESSTOKEN_MISSED: string;
    ACCESSTOKEN_HEADER_MISSED: string;
    PERMISSIONS_INVALID: string;
    USER_ON_BEHALF_INVALID: string;
    TIMEOUT: string;
    NO_ACCESS_DEVICES: string;
    SELF_VIDEO: string;
    INTERACT_DISABLED: string;
    INTERACT_FOR_SERVICE_DISABLED: string;
    INSTANT_MESSAGING_DISABLED: string;
    NOT_ALLOWED: string;
    MESSAGE_TOOLONG: string;
};

export declare interface IContact {
    /** Contact id*/
    publicUserId: string;
}

export declare interface IContactPresence extends IContact {
    presenceStatus: PresenceStatus;
}

export declare interface InitConversationSettings extends InitSettings {
    /** Contact Id*/
    contactId?: string;
    enableAsync?: boolean;
}

export declare interface InitPresenceSettings extends InitSettings {
    /** Type of the connection to getting presences*/
    type: "signalR" | "polling";
}

export declare interface InitSettings {
    /** Widget key to identify tenant */
    widgetKey: string;
    /** Api url*/
    apiUrl: string;
}

declare class Interact {
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
export default Interact;

export declare interface IPresenceCallBack {
    callbacks: PresenceCallbacks;
}

export declare type IPublicPresenceSubscription<Type> = Type & IPresenceCallBack;

export declare interface IService {
    /** Service id*/
    publicServiceId: string;
}

export declare interface IServicePresence extends IService {
    availabilityStatus: string;
}

export declare interface Message extends BaseMessage {
    /** Message content */
    content: string;
}

export declare interface MultipleContactInitSettings extends InitSettings {
    /** Contact Ids*/
    contactIds: string[];
}

export declare interface Participant {
    /** Id of the remote participant */
    id: string;
    /** Name  of the remote participant */
    displayName?: string;
}

export declare interface ParticipantCallbacks {
    /** The callback is called after remote participant joins the teams call */
    onAdded?: (participant: Participant) => void;
    /** the callback is called after remote participant leaves the teams call */
    onRemoved?: (participant: Participant) => void;
}

export declare interface PresenceCallbacks {
    onChanged?: (presence: IContactPresence | IServicePresence) => void;
}

export declare type PresenceStatus = "PresenceUnknown" | "Available" | "AvailableIdle" | "Away" | "BeRightBack" | "Busy" | "BusyIdle" | "DoNotDisturb" | "Offline";

export declare interface RestoredMessage extends Message, DeletedMessage, EditedMessage {
    /** Direction of the message */
    direction: "incoming" | "outgoing";
}

export declare interface ScreenSharingCallbacks {
    /** The callback is called after the screen sharing from  the client is started or stopped
     * @param isActive state of the screen sharing from  client
     */
    onScreenSharing?: (isActive: boolean) => void;
    /** The callback is called after the screen sharing from the remote participant is started or stopped
     * @param isActive state of the screen sharing from the remote participant
     */
    onRemoteScreenSharing?: (isActive: boolean) => void;
}

export declare interface Sender {
    /** Participant Id */
    id?: string;
    /** Participant name */
    displayName: string;
}

export declare interface ServiceStatus {
    isEnabled: boolean;
    /** The name of contact */
    displayName: string;
    /** Is the CORS check enabled and domain is valid */
    isValid: boolean;
    /** Indicate if there was active conversation with this contact before page was reloaded */
    isMeetingAlive: boolean;
    modality: {
        /** Indicate if audio/video calls are allowed */
        isAudioVideoAllowed: boolean;
        /** Indicate if chat is allowed */
        isInstantMessagingAllowed: boolean;
    };
}

export declare interface UserDetails {
    /** Client name, will be sent to the teams meeting */
    userName: string;
    /** Client email, it is not using now */
    email: string;
    /** Client phone number */
    phone: string;
    /** if the client accepts disclaimer message */
    disclaimer?: boolean;
}

export declare interface UserDetailsChat extends UserDetails {
    /** Initial message, that would be sent to the agent */
    initialMessage?: string;
}

export declare type UsersServicesPresenceSubscriptionsOffType = (IPublicPresenceSubscription<IContact> | IPublicPresenceSubscription<IService>)[] | (IContact | IService)[];

export declare type UsersServicesPresenceSubscriptionsOnType = (IPublicPresenceSubscription<IContact> | IPublicPresenceSubscription<IService>)[];

export { }

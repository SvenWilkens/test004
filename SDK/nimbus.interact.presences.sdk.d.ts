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

declare class InteractPresences {
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
    private _api;
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
    constructor(initSettings: InitConversationSettings);
    /**
     * init the presences  settings
     * @param type  type of the connection to getting presences
     */
    initPresence(type: "signalR" | "polling"): Promise<void>;
    /**
     * Receive details about contact and it availability
     *
     *  @returns contact status
     */
    getContactStatus(contact: string): Promise<ContactStatus>;
    /**
     * Receive details about contact and it availability
     *
     *  @returns contact status
     */
    getContactPresence(contact: string): Promise<IContactPresence>;
    /**
     *  Set Authorization token for each request. Only for one tenant solutions
     *
     *  @returns contact status
     */
    setAuthorization(idToken: string | null): void;
}
export default InteractPresences;

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

export declare interface MultipleContactInitSettings extends InitSettings {
    /** Contact Ids*/
    contactIds: string[];
}

export declare interface PresenceCallbacks {
    onChanged?: (presence: IContactPresence | IServicePresence) => void;
}

export declare type PresenceStatus = "PresenceUnknown" | "Available" | "AvailableIdle" | "Away" | "BeRightBack" | "Busy" | "BusyIdle" | "DoNotDisturb" | "Offline";

export declare type UsersServicesPresenceSubscriptionsOffType = (IPublicPresenceSubscription<IContact> | IPublicPresenceSubscription<IService>)[] | (IContact | IService)[];

export declare type UsersServicesPresenceSubscriptionsOnType = (IPublicPresenceSubscription<IContact> | IPublicPresenceSubscription<IService>)[];

export { }

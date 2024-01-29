/**
 * @module PresencesSdk
 */
import { IContact, IService } from "./entities/contact";
import { ContactStatus } from "./entities/contactStatus";
import { ErrorHandler, ErrorMessage, ErrorMessageSeverity } from "./entities/conversationConfig";
import { InitConversationSettings, InitPresenceSettings, InitSettings, MultipleContactInitSettings } from "./entities/initSettings";
import { IContactPresence, IServicePresence, PresenceCallbacks, PresenceStatus } from "./entities/presence.entities";
import { IPresenceCallBack, IPublicPresenceSubscription, UsersServicesPresenceSubscriptionsOffType, UsersServicesPresenceSubscriptionsOnType } from "./services/presence/presence.subscriptions";
export default class InteractPresences {
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
export { InitSettings, InitPresenceSettings, InitConversationSettings, MultipleContactInitSettings, ErrorHandler, ErrorMessage, ErrorMessageSeverity, IContact, PresenceCallbacks, ContactStatus, PresenceStatus, IContactPresence, UsersServicesPresenceSubscriptionsOffType, UsersServicesPresenceSubscriptionsOnType, IServicePresence, IPublicPresenceSubscription, IService, IPresenceCallBack };

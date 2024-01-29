export interface InitSettings {
    /** Widget key to identify tenant */
    widgetKey: string;
    /** Api url*/
    apiUrl: string;
}
export interface InitPresenceSettings extends InitSettings {
    /** Type of the connection to getting presences*/
    type: "signalR" | "polling";
}
export interface InitConversationSettings extends InitSettings {
    /** Contact Id*/
    contactId?: string;
    enableAsync?: boolean;
}
export interface MultipleContactInitSettings extends InitSettings {
    /** Contact Ids*/
    contactIds: string[];
}

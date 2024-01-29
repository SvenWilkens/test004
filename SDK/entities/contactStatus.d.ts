export interface ContactStatus {
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
export interface ServiceStatus {
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
export interface ChatStatus {
    /** Indicate if there was active chat conversation with this contact before page was reloaded */
    isAlive: boolean;
}

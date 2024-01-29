/**
 * @hidden
 */
import { ParticipantCallbacks } from "./participantCallbacks";
import { ScreenSharingCallbacks } from "./screenSharingCallbacks";
/** */
export declare class ConversationConfig {
    constructor();
    static onError: (errorMessage: ErrorMessage) => void;
    static error(errorMessage: ErrorMessage): {
        throw: () => void;
    };
    static idToken: string;
    call?: CallCallbacks;
    chat?: ChatCallbacks;
    participants?: ParticipantCallbacks;
    screenSharing?: ScreenSharingCallbacks;
    presentation?: PresentationCallbacks;
}
export type ErrorHandler = (errorMessage: ErrorMessage) => void;
export declare class GlobalErrors {
    constructor();
    static onError: ErrorHandler;
    static error(errorMessage: ErrorMessage): {
        throw: () => void;
        error: ErrorMessage;
    };
}
export type ErrorMessageSeverity = "Low" | "High";
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
export interface OtherTabCallback {
    activeOtherTab?: any;
}
interface ModalityCallbacks {
    onStart?: any;
    onStop?: any;
}
interface CallCallbacks extends ModalityCallbacks {
    onRemoteVideo?: (isActive: boolean, id: string) => void;
    onIncoming?: any;
    onTransferStarted?: () => void;
    onTransferFinished?: () => void;
    inLobby: () => void;
}
interface PresentationCallbacks extends ModalityCallbacks, OtherTabCallback {
    onReload: any;
}
export interface ChatCallbacks extends ModalityCallbacks {
    onMessageReceived?: any;
    onMessageStatusReceived?: any;
    onTypingParticipantAdded?: any;
    onTypingParticipantRemoved?: any;
    onMessageDeleted?: any;
    onMessageEdited?: any;
}
export {};

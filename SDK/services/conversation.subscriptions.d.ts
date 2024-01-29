import { ChatCallbacks } from './../entities/chatCallbacks';
import { ConversationConfig } from "../entities/conversationConfig";
import { ScreenSharingCallbacks } from '../entities/screenSharingCallbacks';
import { CallCallbacks } from '../entities/callCallbacks';
export declare class ConversationSubscriptions {
    private _subscriptionsConfig;
    constructor();
    get subscriptionsConfig(): ConversationConfig;
    subscribeToCallChanged(callCallbacks: CallCallbacks): void;
    unsubscribeToCallChanged(): void;
    subscribeParticipants(onAdded: any, onRemoved: any): void;
    unsubscribeParticipants(): void;
    subscribeChatEvents(chatCallbacks: ChatCallbacks): void;
    unsubscribeScreenSharing(): void;
    subscribeScreenSharing(screenSharingCallBacks: ScreenSharingCallbacks): void;
    unsubscribeChatEvents(): void;
    subscribeErrors(onError: any): void;
    unsubscribeErrors(): void;
    private subscribeToModalityChanged;
}

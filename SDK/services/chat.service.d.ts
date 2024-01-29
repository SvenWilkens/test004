import { RestoredMessage } from "./../entities/message";
import { IContactApi } from "./api/api.service";
import { ConversationConfig } from "../entities/conversationConfig";
import { AzureCommunicationTokenCredential } from "@azure/communication-common";
export interface ChatServiceInitSettings {
    userName: string;
    userId: string;
    tokenCredential: AzureCommunicationTokenCredential;
    api: IContactApi;
}
export declare class ChatService {
    private _subscriptions;
    private _chatClient;
    private _threadId;
    private _user;
    private _api;
    private _typingNotifications;
    private _typingParticipants;
    private _typingInterval;
    private _threadClient;
    private _tokenCredential;
    onStopConversation: any;
    constructor(settings: ChatServiceInitSettings, _subscriptions: ConversationConfig);
    init(): Promise<void>;
    subscribeChatOnlyEvents(onStopConversation: any): Promise<void>;
    sendMessage(message: {
        text: string;
    }): Promise<string>;
    sendTypingNotification(): Promise<boolean>;
    sendReadReceipt(messageId: string): Promise<never>;
    updateMessage(messageId: string, message: {
        text: string;
    } | null): Promise<never>;
    deleteMessage(messageId: string): Promise<never>;
    restoreMessages(): Promise<RestoredMessage[]>;
    dispose(): void;
    private subscribeForMessages;
    private subscribeForTypingIndicator;
    private addTypingUserIfNew;
    private removeTypingUserIfExpired;
    private readAllMessages;
    private mapChatMessage;
    private mapReceivedMessage;
    private mapDeletedMessage;
    private mapEditedMessage;
    private mapMessage;
}

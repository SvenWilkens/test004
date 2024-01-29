import { RemoteParticipant } from "@azure/communication-calling";
import { CommunicationIdentifierKind } from "@azure/communication-common";
import { ConversationConfig } from "../entities/conversationConfig";
export declare class ParticipantsService {
    private _subscriptions;
    private readonly replacedAgentName;
    private _videoId;
    private _participants;
    private _screenSharingId;
    constructor(videoId: string, screenSharingId: string, _subscriptions: ConversationConfig, replacedAgentName: string);
    onRemoteParticipants(participants: readonly RemoteParticipant[]): void;
    onRemoteParticipantsUpdated(ev: {
        added: RemoteParticipant[];
        removed: RemoteParticipant[];
    }): void;
    hasParticipants(): boolean;
    dispose(): void;
    private disposeParticipantVideos;
    private onRemoteParticipantsAdded;
    private onParticipantsRemoved;
    private removeParticipant;
    private onAddedParticipant;
    private subscribeOnParticipantsSteams;
    private handleMediaStream;
    private renderRemoteVideoStream;
    private updateParticipantsRenderer;
    private notifyParticipants;
    static getIdentifierId(identifier: CommunicationIdentifierKind): string;
    private handleParticipantUpdates;
}

export declare enum ConversationDetailsState {
    None = "None",
    Success = "Success",
    Failed = "Failed",
    Terminated = "Terminated",
    TerminateFailed = "TerminateFailed"
}
export interface IConversationDetails {
    publicId: string;
    error: string;
    state: ConversationDetailsState;
    meeting: IMeeting;
}
export interface IMeeting {
    id: string;
    externalId: string;
    url: string;
    meetingChatInfo: {
        threadId: string;
    };
    everyoneCanSkipLobby: boolean;
}
export interface IChatMeeting {
    id: string;
    meetingChatInfo: {
        sessionId: string;
        threadId: string;
        accessToken: string;
    };
}

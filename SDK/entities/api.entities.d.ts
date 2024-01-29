import { IMeeting } from "./conversation.entities";
export interface ICommunicationAccessTokenInfo {
    value: string;
    userInfo: ICommunicationUserInfo;
    expiresOn: Date;
}
export interface ICommunicationUserInfo {
    id: string;
}
export interface IMeetingInfoDetails {
    url: string;
    externalId: string;
    everyoneCanSkipLobby: boolean;
}
export interface IMeetingInfo {
    meetingLink: string;
    sessionId: string;
    everyoneCanSkipLobby: boolean;
}
export interface IMeetingChatInfo {
    sessionId: string;
    threadId: string;
    accessToken: string;
}
export declare class MeetingInfo {
    meetingLink: string;
    sessionId: string;
    everyoneCanSkipLobby: boolean;
    static From(meeting: IMeeting): IMeetingInfo;
}
export interface IAcsToken {
    token: string;
    userId: string;
}
export interface IAcsEnvirionment {
    acsUrl: string;
}
export interface IApiEnvironment {
    apiUrl: string;
}
export interface IApiGenericError {
    reason: string;
    description?: string;
    publicId?: string;
    status: number;
    title: string;
    traceId: string;
    type: string;
    sessionId?: string;
}

import { IConversationDetails } from "../../entities/conversation.entities";
export interface IInvite {
    participant: {
        publicUserId: string;
    };
    clientDetails: {
        name?: string;
        email?: string;
        phone?: string;
    };
}
export interface IKick {
    participant: {
        publicUserId: string;
    };
}
export type IInviteCallback = (details: IConversationDetails) => Promise<void>;
export type IReconnectedCallback = () => Promise<void>;
export interface IScheduleMeetingAndInvite {
    invite: IInvite;
    callback: IInviteCallback;
    reconnected: IReconnectedCallback;
}

export interface Message extends BaseMessage {
    /** Message content */
    content: string;
}
export interface DeletedMessage extends BaseMessage {
    /**Date when message was deleted */
    deletedOn: Date;
}
export interface EditedMessage extends BaseMessage {
    /** Message content */
    content: string;
    /**Date when message was edited */
    editedOn: Date;
}
export interface Sender {
    /** Participant Id */
    id?: string;
    /** Participant name */
    displayName: string;
}
export interface BaseMessage {
    /** Message id. This Id is server generated */
    id: string;
    /**Date when message was created */
    createdOn: Date;
    /**Type of the message. Possible types are "Text" and "RichText/Html". */
    type: string;
    /** Message sender information */
    sender: Sender;
}
export interface RestoredMessage extends Message, DeletedMessage, EditedMessage {
    /** Direction of the message */
    direction: "incoming" | "outgoing";
}

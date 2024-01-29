export interface CallCallbacks {
    /** The callback will be called after this call is be established */
    onStart: () => void;
    /** The callback wil be called after this call is be finished */
    onStop: () => void;
    /** The callback wil be called after the participant with @param id will start or stop his video */
    onRemoteVideo: (isActive: boolean, id: string) => void;
    /** The callback wil be called after the client will join the call lobby */
    inLobby?: () => void;
    /** The callback will be called on starting transferring call process*/
    onTransferStarted?: () => void;
    /** The callback will be called after transferring will be finished*/
    onTransferFinished?: () => void;
}

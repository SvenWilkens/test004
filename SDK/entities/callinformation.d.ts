export interface CallInformation {
    /**
     * Get the state of this Call.
     */
    state: 'None' | 'Connecting' | 'Ringing' | 'Connected' | 'LocalHold' | 'RemoteHold' | 'InLobby' | 'Disconnecting' | 'Disconnected' | 'EarlyMedia';
    /**
     * Whether screen sharing is on.
     */
    isScreenSharingOn: boolean;
    /**
    * Whether local user is muted, locally or remotely.
    */
    isAudioMuted: boolean;
    /**
     * Whether local video is on.
     */
    isVideoMuted: boolean;
}

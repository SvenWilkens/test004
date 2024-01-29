export interface ScreenSharingCallbacks {
    /** The callback is called after the screen sharing from  the client is started or stopped
     * @param isActive state of the screen sharing from  client
     */
    onScreenSharing?: (isActive: boolean) => void;
    /** The callback is called after the screen sharing from the remote participant is started or stopped
    * @param isActive state of the screen sharing from the remote participant
    */
    onRemoteScreenSharing?: (isActive: boolean) => void;
}

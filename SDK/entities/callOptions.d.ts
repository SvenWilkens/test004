import { DevicesSettings } from "./deviceSettings";
export interface CallOptions {
    /** Selected devices used in the call */
    devices: DevicesSettings;
    /** Id of the html element where video tag with self video stream would be placed.*/
    selfVideoId?: string;
    /** Id of the html element where video tag with remote video streams would be placed.
     * There will be separate video stream for each remote participant*/
    videoId?: string;
    /** Id of the html element where video tag with screen sharing stream would be placed.*/
    screenSharingId?: string;
    /** Name which should be used instead of agents name in all events*/
    replacedAgentName?: string;
}

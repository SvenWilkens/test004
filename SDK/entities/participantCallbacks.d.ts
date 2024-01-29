import { Participant } from './participant';
export interface ParticipantCallbacks {
    /** The callback is called after remote participant joins the teams call */
    onAdded?: (participant: Participant) => void;
    /** the callback is called after remote participant leaves the teams call */
    onRemoved?: (participant: Participant) => void;
}

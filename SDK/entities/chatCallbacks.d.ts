import { Message } from "./message";
import { Participant } from "./participant";
export interface ChatCallbacks {
    /** The callback will called after a message from the remote participant is received */
    onMessageReceived: (message: Message) => void;
    /** The callback will called after a message from the remote participant is received */
    onMessageDeleted?: (message: Message) => void;
    /** The callback will called after a message from the remote participant is received */
    onMessageEdited?: (message: Message) => void;
    /** The callback is called when the remote participant has starting typing */
    onTypingParticipantAdded?: (participant: Participant) => void;
    /** The callback is called when the remote participant is not typing for several seconds */
    onTypingParticipantRemoved?: (participant: Participant) => void;
    /** The callback is called after chat will be finished */
    onStopChat?: () => void;
}

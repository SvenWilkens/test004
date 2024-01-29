export interface DtmfTone {
    /** Allowed dtmf tones */
    tone: "Zero" | "One" | "Two" | "Three" | "Four" | "Five" | "Six" | "Seven" | "Eight" | "Nine" | "Star" | "A" | "B" | "C" | "D" | "Flash";
    /** sequence number of tone in the call */
    sequenceId: number;
}

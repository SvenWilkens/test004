export interface UserDetails {
    /** Client name, will be sent to the teams meeting */
    userName: string;
    /** Client email, it is not using now */
    email: string;
    /** Client phone number */
    phone: string;
    /** if the client accepts disclaimer message */
    disclaimer?: boolean;
}
export interface UserDetailsChat extends UserDetails {
    /** Initial message, that would be sent to the agent */
    initialMessage?: string;
}

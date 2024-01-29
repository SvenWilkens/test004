import { IContact, IPublicContact, IService } from "../../entities/contact";
import { ContactStatus } from "../../entities/contactStatus";
import { IContactPresenceResponse } from "../../entities/presence.entities";
import { IContactApi } from "./api.service";
export interface MultipleContactApiSettings {
    apiUrl: string;
    widgetKey: string;
}
export declare class MultipleContactApi {
    private _initSettings;
    private _contactApis;
    private _idToken;
    constructor(_initSettings: MultipleContactApiSettings);
    get environment(): {
        apiUrl: string;
    };
    get settings(): {
        widgetKey: string;
    };
    getOrAdd(contact: IPublicContact, enableAsync: boolean): Promise<IContactApi>;
    addRange(contacts: IPublicContact[]): Promise<void>;
    remove(contact: IPublicContact): void;
    get(contact: IPublicContact): Promise<IContactApi>;
    presence(users?: IContact[], services?: IService[]): Promise<IContactPresenceResponse>;
    status(contactIds?: string[]): Promise<Map<string, ContactStatus>>;
    updateAuthorizationToken(idToken: string): void;
    private post;
    private getUrl;
    private fetchBody;
    private getHeaders;
}

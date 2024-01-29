import { IApiGenericError } from "./api.entities";
import { ErrorMessage } from "./conversationConfig";
export declare class ApiErrorsMapper {
    static instance: ApiErrorsMapper;
    private _mappedErrors;
    constructor();
    map(genericError: IApiGenericError): Promise<ErrorMessage>;
}

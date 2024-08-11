import MessageShowTypes from "../types/MessageShowTypes";
import StatusTypes from "../types/StatusTypes";

export default interface IErrorResponse {
    showType: MessageShowTypes;
    status: StatusTypes;
    statusText: string;
    error: string;
}
import MessageShowTypes from "../types/MessageShowTypes";

export default interface SuccessResponseI {
    showType: MessageShowTypes;
    message: string;
}
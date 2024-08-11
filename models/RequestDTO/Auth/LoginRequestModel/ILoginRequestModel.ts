import RequestModelI from "../../RequestModel/IRequestModel";

export default interface LoginRequestModelI extends RequestModelI{
    email: string;
    password: string;
}
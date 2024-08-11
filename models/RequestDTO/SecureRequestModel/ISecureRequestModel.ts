import IRequestModel from "../RequestModel/IRequestModel";

export default interface ISecureRequestModel extends IRequestModel {
  token: string;
}

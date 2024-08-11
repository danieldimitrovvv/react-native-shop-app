import SocialTypes from "../../types/SocialTypes";
import IBaseModel from "../BaseModel/IBaseModel";

export default interface ISocialModel extends IBaseModel {
  label: string;
  link: string;
  type: SocialTypes;
}

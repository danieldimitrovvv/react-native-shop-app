// models

// interfaces
import ISocialModel from "./ISocialModel";

// types

// models
import BaseModel from "../BaseModel/BaseModel";
import SocialTypes from "../../types/SocialTypes";

export default class SocialModel extends BaseModel implements ISocialModel {
  public label: string;
  public link: string;
  public type: SocialTypes;

  constructor();

  constructor(obj?: ISocialModel);
  constructor(obj?: any) {
    super(obj);

    this.label = (obj && (obj.label || obj.Label)) || null;
    this.link = (obj && (obj.link || obj.Link)) || null;
    this.type = (obj && (obj.type || obj.Type)) || SocialTypes.UNKNOWN;
  }
}

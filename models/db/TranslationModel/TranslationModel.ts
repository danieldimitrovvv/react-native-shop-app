// interfaces
import ITranslationModel from "./ITranslationModel";
import IOrderModel from "./ITranslationModel";

// models
import BaseModel from "../BaseModel/BaseModel";
import LanguagesTypes from "../../types/LanguagesTypes";

export default class TranslationModel
  extends BaseModel
  implements ITranslationModel
{
  key: string;
  label: string;
  lang: LanguagesTypes;

  constructor();
  constructor(obj?: IOrderModel);
  constructor(obj?: any) {
    super(obj);

    this.key = (obj && (obj.key || obj.Key)) ?? "";
    this.label = (obj && (obj.label || obj.Label)) ?? "";
    this.lang = (obj && (obj.lang || obj.Lang)) ?? LanguagesTypes.UNKNOWN;
  }
}

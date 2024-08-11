import LanguagesTypes from "../../types/LanguagesTypes";
import IBaseModel from "../BaseModel/IBaseModel";

export default interface ITranslationModel extends IBaseModel {
  key: string;
  label: string;
  lang: LanguagesTypes;
}

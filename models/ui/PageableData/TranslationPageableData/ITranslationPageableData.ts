import ITranslationModel from "../../../db/TranslationModel/ITranslationModel";
import IPageableData from "../IPageableData";

export default interface ITranslationPageableData
  extends IPageableData<ITranslationModel> {}

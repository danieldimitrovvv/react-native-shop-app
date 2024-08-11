import ITranslationModel from "../../../db/TranslationModel/ITranslationModel";
import TranslationModel from "../../../db/TranslationModel/TranslationModel";
import ITranslationPageableData from "./ITranslationPageableData";

export default class TranslationPageableData
  implements ITranslationPageableData
{
  public rows: ITranslationModel[];
  public countRows: number;

  constructor();
  constructor(obj?: ITranslationPageableData);
  constructor(obj?: any) {
    this.rows = (obj && obj.rows) || [];
    this.rows = this.rows.map((i) => new TranslationModel(i));

    this.countRows = (obj && obj.countRows) || 0;
  }
}

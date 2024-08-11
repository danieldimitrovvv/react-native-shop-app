import { AxiosResponse } from "axios";

// models
import TranslationPageableData from "../../models/ui/PageableData/TranslationPageableData/TranslationPageableData";
import PageableModel from "../../models/ui/Pageable/PageableModel";

// interfaces
import PageableI from "../../models/ui/Pageable/IPageable";

// rests
import SecureRest from "./SecureRest";
import TranslationModel from "../../models/db/TranslationModel/TranslationModel";
import LanguagesTypes from "../../models/types/LanguagesTypes";

class TranslationRest extends SecureRest {
  constructor(baseURL: string) {
    super(baseURL);
  }

  getAll = (
    pageable: PageableI
  ): Promise<AxiosResponse<TranslationPageableData>> => {
    return this.instance.get("", {
      params: {
        page: pageable.page,
        size: pageable.rowsPerPage,
      },
    });
  };

  getById = (id: number): Promise<AxiosResponse<TranslationModel>> => {
    return this.instance.get(`/${id}`);
  };

  getContainsSearchValue = (
    searchValue?: string,
    type?: LanguagesTypes,
    pageable?: PageableI
  ): Promise<AxiosResponse<TranslationPageableData>> => {
    const pageableModel = new PageableModel(pageable);

    return this.instance.get(`/search-by`, {
      params: {
        value: searchValue,
        type: type !== LanguagesTypes.UNKNOWN ? type : null,
        page: pageableModel.page,
        size: pageableModel.rowsPerPage,
      },
    });
  };

  create = (
    social: TranslationModel
  ): Promise<AxiosResponse<TranslationModel>> => {
    social.key = "UI_" + social.key.toUpperCase();
    return this.instance.post(``, social);
  };

  update = (
    social: TranslationModel
  ): Promise<AxiosResponse<TranslationModel>> => {
    return this.instance.put(`/${social.id}`, social);
  };

  delete = (id: number): Promise<AxiosResponse<{ effectRows: number }>> => {
    return this.instance.delete(`/${id}`);
  };
}

export default new TranslationRest(`/translations`);

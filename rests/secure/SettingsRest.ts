import { AxiosResponse } from "axios";

// models
import SettingsPageableData from "../../models/ui/PageableData/SettingsPageableData/SettingsPageableData";
import PageableModel from "../../models/ui/Pageable/PageableModel";

// interfaces
import PageableI from "../../models/ui/Pageable/IPageable";

// rests
import SecureRest from "./SecureRest";
import SettingsModel from "../../models/db/SettingsModel/SettingsModel";
import ISettingsStoreModel from "../../store/slices/settings/SettingsStoreModel/ISettingsStoreModel";

class SettingsRest extends SecureRest {
  constructor(baseURL: string) {
    super(baseURL);
  }

  getSettingsFomCache = (): Promise<AxiosResponse<ISettingsStoreModel>> => {
    return this.instance.get("/from-cache");
  };

  getAll = (
    pageable: PageableI
  ): Promise<AxiosResponse<SettingsPageableData>> => {
    return this.instance.get("", {
      params: {
        page: pageable.page,
        size: pageable.rowsPerPage,
      },
    });
  };

  getById = (id: number): Promise<AxiosResponse<SettingsModel>> => {
    return this.instance.get(`/${id}`);
  };

  getContainsSearchValue = (
    searchValue?: string,
    pageable?: PageableI
  ): Promise<AxiosResponse<SettingsPageableData>> => {
    const pageableModel = new PageableModel(pageable);

    return this.instance.get(`/search-by`, {
      params: {
        value: searchValue,
        page: pageableModel.page,
        size: pageableModel.rowsPerPage,
      },
    });
  };

  create = (social: SettingsModel): Promise<AxiosResponse<SettingsModel>> => {
    return this.instance.post(``, social);
  };

  update = (social: SettingsModel): Promise<AxiosResponse<SettingsModel>> => {
    return this.instance.put(`/${social.id}`, social);
  };

  updateMultiple = (
    social: SettingsModel[]
  ): Promise<AxiosResponse<SettingsModel[]>> => {
    return this.instance.put(`/update-multiple`, social);
  };

  delete = (id: number): Promise<AxiosResponse<{ effectRows: number }>> => {
    return this.instance.delete(`/${id}`);
  };
}

export default new SettingsRest(`/settings`);

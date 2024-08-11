import { AxiosResponse } from "axios";

// models
import SocialPageableData from "../../models/ui/PageableData/SocialPageableData/SocialPageableData";
import PageableModel from "../../models/ui/Pageable/PageableModel";

// interfaces
import PageableI from "../../models/ui/Pageable/IPageable";

// rests
import SecureRest from "./SecureRest";
import SocialModel from "../../models/db/SocialModel/SocialModel";
import SocialTypes from "../../models/types/SocialTypes";

class SocialRest extends SecureRest {
  constructor(baseURL: string) {
    super(baseURL);
  }

  getAll = (
    pageable: PageableI
  ): Promise<AxiosResponse<SocialPageableData>> => {
    return this.instance.get("", {
      params: {
        page: pageable.page,
        size: pageable.rowsPerPage,
      },
    });
  };

  getById = (id: number): Promise<AxiosResponse<SocialModel>> => {
    return this.instance.get(`/${id}`);
  };

  getContainsSearchValue = (
    searchValue?: string,
    type?: SocialTypes,
    pageable?: PageableI
  ): Promise<AxiosResponse<SocialPageableData>> => {
    const pageableModel = new PageableModel(pageable);

    return this.instance.get(`/search-by`, {
      params: {
        value: searchValue,
        type: type !== SocialTypes.UNKNOWN ? type : null,
        page: pageableModel.page,
        size: pageableModel.rowsPerPage,
      },
    });
  };

  create = (social: SocialModel): Promise<AxiosResponse<SocialModel>> => {
    return this.instance.post(``, social);
  };

  update = (social: SocialModel): Promise<AxiosResponse<SocialModel>> => {
    return this.instance.put(`/${social.id}`, social);
  };

  delete = (id: number): Promise<AxiosResponse<{ effectRows: number }>> => {
    return this.instance.delete(`/${id}`);
  };
}

export default new SocialRest(`/socials`);

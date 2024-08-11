import { AxiosResponse } from "axios";

// models
import BaseUserModel from "../../models/db/User/BaseUserModel/BaseUserModel";
import UserPageableData from "../../models/ui/PageableData/UserPageableData/UserPageableData";

// interfaces
import PageableI from "../../models/ui/Pageable/IPageable";

// rests
import SecureRest from "./SecureRest";
import IBaseUserModel from "../../models/db/User/BaseUserModel/IBaseUserModel";
import RolesTypes from "../../models/types/RolesTypes";
import PageableModel from "../../models/ui/Pageable/PageableModel";
import UserResponseModel from "../../models/ResponsesDTO/UserResponeModel/UserResponseModel";

class UserRest extends SecureRest {
  constructor(baseURL: string) {
    super(baseURL);
  }

  getAll = (pageable: PageableI): Promise<AxiosResponse<UserPageableData>> => {
    return this.instance.get("", {
      params: {
        page: pageable.page,
        size: pageable.rowsPerPage,
      },
    });
  };

  getById = (id: number): Promise<AxiosResponse<UserResponseModel>> => {
    return this.instance.get(`/${id}`);
  };

  getContainsSearchValue = (
    searchValue?: string,
    role?: RolesTypes,
    pageable?: PageableI
  ): Promise<AxiosResponse<UserPageableData>> => {
    const pageableModel = new PageableModel(pageable);

    return this.instance.get(`/search-by`, {
      params: {
        value: searchValue,
        role: role !== RolesTypes.UNKNOWN ? role : null,
        page: pageableModel.page,
        size: pageableModel.rowsPerPage,
      },
    });
  };

  addUser = (user: BaseUserModel): Promise<AxiosResponse<IBaseUserModel>> => {
    return this.instance.post(``, user);
  };

  updateUser = (
    user: BaseUserModel
  ): Promise<AxiosResponse<IBaseUserModel>> => {
    return this.instance.put(`/${user.id}`, user);
  };

  deleteUser = (id: number): Promise<AxiosResponse<{ effectRows: number }>> => {
    return this.instance.delete(`/${id}`);
  };

  changePassword = (
    id: number,
    userPassword: string,
    newPassword: string
  ): Promise<AxiosResponse<IBaseUserModel>> => {
    return this.instance.put(`/change-password/${id}`, {
      userPassword,
      password: newPassword,
    });
  };
}

export default new UserRest(`/users`);

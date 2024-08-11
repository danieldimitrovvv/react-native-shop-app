import { AxiosResponse } from "axios";
import LoginRequestModel from "../models/RequestDTO/Auth/LoginRequestModel/LoginRequestModel";
import ILoginResponseModel from "../models/ResponsesDTO/Auth/LoginResponseModel/ILoginResponseModel";
import LoginResponseModel from "../models/ResponsesDTO/Auth/LoginResponseModel/LoginResponseModel";
import BaseRest from "./BaseRest";
import AuthenticationService from "../services/AuthenticationService";

class AuthenticationRest extends BaseRest {
  constructor(baseURL: string) {
    super(baseURL);
  }

  login = (
    data: LoginRequestModel
  ): Promise<AxiosResponse<LoginResponseModel>> => {
    return this.instance
      .post("login", data)
      .then((response: AxiosResponse<LoginResponseModel>) => {
        AuthenticationService.login(
          new LoginResponseModel(response.data as ILoginResponseModel)
        );

        return response;
      });
  };

  logout = async (): Promise<AxiosResponse<any>> => {
    // await new Promise((res, rej) => {
    //   setTimeout(() => {
    //     res("FAKE AWAIT");
    //   }, 50000);
    // });
    return this.instance
      .get(`logout?token=${AuthenticationService.token}`)
      .then((response: AxiosResponse<any>) => {
        AuthenticationService.logout(true);
        return response;
      })
      .catch((err) => {
        AuthenticationService.logout(true);
        return err;
      });
  };
}

export default new AuthenticationRest(`/`);

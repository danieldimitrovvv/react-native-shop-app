import { AxiosResponse } from "axios";
import BaseRest from "../BaseRest";
import AuthenticationService from "../../services/AuthenticationService";

export default class SecureRest extends BaseRest {
  constructor(baseURL: string) {
    super(baseURL);

    // set Authorization token
    this.instance.interceptors.request.use((req: any) => {
      req.headers = {
        ...req.headers,
        Authorization: "Bearer " + AuthenticationService.token,
      };
      return req;
    });
  }
}

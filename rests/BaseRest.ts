import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

import ErrorResponse from "../models/ErrorResponse/ErrorResponse";
import MessageShowTypes from "../models/types/MessageShowTypes";
import StatusTypes from "../models/types/StatusTypes";
import AuthenticationService from "../services/AuthenticationService";
import UrlsUtility from "../utilities/UrlsUtility";

export default class BaseRest {
  protected baseURL: string;
  protected instance: AxiosInstance;

  constructor(baseURL: string) {
    this.baseURL = baseURL ?? "127.0.0.1";
    this.instance = axios.create({
      baseURL: UrlsUtility.getApiUrl() + this.baseURL,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });

    // Add a response interceptor
    this.instance.interceptors.response.use(
      function (response: AxiosResponse) {
        // Do something with response data
        return response;
      },
      function (error: AxiosError<{ error: string }>) {
        // Do something with response error
        let errorResponse = null;

        if (error.response) {
          // Request made and server responded
          errorResponse = new ErrorResponse({
            showType: MessageShowTypes.ALERT,
            status: error.response.status,
            statusText: error.response.statusText,
            error: error.response?.data?.error ?? "",
          });

          if (errorResponse.status === StatusTypes.UNAUTHORIZED) {
            AuthenticationService.logout(true);
          }
        } else if (error.request) {
          // The request was made but no response was received
          // errorResponse = error.request;
        } else {
          // Something happened in setting up the request that triggered an Error
          // errorResponse = error.message;
        }

        return Promise.reject(errorResponse);
      }
    );
  }
}

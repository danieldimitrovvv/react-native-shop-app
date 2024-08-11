"use client";

// interfaces
import IAuthResponseModel from "../models/ResponsesDTO/Auth/AuthResponseModel/IAuthResponseModel";
import IBaseUserModel from "../models/db/User/BaseUserModel/IBaseUserModel";

// models
import LoginResponseModel from "../models/ResponsesDTO/Auth/LoginResponseModel/LoginResponseModel";
import AuthResponseModel from "../models/ResponsesDTO/Auth/AuthResponseModel/AuthResponseModel";
import AdminModel from "../models/db/User/AdminModel/AdminModel";

// utilities
import DateUtility from "../utilities/DateUtility";

// types
import RolesTypes from "../models/types/RolesTypes";
import LocalStorageUtility from "../utilities/LocalStorageUtility";
import RouterLinksTypes from "../models/types/RouterLinksTypes";

class AuthenticationService {
  private _auth: IAuthResponseModel;

  private _user: IBaseUserModel;

  private _expireTime: number;

  private _timer?: ReturnType<typeof setInterval>;

  constructor() {
    this._auth = {} as IAuthResponseModel;
    this._user = LocalStorageUtility.getObject("user") as IBaseUserModel;

    this._expireTime = 0;

    this.readAuthDataFromLocalStorage();
  }

  get token(): string {
    return this._auth.token;
  }

  set token(value: string) {
    this._auth.token = value;
  }

  get user(): IBaseUserModel {
    return this._user;
  }

  set user(value: IBaseUserModel) {
    this._user = value;
  }

  login = (data: LoginResponseModel): string | null => {
    this._auth = new AuthResponseModel(data.auth);
    this._user =
      data.user.role === RolesTypes.ADMIN
        ? new AdminModel(data.user)
        : data.user;

    this._expireTime = DateUtility.getDateAfterMinutes(
      this._auth.expireMinutes - 1 ?? 0
    ).getTime();

    LocalStorageUtility.setObject("user", this._user);
    this.setAuthLocalStorageData(this._auth);
    this.setAutoLogout();

    return this._auth.token;
  };

  logout = (withRedirect: boolean = false): void => {
    this.clearLoginInformation();

    if (withRedirect) {
      // window.location.replace(RouterLinksTypes.LOGIN);
    }
  };

  private setAuthLocalStorageData = (auth: AuthResponseModel) => {
    LocalStorageUtility.setString("token", auth.token);
    LocalStorageUtility.setNumber("expireMinutes", auth.expireMinutes);
    LocalStorageUtility.setNumber(
      "expireTime",
      DateUtility.getDateAfterMinutes(auth.expireMinutes - 1 ?? 0).getTime()
    );
  };

  private readAuthDataFromLocalStorage = () => {
    this._auth.token = LocalStorageUtility.getString("token");
    this._auth.expireMinutes = LocalStorageUtility.getNumber("expireMinutes");
    this._expireTime = LocalStorageUtility.getNumber("expireTime");

    if (this._auth.token !== "") {
      this.setAutoLogout();
    }
  };

  private clearTimer = () => {
    if (this._timer) {
      clearInterval(this._timer);
    }
  };

  private clearAuthLocalStorageData = () => {
    LocalStorageUtility.remove("token");
    LocalStorageUtility.remove("expireMinutes");
    LocalStorageUtility.remove("expireTime");
    // LocalStorageUtility.remove("user");
  };

  private setAutoLogout = () => {
    this.clearTimer();

    this._timer = setInterval(() => {
      if (new Date().getTime() > this._expireTime) {
        this.logout(true);
      }
    }, 1 * 1000);
  };

  private clearLoginInformation = () => {
    this._auth = {} as IAuthResponseModel;
    this._user = {} as IBaseUserModel;
    this._expireTime = 0;

    this.clearTimer();
    this.clearAuthLocalStorageData();
  };
}

export default new AuthenticationService();

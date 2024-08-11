import { useSelector } from "react-redux";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// interfaces
// utilities
import SettingsUtility from "../../../utilities/SettingsUtility";
import LocalStorageUtility from "../../../utilities/LocalStorageUtility";
import AuthenticationService from "../../../services/AuthenticationService";
import IBaseUserModel from "../../../models/db/User/BaseUserModel/IBaseUserModel";
import ISettingsModel from "../../../models/db/SettingsModel/ISettingsModel";
import ISettingsStoreModel from "./SettingsStoreModel/ISettingsStoreModel";
import IWorktime from "../../../models/Worktime/IWorktime";
import WeekDays from "../../../models/types/WeekDays";
import { getSmartcomWorktime } from "../../../constants/clientServerData/smartcom";

enum STORAGE_KEYS {
  IS_OPEN_ADMIN_NAV_LINKS_DRAWER = "openAdminNvLinks",
}

export interface SettingsState {
  isOpenAdminNavLinksDrawer: boolean;
  loginUser: IBaseUserModel | null;
  isAuthenticate: boolean;
  settings: ISettingsStoreModel;
  worktime: IWorktime[];
}

const initialState: SettingsState = {
  isOpenAdminNavLinksDrawer: false,
  loginUser: AuthenticationService.user,
  isAuthenticate: !!AuthenticationService.token,
  settings: {
    withPrice: SettingsUtility.withPrice(),
    withProductAmount: SettingsUtility.withProductAmount(),
    withCart: SettingsUtility.withCart(),
    withDiscount: SettingsUtility.withDiscount(),
    getLatest: SettingsUtility.getLatestNumber(),
    autoRedirect: SettingsUtility.autoRedirectTime(),
    productsPerPage: SettingsUtility.productsPerPage(),
  } as ISettingsStoreModel,
  worktime: getSmartcomWorktime(),
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettingsLoginUser: (state, action: PayloadAction<IBaseUserModel>) => {
      state.loginUser = action.payload;
      state.isAuthenticate = true;
    },

    setSettingsServerSettings: (
      state,
      action: PayloadAction<ISettingsStoreModel>
    ) => {
      state.settings = action.payload;
    },

    logoutLoginUser: (state) => {
      state.loginUser = null;
      state.isAuthenticate = false;
    },

    openSettingsAdminNavLinksDrawer: (state) => {
      state.isOpenAdminNavLinksDrawer = !!AuthenticationService.token;
      LocalStorageUtility.setBoolean(
        STORAGE_KEYS.IS_OPEN_ADMIN_NAV_LINKS_DRAWER,
        state.isOpenAdminNavLinksDrawer
      );
    },

    closedSettingsAdminNavLinksDrawer: (state) => {
      state.isOpenAdminNavLinksDrawer = false;
      LocalStorageUtility.setBoolean(
        STORAGE_KEYS.IS_OPEN_ADMIN_NAV_LINKS_DRAWER,
        false
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSettingsLoginUser,
  setSettingsServerSettings,
  logoutLoginUser,
  openSettingsAdminNavLinksDrawer,
  closedSettingsAdminNavLinksDrawer,
} = settingsSlice.actions;

export const useSettingsState = () =>
  useSelector((state: RootState) => state.settings);

export default settingsSlice.reducer;

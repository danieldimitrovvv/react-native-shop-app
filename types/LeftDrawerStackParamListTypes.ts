type LeftDrawerStackParamList = {
  Home: undefined;

  AddProduct: { id?: string };
  ProductsList: { refreshTimeStamp?: number };

  AddUser: { id?: string };
  UserDetails: { id?: string };
  ChangeUserPassword: { id?: string };
  UsersList: { refreshTimeStamp?: number };

  AddSocialContacts: { id?: string };
  SocialContactsList: { refreshTimeStamp?: number };

  AddTranslation: { id?: string };
  TranslationsList: { refreshTimeStamp?: number };

  OrdersList: { refreshTimeStamp?: number };

  AddSetting: { id?: string };
  SettingsList: { refreshTimeStamp?: number };

  Profile: { id: string };
};

export default LeftDrawerStackParamList;

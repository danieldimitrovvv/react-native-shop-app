import * as React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import i18next from "i18next";
import { languageOptions } from "../../translations";

import { Menu } from "react-native-paper";
import { IonicIcon } from "../icons/IonicIcon";
import { SimpleLineIcon } from "../icons/SimpleLineIcon";
import { shadowsStyles } from "../../styles/shadows";
import LocalStorageKeyTypes from "../../types/LocalStorageKeyTypes";

const LanguageMenu = () => {
  const [visible, setVisible] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState<string | null>(
    null
  );

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const saveData = async (lng: string) => {
    if (AsyncStorage) {
      try {
        await AsyncStorage.setItem(LocalStorageKeyTypes.LANGUAGE, lng);
        console.log("saved");
      } catch {
        console.log("err in saving data");
      }
    }
  };

  function onChangeLang(lng: string) {
    saveData(lng);
    setSelectedLanguage(lng);
    i18next.changeLanguage(lng);
    closeMenu();
  }

  React.useEffect(() => {
    const loadLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem(
          LocalStorageKeyTypes.LANGUAGE
        );
        if (storedLanguage) {
          i18next.changeLanguage(storedLanguage);
          setSelectedLanguage(storedLanguage);
        }
      } catch (e) {
        console.log(e);
      }
    };
    loadLanguage();
  }, []);

  const anchor = selectedLanguage ? (
    <TouchableOpacity onPress={openMenu}>
      <View
        style={{
          borderRadius: 50,
          overflow: "hidden",
          margin: 0,
          padding: 0,
          ...shadowsStyles.lg,
        }}
      >
        <Image
          style={{ width: 30, height: 30 }}
          source={
            languageOptions.find((i) => i.lang === selectedLanguage)?.icon
          }
        />
      </View>
    </TouchableOpacity>
  ) : (
    <SimpleLineIcon
      size="medium"
      color="#000"
      name="globe"
      onPress={openMenu}
    />
  );

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
      }}
    >
      <Menu visible={visible} onDismiss={closeMenu} anchor={anchor}>
        {languageOptions.map((lng) => (
          //   <Menu.Item
          //     key={lng.lang}
          //     onPress={() => onChangeLang(lng.lang)}
          //     title={lng.lang}

          //   />
          <TouchableOpacity
            onPress={() => onChangeLang(lng.lang)}
            key={lng.lang}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                gap: 15,
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}
            >
              <View
                style={{
                  borderRadius: 50,
                  overflow: "hidden",
                  ...shadowsStyles.extraLarge,
                }}
              >
                <Image style={{ width: 40, height: 40 }} source={lng?.icon} />
              </View>
              <Text style={{ fontSize: 20 }}>{lng?.lang}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </Menu>
    </View>
  );
};

export default LanguageMenu;

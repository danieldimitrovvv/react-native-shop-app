import React from "react";

// models
import SettingModel from "../../../../models/db/SettingsModel/SettingsModel";

import { Image, ScrollView } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { Table, Row, TableWrapper, Cell } from "react-native-table-component";
import OptionMenu from "./OptionMenu";

// styles
import { tableStyles } from "../../../../styles/table";

// utilities
import UrlsUtility from "../../../../utilities/UrlsUtility";
import {
  errorColor,
  greyColor,
  primaryColor,
  successColor,
  white,
} from "../../../../styles/colors";
import { useTranslation } from "react-i18next";
import {
  cellsStyle,
  headTextStyleBase,
  settingTableHeaderTitle,
  textStyle,
} from "./style/settingTableStyle";

type Props = {
  settings: SettingModel[];
};

export default function SettingsTable({ settings }: Props) {
  const { t } = useTranslation();

  const [items, setItems] = React.useState<SettingModel[]>(settings);

  function updateSettings(setting: SettingModel | null) {
    if (setting) {
      setItems((prevState) => {
        const updatedState = [...prevState];
        const index = prevState?.findIndex((i) => i.id === setting.id);
        updatedState[index] = setting;
        return [...updatedState];
      });
    }
  }

  const optionMenu = (data: any) => (
    <OptionMenu setting={data} updatedSetting={updateSettings} />
  );

  React.useEffect(() => {
    setItems(settings);
  }, [settings]);

  if (!items) {
    return <></>;
  }

  return (
    <ScrollView horizontal>
      <ScrollView style={tableStyles.container}>
        <Table borderStyle={{ borderColor: "transparent" }}>
          <Row
            data={
              items.length > 0
                ? settingTableHeaderTitle.map((l) =>
                    l !== "" ? t(`MODELS.SETTINGS.${l.toUpperCase()}`) : ""
                  )
                : []
            }
            style={tableStyles.head}
            widthArr={Object.values(cellsStyle).map((s) => s?.width)}
            textStyle={{
              ...headTextStyleBase,
              textTransform: "uppercase",
              textAlign: "center",
            }}
          />
          {items.map((setting, index) => (
            <TableWrapper
              key={index}
              style={{
                ...tableStyles.row,
                backgroundColor: index % 2 == 0 ? greyColor.light.value : white,
              }}
            >
              <Cell
                data={setting.key}
                width={cellsStyle.key.width}
                textStyle={textStyle.key}
              />
              <Cell
                data={setting.value}
                width={cellsStyle.value.width}
                textStyle={textStyle.value}
              />

              <Cell
                data={optionMenu(setting)}
                width={cellsStyle.actions.width}
                textStyle={textStyle.actions}
                style={{ marginLeft: 10 }}
              />
            </TableWrapper>
          ))}
        </Table>
      </ScrollView>
    </ScrollView>
  );
}

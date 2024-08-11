import React from "react";

// models
import TranslationModel from "../../../../models/db/TranslationModel/TranslationModel";

import { Image, ScrollView, StyleProp, TextStyle } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { Table, Row, TableWrapper, Cell } from "react-native-table-component";
import OptionMenu from "./OptionMenu";

// styles
import { tableStyles } from "../../../../styles/table";

// utilities
import UrlsUtility from "../../../../utilities/UrlsUtility";
import {
  black,
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
  translationTableHeaderTitle,
  textStyle,
} from "./style/translationTableStyle";

type Props = {
  translations: TranslationModel[];
};

export default function TranslationsTable({ translations }: Props) {
  const { t } = useTranslation();

  const [items, setItems] = React.useState<TranslationModel[]>(translations);

  function updateTranslations(translation: TranslationModel | null) {
    if (translation) {
      setItems((prevState) => {
        const updatedState = [...prevState];
        const index = prevState?.findIndex((i) => i.id === translation.id);
        updatedState[index] = translation;
        return [...updatedState];
      });
    }
  }

  function deleteTranslation(translation: TranslationModel) {
    setItems((prevState) => [
      ...prevState?.filter((i) => i.id !== translation.id),
    ]);
  }

  const optionMenu = (data: any) => (
    <OptionMenu
      translation={data}
      updatedTranslation={updateTranslations}
      deleteTranslationCallback={deleteTranslation}
    />
  );

  React.useEffect(() => {
    setItems(translations);
  }, [translations]);

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
                ? translationTableHeaderTitle.map((l) =>
                    l !== "" ? t(`MODELS.TRANSLATION.${l.toUpperCase()}`) : ""
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
          {items.map((translation, index) => (
            <TableWrapper
              key={index}
              style={{
                ...tableStyles.row,
                backgroundColor: index % 2 == 0 ? greyColor.light.value : white,
              }}
            >
              <Cell
                data={translation.key}
                width={cellsStyle.key.width}
                textStyle={textStyle.key}
              />
              <Cell
                data={translation.label}
                width={cellsStyle.label.width}
                textStyle={textStyle.label}
              />
              <Cell
                data={translation.lang}
                width={cellsStyle.language.width}
                textStyle={textStyle.language}
              />

              <Cell
                data={optionMenu(translation)}
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

import React from "react";
import { useTranslation } from "react-i18next";
import * as Linking from "expo-linking";

// models
import SocialModel from "../../../../models/db/SocialModel/SocialModel";

import { Image, ScrollView, Text } from "react-native";
import { Avatar, Button, Icon } from "react-native-elements";
import { Table, Row, TableWrapper, Cell } from "react-native-table-component";
import OptionMenu from "./OptionMenu";

// styles
import { tableStyles } from "../../../../styles/table";

import { greyColor, white } from "../../../../styles/colors";
import {
  cellsStyle,
  headTextStyleBase,
  socialTableHeaderTitle,
  textStyle,
} from "./style/socialTableStyle";
import { IconButton } from "react-native-paper";
import { SimpleLineIcon } from "../../../../components/icons/SimpleLineIcon";
import { getSocialTypesIcon } from "../../../../models/types/SocialTypes";
import { min } from "lodash";

type Props = {
  socials: SocialModel[];
};

export default function SocialsTable({ socials }: Props) {
  const { t } = useTranslation();

  const [items, setItems] = React.useState<SocialModel[]>(socials);

  function updateSocials(social: SocialModel | null) {
    if (social) {
      setItems((prevState) => {
        const updatedState = [...prevState];
        const index = prevState?.findIndex((i) => i.id === social.id);
        updatedState[index] = social;
        return [...updatedState];
      });
    }
  }

  function deleteSocial(social: SocialModel) {
    setItems((prevState) => [...prevState?.filter((i) => i.id !== social.id)]);
  }

  const optionMenu = (data: any) => (
    <OptionMenu
      social={data}
      updatedSocial={updateSocials}
      deleteSocialCallback={deleteSocial}
    />
  );

  React.useEffect(() => {
    setItems(socials);
  }, [socials]);

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
                ? socialTableHeaderTitle.map((l) =>
                    l !== "" ? t(`MODELS.SOCIAL.${l.toUpperCase()}`) : ""
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
          {items.map((social, index) => {
            const iconData = getSocialTypesIcon(social.type);
            const textLen = min([social.link.length, 30]);
            const title = social.link.slice(0, textLen);

            return (
              <TableWrapper
                key={index}
                style={{
                  ...tableStyles.row,
                  backgroundColor:
                    index % 2 == 0 ? greyColor.light.value : white,
                }}
              >
                <Cell
                  data={
                    <Icon
                      reverse
                      size={20}
                      name={iconData.icon.name}
                      type={iconData.icon.type}
                      color={iconData.containerProps.bgcolor}
                    />
                  }
                  width={cellsStyle.icon.width}
                  textStyle={textStyle.icon}
                />

                <Cell
                  data={social.label}
                  width={cellsStyle.label.width}
                  textStyle={textStyle.label}
                />

                <Cell
                  data={
                    <>
                      {social.link.startsWith("http") ||
                      social.link.startsWith("https") ? (
                        <Button
                          title={
                            textLen && social.link.length > textLen
                              ? title + "..."
                              : title
                          }
                          onPress={() => Linking.openURL(social.link)}
                          type="solid"
                          icon={
                            <SimpleLineIcon
                              size="medium"
                              color={iconData.containerProps.color}
                              name="link"
                            />
                          }
                          buttonStyle={{
                            backgroundColor: iconData.containerProps.bgcolor,
                            width: "100%",
                            marginVertical: 5,
                            gap: 5,
                            paddingHorizontal: 10,
                          }}
                          titleStyle={{
                            color: iconData.containerProps.color,
                          }}
                        />
                      ) : (
                        <Text
                          style={{
                            color: iconData.containerProps.bgcolor,
                            fontWeight: 500,
                          }}
                        >
                          {textLen && social.link.length > textLen
                            ? title + "..."
                            : title}
                        </Text>
                      )}
                    </>
                  }
                  width={cellsStyle.link.width}
                  textStyle={textStyle.link}
                />

                <Cell
                  data={social.type}
                  width={cellsStyle.type.width}
                  textStyle={textStyle.type}
                />

                <Cell
                  data={optionMenu(social)}
                  width={cellsStyle.actions.width}
                  textStyle={textStyle.actions}
                  style={{ marginLeft: 10 }}
                />
              </TableWrapper>
            );
          })}
        </Table>
      </ScrollView>
    </ScrollView>
  );
}

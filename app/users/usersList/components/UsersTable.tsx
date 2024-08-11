import React from "react";
import { useTranslation } from "react-i18next";

// models
import BaseUserModel from "../../../../models/db/User/BaseUserModel/BaseUserModel";

//  components
import { Image, ScrollView } from "react-native";
import { Avatar, Badge, Icon } from "react-native-elements";
import { Table, Row, TableWrapper, Cell } from "react-native-table-component";
import OptionMenu from "./OptionMenu";

// styles
import { tableStyles } from "../../../../styles/table";
import { greyColor, white } from "../../../../styles/colors";
import {
  cellsStyle,
  headTextStyleBase,
  userTableHeaderTitle,
  textStyle,
} from "./style/userTableStyle";

// utilities
import { getRoleColor } from "../../../../models/types/RolesTypes";

type Props = {
  users: BaseUserModel[];
};

export default function UsersTable({ users }: Props) {
  const { t } = useTranslation();

  const [items, setItems] = React.useState<BaseUserModel[]>(users);

  function updateUsers(user: BaseUserModel | null) {
    if (user) {
      setItems((prevState) => {
        const updatedState = [...prevState];
        const index = prevState?.findIndex((i) => i.id === user.id);
        updatedState[index] = user;
        return [...updatedState];
      });
    }
  }

  function deleteUser(user: BaseUserModel) {
    setItems((prevState) => [...prevState?.filter((i) => i.id !== user.id)]);
  }

  const optionMenu = (data: any) => (
    <OptionMenu
      user={data}
      updatedUser={updateUsers}
      deleteUserCallback={deleteUser}
    />
  );

  React.useEffect(() => {
    setItems(users);
  }, [users]);

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
                ? userTableHeaderTitle.map((l) =>
                    l !== "" ? t(`MODELS.USER.${l.toUpperCase()}`) : ""
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
          {items.map((user, index) => (
            <TableWrapper
              key={index}
              style={{
                ...tableStyles.row,
                backgroundColor: index % 2 == 0 ? greyColor.light.value : white,
              }}
            >
              <Cell
                data={user.firstName}
                width={cellsStyle.firstName.width}
                textStyle={textStyle.firstName}
              />

              <Cell
                data={user.lastName}
                width={cellsStyle.lastName.width}
                textStyle={textStyle.lastName}
              />

              <Cell
                data={user.email}
                width={cellsStyle.email.width}
                textStyle={textStyle.email}
              />

              <Cell
                data={user.phone}
                width={cellsStyle.phone.width}
                textStyle={textStyle.phone}
              />

              <Cell
                data={
                  <Badge value={user.role} status={getRoleColor(user.role)} />
                }
                width={cellsStyle.role.width}
                textStyle={textStyle.role}
              />

              <Cell
                data={optionMenu(user)}
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

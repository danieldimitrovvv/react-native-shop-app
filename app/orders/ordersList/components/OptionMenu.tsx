import * as React from "react";
import { useTranslation } from "react-i18next";
import { NavigationProp, useNavigation } from "@react-navigation/native";

//  models
import IOrderResponseModel from "../../../../models/ResponsesDTO/OrderResponseModel/IOrderResponseModel";

// styles
import { containerStyles } from "../../../../styles/main";
import palette, {
  errorColor,
  successColor,
  white,
} from "../../../../styles/colors";

// types
import LeftDrawerStackParamList from "../../../../types/LeftDrawerStackParamListTypes";
import RootStackParamList from "../../../../types/RootStackParamListTypes";
import OrderStatusTypes from "../../../../models/types/OrderStatusTypes";

// hooks
import useDeleteOrderHook from "../../../../hooks/orders/deleteOrderHook";
import { useSettingsState } from "../../../../store/slices/settings/settingsSlice";
import useUpdateOrderStatusHook from "../../../../hooks/orders/updateOrderStatusHook";

// components
import { View, Alert, Text } from "react-native";
import { Button, Icon } from "react-native-elements";
import { Menu } from "react-native-paper";

type OptionMenuProps = {
  order: IOrderResponseModel;
  updatedOrder: (order: IOrderResponseModel | null) => void;
  deleteOrderCallback: (order: IOrderResponseModel) => void;
};

const OptionMenu = ({
  order,
  updatedOrder,
  deleteOrderCallback,
}: OptionMenuProps) => {
  const { t } = useTranslation();

  const settingsState = useSettingsState();

  const navigation =
    useNavigation<
      NavigationProp<RootStackParamList & LeftDrawerStackParamList>
    >();

  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const {
    isLoading: isLoadingUpdateStatus,
    error: errorUpdateStatus,
    order: updateOrder,
    updateOrderStatus,
  } = useUpdateOrderStatusHook();

  const {
    isLoading: deleteIsLoading,
    error: deleteError,
    effectedRows,
    deleteOrder,
  } = useDeleteOrderHook();

  const [row, setRow] = React.useState<IOrderResponseModel | null>(order);

  function onDeleteHandel() {
    deleteOrder(order.id);
    closeMenu();
  }

  React.useEffect(() => {
    setRow(order);
  }, [order]);

  React.useEffect(() => {
    if (effectedRows > 0) {
      setRow(null);
      if (row) {
        deleteOrderCallback(row);
      }
    }
  }, [effectedRows, row]);

  React.useEffect(() => {
    updatedOrder(row);
  }, [row]);

  function ErrorLabel({ message }: { message: string }) {
    return <Text style={{ color: palette.error.main.value }}>{message}</Text>;
  }

  const anchor = (
    <Icon
      color={palette.primary.light.value}
      type="font-awesome"
      name="ellipsis-v"
      onPress={openMenu}
      size={15}
      reverse
    />
  );

  const iconProps = {
    type: "font-awesome",
    size: 15,
    color: white,
    style: { marginRight: 5 },
  };

  if (!row) {
    return <></>;
  }

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
      }}
    >
      <Menu visible={visible} onDismiss={closeMenu} anchor={anchor}>
        <View
          style={{
            ...containerStyles.containerColumn,
            padding: 5,
            gap: 5,
            alignItems: "stretch",
          }}
        >
          {row.status === OrderStatusTypes.REGISTERED && (
            <>
              <Button
                title={
                  errorUpdateStatus ? (
                    <Text style={{ color: errorColor.main.value }}>
                      {errorUpdateStatus}
                    </Text>
                  ) : (
                    t("MODELS.ORDER.FINISH")
                  )
                }
                onPress={() => {
                  updateOrderStatus(row.id, OrderStatusTypes.COMPLETED);
                }}
                icon={
                  <Icon
                    name="check"
                    {...iconProps}
                    type="material-icons"
                    color={successColor.main.value}
                  />
                }
                loading={isLoadingUpdateStatus}
              />

              <Button
                title={
                  errorUpdateStatus ? (
                    <Text style={{ color: errorColor.main.value }}>
                      {errorUpdateStatus}
                    </Text>
                  ) : (
                    t("MODELS.ORDER.CANCEL")
                  )
                }
                onPress={() => {
                  updateOrderStatus(row.id, OrderStatusTypes.REFUSED);
                }}
                icon={
                  <Icon
                    name="block"
                    {...iconProps}
                    type="material-icons"
                    color={errorColor.main.value}
                  />
                }
                loading={isLoadingUpdateStatus}
              />
            </>
          )}

          <Button
            title={
              deleteError ? (
                <ErrorLabel message={deleteError} />
              ) : (
                t("COMMON.DELETE")
              )
            }
            loading={deleteIsLoading}
            onPress={onDeleteHandel}
            icon={
              <Icon
                name="trash"
                {...iconProps}
                color={palette.error.light.value}
              />
            }
          />
        </View>
      </Menu>
    </View>
  );
};

export default OptionMenu;

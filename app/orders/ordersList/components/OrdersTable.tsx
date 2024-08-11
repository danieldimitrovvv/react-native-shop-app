import React from "react";

// models
import IOrderResponseModel from "../../../../models/ResponsesDTO/OrderResponseModel/IOrderResponseModel";

// styles
import { tableStyles } from "../../../../styles/table";

// styles
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
  orderTableHeaderTitle,
  textStyle,
} from "./style/orderTableStyle";

// components
import { Image, ScrollView, Text } from "react-native";
import { Avatar, Chip, Icon } from "react-native-elements";
import { Table, Row, TableWrapper, Cell } from "react-native-table-component";
import OptionMenu from "./OptionMenu";
import OrderStatusTypes from "../../../../models/types/OrderStatusTypes";
import { TouchableOpacity } from "react-native-gesture-handler";
import { containerStyles } from "../../../../styles/main";
import { View } from "react-native";
import ProductListItem from "../../../../components/lists/ProductList/ProductListItem";
import ProductModel from "../../../../models/db/ProductModel/ProductModel";
import { ListItem } from "@rneui/base";
import { shadowsStyles } from "../../../../styles/shadows";
import OrderModel from "../../../../models/db/OrderModel/OrderModel";

type Props = {
  orders: IOrderResponseModel[];
};

export default function OrdersTable({ orders }: Props) {
  const { t } = useTranslation();

  const [open, setOpen] = React.useState<{ [key: number]: boolean }>({});

  const [items, setItems] = React.useState<IOrderResponseModel[]>(orders);

  function updateOrders(order: IOrderResponseModel | null) {
    if (order) {
      setItems((prevState) => {
        const updatedState = [...prevState];
        const index = prevState?.findIndex((i) => i.id === order.id);
        updatedState[index] = order;
        return [...updatedState];
      });
    }
  }

  function deleteOrder(order: IOrderResponseModel) {
    setItems((prevState) => [...prevState?.filter((i) => i.id !== order.id)]);
  }

  const optionMenu = (data: any) => (
    <OptionMenu
      order={data}
      updatedOrder={updateOrders}
      deleteOrderCallback={deleteOrder}
    />
  );

  function toggleOpen(index: number) {
    setOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  }

  const getStatusIconData = (status: OrderStatusTypes, size = 20) => {
    switch (status) {
      case OrderStatusTypes.REGISTERED:
        return {
          name: "app-registration",
          type: "material-icons",
          size,
          color: primaryColor.main.value,
        };

      case OrderStatusTypes.COMPLETED:
        return {
          name: "check",
          type: "material-icons",
          size,
          color: successColor.dark.value,
        };

      case OrderStatusTypes.REFUSED:
        return {
          name: "do-not-disturb",
          type: "material-icons",
          size,
          color: errorColor.main.value,
        };

      default:
        return {
          name: "downloading",
          type: "material-icons",
          size,
          color: primaryColor.main.value,
        };
    }
  };

  React.useEffect(() => {
    setItems(orders);
  }, [orders]);

  const simpleCardStyle = {
    ...shadowsStyles.sm,
    backgroundColor: "#fff",
    borderLeftWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 5,
  };

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
                ? orderTableHeaderTitle.map((l) =>
                    l !== "" ? t(`MODELS.ORDER.${l.toUpperCase()}`) : ""
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
          {items.map((order, index) => {
            const iconData = getStatusIconData(order.status);
            return (
              <>
                <TableWrapper
                  key={`order-${order.id}-item-${index}`}
                  style={{
                    ...tableStyles.row,
                    backgroundColor:
                      index % 2 == 0 ? greyColor.light.value : white,
                  }}
                >
                  <Cell
                    data={
                      <TouchableOpacity onPress={() => toggleOpen(index)}>
                        <Icon
                          name={
                            open[index]
                              ? "keyboard-arrow-up"
                              : "keyboard-arrow-down"
                          }
                          type="material-icons"
                        />
                      </TouchableOpacity>
                    }
                    width={cellsStyle.icon.width}
                    textStyle={textStyle.icon}
                  />
                  <Cell
                    data={`${order.user.firstName} ${order.user.lastName}`}
                    width={cellsStyle.user.width}
                    textStyle={textStyle.user}
                  />
                  <Cell
                    data={order.user.email}
                    width={cellsStyle.email.width}
                    textStyle={textStyle.email}
                  />
                  <Cell
                    data={order.user.phone}
                    width={cellsStyle.phone.width}
                    textStyle={textStyle.phone}
                  />
                  <Cell
                    data={
                      <Chip
                        title={t(
                          "ENUMS.ORDER_STATUS_TYPES." +
                            order.status.toUpperCase()
                        )}
                        icon={iconData}
                        type="outline"
                        style={{ backgroundColor: iconData.color }}
                        buttonStyle={{
                          borderColor: iconData.color,
                        }}
                        titleStyle={{ color: iconData.color }}
                      />
                    }
                    width={cellsStyle.status.width}
                    textStyle={textStyle.status}
                  />

                  <Cell
                    data={optionMenu(order)}
                    width={cellsStyle.actions.width}
                    textStyle={textStyle.actions}
                    style={{ marginLeft: 10 }}
                  />
                </TableWrapper>

                <ListItem.Accordion
                  key={`order-${order.id}-more-details-item-${index}`}
                  content={<></>}
                  style={{
                    height: 0,
                    backgroundColor:
                      index % 2 == 0 ? greyColor.light.value : white,
                  }}
                  isExpanded={open[index]}
                  onPress={() => toggleOpen(index)}
                >
                  <View
                    style={{
                      ...containerStyles.containerRow,
                      marginVertical: 5,
                      gap: 10,
                    }}
                  >
                    <View
                      style={{
                        ...containerStyles.containerColumnCenter,
                      }}
                    >
                      <Text
                        style={{
                          color: primaryColor.main.value,
                        }}
                      >
                        {t("MODELS.ORDER.STATUS").toUpperCase()}
                      </Text>
                      <Chip
                        title={t(
                          "ENUMS.ORDER_STATUS_TYPES." +
                            order.status.toUpperCase()
                        )}
                        icon={iconData}
                        type="outline"
                        style={{
                          backgroundColor: iconData.color,
                          width: "auto",
                        }}
                        buttonStyle={{
                          borderColor: iconData.color,
                        }}
                        titleStyle={{ color: iconData.color }}
                      />
                    </View>

                    <View
                      style={{
                        ...containerStyles.containerColumn,
                        ...simpleCardStyle,
                      }}
                    >
                      <Text style={{ color: primaryColor.main.value }}>
                        {t("MODELS.ORDER.ADDRESS")}
                      </Text>
                      <Text style={{ color: greyColor.main.value }}>
                        {order.address}
                      </Text>
                    </View>

                    <View
                      style={{
                        ...containerStyles.containerColumn,
                        ...simpleCardStyle,
                      }}
                    >
                      <Text style={{ color: primaryColor.main.value }}>
                        {t("MODELS.ORDER.DESCRIPTION")}
                      </Text>
                      <Text style={{ color: greyColor.main.value }}>
                        {order.description}
                      </Text>
                    </View>

                    <View
                      style={{
                        ...containerStyles.containerColumnCenter,
                      }}
                    >
                      <Text style={{ color: primaryColor.main.value }}>
                        {t("COMMON.TOTAL").toUpperCase()}
                      </Text>
                      <Text
                        style={{
                          color: primaryColor.main.value,
                          fontWeight: 900,
                          fontSize: 20,
                        }}
                      >
                        {`${new OrderModel(order).calculateTotalSum()} ${t(
                          "ENUMS.PRODUCT_CURRENCY_CODE_TYPES.BGN"
                        )}`}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      display: "flex",
                      width: Object.values(cellsStyle)
                        .map((s) => s?.width)
                        .reduce((accumulator, currentValue) => {
                          return accumulator + currentValue;
                        }, 0),
                    }}
                  >
                    {order.cartItems.map((i) => (
                      <ProductListItem
                        key={`product-item-${i.product.id}`}
                        product={new ProductModel(i.product)}
                        amount={i.amount}
                        withActions={false}
                        withAmountControls={false}
                        badgeText={i.amount.toString()}
                      />
                    ))}
                  </View>
                </ListItem.Accordion>
              </>
            );
          })}
        </Table>
      </ScrollView>
    </ScrollView>
  );
}

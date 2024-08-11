import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavigationProp, useNavigation } from "@react-navigation/native";

// styles
import { formStyles } from "../../../../styles/form";
import { primaryColor } from "../../../../styles/colors";

// types
import OrderStatusTypes from "../../../../models/types/OrderStatusTypes";

// components
import { Text, View } from "react-native";
import { Icon } from "react-native-elements";
import ErrorMessage from "../../../../components/messages/ErrorMessage";
import RootStackParamList from "../../../../types/RootStackParamListTypes";
import SelectDropdown from "react-native-select-dropdown";

type Props = {
  onSubmit: (status: OrderStatusTypes | null) => void;
  isLoading: boolean;
  error: string | null;
};

export default function SearchForm({ onSubmit, isLoading, error }: Props) {
  const { t } = useTranslation();

  const [selectStatus, setSelectStatus] = useState<OrderStatusTypes | null>(
    null
  );

  const navigator = useNavigation<NavigationProp<RootStackParamList>>();

  async function handleOnSubmit() {
    onSubmit(selectStatus);
  }

  const dropdownData = [
    { title: t("COMMON.ALL"), key: null },
    ...Object.keys(OrderStatusTypes)
      .filter((k) => k !== OrderStatusTypes[OrderStatusTypes.UNKNOWN])
      .map((key) => ({
        title: t("ENUMS.ORDER_STATUS_TYPES." + key.toUpperCase()),
        key,
      })),
  ];
  return (
    <View
      style={{
        ...formStyles.container,
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,
        flex: 0,
        paddingVertical: 5,
      }}
    >
      <SelectDropdown
        data={dropdownData}
        onSelect={(selectedItem, index) => {
          setSelectStatus(
            OrderStatusTypes[selectedItem.key as keyof typeof OrderStatusTypes]
          );
        }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={formStyles.dropdownButtonStyle}>
              <Text style={formStyles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem.title) ||
                  t("COMMON.SELECT_ORDER_STATUS")}
              </Text>
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View
              style={{
                ...formStyles.dropdownItemStyle,
                ...(isSelected && { backgroundColor: "#D2D9DF" }),
              }}
            >
              <Text style={formStyles.dropdownItemTxtStyle}>{item.title}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={formStyles.dropdownMenuStyle}
      />

      <Icon
        name="search"
        reverse
        color={primaryColor.main.value}
        size={20}
        onPress={handleOnSubmit}
        disabled={isLoading}
      />

      {error && (
        <ErrorMessage
          message={error}
          messageProps={{ style: { paddingVertical: 2, margin: 0 } }}
        />
      )}
    </View>
  );
}

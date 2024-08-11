import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavigationProp, useNavigation } from "@react-navigation/native";

// styles
import { formStyles } from "../../../../styles/form";
import { primaryColor } from "../../../../styles/colors";

// types
import { ProductCategoryTypes } from "../../../../models/types/ProductCategoryTypes";

// components
import { Text, TextInput, View } from "react-native";
import { Icon } from "react-native-elements";
import ErrorMessage from "../../../../components/messages/ErrorMessage";
import RootStackParamList from "../../../../types/RootStackParamListTypes";
import SelectDropdown from "react-native-select-dropdown";

type Props = {
  onSubmit: (searchVal: string, category: ProductCategoryTypes | null) => void;
  isLoading: boolean;
  error: string | null;
};

export default function SearchForm({ onSubmit, isLoading, error }: Props) {
  const { t } = useTranslation();

  const [searchVal, setSearchVal] = useState("");
  const [selectCategory, setSelectCategory] =
    useState<ProductCategoryTypes | null>(null);

  const navigator = useNavigation<NavigationProp<RootStackParamList>>();

  async function handleOnSubmit() {
    onSubmit(searchVal, selectCategory);
  }

  const dropdownData = [
    { title: t("COMMON.ALL"), key: null },
    ...Object.keys(ProductCategoryTypes)
      .filter((k) => k !== ProductCategoryTypes[ProductCategoryTypes.UNKNOWN])
      .map((key) => ({
        title: t("ENUMS.PRODUCT_CATEGORY_TYPES." + key.toUpperCase()),
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
      <View
        style={{ ...formStyles.inputView, width: "40%", paddingHorizontal: 2 }}
      >
        <TextInput
          style={formStyles.input}
          placeholder={t("FORMS.PRODUCT_SEARCH_FORM.SEARCH_VALUE")}
          value={searchVal}
          onChangeText={setSearchVal}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>

      <SelectDropdown
        data={dropdownData}
        onSelect={(selectedItem, index) => {
          setSelectCategory(
            ProductCategoryTypes[
              selectedItem.key as keyof typeof ProductCategoryTypes
            ]
          );
        }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={formStyles.dropdownButtonStyle}>
              <Text style={formStyles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem.title) ||
                  t("COMMON.SELECT_CATEGORY")}
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

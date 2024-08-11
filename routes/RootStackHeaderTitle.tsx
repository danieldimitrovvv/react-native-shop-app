import React from "react";
import { useTranslation } from "react-i18next";
import { SearchBarBaseProps } from "react-native-elements/dist/searchbar/SearchBar";

//  styles
import { formStyles } from "../styles/form";
import { errorColor, primaryColor } from "../styles/colors";

// stores
import { useDispatch } from "react-redux";

// hooks
import useGetAllProductsWithFiltersHook from "../hooks/products/getAllProductsWithFiltersHook";

// components
import {
  View,
  Text,
  TextProps,
  TextInput,
  ActivityIndicator,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { Icon } from "react-native-elements";
import ErrorMessage from "../components/messages/ErrorMessage";
import {
  clearSearchProducts,
  setSearchProducts,
  useSearchState,
} from "../store/slices/search/searchSlice";

type HeaderTitleProps = {
  title: string;
  titleProps?: TextProps;
  withSearchBar?: boolean;
};

export default function RootStackHeaderTitle(props: HeaderTitleProps) {
  const { t } = useTranslation();

  const { setFilters, isLoading, error, products, countRows } =
    useGetAllProductsWithFiltersHook({
      withAll: false,
    });

  const dispatch = useDispatch();

  const searchState = useSearchState();

  const [search, setSearch] = React.useState("");

  function onPressSearchProducts() {
    setFilters({ searchVal: search });
  }

  function onPressClearSearchProducts() {
    setFilters({ searchVal: "" });
    setSearch("");
    dispatch(clearSearchProducts());
  }

  React.useEffect(() => {
    if (products) {
      dispatch(
        setSearchProducts({
          rows: JSON.parse(JSON.stringify(products)),
          countRows,
        })
      );
    } else {
      dispatch(clearSearchProducts());
    }
  }, [products]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            flex: 1,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Text style={{ fontSize: 30 }} {...props.titleProps}>
            {props.title?.toUpperCase()}
          </Text>
          {props.withSearchBar && (
            <View
              style={{
                flexDirection: "column",
                width: "100%",
                gap: 2,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  gap: 0,
                }}
              >
                {(searchState.searchProducts.length > 0 ||
                  search.length > 0) && (
                  <Icon
                    name="clear"
                    reverse
                    color={errorColor.main.value}
                    size={20}
                    onPress={onPressClearSearchProducts}
                  />
                )}
                <TextInput
                  style={{ ...formStyles.input }}
                  placeholder={t("COMMON.SEARCH") + "..."}
                  value={search}
                  onChangeText={setSearch}
                  autoCorrect={false}
                  autoCapitalize="none"
                  defaultValue=""
                  onEndEditing={() => setSearch((prevState) => prevState)}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                />
                {!isLoading && (
                  <Icon
                    name="search"
                    reverse
                    color={primaryColor.main.value}
                    size={20}
                    onPress={onPressSearchProducts}
                  />
                )}
                {isLoading && <ActivityIndicator />}
              </View>
              {error && (
                <ErrorMessage
                  message={error}
                  messageProps={{
                    style: {
                      padding: 0,
                      paddingBottom: 5,
                      margin: 0,
                      textAlign: "left",
                    },
                  }}
                />
              )}
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

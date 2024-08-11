import React from "react";
import { useTranslation } from "react-i18next";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

// models

//  types
import LeftDrawerStackParamList from "../../../types/LeftDrawerStackParamListTypes";
import OrderStatusTypes from "../../../models/types/OrderStatusTypes";

//  hooks
import useGetUserHook from "../../../hooks/users/getUserHook";

// styles
import { containerStyles } from "../../../styles/main";
import palette, {
  errorColor,
  primaryColor,
  secondaryColor,
  successColor,
} from "../../../styles/colors";

// store
import { useSettingsState } from "../../../store/slices/settings/settingsSlice";

// routes
import RootStackHeaderTitle from "../../../routes/RootStackHeaderTitle";

// components
import { SafeAreaView, View, ActivityIndicator, Text } from "react-native";
import ErrorMessage from "../../../components/messages/ErrorMessage";
import UserCard from "../../../components/cards/UserCard/UserCard";
import CircularComponent from "../../../components/CircularComponent";
import IOrderModel from "../../../models/db/OrderModel/IOrderModel";
import IOrderResponseModel from "../../../models/ResponsesDTO/OrderResponseModel/IOrderResponseModel";
import { IShoppingCartItem } from "../../../store/slices/shopping-cart/shoppingCartSlice";
import OrderModel from "../../../models/db/OrderModel/OrderModel";

type Props = NativeStackScreenProps<LeftDrawerStackParamList, "UserDetails">;

const UserDetailsScreen = ({ navigation, route }: Props) => {
  const { t } = useTranslation();

  const settingsState = useSettingsState();

  const { isLoading, error, user } = useGetUserHook(
    route.params.id ? parseInt(route.params.id) : undefined
  );

  React.useEffect(() => {
    if (user) {
      navigation.setOptions({
        headerTitle: (props) => (
          <RootStackHeaderTitle
            title={`${user.firstName} ${user.lastName}`}
            titleProps={{
              style: { fontSize: 18, color: palette.primary.main.value },
            }}
          />
        ),
      });
    }
  }, [user]);

  const completedOrders = React.useMemo(
    () =>
      user?.orders?.filter((i) => i.status === OrderStatusTypes.COMPLETED)
        ?.length,
    [user]
  );

  const registeredOrders = React.useMemo(
    () =>
      user?.orders?.filter((i) => i.status === OrderStatusTypes.REGISTERED)
        ?.length,
    [user]
  );

  const refusedOrders = React.useMemo(
    () =>
      user?.orders?.filter((i) => i.status === OrderStatusTypes.REFUSED)
        ?.length,
    [user]
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {error && <ErrorMessage message={error} />}
      {isLoading && <ActivityIndicator />}
      {!isLoading && user && (
        <UserCard user={user}>
          <View style={containerStyles.containerColumn}>
            {user?.orders && user?.orders?.length === 0 && (
              <Text
                style={{ textAlign: "center", color: primaryColor.main.value }}
              >
                {t("FORMS.USER.MESSAGES.MISSING_ORDERS").toUpperCase()}
              </Text>
            )}
            {user?.orders && user?.orders?.length > 0 && (
              <View
                style={{
                  ...containerStyles.containerColumn,
                }}
              >
                <View
                  style={{
                    ...containerStyles.containerRow,
                    gap: 10,
                    paddingBottom: 180, // for design
                  }}
                >
                  <CircularComponent
                    title={t("MODELS.USER.ORDERS")}
                    value={user?.orders.length ?? 0}
                    maxValue={user?.orders.length ?? 0}
                    color={secondaryColor.main.value}
                  />

                  <CircularComponent
                    title={t("ENUMS.ORDER_STATUS_TYPES.REGISTERED")}
                    value={registeredOrders ?? 0}
                    maxValue={user?.orders.length ?? 0}
                    color={primaryColor.main.value}
                  />
                </View>
                <View
                  style={{
                    ...containerStyles.containerRow,
                    gap: 10,
                  }}
                >
                  <CircularComponent
                    title={t("ENUMS.ORDER_STATUS_TYPES.COMPLETED")}
                    value={completedOrders ?? 0}
                    maxValue={user?.orders.length ?? 0}
                    color={successColor.main.value}
                  />

                  <CircularComponent
                    title={t("ENUMS.ORDER_STATUS_TYPES.REFUSED")}
                    value={refusedOrders ?? 0}
                    maxValue={user?.orders.length ?? 0}
                    color={errorColor.main.value}
                  />
                </View>
              </View>
            )}
          </View>
        </UserCard>
      )}
    </SafeAreaView>
  );
};

export default UserDetailsScreen;

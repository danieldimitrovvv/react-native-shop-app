import { useTranslation } from "react-i18next";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

// types
import LeftDrawerStackParamList from "../../types/LeftDrawerStackParamListTypes";

//  store
import useGetUserHook from "../../hooks/users/getUserHook";

// styles

// components
import { SafeAreaView } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import ErrorMessage from "../../components/messages/ErrorMessage";
import UserCard from "../../components/cards/UserCard/UserCard";

type Props = NativeStackScreenProps<LeftDrawerStackParamList, "Profile">;

const ProfileScreen = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const { isLoading, error, user } = useGetUserHook(parseInt(route.params.id));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoading && <ActivityIndicator />}
      {!isLoading && error && <ErrorMessage message={t(error)} />}

      {!isLoading && user && (
        <UserCard user={user} withChangePasswordButton={true} />
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;

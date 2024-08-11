import React from "react";
import { useTranslation } from "react-i18next";

// styles
import { errorColor, primaryColor } from "../../../../styles/colors";

// components
import { StyleSheet, View } from "react-native";
import { Image, Text } from "react-native";
import { CheckBox, Icon } from "react-native-elements";
import { shadowsStyles } from "../../../../styles/shadows";
import UrlsUtility from "../../../../utilities/UrlsUtility";

export interface FormUploadImageProps {
  url: string;
  isCheck: boolean;
  id?: number;
}

export interface FormUploadImageSelectImagePreviewProps {
  size: number;
  item: FormUploadImageProps;
  onDelete?: (image: FormUploadImageProps) => void;
  onCheck?: (image: FormUploadImageProps) => void;
  checkLabel?: string;
  unCheckLabel?: string;
}

export default function PickImagesItem({
  size,
  item,
  onDelete,
  onCheck,
  checkLabel,
  unCheckLabel,
}: FormUploadImageSelectImagePreviewProps) {
  const { t } = useTranslation();

  return (
    <View
      style={{
        ...styles.rounded,
        width: size,
        height: size,
        position: "relative",
        marginHorizontal: 5,
        ...shadowsStyles.lg,
      }}
    >
      {onDelete && (
        <View style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }}>
          <Icon
            reverse
            name="trash"
            type="font-awesome"
            size={15}
            color={errorColor.main.value}
            onPress={() => {
              if (onDelete) {
                onDelete(item);
              }
            }}
          />
        </View>
      )}
      {onCheck && (
        <View style={{ position: "absolute", bottom: 0, right: 0, zIndex: 2 }}>
          <CheckBox
            center
            title={item.isCheck ? unCheckLabel : checkLabel}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={item.isCheck}
            onPress={() => {
              if (onCheck) onCheck({ ...item, isCheck: !item.isCheck });
            }}
          />
        </View>
      )}

      <Image
        source={{
          uri: item.url.startsWith("/")
            ? UrlsUtility.getImageBaseURL() + "/" + item.url
            : item.url,
        }}
        style={{
          ...styles.rounded,
          width: size,
          height: size,
          zIndex: 1,
        }}
      />

      {item.isCheck && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
            top: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            backgroundColor: "rgba(0,0,0,0.4 )",
            ...styles.rounded,
            borderWidth: 3,
            borderColor: primaryColor.main.value,
          }}
        >
          <Text
            style={{
              color: "#fff",
            }}
          >
            {t("FORMS.PRODUCT.MAIN_IMAGE")}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  rounded: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "transparent",
  },
});

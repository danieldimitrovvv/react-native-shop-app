import React from "react";
import * as ImagePicker from "expo-image-picker";
import { View } from "react-native";
import { Button } from "react-native";
import { containerStyles } from "../../../../styles/main";
import { useTranslation } from "react-i18next";
import PickImagesItem, { FormUploadImageProps } from "./PickImagesItem";
import { ScrollView } from "react-native-gesture-handler";

type Props = {
  size: number;
  images: FormUploadImageProps[];
  onAdd: (image: FormUploadImageProps) => void;
  onDelete?: (image: FormUploadImageProps) => void;
  onCheck?: (image: FormUploadImageProps) => void;
  multiple?: boolean;
};
export default function PickImages({
  size,
  images,
  onAdd,
  onCheck,
  onDelete,
  multiple,
}: Props) {
  const { t } = useTranslation();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: multiple,
      base64: true,
    });

    console.log(result);

    if (!result.canceled) {
      result.assets.map((i) =>
        onAdd({
          id: 0,
          isCheck: false,
          url: "data:" + i.mimeType + ";base64," + i.base64,
        } as FormUploadImageProps)
      );
    }
  };

  return (
    <View style={{ ...containerStyles.containerColumn, gap: 10 }}>
      <Button title={t("FORMS.PRODUCT.IMAGES")} onPress={pickImage} />
      <ScrollView
        horizontal
        style={{ ...containerStyles.containerRow, gap: 10 }}
      >
        {images?.map((img) => (
          <PickImagesItem
            item={img}
            size={size}
            onDelete={onDelete}
            onCheck={onCheck}
            // checkLabel={t("FORMS.PRODUCT.MAIN_IMAGE")}
            // unCheckLabel={t("FORMS.PRODUCT.IS_NOT_MAIN_IMAGE")}
          />
        ))}
      </ScrollView>
    </View>
  );
}

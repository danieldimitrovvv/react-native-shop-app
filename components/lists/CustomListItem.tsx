import { ImageSourcePropType } from "react-native";
import { ListItem, Avatar, ListItemProps } from "react-native-elements";
import { greyColor, primaryColor } from "../../styles/colors";

type CustomListItemProps = ListItemProps & {
  title: string;
  subTitle?: string;
  imageSource?: ImageSourcePropType;
  imageTitle?: string;
  onPress?: () => void;
};

export default function CustomListItem({
  title,
  subTitle,
  imageSource,
  imageTitle,
  onPress,
  ...restProps
}: CustomListItemProps) {
  return (
    <ListItem
      onPress={onPress}
      bottomDivider
      pad={10}
      style={{ marginBottom: 5, padding: 0 }}
      {...restProps}
    >
      <Avatar
        rounded
        size="small"
        titleStyle={{ color: primaryColor.main.contrastText }}
        overlayContainerStyle={{
          backgroundColor: primaryColor.main.value,
        }}
        title={imageTitle}
        source={imageSource}
      />
      <ListItem.Content>
        <ListItem.Title
          style={{
            fontSize: 12,
            textTransform: "uppercase",
            fontWeight: 400,
          }}
        >
          {title}
        </ListItem.Title>
        {subTitle && (
          <ListItem.Subtitle
            style={{ fontSize: 10, color: greyColor.main.value }}
          >
            {subTitle}
          </ListItem.Subtitle>
        )}
      </ListItem.Content>
    </ListItem>
  );
}

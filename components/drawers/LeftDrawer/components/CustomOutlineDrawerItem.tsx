import React from "react";
import { useTranslation } from "react-i18next";

//  styles
import {
  CustomRouteType,
  colorTheme as cTheme,
} from "../../../../routes/navigation-routes/routes-types";
import { PaletteColorSchema } from "../../../../styles/colors";

import { ListItem } from "@rneui/themed";
import { Icon } from "@rneui/base";

type CustomOutlineDrawerItemProps = {
  router: CustomRouteType;
  isActive?: boolean;
  style?: any;
  onPress: () => void;
  colorTheme?: {
    color: PaletteColorSchema;
    activeColor: PaletteColorSchema;
  };
};

function CustomOutlineDrawerItem({
  router,
  isActive,
  style,
  onPress,
  colorTheme = cTheme,
}: CustomOutlineDrawerItemProps) {
  const { t } = useTranslation();

  let baseStyle = {
    marginHorizontal: isActive ? 10 : 0,
  };

  const activeStyle = {
    color: colorTheme.activeColor.main.value,
    borderWidth: 1,
    borderColor: colorTheme.activeColor.main.value,
    borderRadius: 10,
    overflow: "hidden",
  };

  if (isActive) {
    baseStyle = { ...baseStyle, ...activeStyle };
  }

  if (style) {
    baseStyle = { ...baseStyle, ...style };
  }

  return (
    <ListItem
      containerStyle={
        isActive
          ? {
              paddingLeft: 0,
            }
          : {}
      }
      style={baseStyle}
      onPress={onPress}
      bottomDivider
    >
      <Icon
        {...router.icon}
        color={
          isActive
            ? colorTheme.activeColor.main.value
            : colorTheme.color.main.value
        }
      />
      <ListItem.Content>
        <ListItem.Title
          style={{
            color: isActive
              ? colorTheme.activeColor.main.value
              : colorTheme.color.main.value,
          }}
        >
          {t(router.label)}
        </ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
}

export default CustomOutlineDrawerItem;

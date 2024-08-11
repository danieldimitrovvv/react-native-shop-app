import React from "react";
import { useTranslation } from "react-i18next";

import {
  CustomRouteType,
  colorTheme as cTheme,
} from "../../../../routes/navigation-routes/routes-types";
import { PaletteColorSchema } from "../../../../styles/colors";

import { ListItem } from "@rneui/themed";
import { Icon } from "@rneui/base";

type CustomDrawerItemProps = {
  router: CustomRouteType;
  isActive?: boolean;
  style?: any;
  onPress: () => void;
  colorTheme?: {
    color: PaletteColorSchema;
    activeColor: PaletteColorSchema;
  };
};

function CustomDrawerItem({
  router,
  isActive,
  style,
  onPress,
  colorTheme = cTheme,
}: CustomDrawerItemProps) {
  const { t } = useTranslation();

  let baseStyle = {
    marginHorizontal: isActive ? 10 : 0,
  };

  const activeStyle = {
    backgroundColor: colorTheme.activeColor.main.value,
    color: colorTheme.activeColor.main.contrastText,
    borderWidth: 1,
    borderColor: colorTheme.activeColor.dark.value,
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
      style={baseStyle}
      onPress={onPress}
      // bottomDivider={!isActive}
      containerStyle={
        isActive
          ? {
              backgroundColor: colorTheme.activeColor.main.value,
              paddingLeft: 0,
            }
          : {}
      }
    >
      <Icon
        {...router.icon}
        color={
          isActive
            ? colorTheme.activeColor.main.contrastText
            : colorTheme.color.main.value
        }
      />
      <ListItem.Content>
        <ListItem.Title
          style={{
            color: isActive
              ? colorTheme.activeColor.main.contrastText
              : colorTheme.color.main.value,
          }}
        >
          {t(router.label)}
        </ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
}

export default CustomDrawerItem;

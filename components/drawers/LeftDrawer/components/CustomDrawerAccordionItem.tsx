import React from "react";
import { useTranslation } from "react-i18next";

//  styles
import {
  CustomRouteType,
  colorTheme as cTheme,
} from "../../../../routes/navigation-routes/routes-types";
import { PaletteColorSchema } from "../../../../styles/colors";

// components
import { ListItem } from "@rneui/themed";
import { Icon } from "@rneui/base";
import CustomDrawerItem from "./CustomDrawerItem";
import { View } from "react-native";

type ColorTheme = {
  color: PaletteColorSchema;
  activeColor: PaletteColorSchema;
};

type CustomDrawerAccordionItemProps = {
  router: CustomRouteType;
  style?: any;
  isActive: (routerName: string) => boolean;
  onPress: (name: string) => void;
  children?: (
    props: Omit<CustomDrawerAccordionItemProps, "children">
  ) => JSX.Element;
  paddingLeft?: number;
  colorTheme?: ColorTheme;
  titleColorTheme?: ColorTheme;
};

function CustomDrawerAccordionItem({
  router,
  onPress,
  isActive,
  children,
  paddingLeft = 0,
  colorTheme = cTheme,
  titleColorTheme,
}: CustomDrawerAccordionItemProps) {
  if (!titleColorTheme) {
    titleColorTheme = colorTheme;
  }

  const { t } = useTranslation();

  const [open, setOpen] = React.useState<{ [key: string]: boolean }>({});

  if (!router.children || router.children?.length === 0) {
    if (children) {
      return children({
        router,
        onPress,
        isActive,
        paddingLeft,
        style: { paddingLeft },
        colorTheme: colorTheme,
      });
    }
    return (
      <CustomDrawerItem
        style={{ paddingLeft }}
        key={router.key}
        router={router}
        isActive={isActive(router.key)}
        onPress={() => onPress(router.key)}
        colorTheme={colorTheme}
      />
    );
  }

  return (
    <ListItem.Accordion
      key={router.key}
      content={
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            paddingLeft: paddingLeft,
          }}
        >
          <Icon
            {...router.icon}
            color={
              isActive(router.key)
                ? titleColorTheme.activeColor.main.value
                : titleColorTheme.color.main.value
            }
          />
          <ListItem.Content>
            <ListItem.Title
              style={{
                paddingLeft: 15,
                color: isActive(router.key)
                  ? titleColorTheme.activeColor.main.value
                  : titleColorTheme.color.main.value,
              }}
            >
              {t(router.label)}
            </ListItem.Title>
          </ListItem.Content>
        </View>
      }
      isExpanded={open[router.key]}
      onPress={() => {
        setOpen((prev) => ({ ...prev, [router.key]: !prev[router.key] }));
      }}
    >
      {router.children.map((subR) => (
        <CustomDrawerAccordionItem
          key={subR.key}
          router={subR}
          isActive={isActive}
          onPress={onPress}
          paddingLeft={paddingLeft + paddingLeft}
          style={{ paddingLeft }}
          children={children}
          colorTheme={colorTheme}
          titleColorTheme={titleColorTheme}
        />
      ))}
    </ListItem.Accordion>
  );
}

export default CustomDrawerAccordionItem;

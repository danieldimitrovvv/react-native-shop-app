import React from "react";

//  types
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { CustomRouteType } from "../../../../routes/navigation-routes/routes-types";

//  styles
import {
  greyColor,
  primaryColor,
  secondaryColor,
} from "../../../../styles/colors";

// components
import CustomDrawerAccordionItem from "./CustomDrawerAccordionItem";
import CustomOutlineDrawerItem from "./CustomOutlineDrawerItem";

type CustomDrawerItemListProps = DrawerContentComponentProps & {
  customRoutes: CustomRouteType[];
};

function CustomDrawerItemList({
  customRoutes,
  ...props
}: CustomDrawerItemListProps) {
  function changPage(name: string) {
    props.navigation.navigate(name);
  }

  return (
    <>
      {customRoutes.map((r) => {
        return (
          <CustomDrawerAccordionItem
            key={r.key}
            router={r}
            paddingLeft={10}
            isActive={(routerName) =>
              props.state.routeNames[props.state.index] === routerName
            }
            onPress={changPage}
            colorTheme={{ color: primaryColor, activeColor: secondaryColor }}
            titleColorTheme={{ color: greyColor, activeColor: secondaryColor }}
            // children={(props) => (
            //   <CustomOutlineDrawerItem
            //     {...props}
            //     isActive={props.isActive(props.router.key)}
            //     onPress={() => props.onPress(props.router.key)}
            //     colorTheme={{
            //       color: primaryColor,
            //       activeColor: secondaryColor,
            //     }}
            //   />
            // )}
          />
        );
      })}
    </>
  );
}

export default CustomDrawerItemList;

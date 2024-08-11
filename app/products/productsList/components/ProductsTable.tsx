import React from "react";

// models
import ProductModel from "../../../../models/db/ProductModel/ProductModel";

import { Image, ScrollView, StyleProp, TextStyle } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { Table, Row, TableWrapper, Cell } from "react-native-table-component";
import OptionMenu from "./OptionMenu";

// styles
import { tableStyles } from "../../../../styles/table";

// utilities
import UrlsUtility from "../../../../utilities/UrlsUtility";
import {
  black,
  errorColor,
  greyColor,
  primaryColor,
  successColor,
  white,
} from "../../../../styles/colors";
import { useTranslation } from "react-i18next";
import {
  cellsStyle,
  headTextStyleBase,
  productTableHeaderTitle,
  textStyle,
} from "./style/productTableStyle";

type Props = {
  products: ProductModel[];
};

export default function ProductsTable({ products }: Props) {
  const { t } = useTranslation();

  const [items, setItems] = React.useState<ProductModel[]>(products);

  function updateProducts(product: ProductModel | null) {
    if (product) {
      setItems((prevState) => {
        const updatedState = [...prevState];
        const index = prevState?.findIndex((i) => i.id === product.id);
        updatedState[index] = product;
        return [...updatedState];
      });
    }
  }

  function deleteProduct(product: ProductModel) {
    setItems((prevState) => [...prevState?.filter((i) => i.id !== product.id)]);
  }

  const optionMenu = (data: any) => (
    <OptionMenu
      product={data}
      updatedProduct={updateProducts}
      deleteProductCallback={deleteProduct}
    />
  );

  React.useEffect(() => {
    setItems(products);
  }, [products]);

  if (!items) {
    return <></>;
  }

  return (
    <ScrollView horizontal>
      <ScrollView style={tableStyles.container}>
        <Table borderStyle={{ borderColor: "transparent" }}>
          <Row
            data={
              items.length > 0
                ? productTableHeaderTitle.map((l) =>
                    l !== "" ? t(`MODELS.PRODUCT.${l.toUpperCase()}`) : ""
                  )
                : []
            }
            style={tableStyles.head}
            widthArr={Object.values(cellsStyle).map((s) => s?.width)}
            textStyle={{
              ...headTextStyleBase,
              textTransform: "uppercase",
              textAlign: "center",
            }}
          />
          {items.map((product, index) => (
            <TableWrapper
              key={index}
              style={{
                ...tableStyles.row,
                backgroundColor: index % 2 == 0 ? greyColor.light.value : white,
              }}
            >
              <Cell
                data={
                  product.images.length > 0 ? (
                    <Image
                      style={tableStyles.img}
                      resizeMode="contain"
                      source={{
                        uri:
                          UrlsUtility.getImageBaseURL() +
                          "/" +
                          product.getMainImg(),
                      }}
                    />
                  ) : (
                    <Avatar
                      size={40}
                      rounded
                      title={product.title.slice(0, 2)}
                      containerStyle={{
                        backgroundColor: primaryColor.main.value,
                        marginVertical: 5,
                      }}
                    />
                  )
                }
                width={cellsStyle.image.width}
              />
              <Cell
                data={product.title}
                width={cellsStyle.title.width}
                textStyle={textStyle.title}
              />
              <Cell
                data={product.brand}
                width={cellsStyle.brand.width}
                textStyle={textStyle.brand}
              />
              <Cell
                data={product.category}
                width={cellsStyle.category.width}
                textStyle={textStyle.category}
              />
              <Cell
                data={product.amount}
                width={cellsStyle.amount.width}
                textStyle={textStyle.amount}
              />
              <Cell
                data={product.price}
                width={cellsStyle.price.width}
                textStyle={textStyle.price}
              />
              <Cell
                data={
                  <Icon
                    name={product.isPublish ? "check" : "block"}
                    color={
                      product.isPublish
                        ? successColor.main.value
                        : errorColor.main.value
                    }
                    reverse
                    size={15}
                  />
                }
                width={cellsStyle.is_publish.width}
                textStyle={textStyle.is_publish}
                style={cellsStyle.is_publish ?? {}}
              />
              <Cell
                data={optionMenu(product)}
                width={cellsStyle.actions.width}
                textStyle={textStyle.actions}
                style={{ marginLeft: 10 }}
              />
            </TableWrapper>
          ))}
        </Table>
      </ScrollView>
    </ScrollView>
  );
}

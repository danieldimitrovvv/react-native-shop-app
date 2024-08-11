import React, { useState } from "react";

// components
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { containerStyles } from "../../styles/main";

type Props<T> = {
  onChangePage: (page: number) => void;
  totalPages: number;
  currentPage: number;
};
export default function Pagination<T>({
  onChangePage,
  totalPages,
  currentPage,
}: Props<T>) {
  function handelPageClick(page: number) {
    onChangePage(page);
  }

  const renderPaginationButtons = () => {
    const maxButtonsToShow = 5;
    let startPage = Math.max(0, currentPage - Math.floor(maxButtonsToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

    if (endPage - startPage + 1 < maxButtonsToShow) {
      startPage = Math.max(0, endPage - maxButtonsToShow + 1);
    }

    const buttons = [];

    for (let i = startPage; i < endPage; i++) {
      buttons.push(
        <TouchableOpacity
          key={i}
          onPress={() => handelPageClick(i)}
          style={[
            styles.paginationButton,
            i === currentPage ? styles.activeButton : null,
          ]}
        >
          <Text style={{ color: "white" }}>{i + 1}</Text>
        </TouchableOpacity>
      );
    }

    return buttons;
  };

  const buttons = renderPaginationButtons();

  return buttons.length <= 1 ? (
    <></>
  ) : (
    <View
      style={{
        height: 60,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {buttons}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    backgroundColor: "transparent",
  },
  paginationButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 4,
    backgroundColor: "gray",
  },
  activeButton: {
    backgroundColor: "#22c55d",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
  },
});

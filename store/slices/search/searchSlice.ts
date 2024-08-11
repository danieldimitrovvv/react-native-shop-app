import { useSelector } from "react-redux";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// interfaces
import IProductModel from "../../../models/db/ProductModel/IProductModel";

// utilities
import ProductPageableData from "../../../models/ui/PageableData/ProductPageableData/ProductPageableData";
import IProductPageableData from "../../../models/ui/PageableData/ProductPageableData/IProductPageableData";

export interface ShoppingCartState {
  searchProducts: IProductModel[];
  searchProductsRows: number;
}

const initialState: ShoppingCartState = {
  searchProducts: [],
  searchProductsRows: 0,
};

const findProduct = (state: ShoppingCartState, productId: number) => {
  const productsIds = state.searchProducts.map((i) => i.id);
  const newProductId = productId;

  if (productsIds.includes(newProductId)) {
    const updateElemIndex = productsIds.findIndex((i) => i === newProductId);
    const updatedElem = { ...state.searchProducts[updateElemIndex] };
    return { shoppingCartItem: updatedElem, index: updateElemIndex };
  }

  return { shoppingCartItem: null, index: -1 };
};

export const searchSlice = createSlice({
  name: "search-data",
  initialState,
  reducers: {
    setSearchProducts: (state, action: PayloadAction<IProductPageableData>) => {
      const { rows: products, countRows } = action.payload;
      state.searchProducts = products;
      state.searchProductsRows = countRows;
    },

    clearSearchProducts: (state) => {
      state.searchProducts = [];
      state.searchProductsRows = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSearchProducts, clearSearchProducts } = searchSlice.actions;

export const useSearchState = () =>
  useSelector((state: RootState) => state.searchData);

export default searchSlice.reducer;

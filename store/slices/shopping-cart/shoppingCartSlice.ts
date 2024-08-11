import { useSelector } from "react-redux";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// interfaces
import IProductModel from "../../../models/db/ProductModel/IProductModel";

// utilities
import LocalStorageUtility from "../../../utilities/LocalStorageUtility";
import ISettingsStoreModel from "../settings/SettingsStoreModel/ISettingsStoreModel";

enum STORAGE_KEYS {
  ITEMS = "shoppingCartItems",
  INQUIRY_ITEM = "shoppingCartInquiryItem",
  IS_OPEN_MODAL = "openShoppingCartModal",
}

export interface IShoppingCartItem {
  product: IProductModel;
  amount: number;
}

export interface ShoppingCartState {
  items: IShoppingCartItem[];
  inquiryItem: IProductModel | null;
  isOpenModal: boolean;
}

type AddProductPayloadType = {
  product: IProductModel;
  settings: ISettingsStoreModel;
};

const initItems = (LocalStorageUtility.getArray(STORAGE_KEYS.ITEMS) ??
  []) as IShoppingCartItem[];

const initISOpenModal = LocalStorageUtility.getBoolean("openShoppingCartModal");

const initialState: ShoppingCartState = {
  items: initItems,
  inquiryItem: null,
  isOpenModal: initISOpenModal,
};

const findProduct = (state: ShoppingCartState, productId: number) => {
  const productsIds = state.items.map((i) => i.product.id);
  const newProductId = productId;

  if (productsIds.includes(newProductId)) {
    const updateElemIndex = productsIds.findIndex((i) => i === newProductId);
    const updatedElem = { ...state.items[updateElemIndex] };
    return { shoppingCartItem: updatedElem, index: updateElemIndex };
  }

  return { shoppingCartItem: null, index: -1 };
};

export const shoppingCartSlice = createSlice({
  name: "shopping-cart",
  initialState,
  reducers: {
    addShoppingCartItem: (
      state,
      action: PayloadAction<AddProductPayloadType>
    ) => {
      const { product, settings } = action.payload;
      const { shoppingCartItem, index } = findProduct(state, product.id);

      if (shoppingCartItem) {
        if (settings.withProductAmount) {
          if (shoppingCartItem.product.amount >= shoppingCartItem.amount + 1) {
            shoppingCartItem.amount++;
          }
        } else {
          shoppingCartItem.amount = 1;
        }

        state.items[index] = shoppingCartItem;
      } else if (product.amount > 0) {
        state.items.push({
          product: product,
          amount: 1,
        } as IShoppingCartItem);
      }

      LocalStorageUtility.setArray(STORAGE_KEYS.ITEMS, state.items);
    },

    incrementShoppingCartItemAmount: (
      state,
      action: PayloadAction<{ productId: number; addAmount: number }>
    ) => {
      const { shoppingCartItem, index } = findProduct(
        state,
        action.payload.productId
      );

      if (shoppingCartItem) {
        if (
          shoppingCartItem.product.amount >
          shoppingCartItem.amount + action.payload.addAmount
        ) {
          shoppingCartItem.amount += action.payload.addAmount;
        } else {
          shoppingCartItem.amount = shoppingCartItem.product.amount;
        }
        state.items[index] = shoppingCartItem;
        LocalStorageUtility.setArray(STORAGE_KEYS.ITEMS, state.items);
      }
    },

    decrementShoppingCartItemAmount: (
      state,
      action: PayloadAction<{ productId: number; removeAmount: number }>
    ) => {
      const { shoppingCartItem, index } = findProduct(
        state,
        action.payload.productId
      );

      if (shoppingCartItem) {
        shoppingCartItem.amount -= action.payload.removeAmount;

        if (shoppingCartItem.amount < 0) {
          shoppingCartItem.amount = 0;
        }

        if (shoppingCartItem.amount > 0) {
          state.items[index] = shoppingCartItem;
        } else {
          // remove item
          state.items.splice(index, 1);
        }
      }
    },

    deleteShoppingCartItem: (state, action: PayloadAction<number>) => {
      const { shoppingCartItem, index } = findProduct(state, action.payload);

      if (shoppingCartItem) {
        state.items.splice(index, 1);
        LocalStorageUtility.setArray(STORAGE_KEYS.ITEMS, state.items);
      }
    },

    setShoppingCartInquiryItem: (
      state,
      action: PayloadAction<IProductModel>
    ) => {
      state.inquiryItem = action.payload;
    },

    clearShoppingCartInquiryItem: (state) => {
      state.inquiryItem = null;
    },

    openShoppingCartModal: (state) => {
      state.isOpenModal = true;

      LocalStorageUtility.setBoolean(
        STORAGE_KEYS.IS_OPEN_MODAL,
        state.isOpenModal
      );
    },

    closedShoppingCartModal: (state) => {
      state.isOpenModal = false;
      LocalStorageUtility.setBoolean(STORAGE_KEYS.IS_OPEN_MODAL, false);
    },

    clearShoppingCartState: (state) => {
      state.items = [];
      LocalStorageUtility.setArray(STORAGE_KEYS.ITEMS, state.items);

      state.isOpenModal = false;
      LocalStorageUtility.setBoolean(STORAGE_KEYS.IS_OPEN_MODAL, false);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addShoppingCartItem,
  deleteShoppingCartItem,
  incrementShoppingCartItemAmount,
  decrementShoppingCartItemAmount,
  openShoppingCartModal,
  setShoppingCartInquiryItem,
  clearShoppingCartInquiryItem,
  closedShoppingCartModal,
  clearShoppingCartState,
} = shoppingCartSlice.actions;

export const useShoppingCartState = () =>
  useSelector((state: RootState) => state.shoppingCart);

export default shoppingCartSlice.reducer;

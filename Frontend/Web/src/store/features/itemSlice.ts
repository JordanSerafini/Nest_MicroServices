import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Item } from "../../types/item";

interface ItemState {
  items: Item[];
}

const initialState: ItemState = {
  items: [],
};

export const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
    },
    add: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
    remove: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.Id !== action.payload);
    },
    update: (state, action: PayloadAction<Item>) => {
      const index = state.items.findIndex(item => item.Id === action.payload.Id);
      if (index !== -1) { 
        state.items[index] = action.payload;
      }
    },
  },
});

export const { setItems, add, remove, update } = itemSlice.actions;


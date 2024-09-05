import { configureStore } from "@reduxjs/toolkit";
import { itemSlice } from "./features/itemSlice";
import { customerSlice } from "./features/customerSlice";
import { supplierSlice } from "./features/supplierSlice";

export const store = configureStore({
    reducer: {
        items: itemSlice.reducer,
        customers: customerSlice.reducer,
        supplier: supplierSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
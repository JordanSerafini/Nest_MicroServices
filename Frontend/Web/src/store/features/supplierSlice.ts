import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Supplier from "../../types/supplier";

interface State {
    suppliers: Supplier[];
    totalSuppliers: number;
    totalPages: number;
}

const initialState: State = {
    suppliers: [],
    totalSuppliers: 0,
    totalPages: 0,
};

export const supplierSlice = createSlice({
    name: "supplier",
    initialState,
    reducers: {
        setSupplier: (state, action: PayloadAction<{  suppliers: Supplier[], totalSuppliers: number, totalPages: number }>) => {
            state.suppliers = action.payload.suppliers;
            state.totalSuppliers = action.payload.totalSuppliers;
            state.totalPages = action.payload.totalPages;
        },
        addSupplier: (state, action: PayloadAction<Supplier>) => {
            state.suppliers.push(action.payload);
        },
        removeSupplier: (state, action: PayloadAction<string>) => {
            state.suppliers = state.suppliers.filter(Suppliers => Suppliers.Id !== action.payload);
        },
        updateSupplierr: (state, action: PayloadAction<Supplier>) => {
            const index = state.suppliers.findIndex(supplier => supplier.Id === action.payload.Id);
            if (index !== -1) {
                state.suppliers[index] = action.payload;
            }
        },
    },
});

export const { setSupplier, addSupplier, removeSupplier, updateSupplierr } = supplierSlice.actions;
export default supplierSlice.reducer;

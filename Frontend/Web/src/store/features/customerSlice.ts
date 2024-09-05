import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Customer } from "../../types/customer";

interface CustomerState {
    customers: Customer[];
    totalCustomers: number;
    totalPages: number;
}

const initialState: CustomerState = {
    customers: [],
    totalCustomers: 0,
    totalPages: 0,
};

export const customerSlice = createSlice({
    name: "customers",
    initialState,
    reducers: {
        setCustomers: (state, action: PayloadAction<{ customers: Customer[], totalCustomers: number, totalPages: number }>) => {
            state.customers = action.payload.customers;
            state.totalCustomers = action.payload.totalCustomers;
            state.totalPages = action.payload.totalPages;
        },
        addCustomer: (state, action: PayloadAction<Customer>) => {
            state.customers.push(action.payload);
        },
        removeCustomer: (state, action: PayloadAction<string>) => {
            state.customers = state.customers.filter(customer => customer.Id !== action.payload);
        },
        updateCustomer: (state, action: PayloadAction<Customer>) => {
            const index = state.customers.findIndex(customer => customer.Id === action.payload.Id);
            if (index !== -1) {
                state.customers[index] = action.payload;
            }
        },
    },
});

export const { setCustomers, addCustomer, removeCustomer, updateCustomer } = customerSlice.actions;
export default customerSlice.reducer;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Homecards from "../../types/homecard";



interface HomecardsState {
    Homecards: Homecards[];
}

const initialState: HomecardsState = {
    Homecards: [],
};


export const homecardSlice = createSlice({
    name: "homecards",
    initialState,
    reducers: {
        setHomecards: (state, action: PayloadAction<Homecards[]>) => {
            state.Homecards = action.payload;
        },
        addHomecard: (state, action: PayloadAction<Homecards>) => {
            state.Homecards.push(action.payload);
        },
        removeHomecard: (state, action: PayloadAction<string>) => {
            state.Homecards = state.Homecards.filter(homecard => homecard.id !== action.payload);
        },
        updateHomecard: (state, action: PayloadAction<Homecards>) => {
            const index = state.Homecards.findIndex(homecard => homecard.id === action.payload.id);
            if (index !== -1) {
                state.Homecards[index] = action.payload;
            }
        },
    },
});

export const { setHomecards, addHomecard, removeHomecard, updateHomecard } = homecardSlice.actions;
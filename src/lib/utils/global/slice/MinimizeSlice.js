import { createSlice } from '@reduxjs/toolkit';
import {minimizeHandler} from "@/lib/utils/global/handler/MinimizeHandler.js";

const initialState = {
    isMinimizeGlobal: minimizeHandler.get(),
};

const minimizeSlice = createSlice({
    name: 'minimize',
    initialState,
    reducers: {
        setMinimizeGlobal: (state, action) => {
            state.isMinimizeGlobal = action.payload;
            minimizeHandler.set(action.payload);
        },
    },
});

export const { setMinimizeGlobal } = minimizeSlice.actions;
export default minimizeSlice.reducer;

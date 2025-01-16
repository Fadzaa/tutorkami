import { createSlice } from '@reduxjs/toolkit';
import {loadingHandler} from "@/utils/global/handler/LoadingHandler.js";

const initialState = {
    isLoadingGlobal: loadingHandler.get(),
};


const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoadingGlobal: (state, action) => {
            state.isLoadingGlobal = action.payload;
            loadingHandler.set(action.payload);
        },
    },
});

export const { setLoadingGlobal } = loadingSlice.actions;
export default loadingSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import {progressHandler} from "@/lib/utils/global/handler/ProgressHandler.js";

const initialState = {
    progressGlobal: progressHandler.get(),
};

const progressSlice = createSlice({
    name: 'progress',
    initialState,
    reducers: {
        setProgressGlobal: (state, action) => {
            state.progressGlobal = action.payload;
            progressHandler.set(action.payload);
        },
    },
});

export const { setProgressGlobal } = progressSlice.actions;
export default progressSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from '@/utils/global/slice/LoadingSlice.js';
import minimizeReducer from '@/utils/global/slice/MinimizeSlice.js';
import progressReducer from '@/utils/global/slice/ProgressSlice.js';

const store = configureStore({
    reducer: {
        loading: loadingReducer,
        minimize: minimizeReducer,
        progress: progressReducer,
    },
});

export default store;

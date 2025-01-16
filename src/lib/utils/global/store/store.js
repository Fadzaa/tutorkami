import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from '@/lib/utils/global/slice/LoadingSlice.js';
import minimizeReducer from '@/lib/utils/global/slice/MinimizeSlice.js';
import progressReducer from '@/lib/utils/global/slice/ProgressSlice.js';

const store = configureStore({
    reducer: {
        loading: loadingReducer,
        minimize: minimizeReducer,
        progress: progressReducer,
    },
});

export default store;

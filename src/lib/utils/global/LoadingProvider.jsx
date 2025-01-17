import React, { createContext, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { setLoadingGlobal } from '@/lib/utils/global/slice/LoadingSlice.js';
import { api } from '@/api/api.js';
import {useQueryClient} from "@tanstack/react-query";
import {setProgressGlobal} from "@/lib/utils/global/slice/ProgressSlice.js";

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
    const dispatch = useDispatch();

    const queryClient = useQueryClient();

    const fetchLMS = async (url, body, navigateUrl) => {
        dispatch(setLoadingGlobal(true));
        dispatch(setProgressGlobal(0));
        try {
            const response = await api.post(url, body);
            queryClient.setQueryData([url, body], response.data);
            dispatch(setLoadingGlobal(false));
            dispatch(setProgressGlobal(0));
            navigateUrl();
        } catch (error) {
            dispatch(setLoadingGlobal(false));
            dispatch(setProgressGlobal(0));
            throw error;
        }
    };

    return (
        <LoadingContext.Provider value={{ fetchLMS }}>
            {children}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    return useContext(LoadingContext);
}

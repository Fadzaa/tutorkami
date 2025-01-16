import React, { createContext, useContext } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { setLoadingGlobal } from '@/utils/global/slice/LoadingSlice.js';
import { setProgressGlobal } from "@/utils/global/slice/ProgressSlice.js";
import { api } from '@/api/api.js';

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
    const dispatch = useDispatch();

    const fetchLMS = (url, body) => {
        return useQuery([url, body], async () => {
            dispatch(setLoadingGlobal(true));
            const response = await api.post(url, body);
            return response.data;
        }, {
            onSuccess: () => {
                dispatch(setLoadingGlobal(false));
                dispatch(setProgressGlobal(0));
            },
            onError: () => {
                dispatch(setLoadingGlobal(false));
                dispatch(setProgressGlobal(0));
            },
            refetchOnWindowFocus: false,
        });
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

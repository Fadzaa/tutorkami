import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { setLoadingGlobal } from '@/utils/global/slice/LoadingSlice.js';
import { setProgressGlobal } from "@/utils/global/slice/ProgressSlice.js";
import { api } from '@/api/api.js';

export function useFetchLMS(url, body) {
    const dispatch = useDispatch();

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
    });
}

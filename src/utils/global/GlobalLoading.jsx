import React from 'react';
import {LoadingGeneratingContentMinimize} from "@/components/loading/LoadingGeneratingContentMinimize.jsx";
import {useSelector} from "react-redux";

export const GlobalLoading = () => {
    const loading = useSelector((state) => state.loading);

    return (
        loading.isLoadingGlobal && (
            <LoadingGeneratingContentMinimize isPending={loading.isLoadingGlobal} type="lms" />
        )
    );
};

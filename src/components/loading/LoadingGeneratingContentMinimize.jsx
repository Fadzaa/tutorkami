import bookLoadingAnimation from '/public/book_loading_lottie.json'
import bookLoadingAnimationMinimize from '/public/book_loading_lottie_minimize.json'
import close from '/public/close_icon.svg'
import {Progress} from "@/components/ui/progress.jsx";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import ProgressCircle from "@/components/ui/progress-circle.jsx";
import Lottie from "lottie-react";
import {useDispatch, useSelector} from "react-redux";
import {setMinimizeGlobal} from "@/utils/global/slice/MinimizeSlice.js";
import {setProgressGlobal} from "@/utils/global/slice/ProgressSlice.js";

export function LoadingGeneratingContentMinimize({isPending, type}) {
    const dispatch = useDispatch();
    const minimize = useSelector((state) => state.minimize);
    const progress = useSelector((state) => state.progress);
    const { t } = useTranslation();

    const totalTime = 60000;
    const updateInterval = 1000;

    useEffect(() => {
        if (isPending) {
            let interval;

            interval = setInterval(() => {
                const newProgressGlobal = progress.progressGlobal < 90 && isPending
                    ? Math.min(progress.progressGlobal + (updateInterval / totalTime) * 100, 90)
                    : progress.progressGlobal;

                dispatch(setProgressGlobal(newProgressGlobal));

            }, updateInterval);

            if(!isPending) {
                clearInterval(interval);
                dispatch(setProgressGlobal(100));
            }

            return () => clearInterval(interval);
        }
    }, [progress.progressGlobal]);



    const aiTypeContent = {
        "study": {
            title: t('load_head_material'),
            description: t('load_desc_material')
        },
        "question": {
            title: t('load_head_question'),
            description: t('load_desc_question')
        },
        "roadmap": {
            title: t('load_head_roadmap'),
            description: t('load_desc_roadmap')
        },
        "lms": {
            title: t('load_head_lms'),
            description: t('load_desc_lms')
        }
    };

    const {title, description} = aiTypeContent[type]


    return (
        !minimize.isMinimizeGlobal ?
        <div className="h-full w-full fixed top-0 left-0 bg-black bg-opacity-15 z-20 flex items-center justify-center">
            <div
                className="relative bg-white w-3/4 lg:w-3/6 flex flex-col items-center p-6 lg:px-20 lg:py-10 rounded-xl gap-3 lg:gap-5">
                <img
                    src={close} alt=""
                     className={`absolute right-6 top-6 cursor-pointer`}
                    onClick={() => {
                        dispatch(setMinimizeGlobal(!minimize.isMinimizeGlobal));
                    }}
                />
                <Lottie
                    className={`h-28 lg:h-40`}
                    autoplay={true}
                    loop={true}
                    animationData={bookLoadingAnimation}
                />

                <h1 className="font-semibold text-sm  lg:text-lg ">{title}</h1>
                <p className="font-light text-[#9A9A9A] text-xs lg:text-sm text-center">{description}</p>

                <div className="w-full flex flex-col items-center gap-3">
                    <Progress value={progress.progressGlobal} className="h-2"/>
                    <p className="font-medium text-sm">{Math.round(progress.progressGlobal)}%</p>
                </div>
            </div>
        </div>
            :
            <div
                onClick={() => {
                    dispatch(setMinimizeGlobal(!minimize.isMinimizeGlobal));
                }}
                className={`fixed hover:bg-gray-100 z-50 lg:right-0 bottom-0 pr-5 mr-5 bg-white border-1 border-gray-100 border shadow-md flex items-center rounded-t-xl pl-3`}
            >
                <Lottie
                    className={`h-12 lg:h-16`}
                    autoplay={true}
                    loop={true}
                    animationData={bookLoadingAnimationMinimize}
                />
                <h1 className="font-semibold text-sm lg:text-lg mr-2 lg:mr-4 cursor-default">{title}</h1>
                <ProgressCircle width={"w-6 lg:w-8"} height={"h-6 lg:h-8"} progress={progress.progressGlobal} textProgress={Math.round(progress.progressGlobal)} text={"text-[5px] lg:text-[8px]"}/>
            </div>
    )

}
import Lottie, { useLottie } from "lottie-react";
import bookLoadingAnimation from '/public/book_loading_lottie.json'
import {Progress} from "@/components/ui/progress.jsx";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

export function LoadingGeneratingContent({isPending, type}) {
    const { t } = useTranslation();
    const options = {
        animationData: bookLoadingAnimation,
        className: "h-28  lg:h-40",
        loop: true
    };

    const { View } = useLottie(options);

    const totalTime = 8000;
    const updateInterval = 1000;
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let interval;

        interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress < 90 && isPending) {
                    return Math.min(prevProgress + (updateInterval / totalTime) * 100, 90);
                }
                return prevProgress;
            });
        }, updateInterval);

        if(!isPending) {
            clearInterval(interval);
            setProgress(100);
        }

        return () => clearInterval(interval);
    }, []);


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
        <div className="h-full w-full fixed top-0 left-0 bg-black bg-opacity-15 z-20 flex items-center justify-center">
            <div className="bg-white w-3/4 lg:w-3/6 flex flex-col items-center p-6 lg:px-20 lg:py-10 rounded-xl gap-3 lg:gap-5">
                <>{View}</>

                <h1 className="font-semibold text-sm  lg:text-lg ">{title}</h1>
                <p className="font-light text-[#9A9A9A] text-xs lg:text-sm text-center">{description}</p>

                <div className="w-full flex flex-col items-center gap-3">
                    <Progress value={progress} className="h-2"/>
                    <p className="font-medium text-sm">{progress}%</p>
                </div>
            </div>
        </div>
    )

}
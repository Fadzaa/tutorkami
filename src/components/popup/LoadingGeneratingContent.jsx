import Lottie, { useLottie } from "lottie-react";
import bookLoadingAnimation from '/public/book_loading_lottie.json'
import {Progress} from "@/components/ui/progress.jsx";
import {useEffect, useState} from "react";

export function LoadingGeneratingContent({isPending}) {
    const options = {
        animationData: bookLoadingAnimation,
        className: "h-40",
        loop: true
    };

    const { View } = useLottie(options);

    const totalTime = 8000;
    const updateInterval = 1000;
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let interval;

        // Start the progress interval
        interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress < 90 && isPending) {
                    return Math.min(prevProgress + (updateInterval / totalTime) * 100, 90);
                }
                return prevProgress;
            });
        }, updateInterval);

        // Handle API resolution
        if(!isPending) {
            clearInterval(interval);
            setProgress(100); // Complete progress bar smoothly
            console.log("Loading complete!");
        }

        // Cleanup on component unmount
        return () => clearInterval(interval);
    }, []);



    return (
        <div className="h-full w-full fixed top-0 left-0 bg-black bg-opacity-15 z-20 flex items-center justify-center">
            <div className="bg-white w-3/6 flex flex-col items-center px-20 py-10 rounded-xl gap-5">
                <>{View}</>

                <h1 className="font-semibold text-lg ">Crafting Your Study Materials...</h1>
                <p className="font-light text-[#9A9A9A] text-sm">Hang tight! We’re creating personalized study content just for you.</p>

                <div className="w-full flex flex-col items-center gap-3">
                    <Progress value={progress} className="h-2"/>
                    <p className="font-medium text-sm">{progress}%</p>
                </div>
            </div>
        </div>
    )

}
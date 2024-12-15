import { useLottie } from "lottie-react";
import bookLoadingAnimation from '/public/book_loading_lottie.json'

export function PopupAIGeneration() {
    const options = {
        animationData: bookLoadingAnimation,
        loop: true
    };

    const { View } = useLottie(options);

}
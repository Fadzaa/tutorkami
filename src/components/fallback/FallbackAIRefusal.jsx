import {useLottie} from "lottie-react";
import {useEffect, useState} from "react";
import {Progress} from "@/components/ui/progress.jsx";
import {Button} from "@/components/ui/button.jsx";


export function FallbackAIRefusal() {
    return (
        <div className="h-full w-full fixed top-0 left-0 bg-black bg-opacity-15 z-20 flex items-center justify-center">
            <div className="bg-white w-2/6 flex flex-col items-center px-20 py-10 rounded-xl gap-5">
                <img src="/ic_empty.svg" alt="Icon Empty"/>

                <h1 className="font-semibold text-lg ">Hmm, That’s Out of Scope!</h1>
                <p className="font-light text-[#9A9A9A] text-sm text-center">Looks like the topic you entered doesn’t match what we can do. Try something else!</p>

                <Button className="w-full">Try Again</Button>
            </div>
        </div>
    )
}
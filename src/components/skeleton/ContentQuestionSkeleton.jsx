import {cn} from "@/lib/utils.js";
import {Loading} from "@/components/loading/Loading.jsx";
import {ContentDistance} from "@/components/ui/content-distance.jsx";
import {HeaderContent} from "@/components/ui/header-content.jsx";
import {FooterContent} from "@/components/ui/footer-content.jsx";
import {Progress} from "@/components/ui/progress.jsx";
import {Button} from "@/components/ui/button.jsx";
import {LabelTitleContent} from "@/components/ui/label-title-content.jsx";
import {format} from "date-fns";
import {Skeleton} from "@/components/ui/skeleton.jsx";
import {Input} from "@/components/ui/input.jsx";
import {HeaderContentSkeleton} from "@/components/skeleton/HeaderContentSkeleton.jsx";

export function ContentQuestionSkeleton() {
    const question = [
        {
            1: "What is the capital of Indonesia?",
        },
        {
            1: "What is the capital of Indonesia?",
        },
        {
            1: "What is the capital of Indonesia?",
        },
        {
            1: "What is the capital of Indonesia?",
        }
    ]

    const choices = [
        "Jakarta",
        "Bandung",
        "Surabaya",
        "Bali"
    ]

    let arr = ["A. ", "B. ", "C. ", "D. "];

    return (
        <div className="flex flex-col h-full relative flex-1">

            <div className={"flex-1 pb-5 cs overflow-y-auto"}>
                <ContentDistance>
                    <HeaderContentSkeleton/>
                    {question.map((_, i) => (
                        <div>
                            <Skeleton className="w-2/4 mb-3">
                                <h1 className="text-transparent">Question {i + 1} ({"itemParent.type"} • Single Answer)</h1>
                                <p className="text-transparent">{"itemParent.title"}</p>
                            </Skeleton>

                            <div className={'my-5 flex flex-col lg:grid lg:grid-rows-2 w-full lg:w-1/2 lg:grid-flow-col gap-8'}>
                                {
                                    choices.toString().split(',').map((item, i) => (
                                        <Skeleton>
                                            <div key={item}
                                                    className={'flex justify-start  rounded-xl w-full lg:w-96  bg-transparent'}>
                                                <p className={"text-transparent"}> {arr[i] + item}</p>
                                            </div>
                                        </Skeleton>

                                        ))

                                }
                            </div>

                        </div>
                    ))}

                </ContentDistance>
            </div>
        </div>
    )
}
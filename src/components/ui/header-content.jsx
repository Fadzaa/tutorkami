import {format} from "date-fns";
import {LabelTitleContent} from "@/components/ui/label-title-content.jsx";
import {SheetContentMobile} from "@/components/content/SheetContentMobile.jsx";
import ProgressCircle from "@/components/ui/progress-circle.jsx";

export function HeaderContent({title,date,solved,desc,type,progress, progressText,text}) {


    return (
        <div className="flex flex-col lg:flex-row w-full justify-between items-start lg:items-center">
            <div className="absolute left-0 top-8 lg:hidden">
                <SheetContentMobile type={"roadmap"}/>
            </div>
            <div>
                <LabelTitleContent>
                    <h1 className="text-xl">{title}</h1>
                </LabelTitleContent>
                <p>{desc}</p>
            </div>

            <div>

                {
                    type === "question" && solved === true ?

                        <h1 className="text-xs lg:text-lg mb-3 font-bold">{solved === true ? "Solved" : "Unsolved"}</h1>
                        : type === "Roadmap" ?
                        <ProgressCircle width={"w-14"} height={"h-14"} progress={progress *100} text={text} textProgress={progressText}/>
                         : <h1 className="text-xs lg:text-lg mb-3">{format(date, "dd MMMM Y")}</h1>
                }

            </div>
        </div>

    )
}
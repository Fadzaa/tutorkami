import {format} from "date-fns";
import {LabelTitleContent} from "@/components/ui/label-title-content.jsx";
import {SheetContentMobile} from "@/components/content/SheetContentMobile.jsx";

export function HeaderContent({title,date,type,knowledge_level,goal_level,is_question,solved}) {


    return (
        <div className="flex flex-col lg:flex-row w-full justify-between items-start lg:items-center">
            <div className="absolute left-0 top-8 lg:hidden">
                <SheetContentMobile type={"roadmap"}/>
            </div>
            <div>
                <LabelTitleContent>
                    <h1 className="text-xl">{title}</h1>
                </LabelTitleContent>
                <p>{`${type} • ${knowledge_level} • ${goal_level}`}</p>
            </div>
            <div>

                {
                    is_question === true ?

                        <h1 className="text-xs lg:text-lg mb-3 font-bold">{solved === true ? "Solved" : "Unsolved"}</h1>
                        :

                        <h1 className="text-xs lg:text-lg mb-3">{format(date, "dd MMMM Y")}</h1>
                }

            </div>
        </div>

    )
}
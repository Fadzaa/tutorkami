import {format} from "date-fns";
import {LabelTitleContent} from "@/components/ui/label-title-content.jsx";

export function HeaderContent({title,date,type,knowledge_level,goal_level,is_question,solved}) {


    return (
        <div className="flex w-full justify-between items-center">
            <div>
                <LabelTitleContent>
                    {title}
                </LabelTitleContent>
                <p>{`${type} • ${knowledge_level} • ${goal_level}`}</p>
            </div>
            <div>

                {
                    is_question === true ?

                        <h1 className="text-lg mb-3 font-bold">{solved === true ?"Solved":"Unsolved"}</h1>
                        :

                        <h1 className="text-lg mb-3">{format(date, "Y-MM-dd")}</h1>
                }

            </div>
        </div>

    )
}
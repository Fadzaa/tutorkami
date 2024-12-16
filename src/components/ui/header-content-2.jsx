import {format} from "date-fns";
import {LabelTitleContent} from "@/components/ui/label-title-content.jsx";

export function HeaderContent2({title,date,type,knowledge_level,goal_level,is_question,solved,main_content}) {


    return (
        <div className="flex w-full justify-between items-center">
            <div>
                <LabelTitleContent>
                    {title}
                </LabelTitleContent>
                <p>{`${type} • ${knowledge_level} • ${goal_level}`}</p>
                <LabelTitleContent>
                    {main_content}
                </LabelTitleContent>
            </div>
            <div>

                {
                    solved === true ?

                        <h1 className="text-lg mb-3 font-bold">{"Solved"}</h1>
                        :

                        <h1 className="text-lg mb-3">{format(date, "Y-MM-dd")}</h1>
                }

            </div>
        </div>

    )
}
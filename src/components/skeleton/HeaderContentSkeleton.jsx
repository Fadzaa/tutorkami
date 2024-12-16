import {format} from "date-fns";
import {LabelTitleContent} from "@/components/ui/label-title-content.jsx";
import {Skeleton} from "@/components/ui/skeleton.jsx";

export function HeaderContentSkeleton() {


    return (
        <div className="flex w-full justify-between items-center text-transparent">
            <div className="flex flex-col gap-2">
                <Skeleton>
                    title
                </Skeleton>
                <Skeleton>{`type • knowledge_level • goal_level`}</Skeleton>
            </div>
            <div >
                <Skeleton className="text-lg mb-3 font-bold">Unsolved</Skeleton>
            </div>
        </div>

    )
}
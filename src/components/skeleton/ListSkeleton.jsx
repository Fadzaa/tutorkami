import {cn} from "@/lib/utils.js";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {SlOptionsVertical} from "react-icons/sl";
import {Button} from "@/components/ui/button.jsx";
import {Skeleton} from "@/components/ui/skeleton.jsx";
import {ListQuestionCard} from "@/components/card/ListQuestionCard.jsx";
import {format} from "date-fns";

export function ListSkeleton() {

    return (
        <>
            {
                Array(3).fill(null).map((item, index) => (
                    <div
                        className={"flex w-full p-4 ps-0 gap-4 rounded-lg"}
                    >
                        <Skeleton className="h-auto w-2"></Skeleton>
                        <div className="w-full flex flex-col gap-3">

                            <Skeleton className="text-transparent w-full">total_questions type • proficiency •
                                category</Skeleton>

                            <Skeleton className="text-transparent w-10/12">IELTS Reading Comprehension</Skeleton>
                            <Skeleton className={"flex justify-between w-11/12"}>
                                <p className="text-transparent">Solved</p>
                                <p className="text-transparent">date</p>
                            </Skeleton>
                        </div>
                    </div>
                ))
            }
        </>
    )
}




import {Skeleton} from "@/components/ui/skeleton.jsx";

export function StorageSkeleton() {
    return (
        <>
            <div className="lg:grid gap-3 p-4 lg:grid-cols-4">
                {Array(16).fill(null).map((item) => (
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
                ))}
            </div>

        </>
    )
}


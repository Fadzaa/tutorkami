import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import {BsLayoutTextSidebarReverse} from "react-icons/bs";
import {ListSkeleton} from "@/components/skeleton/ListSkeleton.jsx";
import {ListQuestionCard} from "@/components/card/ListQuestionCard.jsx";
import {format} from "date-fns";
import {FallbackEmptyContent} from "@/components/fallback/FallbackEmptyContent.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {materialAPI} from "@/api/material.js";
import {questionAPI} from "@/api/question.js";
import {roadmapAPI} from "@/api/roadmap.js";

export function SheetContentMobile({type}) {

    const typeContent = {
        "study": {
            listName: "List Material",
            route: "/tools/generative-material/create",
            api: materialAPI.getMaterial(),
            key: "getMaterial",
            fallbackType: "study",
            buttonName: "Add New Material"
        },
        "question": {
            listName: "List Question",
            route: "/tools/generative-question/create",
            api: questionAPI.getQuestion(),
            key: "getQuestion",
            fallbackType: "question",
            buttonName: "Add New Question"
        },
        "roadmap": {
            listName: "List Roadmap",
            route: "/tools/generative-roadmap/create",
            api: roadmapAPI.getRoadmap(),
            key: "getRoadmap",
            fallbackType: "roadmap",
            buttonName: "Add New Roadmap"
        },
        "lms": {
            listName: "List LMS",
            route: "/tools/generative-material/create",
            fallbackType: "roadmap",
            buttonName: "Add New LMS"
        }
    }

    const {listName, api, key, route, fallbackType, buttonName} = typeContent[type]

    const navigate = useNavigate()


    const {isLoading, data} = useQuery({
        queryKey: [key],
        queryFn: async () => {
            return await api
        },

    })


    const handleToCreate = () => {
        navigate(route)
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <BsLayoutTextSidebarReverse />
            </SheetTrigger>
            <SheetContent className={"font-Urbanist w-10/12"} side="left">
                <div className={'flex items-end justify-between mr-4'}>

                    <h1 className="font-medium text-xl">{listName}</h1>



                </div>
                <div className="h-[88%]  my-5">
                    {
                        isLoading ? <ListSkeleton/> : data.data.data.map((item, index) => (
                            <ListQuestionCard
                                title={item.title}
                                key={item}
                                id={item.id}
                                date={format(item.date, "Y-M-dd")}
                                isQuestion={item.is_question}
                                category={item.knowledge_level}
                                proficiency={item.goal_level}
                                type={item.type}


                            />
                        ))
                    }

                    {
                        data?.data.data.length === 0 ? <FallbackEmptyContent type={fallbackType}/> : <></>
                    }

                </div>


                <Button  onClick={handleToCreate}>{buttonName}</Button>
            </SheetContent>
        </Sheet>
    )
}
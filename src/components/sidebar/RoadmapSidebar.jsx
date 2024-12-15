import {ListQuestionCard} from "@/components/card/ListQuestionCard.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useForm} from "react-hook-form";
import {useToast} from "@/hooks/use-toast.js";
import {useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {api, makeResponseFailed} from "@/api/api.js";
import {format} from "date-fns";
import PropTypes from "prop-types";
import {roadmapAPI} from "@/api/roadmap.js";
import {FallbackEmptyContent} from "@/components/fallback/FallbackEmptyContent.jsx";
import {ListSkeleton} from "@/components/skeleton/ListSkeleton.jsx";


export function RoadmapSidebar() {

    const navigate = useNavigate()


    const {isLoading, data} = useQuery({

        queryFn: async () => {
            return await roadmapAPI.getRoadmap()
        },

    })



    const handleToCreate = () => {
        navigate("/tools/generative-roadmap/create")
    }


    return (
        <div className="h-full overflow-hidden  py-6 border-e-2 border-[#AEAEAE]">
            <h1 className="px-5 font-medium text-xl">List Roadmaps</h1>
            {/*{JSON.stringify(daaa)}*/}
            <div className="cs px-5 h-[87%]  my-5">
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
                    data?.data.data.length === 0 ? <div className="h-full flex items-center justify-center"><FallbackEmptyContent/></div> : <></>
                }

            </div>


            <Button className={'mx-5'} onClick={handleToCreate}>Add New Roadmaps</Button>


        </div>
    )
}


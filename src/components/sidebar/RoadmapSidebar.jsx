import {ListSidebarCard} from "@/components/card/ListSidebarCard.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useForm} from "react-hook-form";
import {useToast} from "@/hooks/use-toast.js";
import {useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {api, makeResponseFailed} from "@/api/api.js";
import {format} from "date-fns";
import PropTypes from "prop-types";
import {roadmapAPI} from "@/api/roadmap.js";
import {Sidebar, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.jsx";
import {FallbackEmptyContent} from "@/components/fallback/FallbackEmptyContent.jsx";
import {ListSkeleton} from "@/components/skeleton/ListSkeleton.jsx";
import {ListQuestionCardDetail} from "@/components/card/ListQuestionFilterCard.jsx";

export function RoadmapSidebar() {
    const navigate = useNavigate()


    const {isLoading, data} = useQuery({
        queryKey: ["getRoadmap"],
        queryFn: async () => {
            return await roadmapAPI.getRoadmap()
        },
    })

    console.log(data)


    const handleToCreate = () => {
        navigate("/tools/generative-roadmap/create")
    }
    return (
        <SidebarProvider className="hidden lg:block">
            <div className={'fixed w-full'}>
                <Sidebar className={'w-1/4 absolute'}>


                    <div className={'flex items-end justify-between mr-4'}>

                        <h1 className="px-5 mt-5 font-medium text-xl">List Roadmaps</h1>


                        <SidebarTrigger/>
                    </div>
                    <div className="cs px-5 h-[73%]  my-5">
                        {
                            isLoading ? <ListSkeleton/> : data.data.data.map((item) => (
                                <ListSidebarCard
                                    key={item}
                                    id={item.id}
                                    title={item.topic}
                                    topic={item.topic}
                                    type={item.type}
                                    subject={item.subject}
                                    isSolved={item.is_solved}
                                    date={format(item.date, "Y-M-dd")}
                                    desc={`${item.subject_detail_roadmap.user_proficiency_level} • ${item.subject_detail_roadmap.proficiency_level} • ${item.subject_detail_roadmap.timeline}`}
                                    totalSolve={item.subject_detail_roadmap.roadmap.filter((item) => item.solved === 1).length}
                                    length={item.subject_detail_roadmap.roadmap.length}
                                />
                            ))
                        }

                        {
                            data?.data.data.length === 0 ? <FallbackEmptyContent type={"question"}/> : <></>
                        }

                    </div>

                    <Button className={'mx-5'} onClick={handleToCreate}>Add New Roadmaps</Button>


                </Sidebar>


            </div>

            <main>

                <SidebarTrigger className={'absolute mt-5 z-50'}/>
            </main>
        </SidebarProvider>
    )
}
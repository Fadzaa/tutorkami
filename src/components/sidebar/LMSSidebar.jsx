import {ListSidebarCard} from "@/components/card/ListSidebarCard.jsx";
import {Button} from "@/components/ui/button.jsx";
import {
    Sidebar,
} from "@/components/ui/sidebar";
import {format} from "date-fns";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import {useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {lmsAPI} from "@/api/lms.js";
import {ListSkeleton} from "@/components/skeleton/ListSkeleton.jsx";
import {FallbackEmptyContent} from "@/components/fallback/FallbackEmptyContent.jsx";

export function LMSSidebar() {
    const navigate = useNavigate()


    const {isLoading, data} = useQuery({
        queryKey: ["getLms"],
        queryFn: async () => {
            return await lmsAPI.getLms()
        },

    })


    const handleToCreate = () => {
        navigate("/tools/generative-lms/create")
    }
    return (
        <SidebarProvider className="hidden lg:block">
            <div className={'fixed w-full'}>
                <Sidebar className={'w-1/4 absolute'}>


                    <div className={'flex items-end justify-between mr-4'}>

                        <h1 className="px-5 mt-5 font-medium text-xl">List LMS</h1>


                        <SidebarTrigger />
                    </div>
                    <div className="cs px-5 h-[73%]  my-5">
                        {
                            isLoading ? <ListSkeleton/> : data.data.map((item, index) => (
                                <ListSidebarCard
                                    title={item.title}
                                    key={item}
                                    id={item.id}
                                    date={format(item.date, "Y-M-dd")}
                                    isSolved={item.is_solved}
                                    category={item.knowledge_level}
                                    proficiency={item.goal_level}
                                    type={item.type}
                                    isQuestion={item.is_question}
                                />
                            ))
                        }

                        {
                            data?.data.length === 0 ? <FallbackEmptyContent type={"lms"}/> : <></>
                        }
                    </div>





                    <Button className={'mx-5'} onClick={handleToCreate}>Add New LMS</Button>


                </Sidebar>


            </div>

            <main>

                <SidebarTrigger className={'absolute mt-5 z-50'}/>
            </main>
        </SidebarProvider>
    )
}
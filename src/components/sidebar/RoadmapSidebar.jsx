import {Button} from "@/components/ui/button.jsx";
import {useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {roadmapAPI} from "@/api/roadmap.js";
import {Sidebar, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.jsx";
import {FallbackEmptyContent} from "@/components/fallback/FallbackEmptyContent.jsx";
import {ListSidebarCardDetail} from "@/components/card/ListSidebarCardDetail.jsx";

export function RoadmapSidebar() {
    const navigate = useNavigate()


    const {isLoading, data} = useQuery({
        queryKey: ["getRoadmap"],
        queryFn: async () => {
            return await roadmapAPI.getRoadmap()
        },

    })


    const handleToCreate = () => {
        navigate("/tools/generative-roadmap/create")
    }
    return (
        <SidebarProvider className="hidden lg:block">
            <div className={'fixed w-full'}>
                <Sidebar className={'w-1/4 absolute'}>


                    <div className={'flex items-end justify-between mr-4'}>

                        <h1 className="px-5 mt-5 font-medium text-xl">List Roadmaps</h1>


                        <SidebarTrigger />
                    </div>
                    {
                        data?.data.data.length === 0 ? <FallbackEmptyContent type={"roadmap"}/> : <ListSidebarCardDetail data={data?.data} isLoading={isLoading} type={"roadmap"}/>
                    }

                    <Button className={'mx-5'} onClick={handleToCreate}>Add New Roadmaps</Button>


                </Sidebar>


            </div>

            <main>

                <SidebarTrigger className={'absolute mt-5 z-50'}/>
            </main>
        </SidebarProvider>
    )
}
import {Button} from "@/components/ui/button.jsx";
import {
    Sidebar,
} from "@/components/ui/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import {useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {lmsAPI} from "@/api/lms.js";
import {FallbackEmptyContent} from "@/components/fallback/FallbackEmptyContent.jsx";
import {ListSidebarCardDetail} from "@/components/card/ListSidebarCardDetail.jsx";

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
                    {
                        data?.data.length === 0 ? <FallbackEmptyContent type={"lms"}/> : <ListSidebarCardDetail data={data} isLoading={isLoading} type={"lms"}/>
                    }

                    <Button className={'mx-5'} onClick={handleToCreate}>Add New LMS</Button>


                </Sidebar>


            </div>

            <main>

                <SidebarTrigger className={'absolute mt-5 z-50'}/>
            </main>
        </SidebarProvider>
    )
}
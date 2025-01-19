import {Button} from "@/components/ui/button.jsx";
import {useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {Sidebar, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.jsx";
import {materialAPI} from "@/api/material.js";
import {FallbackEmptyContent} from "@/components/fallback/FallbackEmptyContent.jsx";
import {ListSidebarCardDetail} from "@/components/card/ListSidebarCardDetail.jsx";

export function MaterialSidebar() {
    const navigate = useNavigate()


    const {isLoading, data} = useQuery({
        queryKey: ["getMaterial"],
        queryFn: async () => {
            return await materialAPI.getMaterial()
        },

    })


    const handleToCreate = () => {
        navigate("/tools/generative-material/create")
    }
    return (
        <SidebarProvider className="hidden lg:block">
            <div className={'fixed w-full'}>
                <Sidebar className={'w-1/4 absolute'}>


                    <div className={'flex items-end justify-between mr-4'}>

                        <h1 className="px-5 mt-5 font-medium text-xl" >List Materials</h1>


                        <SidebarTrigger />
                    </div>
                    {
                        data?.data.data.length === 0 ? <FallbackEmptyContent type={"study"}/> : <ListSidebarCardDetail data={data?.data} isLoading={isLoading} type={"study"}/>
                    }

                    <Button className={'mx-5'} onClick={handleToCreate}>Add New Materials</Button>


                </Sidebar>


            </div>

            <main>

                <SidebarTrigger className={'absolute mt-5 z-50'}/>
            </main>
        </SidebarProvider>
    )
}


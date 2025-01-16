import {ListSidebarCard} from "@/components/card/ListSidebarCard.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {format} from "date-fns";
import {Sidebar, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.jsx";
import {materialAPI} from "@/api/material.js";
import {FallbackEmptyContent} from "@/components/fallback/FallbackEmptyContent.jsx";
import {ListSkeleton} from "@/components/skeleton/ListSkeleton.jsx";

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

                        <h1 className="px-5 mt-5 font-medium text-xl">List Materials</h1>


                        <SidebarTrigger />
                    </div>
                    <div className="cs px-5 h-[73%]  my-5">
                        {
                            isLoading ? <ListSkeleton/> : data.data.data.map((item) => (
                                <ListSidebarCard
                                    key={item}
                                    title={item.subject}
                                    id={item.id}
                                    date={format(item.date, "Y-M-dd")}
                                    type={item.type}
                                    desc={`${item.proficiency_level} • ${item.style_customization} • ${item.output_format}`}
                                />
                            ))
                        }

                        {
                            data?.data.data.length === 0 ? <FallbackEmptyContent type={"study"}/> : <></>
                        }

                    </div>


                    <Button className={'mx-5'} onClick={handleToCreate}>Add New Materials</Button>


                </Sidebar>


            </div>

            <main>

                <SidebarTrigger className={'absolute mt-5 z-50'}/>
            </main>
        </SidebarProvider>
    )
}


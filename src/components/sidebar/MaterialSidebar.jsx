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
import {Sidebar, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.jsx";
import {materialAPI} from "@/api/material.js";

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
        <SidebarProvider>
            <div className={'fixed w-full'}>
                <Sidebar className={'w-1/4 absolute'}>


                    <div className={'flex items-end justify-between mr-4'}>

                        <h1 className="px-5 mt-5 font-medium text-xl">List Materials</h1>


                        <SidebarTrigger />
                    </div>
                    <div className="cs px-5 h-[73%]  my-5">
                        {
                            isLoading ? <p>Loading....</p> : data.data.data.map((item, index) => (
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

                    </div>


                    <Button className={'mx-5'} onClick={handleToCreate}>Add New Materials</Button>


                </Sidebar>


            </div>

            <main>

                <SidebarTrigger className={'absolute mt-5'}/>
            </main>
        </SidebarProvider>
    )
}


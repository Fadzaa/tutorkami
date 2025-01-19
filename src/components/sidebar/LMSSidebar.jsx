import {ListSidebarCard} from "@/components/card/ListSidebarCard.jsx";
import {Button} from "@/components/ui/button.jsx";
import {
    Sidebar,
} from "@/components/ui/sidebar";
import {formatInTimeZone } from "date-fns-tz";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import {useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {lmsAPI} from "@/api/lms.js";
import {ListSkeleton} from "@/components/skeleton/ListSkeleton.jsx";
import {FallbackEmptyContent} from "@/components/fallback/FallbackEmptyContent.jsx";
import {ListQuestionCardDetail} from "@/components/card/ListQuestionFilterCard.jsx";
import {format} from "date-fns";

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
                        <SidebarTrigger/>
                    </div>
                    <div className="cs px-5 h-[73%]  my-5">
                        {
                            data?.data.length !== 0 && (isLoading ? <ListSkeleton/> : data.data.map((item) => (
                                <ListSidebarCard
                                    key={item.id}
                                    title={item.subject}
                                    id={item.id}
                                    date={format(item.date, "Y-M-dd")}
                                    type={item.type}
                                    subId={item.subject_detail_lms.lms.topic[0].sub_topic[0].id}
                                    desc={`${item.subject_detail_lms.difficulty} • ${item.subject_detail_lms.activity_type}`}
                                />
                            )))
                        }

                        {
                            data?.data.length === 0 ? <FallbackEmptyContent type={"question"}/> : <></>
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
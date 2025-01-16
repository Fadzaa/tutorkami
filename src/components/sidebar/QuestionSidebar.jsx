import {ListSidebarCard} from "@/components/card/ListSidebarCard.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {format} from "date-fns";
import {Sidebar, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.jsx";
import {questionAPI} from "@/api/question.js";
import {FallbackEmptyContent} from "@/components/fallback/FallbackEmptyContent.jsx";
import {ListSkeleton} from "@/components/skeleton/ListSkeleton.jsx";
import {ListQuestionCardDetail} from "@/components/card/ListQuestionFilterCard.jsx";

export function QuestionSidebar() {
    const navigate = useNavigate()


    const {isLoading, data} = useQuery({
        queryKey: ["getQuestion"],
        queryFn: async () => await questionAPI.getQuestion()

    })


    const handleToCreate = () => navigate("/tools/generative-question/create")
    return (
        <SidebarProvider className="hidden lg:block">
            <div className={'fixed w-full'}>
                <Sidebar className={'w-1/4 absolute'}>


                    <div className={'flex items-end justify-between mr-4'}>

                        <h1 className="px-5 mt-5 font-medium text-xl">List Questions</h1>


                        <SidebarTrigger />
                    </div>
                    <div className="cs px-5 h-[73%]  my-5">
                        {
                            isLoading ? <ListSkeleton/> : data.data.data.map((item) => (
                                <ListSidebarCard
                                    key={item}
                                    id={item.id}
                                    title={item.subject}
                                    type={item.type}
                                    isSolved={item.is_solved}
                                    date={format(item.date, "Y-M-dd")}
                                    desc={`${item.topic} • ${item.question_difficulty} • ${item.target_audience}`}
                                />
                            ))
                        }

                        {
                            data?.data.data.length === 0 ? <FallbackEmptyContent type={"question"}/> : <></>
                        }

                    </div>


                    <Button className={'mx-5'} onClick={handleToCreate}>Add New Questions</Button>


                </Sidebar>


            </div>

            <main>

                <SidebarTrigger className={'absolute mt-5 z-50'}/>
            </main>
        </SidebarProvider>
    )
}


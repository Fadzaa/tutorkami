import {ListSidebarCard} from "@/components/card/ListSidebarCard.jsx";
import {Button} from "@/components/ui/button.jsx";
import {
    Sidebar,
} from "@/components/ui/sidebar";
import {format} from "date-fns";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import {useQuery} from "@tanstack/react-query";
import {lmsAPI} from "@/api/lms.js";
import PropTypes from "prop-types";
import {ListContentCard} from "@/components/card/ListContentCard.jsx";
import {ProgressBar} from "@/components/ui/progress-bar.jsx";
import {useEffect, useState} from "react";
import {ListSkeleton} from "@/components/skeleton/ListSkeleton.jsx";
import {ChevronUp} from "lucide-react";
import * as React from "react";
import {useNavigate} from "react-router-dom";

export function LMSSidebarDetail({data, id, handle, subTopicId, isLoading, completed,total }) {
    const navigate = useNavigate();
    return (
        <SidebarProvider className="hidden lg:block">
            <div className={'fixed w-full'}>
                <Sidebar className={'w-1/4 absolute'}>


                    <div className={'flex items-end justify-between mr-4'}>

                        <h1 className="px-5 mt-5 font-medium text-xl">Course Content</h1>


                        <SidebarTrigger />
                    </div>
                    <div className="cs px-5 h-[73%]  my-5">
                        {
                            isLoading ? <ListSkeleton/> : data.topic.map((item, index) => (
                                <ListContentCard
                                    title={item.topic}
                                    subTopic={item.sub_topic}
                                    subTopicId={subTopicId}
                                    handle={handle}
                                />
                            ))
                        }
                        {
                            data?.subject_lms_quiz !== null && (
                                <div className={`flex justify-between hover:bg-accent cursor-pointer rounded-sm py-1 px-1`}
                                     onClick={() => navigate(`/tools/generative-lms/detail/${id}/quiz`)}
                                >
                                    <p className={`text-base font-semibold`}>Quiz</p>
                                </div>
                            )
                        }
                        {
                            data?.lms_capstone !== null && (
                                <div className={`flex justify-between hover:bg-accent cursor-pointer rounded-sm py-1 px-1`}
                                     onClick={() => navigate(`/tools/generative-lms/detail/${id}/capstone`)}
                                >
                                    <p className={`text-base font-semibold`}>Capstone</p>
                                </div>
                            )
                        }
                    </div>


                    {
                        isLoading ? <></> : <ProgressBar completed={completed} total={total} />
                    }

                </Sidebar>


            </div>

            <main>
                <SidebarTrigger className={'absolute mt-5 z-50'}/>
            </main>
        </SidebarProvider>
    )
}

LMSSidebarDetail.propTypes = {
    data: PropTypes.object,
    isLoading: PropTypes.bool,
    completed: PropTypes.number,
    total: PropTypes.number,
    subTopicId: PropTypes.string,
    handle: PropTypes.func,
}

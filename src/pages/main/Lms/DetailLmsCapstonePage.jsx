import {useNavigate, useParams} from "react-router-dom";
import {LMSSidebarDetail} from "@/components/sidebar/detail/LMSSidebarDetail.jsx";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {lmsAPI} from "@/api/lms.js";
import {ListLmsCapstoneContent} from "@/components/content/ListLmsCapstoneContent.jsx";
import {ChatBotSidebar} from "@/components/sidebar/ChatBotSidebar.jsx";

export function DetailLmsCapstonePage() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [completed, setCompleted] = useState(0);
    const [total, setTotal] = useState(0);
    const {isLoading, data, refetch} = useQuery({
        queryKey: ["getLmsId"],
        queryFn: async () => {
            return await lmsAPI.getLmsId(id)
        },

    })

    const handleChange = (newId) => {
        navigate(`/tools/generative-lms/detail/${id}/${newId}`)
    };


    useEffect(() => {
        if (data !== undefined) {
            setTotal(0);
            setCompleted(0);
            data?.lms.topic.map((item) => {
                setTotal(prevState => prevState + item.sub_topic.length )
                setCompleted(prevState => prevState + item.sub_topic.filter(
                    (sub) => sub.solved === true
                ).length)
            })
        }
    },[data])
    return (
        <div className="h-[90vh] overflow-hidden flex">
            <LMSSidebarDetail id={id} handle={handleChange} subTopicId={0} completed={completed} data={data?.lms} isLoading={isLoading} total={total}/>
            <ListLmsCapstoneContent data={data?.lms}/>
             <ChatBotSidebar id={id} type={"Capstone"}/>
        </div>


    )
}
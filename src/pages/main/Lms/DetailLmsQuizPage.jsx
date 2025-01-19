import {useNavigate, useParams} from "react-router-dom";
import {LMSSidebarDetail} from "@/components/sidebar/detail/LMSSidebarDetail.jsx";
import {InitialContent} from "@/components/content/InitialContent.jsx";
import {ListLmsContent} from "@/components/content/ListLmsContent.jsx";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {lmsAPI} from "@/api/lms.js";
import {ChatBotSidebar} from "@/components/sidebar/ChatBotSidebar.jsx";
import {ListLmsQuestionContent} from "@/components/content/ListLmsQuestionContent.jsx";

export function DetailLmsQuizPage() {
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
            <ListLmsQuestionContent data={data?.lms?.subject_lms_quiz} lms={data?.subjectList}/>
            {/*{*/}
            {/*    dataPick && <ChatBotSidebar id={0} type={"Lms"} dataExist={dataPick}/>*/}
            {/*}*/}
        </div>


    )
}
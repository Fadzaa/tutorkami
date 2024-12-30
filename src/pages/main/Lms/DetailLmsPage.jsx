import {useParams} from "react-router-dom";
import {LMSSidebarDetail} from "@/components/sidebar/detail/LMSSidebarDetail.jsx";
import {InitialContent} from "@/components/content/InitialContent.jsx";
import {ListLmsContent} from "@/components/content/ListLmsContent.jsx";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {lmsAPI} from "@/api/lms.js";
import {ChatBotSidebar} from "@/components/sidebar/ChatBotSidebar.jsx";

export function DetailLmsPage() {
    const {id} = useParams();
    const [subTopicId, setSubTopicId] = useState(0);
    const [completed, setCompleted] = useState(0);
    const [regenerate, setRegenerate] = useState(false);
    const [dataPick, setDataPick] = useState(false);
    const [total, setTotal] = useState(0);
    const {isLoading, data, refetch} = useQuery({
        queryKey: ["getLmsId"],
        queryFn: async () => {
            return await lmsAPI.getLmsId(id)
        },

    })

    const handleChange = (newId) => {
        setSubTopicId(newId);
    };

    const handleRegenerate = (bool) => {
        setRegenerate(bool);
    };

    const handleComplete = (number, func) => {
        if (func === "decrease") {
            setCompleted(prevState => prevState - 1)
        } else {
            setCompleted(prevState => prevState + 1)
        }
    };

    useEffect(() => {
        if (data !== undefined) {
            setTotal(0);
            setCompleted(0);
            data.topic.map((item) => {
                setTotal(prevState => prevState + item.sub_topic.length )
                setCompleted(prevState => prevState + item.sub_topic.filter(
                    (sub) => sub.solved === true
                ).length)
            })
        }
    },[data])
    return (
        <div className="h-[90vh] overflow-hidden flex">
            <LMSSidebarDetail id={id} handle={handleChange} subTopicId={subTopicId} completed={completed} data={data} isLoading={isLoading} total={total}/>
            <ListLmsContent setDataPick={setDataPick} id={subTopicId} handle={handleRegenerate} handleCompled={handleComplete} regenerate={regenerate}/>
            {
                dataPick && <ChatBotSidebar id={subTopicId} type={"Lms"} dataExist={dataPick}/>
            }
        </div>


    )
}
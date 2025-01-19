import {useNavigate, useParams} from "react-router-dom";
import {LMSSidebarDetail} from "@/components/sidebar/detail/LMSSidebarDetail.jsx";
import {ListLmsContent} from "@/components/content/ListLmsContent.jsx";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {lmsAPI} from "@/api/lms.js";
import {ChatBotSidebar} from "@/components/sidebar/ChatBotSidebar.jsx";

export function DetailLmsPage() {
    const {id,subId} = useParams();
    const navigate = useNavigate();
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
        navigate(`/tools/generative-lms/detail/${id}/${newId}`)
    };

    const handleRegenerate = (bool) => {
        setRegenerate(bool);
    };

    const handleComplete = (number, func,topicId,subTopicId) => {
        if (func === "decrease") {
            setCompleted(prevState => prevState - 1)
        } else {
            setCompleted(prevState => prevState + 1)
            const index = data.lms.topic.map((item, index, array) => {
                if (item.id === topicId){
                    const indexs = item.sub_topic.map((i, index, array) => {
                        if (i.id === subTopicId) {
                            if (index + 1 === array.length) {
                                return 0;
                            } else {
                                return index + 1
                            }
                        }
                    }).filter((item) => item !== undefined)
                    if (indexs[0] !== 0) {
                        navigate(`/tools/generative-lms/detail/${id}/${item.sub_topic[indexs[0]].id}`)
                    } else {
                        return index + 1;
                    }
                } else {
                    return 0;
                }
            }).filter((item) => item !== 0)
            if (index[0] !== undefined) {
                navigate(`/tools/generative-lms/detail/${id}/${data.lms.topic[index[0]].sub_topic[0].id}`)
            }
            refetch()
        }
    };

    useEffect(() => {
        if (data !== undefined) {
            setTotal(0);
            setCompleted(0);
            data.lms.topic.map((item) => {
                setTotal(prevState => prevState + item.sub_topic.length )
                setCompleted(prevState => prevState + item.sub_topic.filter(
                    (sub) => sub.solved === true
                ).length)
            })
        }
    },[data])
    return (
        <div className="h-[90vh] overflow-hidden flex">
            <LMSSidebarDetail id={id} handle={handleChange} subTopicId={subId} completed={completed} data={data?.lms} isLoading={isLoading} total={total}/>
            <ListLmsContent setDataPick={setDataPick} id={subId} handle={handleRegenerate} handleCompled={handleComplete} regenerate={regenerate}/>
            {
                dataPick && <ChatBotSidebar id={subId} type={"Lms"}/>
            }
        </div>


    )
}
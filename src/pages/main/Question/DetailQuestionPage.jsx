import {useParams} from "react-router-dom";
import {ListQuestionContent} from "@/components/content/ListQuestionContent.jsx";
import {QuestionSidebar} from "@/components/sidebar/QuestionSidebar.jsx";
import {ContentQuestionSkeleton} from "@/components/skeleton/ContentQuestionSkeleton.jsx";
import {ChatBotSidebar} from "@/components/sidebar/ChatBotSidebar.jsx";
import {useState} from "react";

export function DetailQuestionPage() {

    const {id} = useParams();
    const [openChatbot, setOpenChatbot] = useState(false);


    return (
        <div className="h-[90vh] overflow-hidden flex">
            <QuestionSidebar />
            <ListQuestionContent id={id} setOpenChatbot={setOpenChatbot}/>
            {
                openChatbot && <ChatBotSidebar id={id} type={"Question"}/>
            }
        </div>


    )
}
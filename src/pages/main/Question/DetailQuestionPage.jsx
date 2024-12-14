import {useParams} from "react-router-dom";
import {ListQuestionContent} from "@/components/content/ListQuestionContent.jsx";
import {QuestionSidebar} from "@/components/sidebar/QuestionSidebar.jsx";

export function DetailQuestionPage() {

    const {id} = useParams();


    return (
        <div className="h-[90vh] overflow-hidden flex">
            <QuestionSidebar />

            <ListQuestionContent id={id}/>
        </div>


    )
}
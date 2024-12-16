import {QuestionSidebar} from "@/components/sidebar/QuestionSidebar.jsx";
import {InitialContent} from "@/components/content/InitialContent.jsx";


export function ListQuestionPage() {


    return (
        <div className="h-[90vh] overflow-hidden flex">
            <QuestionSidebar/>

            <InitialContent type={"question"}/>
        </div>


    )
}
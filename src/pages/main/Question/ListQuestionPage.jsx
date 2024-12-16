import {QuestionSidebar} from "@/components/sidebar/QuestionSidebar.jsx";
import {FallbackInitialContent} from "@/components/fallback/FallbackInitialContent.jsx";


export function ListQuestionPage() {


    return (
        <div className="h-[90vh] overflow-hidden flex">
            <QuestionSidebar/>

            <FallbackInitialContent type={"question"}/>
        </div>


    )
}
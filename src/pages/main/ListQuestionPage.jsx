import {ListQuestionSidebar} from "@/components/sidebar/ListQuestionSidebar.jsx";
import {ListQuestionInitialContent} from "@/components/initial_content/ListQuestionInitialContent.jsx";
import {ListQuestionContent} from "@/components/content/ListQuestionContent.jsx";

export function ListQuestionPage() {
    return (
        <div className="h-[88vh] w-full flex">
            <ListQuestionSidebar/>
            {/*<ListQuestionInitialContent/>*/}
            <ListQuestionContent/>
        </div>
    )
}
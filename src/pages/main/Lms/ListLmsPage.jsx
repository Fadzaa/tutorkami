import {InitialContent} from "@/components/content/InitialContent.jsx";
import {LMSSidebar} from "@/components/sidebar/LMSSidebar.jsx";


export function ListLmsPage() {


    return (
        <div className="h-[90vh] overflow-hidden flex">
            <LMSSidebar/>

            <InitialContent type={"lms"}/>
        </div>


    )
}
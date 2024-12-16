import {FallbackInitialContent} from "@/components/fallback/FallbackInitialContent.jsx";
import {LMSSidebar} from "@/components/sidebar/LMSSidebar.jsx";


export function ListLmsPage() {


    return (
        <div className="h-[90vh] overflow-hidden flex">
            <LMSSidebar/>

            <FallbackInitialContent/>
        </div>


    )
}
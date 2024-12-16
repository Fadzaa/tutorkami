
import {MaterialSidebar} from "@/components/sidebar/MaterialSidebar.jsx";
import {FallbackInitialContent} from "@/components/fallback/FallbackInitialContent.jsx";


export function ListMaterialPage() {


    return (
        <div className="h-[90vh] overflow-hidden flex">
            <MaterialSidebar/>

            <FallbackInitialContent type={"study"}/>
        </div>


    )
}
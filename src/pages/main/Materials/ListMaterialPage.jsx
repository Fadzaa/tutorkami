
import {MaterialSidebar} from "@/components/sidebar/MaterialSidebar.jsx";
import {InitialContent} from "@/components/content/InitialContent.jsx";


export function ListMaterialPage() {


    return (
        <div className="h-[90vh] overflow-hidden flex">
            <MaterialSidebar/>

            <InitialContent type={"study"}/>
        </div>


    )
}
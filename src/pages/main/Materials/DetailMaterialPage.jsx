import {useParams} from "react-router-dom";
import {MaterialSidebar} from "@/components/sidebar/MaterialSidebar.jsx";
import {ListMaterialContent} from "@/components/content/ListMaterialContent.jsx";

export function DetailMaterialPage() {

    const {id} = useParams();


    return (
        <div className="h-[90vh] overflow-hidden flex">
            {/*<MaterialSidebar />*/}

            <ListMaterialContent id={id}/>
        </div>


    )
}
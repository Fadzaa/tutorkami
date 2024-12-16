import {RoadmapSidebar} from "@/components/sidebar/RoadmapSidebar.jsx";
import {useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {roadmapAPI} from "@/api/roadmap.js";
import {InitialContent} from "@/components/content/InitialContent.jsx";


export function ListRoadmapPage() {


    return (
        <div className="h-[90vh] overflow-hidden flex">
            <RoadmapSidebar/>

            <InitialContent type={"roadmap"}/>
        </div>


    )
}
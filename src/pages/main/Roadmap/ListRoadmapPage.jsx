import {RoadmapSidebar} from "@/components/sidebar/RoadmapSidebar.jsx";
import {useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {roadmapAPI} from "@/api/roadmap.js";
import {FallbackInitialContent} from "@/components/fallback/FallbackInitialContent.jsx";


export function ListRoadmapPage() {


    return (
        <div className="h-[90vh] overflow-hidden flex">
            <RoadmapSidebar/>

            <FallbackInitialContent type={"roadmap"}/>
        </div>


    )
}
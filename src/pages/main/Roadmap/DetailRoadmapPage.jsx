import {RoadmapSidebar} from "@/components/sidebar/RoadmapSidebar.jsx";
import {useState} from "react";
import {ListRoadmapContent} from "@/components/content/ListRoadmapContent.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useParams} from "react-router-dom";
import {ChatBotSidebar} from "@/components/sidebar/ChatBotSidebar.jsx";

export function DetailRoadmapPage() {

    const {id} = useParams();


    return (
        <div className="h-[90vh] overflow-hidden flex">
            <RoadmapSidebar />

            <ListRoadmapContent id={id}/>

            <ChatBotSidebar id={id} type={"Roadmap"}/>
        </div>


    )
}
import {LMSSidebar} from "@/components/sidebar/LMSSidebar.jsx";
import {ChatBotSidebar} from "@/components/sidebar/ChatBotSidebar.jsx";


export function LMSPage() {
    return (
        <div className="h-[88vh] w-full flex">
            <LMSSidebar/>
            <div className="w-[80vw] h-full bg-red-50"></div>
            <ChatBotSidebar/>
        </div>
    )
}
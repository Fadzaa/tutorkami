import {ListQuestionCard} from "@/components/card/ListQuestionCard.jsx";
import {Button} from "@/components/ui/button.jsx";

const dataTreeView = [
    {
        title: "Tree Title 1",
        children: [
            {
                title: "Tree Subtree 1",
                children: [
                    {
                        title: "Installation",
                    },
                    {
                        title: "Project Structure",
                    },
                ],
            },
            {
                title: "Tree Subtree 2",
                children: [
                    {
                        title: "Project Structure is",
                    },
                    {
                        title: "Bro tefak is this",
                    },
                ],
            },
        ],
    },
    {
        title: "Tree Title 2",
        children: [
            {
                title: "Tree Subtree 3",
            },
            {
                title: "Tree Subtree 4",
            },
        ],
    },
    {
        title: "Tree Title 3",
        children: [
            {
                title: "Tree Subtree 5",
            },
            {
                title: "Tree Subtree 6",
            },
        ],
    },
]

// export function LMSSidebar() {
//     return (
//         <div className="h-full w-1/3 py-6 px-8 pe-0 border-e-2 border-[#AEAEAE]">
//             <h1 className="font-medium text-xl">Course Content</h1>
//
//             <div className="h-[85%] overflow-y-auto my-5">
//             </div>
//
//             <Button>Add New Questions</Button>
//
//         </div>
//     )
// }

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible.jsx";


export function LMSSidebar() {
    return (
        <SidebarProvider className="w-1/3">
            <div className={'h-1/4 fixed'}>
                <Sidebar className={'absolute'}>
                </Sidebar>
            </div>
            <main>
                <SidebarTrigger/>
                {/*{children}*/}
            </main>
        </SidebarProvider>
    )
}


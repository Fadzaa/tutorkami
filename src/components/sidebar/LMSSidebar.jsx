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
            <AppSidebar />
            <main>
                <SidebarTrigger />
                {/*{children}*/}
            </main>
        </SidebarProvider>
    )
}

function AppSidebar() {


    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {dataTreeView.map((item, index) => (
                                <Collapsible defaultOpen className="group/collapsible">
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton >{item.title}</SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.children.map((child, index) => (
                                                    <SidebarMenuSubItem >
                                                        <Collapsible defaultOpen className="group/collapsible">
                                                            <SidebarMenuItem>
                                                                <CollapsibleTrigger asChild>
                                                                    <SidebarMenuButton >{child.title}</SidebarMenuButton>
                                                                </CollapsibleTrigger>
                                                                <CollapsibleContent>
                                                                    <SidebarMenuSub>
                                                                        {
                                                                            child.children && child.children.map((subChild, index) => (
                                                                                <SidebarMenuSubItem >
                                                                                    <SidebarMenuSubButton >{subChild.title}</SidebarMenuSubButton>
                                                                                </SidebarMenuSubItem>
                                                                            ))
                                                                        }
                                                                    </SidebarMenuSub>
                                                                </CollapsibleContent>
                                                            </SidebarMenuItem>
                                                        </Collapsible>
                                                    </SidebarMenuSubItem>
                                                    ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
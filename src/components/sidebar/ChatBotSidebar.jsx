import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarTrigger
} from "@/components/ui/sidebar.jsx";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible.jsx";

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

export function ChatBotSidebar() {
    return (
        <SidebarProvider className="w-1/3 bg-blue-50">
            <SidebarTrigger />
            <AppSidebarr />

            <main>

                {/*{children}*/}
            </main>
        </SidebarProvider>
    )
}

function AppSidebarr() {
    return (
        <Sidebar side="right">
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
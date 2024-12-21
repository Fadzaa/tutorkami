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
import {format} from "date-fns";
export function ChatBotSidebar() {
    return (
        <SidebarProvider className="hidden lg:block">
            <div className={'fixed w-full'}>
                <Sidebar side={'right'} className={'w-1/4 absolute'}>


                    <div className={'flex items-end justify-between ml-4'}>
                        <SidebarTrigger className={'rotate-180'}/>

                        <h1 className="px-5 mt-5 font-medium text-xl">List LMS</h1>

                    </div>


                </Sidebar>


            </div>

            <main>

                <SidebarTrigger className={'absolute mt-5 z-50 right-0'}/>
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
                            
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
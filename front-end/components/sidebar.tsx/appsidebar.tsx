"use client"

import {
    ChevronDown
} from "lucide-react";
import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    Sidebar
} from "../ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import Link from "next/link";
import { EmployeeSidebar, SidebarStructure } from "./structure";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { checkRole } from "../service/token-handler";
import { SidebarModel } from "./sidebar-model";

export function AppSideBar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const path = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role,setRole] = useState<SidebarModel[]>();
    useEffect(() => {
        const user = checkRole();
        setIsLoggedIn(!!user);
        if(user?.role==="nhân viên")
            setRole(EmployeeSidebar);
        else
            setRole(SidebarStructure);
    }, [path]);

    if (!isLoggedIn) {
        return null;
    }

    return <Sidebar {...props}  className="z-30 shadow-md"
    >
        <SidebarHeader className="py-5">
            <Link href={'/'} className="flex items-center">
                <h2
                    className="ml-2 text-xl font-bold bg-gradient-to-r from-green-500 to-yellow-300 text-transparent bg-clip-text">
                    CAFE MANAGEMENT
                </h2>

            </Link>
        </SidebarHeader>
        <SidebarContent className="gap-0">
            {role?.map((item) => (
                <Collapsible
                    key={item.title}
                    title={item.title}
                    defaultOpen={false}
                    className="group/collapsible"
                >
                    <SidebarGroup>
                        <SidebarGroupLabel
                            asChild
                            className="h-10 group/label text-md text-sidebar-foreground "
                        >
                            <div className={`items-center flex rounded-md transition-colors duration-100 
                                    ${(path.includes(item.url) && item.url !== '/') || (path === '/' && item.url === '/order') ?
                                    'bg-primary text-white dark:text-black' :
                                    'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}`}>
                                <Link className="flex px-4" href={item.url}>
                                    {<item.icon className="mr-2 w-6 h-6" />}
                                    {item.title}{" "}
                                </Link>
                                {item.items ? <CollapsibleTrigger
                                    data-state={path.includes(item.url + '/') ? "open" : "closed"}
                                    className="ml-auto">
                                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:-rotate-180" />
                                </CollapsibleTrigger> : ""}
                            </div>
                        </SidebarGroupLabel>
                        <CollapsibleContent>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {item.items ? item.items.map((item) => (
                                        <SidebarMenuItem key={item.title} >
                                            <SidebarMenuButton asChild className="h-10 px-8">
                                                <a className={`${path.includes(item.url) ? 'text-primary hover:text-primary' : ''}`} href={item.url}>{item.title}</a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )) : ""}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </CollapsibleContent>
                    </SidebarGroup>
                </Collapsible>
            ))}
        </SidebarContent>
        <SidebarRail />
    </Sidebar>
}
"use client"
import DefaultAvatar from "@/components/profile/default-avatar";
import { PROFILE } from "@/components/profile/constants";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { LogOut, Shield, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getHeaderProfile } from "../service/token-handler";

export default function Header({ title }: { title: string }) {
    const router = useRouter();
    const pathname = usePathname();

    const [profile, setProfile] = useState<{
        realName: string,
        email: string,
        profilePicture: string,
        role: string
    }>({
        realName: "",
        email: "",
        profilePicture: "",
        role: ""
    });

    const fetchHeaderProfile = async () => {
        const result = await getHeaderProfile();
        if (result)
            setProfile(result);
    }

    useEffect(() => {
        fetchHeaderProfile();
    }, [pathname])

    return (
        <div className="px-4 flex h-16 items-center justify-between w-full border-b sticky top-0 z-10 bg-background shadow-sm">
            <SidebarTrigger className=" h-10 w-10" />
            <h2 className="ml-2 text-xl font-bold">{title}</h2>
            <div className="ml-auto mr-4">
                <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                        <button>
                            {profile.profilePicture ?
                                <Avatar >
                                    <AvatarImage src={profile.profilePicture} alt="avatar" className="object-cover w-10 h-10 rounded-full"></AvatarImage>
                                </Avatar> :
                                <DefaultAvatar name={profile.realName} size={10} />}

                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        side="bottom"
                        align="end"
                        sideOffset={2}
                        className="shadow-md max-w-60 p-2 rounded-md border bg-background z-40">
                        <DropdownMenuLabel className="p-1 pr-8">
                            <h3 className="font-bold text-md ">{profile.realName}</h3>
                            <p className="text-sm text-gray-400">{profile.email}</p>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => router.push('/profile')}
                            className="flex p-2 hover:bg-accent hover:outline-none rounded-md hover:cursor-pointer">
                            <User />
                            Thông tin cá nhân
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => router.push('/profile')}
                            className="flex p-2 hover:bg-accent hover:outline-none rounded-md hover:cursor-pointer">
                            <Shield />
                            <span className=" uppercase">{profile.role}</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex p-2 hover:bg-accent hover:outline-none hover:cursor-pointer rounded-md">
                            <LogOut />
                            Đăng xuất
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
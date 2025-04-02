"use client"
import DefaultAvatar from "@/components/profile/default-avatar";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { LogOut, Shield, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { callWithAuth, clearCookie, getHeaderProfile } from "../../service/token-handler";
import { Button } from "../../ui/button";

export default function Header({ title }: { title: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const [avatar, setAvatar] = useState<string | null>(null);
    const [profile, setProfile] = useState<{
        realName: string,
        email: string,
        pictureURL: string,
        role: string
    }>({
        realName: "",
        email: "",
        pictureURL: "",
        role: ""
    });

    const fetchHeaderProfile = async () => {
        const result = await getHeaderProfile();
        if (result) {
            setProfile(result);
            if (result.pictureURL)
                if (result.pictureURL.trim())
                    checkImage(result.pictureURL);
            setAvatar(null);

        }
    };

    const checkImage = async (imageUrl: string) => {
        const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".svg"];

        if (!validExtensions.some(ext => imageUrl.endsWith(ext))) {
            setAvatar(null);
            return;
        }

        try {
            const response = await fetch(imageUrl, { method: "HEAD" });
            setAvatar(response.ok ? imageUrl : null);
        } catch (error) {
            setAvatar(null);
        }
    };

    const logOut = () => {
        const isConfirmed = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
        if (!isConfirmed) return;

        clearCookie();

        router.push("/login");
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
                        <Button variant="ghost" className="rounded-full">
                            {avatar ?
                                <Avatar >
                                    <AvatarImage src={avatar} alt="avatar" className="object-cover w-10 h-10 rounded-full"></AvatarImage>
                                </Avatar> :
                                <DefaultAvatar name={profile.realName} size={10} />}

                        </Button>
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
                            onClick={() => router.push('/setrole')}
                            className="flex p-2 hover:bg-accent hover:outline-none rounded-md hover:cursor-pointer">
                            <Shield />
                            <span className=" uppercase">{profile.role}</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={logOut}
                            className="flex p-2 hover:bg-accent hover:outline-none hover:cursor-pointer rounded-md">
                            <LogOut />
                            Đăng xuất
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
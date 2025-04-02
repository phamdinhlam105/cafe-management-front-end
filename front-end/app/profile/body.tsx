"use client"

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import DefaultAvatar from "@/components/profile/default-avatar";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { Profile } from "../../components/model/user/profile-model";
import { callWithAuth } from "@/components/service/token-handler";
import { editProfile, getProfile } from "@/components/service/profile-service";
import ChangePassword from "../../components/profile/change-password";
import ProfileEdit from "@/components/profile/edit";

export default function ProfileBody() {

    const [profile, setProfile] = useState<Profile>();

    const fetchProfile = async () => {
        const result = await callWithAuth(getProfile);
        if (!result.eror)
            setProfile(result);
    }

    const fetchProfileEdit = async (newProfile: any) => {
        const result = await callWithAuth(await editProfile(newProfile));
        if (!result.error)
            setProfile(result);
    }

    useEffect(() => {
        fetchProfile();
    }, []);


    const onProfileEdit = (newProfile: Profile) => {
        fetchProfileEdit(newProfile);
    }

    return <div className="p-4 dark:bg-black h-full">
        <div className=" rounded-t-md flex items-end h-1/2 bg-animation shadow-md border bg-top min-h-[250px]"
            style={
                {
                    backgroundImage: 'url("/profile_bg.jpg")',
                    backgroundSize: 'auto',
                    backgroundRepeat: 'no-repeat'
                }
            }>
            {profile ?
                <div className=" h-28 w-full divide-y">
                    <div className="flex space-x-2 items-center justify-between px-4 h-full">
                        <div className="relative h-full flex flex-col justify-center">
                            <div className="absolute -top-1/2 scale-3">
                                {profile?.pictureUrl ?
                                    <Avatar className="h-full">
                                        <AvatarImage
                                            src={profile.pictureUrl}
                                            alt="avatar"
                                            className="object-cover h-32 rounded-full border border-4 border-white">
                                        </AvatarImage>
                                    </Avatar> :
                                    <DefaultAvatar name={profile.name} size={32} />}
                            </div>
                            <h3 className="text-gray-50 font-bold text-2xl ml-40">{profile.name}</h3>
                            <p className="text-gray-50 text-md ml-40">{profile.email}</p>
                        </div>
                        <div className="flex space-x-2">
                            <ChangePassword />
                            <ProfileEdit profile={profile} onProfileEdit={onProfileEdit} />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="border rounded-md w-7/12 shadow-md bg-background mt-10">
                            <h3 className="font-bold my-2 mx-4">Thông tin của tôi</h3>
                            <Separator />
                            <div className="py-4 px-4">
                                <h4 className="font-bold uppercase mb-3">Tiểu sử</h4>
                                <div className="grid grid-cols-2">
                                    <div className="space-y-2">
                                        <h4 className="font-bold text-sm">SỐ ĐIỆN THOẠI</h4>
                                        <p className="text-sm">{profile.phoneNumber}</p>
                                        <h4 className="font-bold text-sm">EMAIL</h4>
                                        <p className="text-sm">{profile.email}</p>
                                        <h4 className="font-bold text-sm">Birthday</h4>
                                        <p className="text-sm">{profile.birthDay || "Không xác định"}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-bold text-sm">Tuổi</h4>
                                        <p className="text-sm">{profile.age || "không xác định"}</p>
                                        <h4 className="font-bold text-sm">Ngày gia nhập</h4>
                                        <p className="text-sm">{profile.joinDate.split('T')[0]}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> :
                "Đang load dữ liệu"}
        </div>
    </div>
}
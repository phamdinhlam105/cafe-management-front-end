"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PROFILE } from "./profile-contants";
import { DialogHeader } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Profile } from "./profile-model";
import { DatePicker } from "@/components/date-picker";
import { getYear } from "date-fns";

export default function ProfileEdit({ onProfileEdit, profile }: { profile: Profile, onProfileEdit: (newProfile: any) => void }) {
    const [name, setName] = useState(profile.name);
    const [email, setEmail] = useState(profile.email);
    const [phone, setPhone] = useState(profile.phoneNumber);
    const [birthDate, setBirthDate] = useState<Date>(() => {
        return profile.birthday ? new Date(profile.birthday) : new Date();
    });
    const [picture, setPicture] = useState(profile.pictureUrl);
    const [isOpen, setIsOpen] = useState(false);

    const handleSave = () => {

        const newProfile = {
            id: profile.id,
            name: name,
            email: email,
            phoneNumber: phone,
            joinDate: profile.joinDate,
            birthDate: birthDate === new Date ? null : birthDate,
            age: birthDate === new Date ? null : getYear(new Date) - getYear(birthDate),
            pictureUrl: picture
        };
        onProfileEdit(newProfile);
        setIsOpen(false);
        toast("Chỉnh sửa thông tin thành công", {
            description: "Chỉnh sửa thông tin cá nhân thành công"
        }
        )
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <DialogTrigger asChild>
                <Button variant="secondary" className="h-10 ml-auto p-2 px-4 rounded-md text-sm font-semibold">
                    Sửa thông tin cá nhân
                </Button>
            </DialogTrigger>
            <DialogContent className="p-6 space-y-4 ">
                <DialogHeader>
                    <DialogTitle>
                        <h2 className="text-lg font-semibold">Chỉnh sửa thông tin cá nhân</h2>
                    </DialogTitle>
                </DialogHeader>


                <div className="space-y-3">
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="name">Họ và tên</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="mail">Email</Label>
                        <Input id="mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="phone">Số điện thoại</Label>
                        <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="birthDate">Ngày sinh</Label>
                        <DatePicker date={birthDate} setDate={setBirthDate} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="birthDate">Ảnh đại diện</Label>
                        <Input id="birthDate" value={picture} onChange={(e) => setPicture(e.target.value)} />
                        {picture ? <img src={picture} /> : undefined}
                    </div>
                </div>
                <Button onClick={handleSave} className="w-full bg-blue-500 text-white mt-4">
                    Lưu thay đổi
                </Button>
            </DialogContent>
        </Dialog>
    );
}

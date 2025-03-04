"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PROFILE } from "./profile-contants";
import { DialogHeader } from "@/components/ui/dialog";
import { toast } from "sonner";

export default function ProfileEdit() {
    // Tạo state riêng cho từng thuộc tính
    const [name, setName] = useState(PROFILE.name);
    const [mail, setMail] = useState(PROFILE.mail);
    const [phone, setPhone] = useState(PROFILE.phone);
    const [birthDate, setBirthDate] = useState(PROFILE.birthDate);
    const [country, setCountry] = useState(PROFILE.country);
    const [language, setLanguage] = useState(PROFILE.language);
    const [isOpen, setIsOpen] = useState(false);

    const handleSave = () => {

        PROFILE.name = name;
        PROFILE.name = mail;
        PROFILE.name = phone;
        PROFILE.name = birthDate;
        PROFILE.name = country;
        PROFILE.name = language;
        setIsOpen(false);
        toast("Chỉnh sửa thông tin thành công", {
            description: "Chỉnh sửa thông tin cá nhân thành công"
        }
        )
    };

    return (
        <Dialog open={isOpen} onOpenChange={()=>setIsOpen(!isOpen)}>
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
                        <Input id="mail" value={mail} onChange={(e) => setMail(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="phone">Số điện thoại</Label>
                        <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="birthDate">Ngày sinh</Label>
                        <Input id="birthDate" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="country">Quốc gia</Label>
                        <Input id="country" value={country} onChange={(e) => setCountry(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="language">Ngôn ngữ</Label>
                        <Input id="language" value={language} onChange={(e) => setLanguage(e.target.value)} />
                    </div>
                </div>
                <Button onClick={handleSave} className="w-full bg-blue-500 text-white mt-4">
                    Lưu thay đổi
                </Button>
            </DialogContent>
        </Dialog>
    );
}

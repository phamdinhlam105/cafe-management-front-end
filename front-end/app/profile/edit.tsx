"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogHeader } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Profile } from "./profile-model";
import { DatePicker } from "@/components/date-picker";
import { getYear } from "date-fns";
import { stringToDateYearFirst } from "@/components/helper/string-to-date";
import { callWithAuth } from "@/components/service/token-handler";
import { editProfile } from "@/components/service/profile-service";

export default function ProfileEdit({ onProfileEdit, profile }: { profile: Profile, onProfileEdit: (newProfile: any) => void }) {
    const [name, setName] = useState(profile.name);
    const [email, setEmail] = useState(profile.email);
    const [phone, setPhone] = useState(profile.phoneNumber);
    const [birthDate, setBirthDate] = useState<Date>(stringToDateYearFirst(profile.birthDay));
    const [picture, setPicture] = useState(profile.pictureUrl);
    const [isOpen, setIsOpen] = useState(false);

    const [day, setDay] = useState(birthDate.getDate());
    const [month, setMonth] = useState(birthDate.getMonth());
    const [year, setYear] = useState(birthDate.getUTCFullYear());

    const handleSave = async () => {
        let birthDate: Date | null = null;
        let age: number | null = null;
        if (day && month && year) {
            const d = parseInt(day.toString(), 10);
            const m = parseInt(month.toString(), 10);
            const y = parseInt(year.toString(), 10);

            if (d >= 1 && d <= 31 && m >= 1 && m <= 12 && y < getYear(new Date())) {
                birthDate = new Date(y, m - 1, d);
                age = getYear(new Date()) - y;
                console.log(age)
                console.log(getYear(new Date()))
            } else {
                toast.error("Ngày tháng năm không hợp lệ", {
                    description: "Vui lòng nhập đúng ngày sinh."
                });
                return;
            }
        }

        if (!email || !name)
            toast.warning("Tên và email không được bỏ trống")
        if (!email.trim() || !name.trim())
            toast.warning("Tên và email không được bỏ trống")

        const newProfile = {
            id: profile.id,
            userId: profile.userId,
            name: name,
            email: email,
            phoneNumber: phone,
            joinDate: profile.joinDate,
            birthDay: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
            age: age,
            pictureUrl: picture
        };

        const result = await callWithAuth(() => editProfile(newProfile))
        if (!result.error) {
            onProfileEdit(newProfile);
            setIsOpen(false);
            toast("Chỉnh sửa thông tin thành công", {
                description: "Chỉnh sửa thông tin cá nhân thành công"
            }
            )
        }
        else {
            toast.error("Chỉnh sửa thông tin thất bại", {
                description: `${result.error}`
            })
            return;
        }
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
                        <span className="text-lg font-semibold">Chỉnh sửa thông tin cá nhân</span>
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
                        <Label>Ngày sinh</Label>
                        <div className="flex gap-2">
                            <Input
                                type="number"
                                placeholder="Ngày"
                                value={day}
                                min="1" max="31"
                                onChange={(e) => setDay(Number(e.target.value))}
                                className="w-1/3"
                            />
                            <Input
                                type="number"
                                placeholder="Tháng"
                                value={month}
                                min="1" max="12"
                                onChange={(e) => setMonth(Number(e.target.value))}
                                className="w-1/3"
                            />
                            <Input
                                type="number"
                                placeholder="Năm"
                                value={year}
                                min="1900" max={getYear(new Date()).toString()}
                                onChange={(e) => setYear(Number(e.target.value))}
                                className="w-1/3"
                            />
                        </div>
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

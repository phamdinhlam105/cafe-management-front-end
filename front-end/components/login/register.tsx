"use client";
import { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { registerRequest } from "../service/account-service";

export default function RegisterForm() {
    const router = useRouter();

    const [user, setUser] = useState({
        name: "",
        userName: "",
        email: "",
        password: "",
        confirmedPassword: "",
        phone: ""
    })

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user.userName || !user.name || !user.email || !user.password || !user.confirmedPassword) {
            toast.error("Vui lòng điền đầy đủ thông tin!");
            return;
        }
        if (user.password.length < 6) {
            toast.error("Mật khẩu phải có ít nhất 6 ký tự!");
            return;
        }
        if (user.password !== user.confirmedPassword) {
            toast.error("Mật khẩu xác nhận không khớp!");
            return;
        }
        const registerReq = {
            userName: user.userName,
            password: user.password,
            name: user.name,
            email: user.email,
            phone: user.phone,
        }
        const result = await registerRequest(registerReq);
        if (!result.error) {
            if (result.status == 1) {
                toast.success("Đăng ký thành công!");
                router.push("/login");
            }
            else {
                if (result.message == 'userName')
                    toast.error("Tên đăng nhập đã có người dùng hãy thử lại");
                else
                    toast.error("Email đã được đăng ký");
                return;
            }
        }
        else
            toast.error("Đăng ký thất bại", { description: `${result.error}` });


    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUser(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <form onSubmit={handleRegister} className="space-y-4">
            <div className="flex flex-col gap-1">
                <Label htmlFor="userName">Tên đăng nhập</Label>
                <Input name="userName" id="userName" value={user.userName} onChange={handleInputChange} required />
            </div>

            <div className="flex flex-col gap-1">
                <Label htmlFor="email">Email</Label>
                <Input name="email" id="email" type="email" value={user.email} onChange={handleInputChange} required />
            </div>

            <div className="flex flex-col gap-1">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input name="password" id="password" type="password" value={user.password} onChange={handleInputChange} required />
            </div>

            <div className="flex flex-col gap-1">
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                <Input name="comfirmedPassword" id="confirmPassword" type="password" value={user.confirmedPassword} onChange={handleInputChange} required />
            </div>

            <div className="flex flex-col gap-1">
                <Label htmlFor="name">Họ và tên</Label>
                <Input name="name" id="name" value={user.name} onChange={handleInputChange} required />
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input name="phone" id="phone" type="number" value={user.phone} onChange={handleInputChange} />
            </div>

            <Button type="submit" className="w-full bg-blue-500 text-white mt-4">
                Đăng ký
            </Button>
        </form>
    );
}

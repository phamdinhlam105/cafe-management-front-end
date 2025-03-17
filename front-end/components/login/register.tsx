"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { registerRequest } from "../service/account-service";

export default function RegisterForm() {
    const router = useRouter();
    
    const [name, setName] = useState("");
    const [userName,setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");

    const handleRegister =async (e: React.FormEvent) => {
        e.preventDefault();

        if (!userName || !name || !email || !password || !confirmPassword) {
            toast.error("Vui lòng điền đầy đủ thông tin!");
            return;
        }
        if (password.length < 6) {
            toast.error("Mật khẩu phải có ít nhất 6 ký tự!");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Mật khẩu xác nhận không khớp!");
            return;
        }
        const registerReq = {
            userName:userName,
            password:password,
            name:name,
            email:email,
            phone:phone,
        }
        const result = await registerRequest(registerReq);
        if(!result.error){
            if(result.status==1){
                toast.success("Đăng ký thành công!");
                router.push("/login");
            }
            else{
                if(result.message=='userName')
                    toast.error("Tên đăng nhập đã có người dùng hãy thử lại");
                else
                toast.error("Email đã được đăng ký");
            return;
            }
        }
        else
            toast.error("Đăng ký thất bại",{description:`${result.error}`});

      
    };

    return (
        <form onSubmit={handleRegister} className="space-y-4">
            <div className="flex flex-col gap-1">
                <Label htmlFor="name">Tên đăng nhập</Label>
                <Input id="name" value={userName} onChange={(e) => setUserName(e.target.value)} required />
            </div>

            <div className="flex flex-col gap-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="flex flex-col gap-1">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <div className="flex flex-col gap-1">
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>

            <div className="flex flex-col gap-1">
                <Label htmlFor="name">Họ và tên</Label>
                <Input id="name"  value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input id="phone" type="number" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <Button type="submit" className="w-full bg-blue-500 text-white mt-4">
                Đăng ký
            </Button>
        </form>
    );
}

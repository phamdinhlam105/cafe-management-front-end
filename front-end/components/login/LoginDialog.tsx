"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import LoginForm from "./LoginForm";
import Cookies from "js-cookie";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginDialog() {
    const router = useRouter();
    return (
        <Dialog open={true}>
            <DialogContent className="max-w-md z-50">
                <DialogHeader>
                    <DialogTitle>Đăng nhập</DialogTitle>
                    <DialogDescription>Vui lòng đăng nhập để truy cập ứng dụng</DialogDescription>
                </DialogHeader>
                <LoginForm onSubmit={async (username, password) => {
                   if (username === "admin" && password === "admin") {
                    Cookies.set("loggedIn", "true", { expires: 1 });
                    toast.success("Đăng nhập thành công!");
                    router.push('/')
                  }
                }} />
                <DialogFooter>
                    {/* Có thể thêm nút hủy hoặc chuyển sang đăng ký */}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
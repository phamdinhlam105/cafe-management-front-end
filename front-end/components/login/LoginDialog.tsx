"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import LoginForm from "./LoginForm";
import RegisterForm from "./register";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function LoginDialog() {
    const router = useRouter();
    const [action, setAction] = useState(0); // 0: Đăng nhập, 1: Đăng ký

    return (
        <Dialog open={true}>
            <DialogContent className="max-w-md z-50">
                <DialogHeader>
                    <DialogTitle>{action === 0 ? "Đăng nhập" : "Đăng ký"}</DialogTitle>
                    <DialogDescription>
                        {action === 0
                            ? "Vui lòng đăng nhập để truy cập ứng dụng"
                            : "Tạo tài khoản mới để sử dụng ứng dụng"}
                    </DialogDescription>
                </DialogHeader>

                {/* Hiển thị form tùy theo action */}
                {action === 0 ? (
                    <LoginForm
                        onSubmit={async (username, password) => {
                            if (username === "admin" && password === "admin") {
                                Cookies.set("loggedIn", "true", { expires: 1 });
                                toast.success("Đăng nhập thành công!");
                                router.push("/");
                            } else {
                                toast.error("Tên đăng nhập hoặc mật khẩu không đúng!");
                            }
                        }}
                    />
                ) : (
                    <RegisterForm />
                )}

                <DialogFooter className="flex justify-between">
                    {action === 0 ? (
                        <>
                            <Button variant="link" onClick={() => router.push("/forgot-password")} className="text-blue-600">
                                Quên mật khẩu?
                            </Button>
                            <Button variant="outline" onClick={() => setAction(1)}>
                                Đăng ký
                            </Button>
                        </>
                    ) : (
                        <Button variant="outline" onClick={() => setAction(0)}>
                            Đã có tài khoản? Đăng nhập
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

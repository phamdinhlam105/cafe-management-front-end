"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import LoginForm from "./LoginForm";
import RegisterForm from "./register";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function LoginDialog() {
    const router = useRouter();
    const [action, setAction] = useState(0);

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

                {action === 0 ? (
                    <LoginForm/>
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

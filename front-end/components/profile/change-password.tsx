"use client"

import { changePassword } from "@/components/service/profile-service";
import { callWithAuth } from "@/components/service/token-handler";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";

export default function ChangePassword() {
    const [isOpen, setIsOpen] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState<string | null>(null);


    const handleSave = async () => {

        if (!oldPassword || !newPassword || !confirmNewPassword) {
            setError("Vui lòng điền đầy đủ thông tin");
            return;
        }
        if (newPassword !== confirmNewPassword) {
            setError("Mật khẩu mới và xác nhận mật khẩu không khớp");
            return;
        }
        setError(null);

        const changePasswordReq = {
            oldPassword: oldPassword,
            newPassword: newPassword
        }
        const result = await callWithAuth(() => changePassword(changePasswordReq));
        if (result==null) {
            toast("Đổi mật khẩu thành công")
            setIsOpen(false);
            setOldPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        }
        else {
            if (result.error === 'wrong password')
                toast.error("Sai mật khẩu cũ vui lòng thử lại")
            else
                toast.error("Lỗi khi đổi mật khẩu", {
                    description: `${result.error}`
                })
            return;
        }
    }

    return <div>
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <DialogTrigger asChild>
                <Button variant="secondary" className="h-10 ml-auto p-2 px-4 rounded-md text-sm font-semibold">
                    Đổi mật khẩu
                </Button>
            </DialogTrigger>
            <DialogContent className="p-6 space-y-4">
                <DialogHeader>
                    <DialogTitle>
                        <span className="text-lg font-semibold">Đổi mật khẩu</span>
                    </DialogTitle>
                </DialogHeader>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="space-y-2">
                    <label className="block text-sm font-medium">Mật khẩu cũ</label>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="w-full border rounded-md p-2 text-sm"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium">Mật khẩu mới</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full border rounded-md p-2 text-sm"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium">Xác nhận mật khẩu mới</label>
                    <input
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        className="w-full border rounded-md p-2 text-sm"
                    />
                </div>

                <div className="flex justify-end space-x-2">
                    <Button variant="ghost" onClick={() => setIsOpen(false)}>Hủy</Button>
                    <Button variant="default" onClick={handleSave}>Lưu</Button>
                </div>
            </DialogContent>
        </Dialog>
    </div>
}
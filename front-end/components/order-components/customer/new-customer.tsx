"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useState } from "react";
import { callWithAuth } from "@/components/service/token-handler";
import { addCustomerService } from "@/components/service/customer-service";
import { toast } from "sonner";

export default function NewCustomer({ onChange }: { onChange: () => void }) {
    const [loading, setLoading] = useState(false);
    const [newCustomer, setNewCustomer] = useState({ name: "", phone: "", address: "" });
    const [isOpen, setIsOpen] = useState(false);

    const submitChange = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        if (!newCustomer.name) {
            toast.error("Tên khách không được bỏ trống")
            setLoading(false);
            return;
        }

        const result = await callWithAuth(() => addCustomerService(newCustomer));
        if (!result.error) {
            toast("Thêm thành công");
            setIsOpen(false);
            onChange();
            setNewCustomer({ name: "", phone: "", address: "" });
        }

        else {
            toast.error("Thêm thất bại", {
                description: `Lỗi ${result.error}`
            });
        }
        setLoading(false);
    }
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewCustomer(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return <Dialog defaultOpen={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
            <Button className="py-1 px-2 items-center hover:bg-gray-300 hover:text-neutral-900 rounded-sm">Thêm khách hàng</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={submitChange}>
                <DialogHeader>
                    <DialogTitle>Thêm khách hàng</DialogTitle>
                    <DialogDescription>
                        Thêm thông tin khách hàng
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Tên khách
                        </Label>
                        <Input
                            name="name"
                            id="name"
                            value={newCustomer.name}
                            onChange={handleInputChange}
                            className="col-span-3"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Số điện thoại
                        </Label>
                        <Input
                            name="phone"
                            type="number"
                            value={newCustomer.phone}
                            onChange={handleInputChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Địa chỉ
                        </Label>
                        <Input
                            name="address"
                            value={newCustomer.address}
                            onChange={handleInputChange}
                            className="col-span-3"

                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button type="submit">Thêm khách hàng</Button>
                    {loading ? "Đang lưu..." : undefined}
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog >
}
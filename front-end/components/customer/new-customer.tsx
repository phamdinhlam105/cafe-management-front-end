"use client"
import { Customer } from "./customer-model";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { callWithAuth } from "../service/token-handler";
import { addCustomerService } from "../service/customer-service";
import { toast } from "sonner";

export default function NewCustomer({ onChange }: { onChange: () => void }) {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const submitChange = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        if (!name) {
            toast.error("Tên khách không được bỏ trống")
            setLoading(false);
            return;
        }

        const newCustomer = {
            name: name,
            phone: phone,
            address: address
        }

        const result = await callWithAuth(() => addCustomerService(newCustomer));
        if (!result.error) {
            toast("Thêm thành công");
            setIsOpen(false);
            onChange();
            setName('');
            setPhone('');
            setAddress('');
        }

        else {
            toast.error("Thêm thất bại", {
                description: `Lỗi ${result.error}`
            });
        }
        setLoading(false);
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
                            id="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="col-span-3"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Số điện thoại
                        </Label>
                        <Input
                            type="number"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Địa chỉ
                        </Label>
                        <Input
                            value={address}
                            onChange={e => setAddress(e.target.value)}
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
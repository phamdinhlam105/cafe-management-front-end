"use client"
import { Customer } from "./customer-model";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { callWithAuth } from "../service/token-handler";
import { editCustomer } from "../service/customer-service";
import { toast } from "sonner";


export default function EditCustomer({ customer,onChange }: { customer: Customer,onChange:()=>void }) {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(customer.name || undefined);
    const [phone, setPhone] = useState(customer.phone|| undefined);
    const [address, setAddress] = useState(customer.address|| undefined);
    const [isOpen, setIsOpen] = useState(false);

    const submitChange = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        const edittedCustomer = {
            name:name,
            phone:phone,
            address:address
        }

        const result = await callWithAuth(()=>editCustomer(customer.id,edittedCustomer));
        if(!result.error){
            toast("Chỉnh sửa thành công");
            setIsOpen(false);
            onChange();
        }

        else{
            toast.error("Chỉnh sửa thất bại",{
                description:`Lỗi ${result.error}`});
        }
        setLoading(false);
    }

    return <Dialog defaultOpen={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
            <Button className="py-1 px-2 items-center hover:bg-gray-300 hover:text-neutral-900 rounded-sm">Chỉnh sửa</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={submitChange}>
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa</DialogTitle>
                    <DialogDescription>
                        Chỉnh sửa thông tin khách hàng
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
                    <Button type="submit">Lưu thay đổi</Button>
                    {loading ? "Đang lưu..." : undefined}
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog >
}
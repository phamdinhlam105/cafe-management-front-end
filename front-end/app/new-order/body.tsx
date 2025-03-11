"use client"
import { OrderStatus } from "@/components/order/enums";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CUSTOMERS } from "@/components/customer/constants";
import { Order } from "@/components/order/order-model";
import { callWithAuth } from "@/components/service/token-handler";
import { createOrder } from "@/components/service/order-service";
import { addCustomerService } from "@/components/service/customer-service";


export default function NewOrderBody() {
    const route = useRouter();
    const [customerId, setCustomerId] = useState('2');
    const [note, setNote] = useState('');
    const [newCustomerName, setNewCustomerName] = useState('');
    const [newCustomerPhone, setNewCustomerPhone] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleCustomerChange = (value: string) => {
        setCustomerId(value);
    };

    const fetchCreateOrder = async () => {
        const result = await callWithAuth(await createOrder(customerId, note));
        if (result)
            return result;
        return null;
    }
    
    const fetchCreateCustomer = async () =>{
        const result = await callWithAuth(await addCustomerService(newCustomerName,newCustomerPhone));
        if(result)
            return result;
        return null;
    }

    const handleAddCustomer = (event: React.FormEvent) => {
        event.preventDefault();

        if (!newCustomerName) {
            alert('Hãy nhập tên khách hàng');
            return;
        }

        const newCustomer = {
            id: (CUSTOMERS.length + 1).toString(),
            name: newCustomerName,
            phone: newCustomerPhone
        };
        CUSTOMERS.push(newCustomer);
        setCustomerId(newCustomer.id);
        setNewCustomerName('');
        setIsOpen(false)
        setCustomerId
        toast("Thêm khách hàng thành công", {
            description: `Khách hàng ${newCustomer.name} đã được thêm.`,
        });
    };
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const newOrder: Order = {
            orderStatus: OrderStatus.New,
            customerId: CUSTOMERS.findLast(c => c.id === customerId)?.name ?? '',
            note: note,
            createAt: new Date().toLocaleString('en-GB'),
            price: '',
            quantity: '',
            details: [],
            no: 1
        };
        fetchCreateOrder();
        toast("Tạo đơn hàng thành công", {
            description: `Đơn hàng đã được tạo với ID khách hàng: ${customerId}`,
        });
        route.replace(`/order/?id=${newOrder.id}`)
        setCustomerId('');
        setNote('');
    };

    const newCustomerClick = async () => {
        setIsOpen(true);
        const success = fetchCreateCustomer();
        if(!success)
            toast("Tạo khách hàng mới thành công",
        {
            description:`Đã tạo khách hàng ${newCustomerName}`
        });
    }

    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold">Tạo Đơn Hàng Mới</h2>

            <form id="order-form" onSubmit={handleSubmit} className="space-y-4 mt-4">

                <div>
                    <Label htmlFor="customerId" className="block text-sm font-medium text-gray-700">
                        Khách hàng
                    </Label>
                    <Select value={customerId} onValueChange={handleCustomerChange} defaultValue={customerId}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Chọn khách hàng" />
                        </SelectTrigger>
                        <SelectContent>
                            {CUSTOMERS.filter((customer) => customer.id !== '2')
                                .map((customer) => (
                                    <SelectItem key={customer.id} value={customer.id}>
                                        {customer.name}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                    <Button className="mt-2" onClick={e => { e.preventDefault(); newCustomerClick() }}>Thêm khách hàng mới</Button>
                </div>

                <div>
                    <Label htmlFor="note" className="block text-sm font-medium text-gray-700">
                        Ghi chú
                    </Label>
                    <Input
                        id="note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="mt-1"
                        placeholder="Nhập ghi chú (tùy chọn)"
                    />
                </div>
                <div>
                    <Button type="submit" className="w-full mt-4">
                        Tạo đơn hàng
                    </Button>
                </div>
            </form>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>

                <DialogContent>
                    <form id="customer-form" onSubmit={handleAddCustomer} >
                        <DialogHeader>
                            <DialogTitle>Thêm Khách Hàng Mới</DialogTitle>
                        </DialogHeader>

                        <Label htmlFor="newCustomerName" className="block text-sm font-medium text-gray-700">
                            Tên khách hàng
                        </Label>
                        <Input
                            id="newCustomerName"
                            value={newCustomerName}
                            onChange={(e) => setNewCustomerName(e.target.value)}
                            className="mt-1"
                            placeholder="Nhập tên khách hàng"
                            required
                        />
                        <Label htmlFor="newCustomerName" className="block text-sm font-medium text-gray-700">
                            Số điện thoại
                        </Label>
                        <Input
                            id="newCustomerName"
                            value={newCustomerPhone}
                            onChange={(e) => setNewCustomerPhone(e.target.value)}
                            className="mt-1"
                            placeholder="Nhập SĐT khách hàng"
                            type="number"
                        />
                        <Button type="submit" className="mt-4">
                            Thêm khách hàng
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
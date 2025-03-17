"use client"
import { OrderStatus } from "@/components/order/enums";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { callWithAuth } from "@/components/service/token-handler";
import { createOrder } from "@/components/service/order-service";
import { addCustomerService, getAllCustomer } from "@/components/service/customer-service";
import { Customer } from "@/components/customer/customer-model";


export default function NewOrderBody() {
    const route = useRouter();
    const [customerId, setCustomerId] = useState('');
    const [note, setNote] = useState('');
    const [newCustomerName, setNewCustomerName] = useState('');
    const [newCustomerPhone, setNewCustomerPhone] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [address, setAddress] = useState('');
    const [tableNo, setTableNo] = useState<number>();

    const handleCustomerChange = (value: string) => {
        if (value)
            setCustomerId(value);
        else
            toast.error("Lỗi chọn khách hàng")
    };

    const fetchCreateOrder = async () => {
        const result = await callWithAuth(() => createOrder(note || undefined, customerId));
        if (!result.erorr)
            return result;
        toast.error("Đã xảy ra lỗi khi tạo đơn", {
            description: `Lỗi : ${result.error}`,
        });
        return null;
    }

    const fetchCustomers = async () => {
        const result = await callWithAuth(getAllCustomer);
        if (!result.error)
            setCustomers(result);
        else
            toast.error("Không thể lấy thông tin khách hàng", { description: `Lỗi: ${result.erorr}` })
    }

    const fetchCreateCustomer = async (newCustomer: any) => {
        const result = await callWithAuth(() => addCustomerService(newCustomer));
        if (!result.error)
            return result;
        return null;
    }

    const handleAddCustomer = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!newCustomerName) {
            toast.warning('Hãy nhập tên khách hàng');
            return;
        }

        const newCustomer = {
            name: newCustomerName,
            phone: newCustomerPhone || null,
            address: address || null,
            no: tableNo
        };
        const result = await fetchCreateCustomer(newCustomer);
        if (result) {
            toast.success("Thêm khách hàng thành công", {
                description: `Khách hàng ${newCustomer.name} đã được thêm.`,
            });
            await fetchCustomers();
        }

        else
            toast.error("Đã xảy ra lỗi khi thêm khách hàng");
    };
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const result = await fetchCreateOrder();
        if (!result.error) {
            toast("Tạo đơn hàng thành công", {
                description: `Đơn hàng đã được tạo thành công`,
            });
            route.replace(`/order/?id=${result.id}`)
            setCustomerId('');
            setNote('');
        }
        else
            toast.error("Lỗi khi tạo đơn hàng")
    };

    useEffect(() => {
        fetchCustomers();
    }, [])

    useEffect(() => {
        if (customers.length > 0)
            setCustomerId(customers[0].id);
    }, [customers])

    const newCustomerClick = async () => {
        setIsOpen(true);
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
                            {customers ? customers.map((customer) => (
                                <SelectItem key={customer.id} value={customer.id}>
                                    {customer.name}
                                </SelectItem>
                            )) : "Đang load dữ liệu"}
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
                <div className="flex items-center justify-left">
                    <Label htmlFor="no" className="block text-sm font-medium text-gray-700 w-20">
                        Số bàn
                    </Label>
                    <Input

                        id="no"
                        type="number"
                        value={tableNo}
                        onChange={(e) => setTableNo(Number(e.target.value))}
                        className="w-40"
                        placeholder=""
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
                        <Label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Số điện thoại
                        </Label>
                        <Input
                            id="phone"
                            value={newCustomerPhone}
                            onChange={(e) => setNewCustomerPhone(e.target.value)}
                            className="mt-1"
                            placeholder="Nhập số điện thoại"
                            type="number"
                        />
                        <Label htmlFor="adrress" className="block text-sm font-medium text-gray-700">
                            Địa chỉ
                        </Label>
                        <Input
                            id="adrress"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="mt-1"
                            placeholder="Nhập Địa chỉ khách hàng"
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
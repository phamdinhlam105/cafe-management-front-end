"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { toast } from "sonner";
import { callWithAuth } from "@/components/service/token-handler";
import { createOrder } from "@/components/service/order-service";
import { getAllCustomer } from "@/components/service/customer-service";
import { Customer } from "@/components/model/order/customer-model";
import NewCustomer from "@/components/order-components/customer/new-customer";


export default function NewOrderBody() {
    const route = useRouter();
    const [customerId, setCustomerId] = useState('');
    const [note, setNote] = useState('');
    const [customers, setCustomers] = useState<Customer[]>([]);
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

    const customerOnChange = () => {
         fetchCustomers();
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
                    <NewCustomer onChange={customerOnChange}/>
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

        </div>
    );
}
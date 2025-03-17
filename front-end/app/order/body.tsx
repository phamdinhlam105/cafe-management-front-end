"use client"
import { DatePicker } from "@/components/date-picker";
import { stringToDate } from "@/components/helper/string-to-date";
import ItemList from "@/components/item-list/item-list";
import { OrderStatus } from "@/components/order/enums";
import { Order } from "@/components/order/order-model";
import { getAllOrder } from "@/components/service/order-service";
import { callWithAuth } from "@/components/service/token-handler";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrderBody() {
    
    const [data, setData] = useState<Order[]>([]);
    const [displayData, setDisplayData] = useState(data);
    const [filter, setFilter] = useState<string>("all");
    const fetchOrders = async () => {
        const result = await callWithAuth(getAllOrder);
        if (result) {
            setData(result);
        }
    };
  
    useEffect(() => {
        fetchOrders();

    }, []);

    useEffect(() => {
        setDisplayData(data.filter(order => order.status === OrderStatus.New));
    }, [data])

    const filterData = (status: string) => {
        

        if (status === "all") {
            setDisplayData(data);
        } else{
            switch (status) {
                case '0':
                    setDisplayData(displayData.filter(order => order.status === OrderStatus.New));
                    break;
                case '1':
                    setDisplayData(displayData.filter(order => order.status === OrderStatus.Completed));
                    break;
                case '2':
                    setDisplayData(displayData.filter(order => order.status === OrderStatus.Cancelled));
                    break;
                default:
                    break;
                    
            }
        }
            
    };
    const onEdit = async () => {
        await fetchOrders();
    }


    return <div className="p-4 space-y-5">
        <div className="h-10 flex space-x-4">
            <Button className="border hover:bg-gray-100 hover:text-neutral-900 transition-color duration-200"><Link href='/new-order'>Đơn hàng mới</Link></Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">Bộ lọc</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-secondary">
                    <DropdownMenuItem
                        className="hover:bg-gray-200 rounded-md"
                        onClick={() => { setFilter('all'); filterData('all'); }}>
                        Tất cả
                    </DropdownMenuItem>
                    <Separator />
                    <DropdownMenuItem
                        className="hover:bg-gray-200 rounded-md"
                        onClick={() => { setFilter(OrderStatus.New.toString()); filterData(OrderStatus.New.toString()); }}>
                        Mới
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="hover:bg-gray-200 rounded-md"
                        onClick={() => { setFilter(OrderStatus.Completed.toString()); filterData(OrderStatus.Completed.toString()); }}>
                        Hoàn thành
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="hover:bg-gray-200 rounded-md"
                        onClick={() => { setFilter(OrderStatus.Cancelled.toString()); filterData(OrderStatus.Cancelled.toString()); }}>
                        Đã hủy
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
           
            
        </div>
        <ItemList data={displayData} onChange={onEdit} />
    </div>
}
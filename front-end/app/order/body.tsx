"use client"
import ItemList from "@/components/item-list/item-list";
import { ORDER } from "@/components/order/constants";
import { OrderStatus } from "@/components/order/enums";
import { Order } from "@/components/order/order-model";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrderBody() {
    const [data, setData] = useState<Order[]>([]);
    const [filter, setFilter] = useState<string>("all");
    useEffect(() => {
        setData(ORDER)
    }, [ORDER]);

    const filterData = (status: string) => {
        if (status === "all") {
            setData(ORDER);
        } else
            switch (status) {
                case '0':
                    setData(ORDER.filter(order => order.orderStatus === OrderStatus.New));
                    break;
                case '1':
                    setData(ORDER.filter(order => order.orderStatus === OrderStatus.Confirmed));
                    break;
                case '2':
                    setData(ORDER.filter(order => order.orderStatus === OrderStatus.Completed));
                    break;
                case '3':
                    setData(ORDER.filter(order => order.orderStatus === OrderStatus.Cancelled));
                    break;
                default:
                    break;
            }
    };

    return <div className="p-4 space-y-5">
        <div className="h-10 flex space-x-4">
            <Button className="border hover:bg-gray-100 hover:text-neutral-900 transition-color duration-200"><Link href='/new-order'>Đơn hàng mới</Link></Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button>Bộ lọc</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="z-20 bg-secondary">
                    {/* Dropdown Menu for filter */}
                    <DropdownMenuItem
                        className="hover:bg-gray-200 rounded-md"
                        onClick={() => { setFilter('all'); filterData('all'); }}>
                        Tất cả
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="hover:bg-gray-200 rounded-md"
                        onClick={() => { setFilter(OrderStatus.New.toString()); filterData(OrderStatus.New.toString()); }}>
                        Mới
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="hover:bg-gray-200 rounded-md"
                        onClick={() => { setFilter(OrderStatus.Confirmed.toString()); filterData(OrderStatus.Confirmed.toString()); }}>
                        Đã xác nhận
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
        <ItemList data={data} />
    </div>
}
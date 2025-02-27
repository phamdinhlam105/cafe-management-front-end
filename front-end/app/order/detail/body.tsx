"use client"
import SearchButton from "@/components/item-list/search-button";
import { ORDER } from "@/components/order/constants";
import { OrderStatus } from "@/components/order/enums";
import { Order } from "@/components/order/order-model";
import { getOrderDetailColumns } from "@/components/orderDetail/column-def";
import { ORDER_DETAILS } from "@/components/orderDetail/constants";
import OrderStatusButton from "@/components/orderDetail/order-status-button";
import { OrderDetail } from "@/components/orderDetail/orderDetail-model";
import NewOrderDetailDialog from "@/components/orderDetail/orderDetail-new-dialog";
import { PROMOTIONS } from "@/components/promotion/promotion-constants";
import { Promotion } from "@/components/promotion/promotion-model";
import { DataTable } from "@/components/table/data-table";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderDetailBody() {
    const pathname = usePathname();
    const [data, setData] = useState<OrderDetail[]>([]);
    const [currentOrder, setCurrentOrder] = useState<Order>();
    const [isChanged, setIsChanged] = useState(false);
    const [search, setSearch] = useState('');
    const [chosenPromotion, setChosenPromotion] = useState<Promotion | undefined>();
    const promotions = PROMOTIONS.filter(p => p.isActive === true)
    const searchParams = useSearchParams();
    const orderId = searchParams.get("id");

    useEffect(() => {
        if (orderId) {
            const orderDetails = ORDER_DETAILS.filter(o => o.orderId === orderId);
            setData(orderDetails);
            const order = ORDER.findLast(o => o.id === orderId);
            if (order)
                setCurrentOrder(order);
        }
    }, [orderId]);

    useEffect(() => {
        if (currentOrder) {
            const orderDetails = ORDER_DETAILS.filter(o => o.orderId === currentOrder.id);
            setData(orderDetails);
        }
    }, [currentOrder, isChanged]);

    const onDelete = (id: string) => {
        console.log(id)
        setData((prev) => prev.map((item) => item.id === id ? { ...item, status: 'deleted' } : item));
    }

    const handleSearchClick = () => {
        if (search!=='none')
            setData(data.filter(item => item.productName.toLowerCase().includes(search.toLowerCase())));
        else
            if (orderId) {
                const orderDetails = ORDER_DETAILS.filter(o => o.orderId === orderId);
                setData(orderDetails);
            }
    }

    const handleSelectPromotionsClick = (value: string) => {
        if (value)
            setChosenPromotion(promotions.findLast(p => p.id === value));
        else
            setChosenPromotion(undefined)
    }

    const columns = getOrderDetailColumns({ onDelete });
    const newButton = currentOrder && currentOrder.orderStatus !== OrderStatus.Completed ? <NewOrderDetailDialog currentOrder={currentOrder} isChanged={isChanged} setIsChanged={setIsChanged} /> : null

    return <div className="p-4 space-y-4">
        <div className="flex justify-between mb-10">
            <SearchButton search={search} setSearch={setSearch} handleSearchClick={handleSearchClick} />
            <OrderStatusButton status={currentOrder ? OrderStatus[currentOrder.orderStatus] : ''} />
            <Select onValueChange={handleSelectPromotionsClick}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Chọn khuyến mãi" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Khuyến mãi</SelectLabel>
                        {promotions.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                        <SelectItem value="none">Không khuyến mãi</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            {newButton}
        </div>

        <div className="flex items-center space-x-6 text-xl justify-between px-10">
            <h2>Tổng giá: <span className="text-gray-600">
                {data.reduce((acc, od) => acc + Number(od.total), 0).toLocaleString()} đ
            </span></h2>
            {
                chosenPromotion && <>
                    <h2>Khuyến mãi: <span className="text-gray-600">
                        {(
                            data.reduce((acc, od) => acc + Number(od.total), 0) * chosenPromotion?.value / 100).toLocaleString()} đ
                    </span></h2>
                    <h2>Phải thanh toán: <span className="text-gray-600">
                        {(
                            data.reduce((acc, od) => acc + Number(od.total), 0) -
                            (data.reduce((acc, od) => acc + Number(od.total), 0) * ((chosenPromotion?.value ?? 0) / 100))
                        ).toLocaleString()} đ
                    </span></h2>
                </>
            }


        </div>

        <DataTable columns={columns} data={data} onDelete={onDelete} />
    </div>
}
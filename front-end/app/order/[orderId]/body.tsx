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
import { DataTable } from "@/components/table/data-table";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderDetailBody() {
    const pathname = usePathname();
    const [data, setData] = useState<OrderDetail[]>([]);
    const [currentOrder, setCurrentOrder] = useState<Order>();
    const [isChanged, setIsChanged] = useState(false);
    const [search, setSearch] = useState('');

    const match = pathname.match(/\/order\/([a-zA-Z0-9_-]+)/);

    useEffect(() => {
        if (match) {
            const orderId = match[1];
            const orderDetails = ORDER_DETAILS.filter(o => o.order.id === orderId);
            setData(orderDetails);
            const order = ORDER.findLast(o => o.id === orderId);
            if (order)
                setCurrentOrder(order);
        }
    }, [pathname]);

    useEffect(() => {
        if (currentOrder) {
            const orderDetails = ORDER_DETAILS.filter(o => o.order.id === currentOrder.id);
            setData(orderDetails);
        }
    }, [currentOrder, isChanged]);

    const onDelete = (id: string) => {
        console.log(id)
        setData((prev) => prev.map((item) => item.id === id ? { ...item, status: 'deleted' } : item));
    }

    const handleSearchClick = () => {
        if (search)
            setData(data.filter(item => item.productName.toLowerCase().includes(search.toLowerCase())));
        else
            if (match) {
                const orderId = match[1];
                const orderDetails = ORDER_DETAILS.filter(o => o.order.id === orderId);
                setData(orderDetails);
            }
    }

    const columns = getOrderDetailColumns({ onDelete });
    const newButton = currentOrder && currentOrder.orderStatus !== OrderStatus.Completed ? <NewOrderDetailDialog currentOrder={currentOrder} isChanged={isChanged} setIsChanged={setIsChanged} /> : null

    return <div className="p-4 space-y-4">
        <div className="flex justify-between">
            <SearchButton search={search} setSearch={setSearch} handleSearchClick={handleSearchClick} />
            <OrderStatusButton status={currentOrder?OrderStatus[currentOrder.orderStatus]:''}/>
            {newButton}
        </div>
        <DataTable columns={columns} data={data} onDelete={onDelete} />
    </div>
}
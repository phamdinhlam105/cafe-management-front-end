"use client"
import { ORDER } from "@/components/order/constants";
import { OrderStatus } from "@/components/order/enums";
import { Order } from "@/components/order/order-model";
import { getOrderDetailColumns } from "@/components/orderDetail/column-def";
import { ORDER_DETAILS } from "@/components/orderDetail/constants";
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
    useEffect(() => {
        if (pathname) {
            const match = pathname.match(/\/order\/([a-zA-Z0-9_-]+)/);
            if (match) {
                const orderId = match[1];
                const orderDetails = ORDER_DETAILS.filter(o => o.order.id === orderId);
                setData(orderDetails);
                const order = ORDER.findLast(o => o.id === orderId);
                if (order)
                    setCurrentOrder(order);
            }
        }
    }, [pathname]);
    useEffect(() => {
        if (currentOrder) {
            const orderDetails = ORDER_DETAILS.filter(o => o.order.id === currentOrder.id);
            setData(orderDetails);
            console.log(ORDER_DETAILS)
        }
    }, [currentOrder, isChanged]);
    const onDelete = (id: string) => {
        console.log(id)
        setData((prev) => prev.map((item) => item.id === id ? { ...item, status: 'deleted' } : item));
    }
    const columns = getOrderDetailColumns({ onDelete });
    const newButton = currentOrder && currentOrder.orderStatus !== OrderStatus.Completed ? <NewOrderDetailDialog currentOrder={currentOrder} isChanged={isChanged} setIsChanged={setIsChanged} /> : null

    return <div className="p-4">
        <DataTable columns={columns} data={data} onDelete={onDelete} newButton={newButton} />
    </div>
}
"use client"
import SearchButton from "@/components/item-list/search-button";
import { OrderStatus } from "@/components/order/enums";
import { Order } from "@/components/order/order-model";
import { getOrderDetailColumns } from "@/components/orderDetail/column-def";
import OrderStatusButton from "@/components/orderDetail/order-status-button";
import { OrderDetail } from "@/components/orderDetail/orderDetail-model";
import NewOrderDetailDialog from "@/components/orderDetail/orderDetail-new-dialog";
import { Promotion } from "@/components/promotion/promotion-model";
import { getByOrderId } from "@/components/service/order-detail-service";
import { getOrderById } from "@/components/service/order-service";
import { getAllPromotion } from "@/components/service/promotion-service";
import { callWithAuth } from "@/components/service/token-handler";
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
    const [data, setData] = useState<OrderDetail[]>([]);
    const [filterData, setFilterData] = useState<OrderDetail[]>([]);
    const [currentOrder, setCurrentOrder] = useState<Order>();
    const [search, setSearch] = useState('');
    const [chosenPromotion, setChosenPromotion] = useState<Promotion | undefined>();
    const [promotions, setPromotions] = useState<Promotion[]>([]);
    const searchParams = useSearchParams();
    const orderId = searchParams.get("id");
    const [currentTotal, setCurrentTotal] = useState<{
        total: string,
        quantity: number,
        discount: string,
        realPay: string
    }>()
    const fetchOrder = async () => {
        if (orderId) {
            const result = await callWithAuth(await getOrderById(orderId));
            if (result) {
                setCurrentOrder(result);
            }
            const orderDetails = await callWithAuth(await getByOrderId(orderId));
            if (orderDetails) {
                setData(orderDetails);
            }
        }
    };

    const fetchPromotions = async () => {
        const result = await callWithAuth(await getAllPromotion);
        if (result)
            setPromotions(result);
    }


    useEffect(() => {
        if (orderId) {
            fetchOrder();
            fetchPromotions();
        }
    }, [orderId]);

    useEffect(() => {
        setFilterData(data);
    }, [data]);


    useEffect(() => {
        if (data.length > 0) {
            const total = data.reduce((acc, od) => acc + Number(od.total), 0);
            const quantity = data.reduce((acc, od) => acc + Number(od.quantity), 0);
            const discount = chosenPromotion ? (total * chosenPromotion.value / 100) : 0;
            const realPay = total - discount;

            setCurrentTotal({
                total: total.toLocaleString(),
                quantity,
                discount: discount.toLocaleString(),
                realPay: realPay.toLocaleString()
            });
        } else {
            setCurrentTotal({
                total: "0",
                quantity: 0,
                discount: "0",
                realPay: "0"
            });
        }
    }, [data, chosenPromotion]);
    const onDelete = (id: string) => {
        setData((prev) => prev.map((item) => item.id === id ? { ...item, status: 'deleted' } : item));
    }

    const handleSearchClick = () => {
        if (search)
            setFilterData(data.filter(item => item.productName.toLowerCase().includes(search.toLowerCase())));
        else
            if (orderId) {

                setFilterData(data);
            }
    }

    const handleSelectPromotionsClick = (value: string) => {
        if (value)
            setChosenPromotion(promotions.findLast(p => p.id === value));
        else
            setChosenPromotion(undefined)
    }

    const onEdit = (updatedOrderDetail: OrderDetail) => {
        setData(prev => {
            const exists = prev.some(cat => cat.id === updatedOrderDetail.id);
            return exists
                ? prev.map(cat => (cat.id === updatedOrderDetail.id ? updatedOrderDetail : cat))
                : [...prev, updatedOrderDetail];
        });

    }
    const columns = getOrderDetailColumns({ onDelete });
    const newButton = currentOrder && currentOrder.orderStatus !== OrderStatus.Completed ?
        <NewOrderDetailDialog
            currentOrder={currentOrder}
            onEdit={onEdit} /> : null;

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
                {currentTotal?.total} đ
            </span></h2>
            {
                chosenPromotion && <>
                    <h2>Khuyến mãi: <span className="text-gray-600">
                        {currentTotal?.discount} đ
                    </span></h2>
                    <h2>Phải thanh toán: <span className="text-gray-600">
                        {currentTotal?.realPay} đ
                    </span></h2>
                </>
            }


        </div>

        <DataTable columns={columns} data={filterData} onDelete={onDelete} />
    </div>
}
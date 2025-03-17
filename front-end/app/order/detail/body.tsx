"use client"
import SearchButton from "@/components/item-list/search-button";
import { OrderStatus } from "@/components/order/enums";
import { Order } from "@/components/order/order-model";
import { getOrderDetailColumns } from "@/components/orderDetail/column-def";
import OrderStatusButton from "@/components/orderDetail/order-status-button";
import { OrderDetail } from "@/components/orderDetail/orderDetail-model";
import NewOrderDetailDialog from "@/components/orderDetail/orderDetail-new-dialog";
import { Promotion } from "@/components/promotion/promotion-model";
import { cancelOrderService, finishOrderService, getOrderById } from "@/components/service/order-service";
import { getAllPromotion } from "@/components/service/promotion-service";
import { callWithAuth } from "@/components/service/token-handler";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function OrderDetailBody() {
    const [data, setData] = useState<OrderDetail[]>([]);
    const [filterData, setFilterData] = useState<OrderDetail[]>([]);
    const [currentOrder, setCurrentOrder] = useState<Order>();
    const [search, setSearch] = useState('');
    const [chosenPromotion, setChosenPromotion] = useState<Promotion | undefined>();
    const [promotions, setPromotions] = useState<Promotion[]>([]);
    const searchParams = useSearchParams();
    const orderId = searchParams.get("id");
    const route = useRouter();
    const [currentTotal, setCurrentTotal] = useState<{
        total: string,
        quantity: number,
        discount: string,
        realPay: string
    }>()

    const fetchOrder = async () => {
        if (orderId) {
            const result = await callWithAuth(() => getOrderById(orderId));
            if (!result.error) {
                setCurrentOrder(result);
                setData(result.details);

            }
            else {
                toast.error("Không thể lấy thông tin đơn hàng", { description: `Lỗi ${result.error}` });
                route.push("/order");
            }
        }
    };

    const fetchPromotions = async () => {
        const result = await callWithAuth(getAllPromotion);
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
        console.log(data)
    }, [data]);


    useEffect(() => {
        if (data && chosenPromotion)
            if (data.length > 0) {
                const total = data.reduce((acc, od) => acc + Number(od.total), 0);
                const quantity = data.reduce((acc, od) => acc + Number(od.quantity), 0);
                const discount = chosenPromotion ? (total * chosenPromotion.discount / 100) : 0;
                const realPay = total - discount;

                setCurrentTotal({
                    total: total.toLocaleString(),
                    quantity: quantity,
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
        if (value != 'none' || value == null)
            setChosenPromotion(promotions.findLast(p => p.id === value));
        else
            setChosenPromotion(undefined)
    }

    const onEdit = () => {
        if (orderId)
            fetchOrder;
    }
    const columns = getOrderDetailColumns({ onDelete, onEdit, status: currentOrder?.status ?? 0  });
    const NewButton = ({ currentOrder,onEdit }: { currentOrder: Order,onEdit: ()=>void }) => {
        return currentOrder.status !== OrderStatus.Completed ?
            <NewOrderDetailDialog
                currentOrder={currentOrder}
                onEdit={onEdit} /> : undefined;
    }

 

    const finishOrder = async () => {

        if (!currentOrder || !currentOrder.id) return null;

        const isConfirmed = window.confirm("Bạn có chắc chắn thanh toán đơn hàng này không?");
        if (!isConfirmed) return;
        const result = await callWithAuth(() => finishOrderService(currentOrder.id || ""));
        if (!result.error) {
            toast.success("Đơn hàng đã hoàn thành!");
            fetchOrder();
        } else {
            toast.error("Hoàn thành đơn hàng thất bại", { description: result.error });
        }
    }

    const cancelOrder = async () => {

        if (!currentOrder || !currentOrder.id) return null;

        const isConfirmed = window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?");
        if (!isConfirmed) return;


        const result = await callWithAuth(() => cancelOrderService(currentOrder.id || ""))
        if (result == null) {
            fetchOrder();
            toast("Hủy đơn thành công")
        }
        else {
            toast.error("Hủy đơn thất bại", { description: result.error });
            return null
        }
    }

    return <div className="p-4 space-y-4">
        <div className="flex justify-between mb-10">
            <SearchButton search={search} setSearch={setSearch} handleSearchClick={handleSearchClick} />
            {currentOrder && <OrderStatusButton status={currentOrder.status} finishOrder={finishOrder}/>}
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
            {currentOrder && <NewButton currentOrder={currentOrder} onEdit={onEdit} />}
        </div>

        <div className="flex items-center space-x-6 text-xl justify-between">
            <h2>Tổng giá: <span className="text-gray-600">
                {currentTotal?.total || "0"} đ
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
            <Button variant="destructive" 
            disabled={currentOrder?.status!=0}
            onClick={cancelOrder} 
            className="w-28">Hủy đơn</Button>
        </div>


        {filterData ? <DataTable columns={columns} data={filterData} onDelete={onDelete} /> : "Đang tải dữ liệu"}
    </div>
}
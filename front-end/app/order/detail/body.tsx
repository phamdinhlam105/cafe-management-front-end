"use client"
import { OrderStatus } from "@/components/helper/enums";
import OrderStatusButton from "@/components/order-components/orderDetail/order-status-button";
import { OrderDetail } from "@/components/model/order/orderDetail-model";
import NewOrderDetailDialog from "@/components/order-components/orderDetail/orderDetail-new-dialog";
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
import { Order } from "@/components/model/order/order-model";
import { Promotion } from "@/components/model/promotion/promotion-model";
import { getOrderDetailColumns } from "@/components/column-def/order/orderDetail-columns";
import { generatePdf } from "@/components/helper/billing/exportPdf";

export default function OrderDetailBody() {
    const [data, setData] = useState<OrderDetail[]>([]);
    const [currentOrder, setCurrentOrder] = useState<Order>();
    const [chosenPromotion, setChosenPromotion] = useState<Promotion | undefined>();
    const [promotions, setPromotions] = useState<Promotion[]>([]);
    const [total, setTotal] = useState('');
    const searchParams = useSearchParams();
    const orderId = searchParams.get("id");
    const route = useRouter();
    const [promotionApply, setPromotionApply] = useState({
        discount: "0",
        realPay: "0",
    });

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
        if (data) {
            // Tính tổng giá trị của tất cả các chi tiết đơn hàng (không có khuyến mãi)
            const totalAmount = data.reduce((acc, od) => acc + Number(od.total), 0);

            // Cập nhật total vào useState riêng biệt
            setTotal(totalAmount.toLocaleString());

            // Nếu có khuyến mãi, tính discount và realPay
            if (chosenPromotion) {
                const discount = (totalAmount * chosenPromotion.discount) / 100;
                const realPay = totalAmount - discount;

                setPromotionApply({
                    discount: discount.toLocaleString(),
                    realPay: realPay.toLocaleString(),
                });
            } else {
                setPromotionApply({
                    discount: "0",
                    realPay: totalAmount.toLocaleString(),
                });
            }
        } else {
            setPromotionApply({
                discount: "0",
                realPay: "0",
            });
            setTotal("0");
        }
    }, [data, chosenPromotion]);
    const onDelete = (id: string) => {

    }

    const handleSelectPromotionsClick = (value: string) => {
        if (value != 'none' || value == null)
            setChosenPromotion(promotions.findLast(p => p.id === value));
        else
            setChosenPromotion(undefined)
    }

    const onEdit = async () => {
        if (orderId)
            await fetchOrder();
    }
    const columns = getOrderDetailColumns({ onDelete, onEdit, status: currentOrder?.status ?? 0 });
    const NewButton = ({ currentOrder, onEdit }: { currentOrder: Order, onEdit: () => void }) => {
        return currentOrder.status !== OrderStatus.Completed ?
            <NewOrderDetailDialog
                currentOrder={currentOrder}
                onEdit={onEdit} /> : undefined;
    }



    const finishOrder = async () => {

        if (!currentOrder || !currentOrder.id) return null;

        const isConfirmed = window.confirm("Bạn có chắc chắn thanh toán đơn hàng này không?");
        if (!isConfirmed) return;
        {/*const result = await callWithAuth(() => finishOrderService(currentOrder.id || ""));
        if (!result.error) {
            await callWithAuth(() => generatePdf(currentOrder));
            toast.success("Đơn hàng đã hoàn thành!");
            onEdit();
        } else {
            toast.error("Hoàn thành đơn hàng thất bại", { description: result.error });
        }*/}
        await generatePdf(currentOrder);
    }

    const cancelOrder = async () => {

        if (!currentOrder || !currentOrder.id) return null;

        const isConfirmed = window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?");
        if (!isConfirmed) return;


        const result = await callWithAuth(() => cancelOrderService(currentOrder.id || ""))
        if (!result.error) {
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

            <div className="text-xl uppercase border p-2 rounded-sm">Bàn số <span>{currentOrder?.no}</span></div>
            {currentOrder && <OrderStatusButton status={currentOrder.status} finishOrder={finishOrder} />}
            {currentOrder?.status == 0 &&
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
                </Select>}
            {currentOrder && <NewButton currentOrder={currentOrder} onEdit={onEdit} />}
        </div>

        <div className="flex items-center space-x-6 text-xl justify-between">
            <h2>Tổng giá: <span className="text-gray-600">
                {total || "0"} đ
            </span></h2>
            {
                chosenPromotion && <>
                    <h2>Khuyến mãi: <span className="text-gray-600">
                        {promotionApply?.discount} đ
                    </span></h2>
                    <h2>Phải thanh toán: <span className="text-gray-600">
                        {promotionApply?.realPay} đ
                    </span></h2>
                </>
            }
            <Button variant="destructive"
                disabled={currentOrder?.status != 0}
                onClick={cancelOrder}
                className="w-28">Hủy đơn</Button>
        </div>


        {data ? <DataTable columns={columns} data={data} /> : "Đang tải dữ liệu"}
    </div>
}
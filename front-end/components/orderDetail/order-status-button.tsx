"use client"
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function OrderStatusButton({ status, finishOrder }: { status: number, finishOrder: () => void }) {

    const [currentStatus, setCurrentStatus] = useState('');
    useEffect(() => {
        const statusMap = [
            'Đơn hàng mới',
            'Đơn hàng đã hoàn thành',
            'Đơn hàng đã hủy'
        ];
        setCurrentStatus(statusMap[status] || 'Không xác định');
    }, [status]);

    return <div className="flex items-center space-x-3">
        <h2 className="text-lg"> Trạng thái:
            <span className="uppercase font-bold text-red-700"> {currentStatus}</span>
        </h2>
        <Button
            onClick={finishOrder}
            disabled={status !== 0}
            variant="outline"
            className="text-xl">
            {status == 0 ? 'Thanh toán' : 'Đã hoàn thành'}
        </Button>
    </div>
}
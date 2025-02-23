"use client"
import { PROMOTIONS } from "@/components/promotion/promotion-constants"
import { Promotion } from "@/components/promotion/promotion-model"
import { getPromotionScheduleColumns } from "@/components/promotion/schedule-columns";
import { PROMOTION_SCHEDULES } from "@/components/promotion/schedule-constants";
import { PromotionSchedule } from "@/components/promotion/schedule-model";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useState } from "react"

export default function PromotionBody() {

    const [data, setData] = useState<Promotion[]>(PROMOTIONS);
    const [chosenPromotion, setChosenPromotion] = useState<Promotion | undefined>(PROMOTIONS[0]);
    const [schedule, setSchedule] = useState<PromotionSchedule[]>(PROMOTION_SCHEDULES.filter(ps => ps.promotion === chosenPromotion));
    const handlechosenPromotion = (id: string) => {
        setChosenPromotion(data.findLast(p => p.id === id))
        setSchedule(PROMOTION_SCHEDULES.filter(ps => ps.promotion === chosenPromotion));
    }
    const onDelete = (idRow: string) => {

    }
    const columns = getPromotionScheduleColumns();
    return <div className="p-4 space-y-5">
        <div className="flex space-x-2 items-center w-full">
            <Label className="block text-md font-medium text-gray-700">Tên khuyến mãi</Label>
            <DropdownMenu>
                <DropdownMenuTrigger className="border rounded-sm p-2 w-48">{chosenPromotion?.name}</DropdownMenuTrigger>
                <DropdownMenuContent className="border rounded-sm shadow-md bg-neutral-50 w-48">
                    {data.map(p => <DropdownMenuItem key={p.id}>
                        <Button
                            variant="ghost"
                            onClick={() => handlechosenPromotion(p.id)}>{p.name}</Button>
                    </DropdownMenuItem>)}
                </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" className="">Tạo mới</Button>
        </div>
        <div className="flex space-x-4">
            <Label className="block text-md font-medium text-gray-700">Mô tả</Label>
            <div>{chosenPromotion?.description}</div>
        </div>
        <div className="flex space-x-4">
            <Label className="block text-md font-medium text-gray-700">Trạng thái</Label>
            <div>{chosenPromotion?.isActive ? 'Đang áp dụng' : 'Chưa áp dụng'}</div>
        </div>
        <Button>Thêm lịch trình</Button>
        <DataTable columns={columns} data={schedule} onDelete={onDelete} />
        
    </div>
}

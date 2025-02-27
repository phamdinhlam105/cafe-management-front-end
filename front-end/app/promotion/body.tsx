"use client"
import NewPromotion from "@/components/promotion/new-promotion";
import NewPromotionSchedule from "@/components/promotion/new-schedule";
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

import { useEffect, useState } from "react"

export default function PromotionBody() {

    const [data, setData] = useState<Promotion[]>(PROMOTIONS);
    const [chosenPromotion, setChosenPromotion] = useState<Promotion>(PROMOTIONS[0]);
    const [schedule, setSchedule] = useState<PromotionSchedule[]>(PROMOTION_SCHEDULES.filter(ps => ps.promotion === chosenPromotion));
    const handlechosenPromotion = (id: string) => {
        const newPromotion = data.findLast(p => p.id === id);
        if (newPromotion)
            setChosenPromotion(newPromotion);
        setSchedule(PROMOTION_SCHEDULES.filter(ps => ps.promotion === chosenPromotion));
    }

    useEffect(() => setSchedule(PROMOTION_SCHEDULES.filter(ps => ps.promotion === chosenPromotion))
        , [chosenPromotion])
    const onDelete = (idRow: string) => {

    }
    const columns = getPromotionScheduleColumns();
    return <div className="p-4 space-y-5">
        <div className="flex justify-between items-center w-full">
            <div className="flex space-x-4 items-center">
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
            </div>

            <NewPromotion />
        </div>
        <div className="flex space-x-4">
            <Label className="block text-md font-medium text-gray-700">Mô tả</Label>
            <div>{chosenPromotion?.description}</div>
        </div>
        <div className="flex space-x-4">
            <Label className="block text-md font-medium text-gray-700">Trạng thái</Label>
            <div>{chosenPromotion?.isActive ? 'Đang áp dụng' : 'Chưa áp dụng'}</div>
        </div>
        <NewPromotionSchedule idPromotion={chosenPromotion?.id} />
        <h2 className="mt-10 text-xl font-bold text-center">Lịch trình áp dụng khuyến mãi</h2>
        <DataTable columns={columns} data={schedule} onDelete={onDelete} />

    </div>
}

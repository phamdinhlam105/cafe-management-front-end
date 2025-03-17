"use client"
import NewPromotion from "@/components/promotion/new-promotion";
import NewPromotionSchedule from "@/components/promotion/new-schedule";
import { Promotion } from "@/components/promotion/promotion-model"
import { getPromotionScheduleColumns } from "@/components/promotion/schedule-columns";
import { PromotionSchedule } from "@/components/promotion/schedule-model";
import { getAllPromotion, getScheduleByPromotionId } from "@/components/service/promotion-service";
import { callWithAuth } from "@/components/service/token-handler";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

import { useEffect, useState } from "react"

export default function PromotionBody() {

    const [data, setData] = useState<Promotion[]>([]);
    const [chosenPromotion, setChosenPromotion] = useState<Promotion>();
    const [schedule, setSchedule] = useState<PromotionSchedule[]>([]);
    const [isChanged, setIschanged] = useState(false);
    const fetchPromotions = async (newPromoId?: string) => {
        const result = await callWithAuth(getAllPromotion);
        if (result) {
            setData(result);
            if (newPromoId) {
                const newPromo = data.findLast(p => p.id === newPromoId);
                setChosenPromotion(newPromo ?? result[0]);
            } else if (result.length > 0 && !chosenPromotion) {
                setChosenPromotion(result[0]);
            }
        }
    };

    const fetchSchedules = async () => {
        if (chosenPromotion) {
            const result = await callWithAuth(()=> getScheduleByPromotionId(chosenPromotion.id));
            if (result)
                setSchedule(result);
        }
    }
    const handleNewPromotion = async (newPromo: Promotion) => {
        await fetchPromotions(newPromo.id);
    };

    useEffect(() => {
        fetchPromotions();
    }, []);

    useEffect(() => {
        if (chosenPromotion)
            fetchSchedules();
    }, [chosenPromotion, isChanged])

    const onDelete = (idRow: string) => {

    }
    const columns = getPromotionScheduleColumns();
    return <div className="p-4 space-y-5">
        <div className="flex justify-between items-center w-full">
            <div className="flex space-x-4 items-center">
                <Label className="block text-md font-medium text-gray-700">Tên khuyến mãi</Label>
                {chosenPromotion ?
                    <DropdownMenu>
                        <DropdownMenuTrigger className="border rounded-sm p-2 w-48">{chosenPromotion.name}</DropdownMenuTrigger>
                        <DropdownMenuContent className="border rounded-sm shadow-md bg-neutral-50 w-48">
                            {data.map(p => <DropdownMenuItem key={p.id}>
                                <Button
                                    onClick={() => setChosenPromotion(p)}
                                    variant="ghost">
                                    {p.name}</Button>
                            </DropdownMenuItem>)}
                        </DropdownMenuContent>
                    </DropdownMenu> : "Đang load dữ liệu"}
            </div>

            <NewPromotion onNewPromotion={handleNewPromotion} />
        </div>
        <div className="flex space-x-4">
            <Label className="block text-md font-medium text-gray-700">Mô tả</Label>
            <div>{chosenPromotion ? chosenPromotion.description : "Đang load dữ liệu"}</div>
        </div>
        <div className="flex space-x-4">
            <Label className="block text-md font-medium text-gray-700">Trạng thái</Label>
            {chosenPromotion ? <div>{chosenPromotion.isActive ? 'Đang áp dụng' : 'Chưa áp dụng'}</div> : "Đang load dữ liệu"}
        </div>
        <div className="flex space-x-4">
            <Label className="block text-md font-medium text-gray-700">Chiết khấu: </Label>
            {chosenPromotion ? <div>{chosenPromotion.discount}%</div> : "Đang load dữ liệu"}
        </div>
        {chosenPromotion ? <NewPromotionSchedule chosenPromotion={chosenPromotion} setIschanged={setIschanged} /> : ''}
        <h2 className="mt-10 text-xl font-bold text-center">Lịch trình áp dụng khuyến mãi</h2>
        <DataTable columns={columns} data={schedule} onDelete={onDelete} />
    </div>
}

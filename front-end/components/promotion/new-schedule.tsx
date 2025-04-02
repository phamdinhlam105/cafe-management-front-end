import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import React, { SetStateAction, useEffect, useState } from "react"
import { DatePicker } from "../date-picker"
import { toast } from "sonner"
import { Promotion } from "@/components/model/promotion/promotion-model"
import { callWithAuth } from "../service/token-handler"
import { addSchedule } from "../service/promotion-service"
import { formatDate } from "../helper/date-to-string"


export default function NewPromotionSchedule({ chosenPromotion, setIschanged }: {
    chosenPromotion: Promotion,
    setIschanged: React.Dispatch<React.SetStateAction<boolean>>
}) {

    const [startDate, setStartDate] = useState<Date>(new Date);
    const [endDate, setEndDate] = useState<Date>(new Date);
    const [note, setNote] = useState('');
    const [isOpen, setIsOpen] = useState(false);


 
    const handleSave = async () => {

        if (!startDate || !endDate) {
            toast.warning("Ngày bắt đầu và ngày kết thúc không được bỏ trống");
            return;
        }

        if (note.trim() === '') {
            toast.warning("Ghi chú không được bỏ trống");
            return;
        }

        if (endDate < startDate) {
            toast.warning("Ngày kết thúc không thể trước ngày bắt đầu");
            return;
        }

        if (endDate < new Date) {
            toast.warning("Ngày kết thúc không thể trước ngày hôm nay");
            return;
        }

        const newSchedule = {
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
            note: note,
            promotionId:chosenPromotion.id
        };
        const result = await callWithAuth(() => addSchedule(newSchedule));
        if (!result.error) {
            setIschanged(prev => !prev);
            setIsOpen(false);
            toast.success("Tạo lịch trình thành công", {
                description: `Tạo lịch trình cho ${note} thành công`,
                duration: 3000
            })
        }
        else {
            toast.error("Tạo lịch trình thất bại", { description: `Lỗi khi tạo lịch trình: ${result.error}` })
        }

    }

    return <Collapsible open={isOpen} onOpenChange={setIsOpen} >
        <CollapsibleTrigger asChild>
            <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? "Hủy" : "Thêm lịch trình"}
            </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 border p-4 rounded-md transition-transform duration-200">
            <h2>Tạo lình trình mới cho {chosenPromotion.name}</h2>
            <div className="grid gap-4 transition-transform duration-200">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right w-20">Ngày bắt đầu</Label>
                    <DatePicker date={startDate} setDate={setStartDate} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right w-20">Ngày kết thúc</Label>
                    <DatePicker date={endDate} setDate={setEndDate} />
                </div>
                <div className="flex items-center gap-4">
                    <Label className="text-right w-20">Ghi chú:</Label>
                    <Input value={note} onChange={(e) => setNote(e.target.value)} />
                </div>
            </div>
            <div className="mt-4 flex justify-end">
                <Button type="submit" onClick={handleSave}>
                    Áp dụng
                </Button>
            </div>
        </CollapsibleContent>
    </Collapsible>
}
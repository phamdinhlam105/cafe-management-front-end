import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { PromotionSchedule } from "./schedule-model"
import { SetStateAction, useState } from "react"
import { PROMOTIONS } from "./promotion-constants"
import { DatePicker } from "../date-picker"
import { PROMOTION_SCHEDULES } from "./schedule-constants"
import { toast } from "sonner"


export default function NewPromotionSchedule({ idPromotion }: {
    idPromotion: string
}) {

    const [startDate, setStartDate] = useState<Date>(new Date);
    const [endDate, setEndDate] = useState<Date>(new Date);
    const [note, setNote] = useState('');
    const currentPromotion = PROMOTIONS.findLast(p => p.id === idPromotion)
    const [isOpen, setIsOpen] = useState(false);

    const handleSave = () => {
        if (currentPromotion) {
            const newSchedule: PromotionSchedule = {
                id: (PROMOTION_SCHEDULES.length + 1).toString(),
                promotion: currentPromotion,
                startDate: startDate.toLocaleDateString(),
                endDate: endDate.toLocaleDateString(),
                note: note,
            };
            PROMOTION_SCHEDULES.push(newSchedule);
            setIsOpen(false);
            toast.success("Tạo lịch trình thành công",{
                description:`Tạo lịch trình cho ${note} thành công`,
                duration: 3000
            })
        }

    }

    return <Collapsible open={isOpen} onOpenChange={setIsOpen} >
        <CollapsibleTrigger asChild>
            <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? "Hủy" : "Thêm lịch trình"}
            </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 border p-4 rounded-md transition-transform duration-200">
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
"use client"
import { DateTimePicker24h } from "@/components/datetime-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function ImportStockBody() {

    const [userName, setUserName] = useState('');
    const [date,setDate] = useState<Date>(new Date());
    return <div className="p-5 space-y-5">
        <div className="flex items-center">
            <Label className="text-md w-1/4">Người nhập kho</Label>
            <Input
                id="name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="mt-1"
                placeholder="Tên nhân viên nhập kho"
            />
        </div>
        <div className="flex items-center">
        <Label className="text-md w-1/4">Thời điểm nhập kho: </Label>
            <DateTimePicker24h date={date} setDate={setDate}/>
        </div>
    </div>
}
"use client"

import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { FormEvent, useState } from "react"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Ingredient } from "./ingredient-model"
import { toast } from "sonner"
import { callWithAuth } from "../service/token-handler"
import { addIngredient } from "../service/ingredient-service"
export default function NewIngredient({ onEdit }: { onEdit: (updatedIngredient: Ingredient) => void }) {
    const [name, setName] = useState("")
    const [measurement, setMeasurement] = useState("")
    const [pictureUrl, setPictureUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSave = async (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);
        if (!name || !measurement) {
            toast("Vui lòng điền đủ thông tin bắt buộc", {
                description: "Hãy điền đầy đủ tên và đơn vị đo lường"
            })
            return;
        }

        const newIngredient = {
            name: name,
            measurementUnit: measurement,
            pictureUrl: pictureUrl ? pictureUrl : null
        }

        const result = await callWithAuth(() => addIngredient(newIngredient));
        if (!result.error) {
            onEdit(result);
            toast("Thêm nguyên liệu thành công");
            setName("");
            setMeasurement("");
            setPictureUrl("");
        }

        else
            toast("Thêm nguyên liệu thất bại");
        setLoading(false);
    }


    return <Dialog >
        <DialogTrigger asChild>
            <Button className="text-white">Thêm nguyên liệu</Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
            <DialogHeader>
                <DialogTitle>Thêm mới nguyên liệu</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
                <div>
                    <Label>Tên nguyên liệu</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <Label>Đơn vị tính</Label>
                    <Input value={measurement} onChange={(e) => setMeasurement(e.target.value)} />
                </div>
                <div>
                    <Label>Ảnh</Label>
                    <Input value={pictureUrl} onChange={(e) => setPictureUrl(e.target.value)} />
                </div>
                {pictureUrl ? <img src={pictureUrl} /> : "Không có ảnh"}
            </div>
            <DialogFooter>
                <Button disabled={loading} variant="outline" type="submit">Hủy</Button>
                <Button disabled={loading} type="submit" onClick={handleSave}>Lưu</Button>
                {loading ? "Đang thêm dữ liệu" : undefined}
            </DialogFooter>
        </DialogContent>
    </Dialog>
}
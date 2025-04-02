"use client"

import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { ChangeEvent, FormEvent, useState } from "react"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Ingredient } from "@/components/model/stock/ingredient-model"
import { toast } from "sonner"
import { callWithAuth } from "../service/token-handler"
import { addIngredient } from "../service/ingredient-service"
export default function NewIngredient({ onEdit }: { onEdit: (updatedIngredient: Ingredient) => void }) {
    const [newIngredient, setNewIngredient] = useState({ name: "", measurementUnit: "", pictureURL: "" })
    const [loading, setLoading] = useState(false);
    const handleSave = async (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);
        if (!newIngredient.name || !newIngredient.measurementUnit) {
            toast("Vui lòng điền đủ thông tin bắt buộc", {
                description: "Hãy điền đầy đủ tên và đơn vị đo lường"
            })
            return;
        }


        const result = await callWithAuth(() => addIngredient(newIngredient));
        if (!result.error) {
            onEdit(result);
            toast("Thêm nguyên liệu thành công");
        }

        else
            toast("Thêm nguyên liệu thất bại");
        setLoading(false);
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewIngredient(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
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
                    <Input name="name" value={newIngredient.name} onChange={handleInputChange} />
                </div>
                <div>
                    <Label>Đơn vị tính</Label>
                    <Input name="measurementUnit" value={newIngredient.measurementUnit} onChange={handleInputChange} />
                </div>
                <div>
                    <Label>Ảnh</Label>
                    <Input name="pictureURL" value={newIngredient.pictureURL} onChange={handleInputChange} />
                </div>
                {newIngredient.pictureURL ? <img src={newIngredient.pictureURL} /> : "Không có ảnh"}
            </div>
            <DialogFooter>
                <Button disabled={loading} variant="outline" type="submit">Hủy</Button>
                <Button disabled={loading} type="submit" onClick={handleSave}>Lưu</Button>
                {loading ? "Đang thêm dữ liệu" : undefined}
            </DialogFooter>
        </DialogContent>
    </Dialog>
}
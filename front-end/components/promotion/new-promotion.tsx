"use client"
import React, { FormEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { callWithAuth } from "../service/token-handler"
import { createPromotion } from "../service/promotion-service"
import { Promotion } from "@/components/model/promotion/promotion-model"

export default function NewPromotion({ onNewPromotion }: {
    onNewPromotion: (newPromo: Promotion) => void
}) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [discount, setDiscount] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const handleSave = async (e: FormEvent) => {
        e.preventDefault();
        if (!name || !discount || !description) {
            toast.warning("Không được bỏ trống các thông tin")
            return;
        }

        const newPromotion = {
            name: name,
            description: description,
            isActive: 0,
            discount: parseInt(discount)
        }
        const result = await callWithAuth(() => createPromotion(newPromotion));
        if (!result.error) {
            onNewPromotion(result);
            toast("Thêm khuyến mãi thành công", {
                description: "Đã thêm thành công khuyến mãi mới"
            });
            setName("")
            setDescription("")
            setDiscount("")
            setIsOpen(!isOpen);
        }
        else
            toast.error("Thêm khuyến mãi thất bại, hãy thử lại sau")
    }

    return (
        <Dialog defaultOpen={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="text-white">Thêm khuyến mãi</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Thêm mới khuyến mãi</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <Label>Tên khuyến mãi</Label>
                        <Input value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <Label>Mô tả</Label>
                        <Input value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div>
                        <Label>Chiết khấu (%)</Label>
                        <Input
                            type="number"
                            min="0" max="100"
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>Hủy</Button>
                    <Button type="submit" onClick={handleSave}>Lưu</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

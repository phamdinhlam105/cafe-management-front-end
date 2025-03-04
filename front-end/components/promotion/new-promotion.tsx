"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { PROMOTIONS } from "./promotion-constants"
import { toast } from "sonner"

export default function NewPromotion() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [discount, setDiscount] = useState("")
    const [open, setOpen] = useState(false)

    const handleSave = () => {
        if (!name || !discount) return

        const newPromotion = {
            id: (PROMOTIONS.length + 1).toString(),
            name,
            description,
            value: parseFloat(discount),
            isActive: false
        }

        PROMOTIONS.push(newPromotion)
        setOpen(false) 
        toast("Thêm khuyến mãi thành công",{
            description:"Đã thêm thành công khuyến mãi mới"
        }
        )
        setName("")
        setDescription("")
        setDiscount("")
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
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
                    <Button variant="outline" onClick={() => setOpen(false)}>Hủy</Button>
                    <Button onClick={handleSave}>Lưu</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

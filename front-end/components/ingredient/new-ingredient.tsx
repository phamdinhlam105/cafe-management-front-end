"use client"

import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useState } from "react"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { INGREDIENTS } from "./ingredient-constants"
import { Input } from "../ui/input"
export default function NewIngredient() {
    const [name, setName] = useState("")
    const [measurement, setMeasurement] = useState("")
    const [open, setOpen] = useState(false)

    const handleSave = () => {
            if (!name || !measurement) return
    
            const newIngredient = {
                id: (INGREDIENTS.length + 1).toString(),
                name,
                measurement
            }
    
            INGREDIENTS.push(newIngredient)
            setOpen(false) 
            setName("")
            setMeasurement("")
        }
    

    return <Dialog open={open} onOpenChange={setOpen}>
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
                
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Hủy</Button>
                <Button onClick={handleSave}>Lưu</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}
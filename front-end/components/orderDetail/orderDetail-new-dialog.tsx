// components/orderDetail/NewProductDialog.tsx
"use client";
import { useState, useEffect } from "react";
import { PRODUCTS } from "@/components/product/constants"; // Assuming you have a PRODUCTS constant
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ORDER_DETAILS } from "./constants";
import { OrderDetail } from "./orderDetail-model";
import { Order } from "../order/order-model";


export default function NewOrderDetailDialog({ currentOrder,isChanged, setIsChanged }: {
    currentOrder: Order,
    isChanged:boolean,
    setIsChanged: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(Number(selectedProduct.price));
    const [note, setNote] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const handleProductChange = (id: string) => {

        const product = PRODUCTS.findLast(p => p.id === id);
        if (product) {
            setSelectedProduct(product);
            setQuantity(1);
            setTotal(Number(product.price));
        }
    }

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const newOrderDetail: OrderDetail = {
            id: `${ORDER_DETAILS.length + 1}`,
            productName: selectedProduct.name,
            quantity: quantity.toString(),
            total: total.toString(),
            note: note,
            orderId: currentOrder.id
        };
        ORDER_DETAILS.push(newOrderDetail);
        toast("Sản phẩm đã được thêm");
        setIsChanged(!isChanged);
        setIsOpen(false);
    };
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setIsOpen(true)} className="border rounded-md py-2 px-2 hover:bg-gray-200">Thêm sản phẩm</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={e => handleSave(e)}>
                    <DialogHeader>
                        <DialogTitle>Thêm sản phẩm vào đơn hàng</DialogTitle>
                        <DialogDescription>
                            Chọn sản phẩm, nhập số lượng, ghi chú và lưu thay đổi.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="product" className="text-right">
                                Chọn sản phẩm
                            </Label>
                            <Select value={selectedProduct.id.toString()} onValueChange={value => handleProductChange(value)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Chọn sản phẩm" />
                                </SelectTrigger>
                                <SelectContent>
                                    {PRODUCTS.map((product) => (
                                        <SelectItem key={product.id} value={product.id}>
                                            {product.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="quantity" className="text-right">
                                Số lượng
                            </Label>
                            <Input
                                type="number"
                                id="quantity"
                                value={quantity}
                                onChange={(e) => {
                                    setQuantity(Number(e.target.value));
                                    setTotal(Number(e.target.value) * Number(selectedProduct.price));
                                }}
                                min={1}
                                className="col-span-3"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="total" className="text-right">
                                Tổng giá
                            </Label>
                            <Input
                                type="text"
                                id="total"
                                value={total.toString()}
                                readOnly
                                className="col-span-3"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="note" className="text-right">
                                Ghi chú
                            </Label>
                            <Input
                                type="text"
                                id="note"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Thêm sản phẩm</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

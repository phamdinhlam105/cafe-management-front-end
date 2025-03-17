"use client"

import { OrderDetail } from "./orderDetail-model";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { callWithAuth } from "../service/token-handler";
import { getAllProduct } from "../service/product-service";
import { editOrderDetails } from "../service/order-detail-service";

export default function EditOrderDetail({ detail, onEdit }: { detail: OrderDetail, onEdit: () => void }) {

    const [selectedProduct, setSelectedProduct] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [products, setProducts] = useState<Product[]>([]);
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchProducts = async () => {
        const result = await callWithAuth(getAllProduct);
        if (!result.error) {
            setProducts(result);
        }
    }
    useEffect(() => {
        fetchProducts();
    }, [])
    useEffect(() => {
        if (products.length > 0)
            setSelectedProduct(products[0].id);
    }, [products])

    const handleProductChange = (id: string) => {
        setSelectedProduct(id);
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const newOrderDetail = {
            orderId: detail.orderId,
            productId: selectedProduct,
            note: note,
            quantity: quantity
        };
        const result = await callWithAuth(() => editOrderDetails(detail.id, newOrderDetail));
        if (!result.error) {
            onEdit;
            toast("Sản phẩm đã được thêm");
        }
        else {
            toast("Thêm sản phẩm thất bại "+detail.orderId);
        }
        setLoading(false);
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="border rounded-md py-2 px-2 hover:bg-gray-200">Sửa</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={e => handleSave(e)}>
                    <DialogHeader>
                        <DialogTitle>Chỉnh sửa đơn hàng</DialogTitle>
                        <DialogDescription>
                            Chọn sản phẩm, nhập số lượng, ghi chú và lưu thay đổi.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="product" className="text-right">
                                Chọn sản phẩm
                            </Label>
                            <Select value={selectedProduct} onValueChange={value => handleProductChange(value)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Chọn sản phẩm" />
                                </SelectTrigger>
                                <SelectContent>
                                    {products ? products.map((product) => (
                                        <SelectItem key={product.id} value={product.id}>
                                            {product.name}
                                        </SelectItem>
                                    )) : "Đang load dữ liệu"}
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
                                }}
                                min={1}
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
                        <Button type="submit" onClick={handleSave} disabled={loading}>Cập nhật đơn hàng</Button>
                        {loading ? "Đang cập nhật" : undefined}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
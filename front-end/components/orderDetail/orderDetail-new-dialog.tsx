// components/orderDetail/NewProductDialog.tsx
"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Order } from "../order/order-model";
import { callWithAuth } from "../service/token-handler";
import { getAllProduct } from "../service/product-service";
import { addOrderDetail } from "../service/order-detail-service";
import { OrderDetail } from "./orderDetail-model";


export default function NewOrderDetailDialog({ currentOrder, onEdit }: {
    currentOrder: Order,
    onEdit: (updatedOrderDetail: OrderDetail) => void
}) {
    const [selectedProduct, setSelectedProduct] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchProducts = async () => {
        const result = await callWithAuth(await getAllProduct);
        if (result) {
            setProducts(result);
            setSelectedProduct(products[0].id);
        }
    }
    useEffect(() => {
        fetchProducts();
    })

    const handleProductChange = (id: string) => {
        setSelectedProduct(id);
    }

    useEffect(() => {
        setTotal(() => {
            return (Number(products.findLast(p => p.id === selectedProduct)?.price) * quantity).toString();
        })
    }, [quantity, selectedProduct])

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const newOrderDetail = {
            orderId: currentOrder.id,
            quantity: quantity,
            note: note ? note : '',
            productId: selectedProduct
        };
        const result = await callWithAuth(await addOrderDetail(newOrderDetail));
        if (result) {
            onEdit(result)
            toast("Sản phẩm đã được thêm");
        }
        else {
            toast("Thêm sản phẩm thất bại");
        }
        setLoading(false);
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="border rounded-md py-2 px-2 hover:bg-gray-200">Thêm sản phẩm</Button>
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
                            <Select value={selectedProduct} onValueChange={value => handleProductChange(value)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Chọn sản phẩm" />
                                </SelectTrigger>
                                <SelectContent>
                                    {products.map((product) => (
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
                        <Button type="submit" onClick={handleSave} disabled={!loading}>Thêm sản phẩm</Button>
                        {loading ? "Đang thêm" : undefined}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

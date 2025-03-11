
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner";
import { PRODUCTS } from "./constants";

export default function ProductEdit({ product }: { product: Product }) {
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [img, setImg] = useState(product.img);
    const [category, setCategory] = useState(product.category);
    const [categories,setCategories] = useState<Category[]>([]);

    const handleCategoryChange = (value: string) => {
        const newCategory = categories.findLast(c => c.id === value);
        if (newCategory)
            setCategory(newCategory);
    }

    const submitChange = () => {
        product.name = name;
        product.price = price;
        product.img = img;
        product.category = category;
        const edittedProduct = { id: product.id, name: name, price: price, img: img, category: category } as Product;
        const productIndex = PRODUCTS.findIndex(p => p.id === product.id);
        console.log(edittedProduct)
        if (productIndex !== -1) {
            PRODUCTS[productIndex] = edittedProduct;
            toast(`Chỉnh sửa thành công ${edittedProduct.name} ${edittedProduct.price}`);
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="py-1 px-2 items-center hover:bg-gray-300 hover:text-neutral-900 rounded-sm">Chỉnh sửa</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={submitChange}>
                    <DialogHeader>
                        <DialogTitle>Chỉnh sửa</DialogTitle>
                        <DialogDescription>
                            Chỉnh sửa thông tin sản phẩm
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Tên sản phẩm
                            </Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Giá bán
                            </Label>
                            <Input
                                type="number"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Link hình ảnh
                            </Label>
                            <Input
                                value={img ? img : ''}
                                onChange={e => setImg(e.target.value)}
                                className="col-span-3"

                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="idCategory" className="block text-sm font-medium text-gray-700">
                                Danh mục sản phẩm
                            </Label>
                            <Select value={category?.id} onValueChange={handleCategoryChange}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Chọn danh mục" />
                                </SelectTrigger>
                                <SelectContent>

                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.id}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Lưu thay đổi</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}
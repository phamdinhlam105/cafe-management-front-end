"use client"

import { PRODUCTS } from "@/components/product/constants";
import { getAllCategory } from "@/components/service/category-service";
import { addProduct } from "@/components/service/product-service";
import { callWithAuth } from "@/components/service/token-handler";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function NewProductBody() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [idCategory, setIdCategory] = useState("");
    const [img, setImg] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);



    const fetchCategories = async () => {
        const result = await callWithAuth(getAllCategory);
        if (result)
            setCategories(result);
    }

    useEffect(() => {
        fetchCategories();
    }, []);
    const handleCategoryChange = (value: string) => {
        setIdCategory(value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!name || !price || !idCategory) {
            alert('Hãy điền đầy đủ thông tin sản phẩm');
            return;
        }

        const newProductData = {
            name: name,
            price: price,
            img: img ? img : '',
            categoryId: idCategory
        };
        const fetchNewProduct = await callWithAuth(await addProduct(newProductData));
        if (fetchNewProduct) {
            toast("Thêm sản phẩm thành công", {
                description: `Sản phẩm ${name} đã được thêm thành công`
            });
            setName("");
            setPrice("");
            setIdCategory("");
        }
        else
            toast("Thêm sản phẩm thất bại", {
                description: `Không thể thêm sản phẩm. Vui lòng thử lại sau`
            });
    };

    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold">Thêm Sản Phẩm Mới</h2>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="">
                    <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Tên sản phẩm
                    </Label>
                    <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1"
                        placeholder="Nhập tên sản phẩm"
                    />
                </div>

                <div>
                    <Label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Giá sản phẩm
                    </Label>
                    <Input
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="mt-1"
                        placeholder="Nhập giá sản phẩm"
                    />
                </div>

                <div className="flex justify-between">
                    <div className="w-1/2">
                        <Label htmlFor="imgUrl" className="block text-sm font-medium text-gray-700">
                            URL ảnh sản phẩm
                        </Label>
                        <Input
                            id="imgUrl"
                            value={img}
                            onChange={(e) => setImg(e.target.value)}
                            className="mt-1"
                            placeholder="Nhập URL ảnh sản phẩm"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Label htmlFor="idCategory" className="block text-sm font-medium text-gray-700">
                            Danh mục sản phẩm
                        </Label>
                        <Select value={idCategory} onValueChange={handleCategoryChange}>
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

                <div>
                    <Button type="submit" className="w-full mt-4">
                        Thêm sản phẩm
                    </Button>
                </div>
            </form>
        </div>
    );
}

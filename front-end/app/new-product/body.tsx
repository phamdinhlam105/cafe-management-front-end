"use client"

import { getAllCategory } from "@/components/service/category-service";
import { addProduct } from "@/components/service/product-service";
import { callWithAuth } from "@/components/service/token-handler";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";


export default function NewProductBody() {

    const [newProduct, setNewProduct] = useState({ name: "", price: 0, idCategory: "", img: "" })
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
        setNewProduct(prev => ({
            ...prev,
            idCategory: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!newProduct.name || !newProduct.price || !newProduct.idCategory) {
            alert('Hãy điền đầy đủ thông tin sản phẩm');
            return;
        }


        const result = await callWithAuth(() => addProduct(newProduct));
        if (!result.error) {
            toast("Thêm sản phẩm thành công", {
                description: `Sản phẩm ${name} đã được thêm thành công`
            });
            setNewProduct({
                name: "",
                price: 0,
                idCategory: "",
                img: ""
            })
        }
        else
            toast("Thêm sản phẩm thất bại", {
                description: `Không thể thêm sản phẩm. Vui lòng thử lại sau`
            });
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewProduct(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold">Thêm Sản Phẩm Mới</h2>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="">
                    <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Tên sản phẩm
                    </Label>
                    <Input
                        name="name"
                        id="name"
                        value={newProduct.name}
                        onChange={handleInputChange}
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
                        name="price"
                        value={newProduct.price}
                        onChange={handleInputChange}
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
                            name="img"
                            value={newProduct.img}
                            onChange={handleInputChange}
                            className="mt-1"
                            placeholder="Nhập URL ảnh sản phẩm"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Label htmlFor="idCategory" className="block text-sm font-medium text-gray-700">
                            Danh mục sản phẩm
                        </Label>
                        {categories.length > 0 ?
                            <Select value={newProduct.idCategory} onValueChange={handleCategoryChange}>
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
                            </Select> : "Đang load dữ liệu"}
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

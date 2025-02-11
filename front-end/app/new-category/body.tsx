"use client"
import { CATEGORIES } from "@/components/category/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";


export default function NewCategoryBody() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [idCategory, setIdCategory] = useState("");
    const [newProduct, setNewProduct] = useState<{ name: string; price: string; idCategory: string } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleCategoryChange = (value: string) => {
        setIdCategory(value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!name || !price || !idCategory) {
            setError("Tất cả các trường đều là bắt buộc!");
            return;
        }

        const newProductData = { name, price, idCategory };
        setNewProduct(newProductData);
        setSuccess("Sản phẩm đã được thêm thành công!");

        setName("");
        setPrice("");
        setIdCategory("");
    };

    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold">Thêm Sản Phẩm Mới</h2>

            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            {newProduct && (
                <div className="mt-4 p-4 border border-gray-300 rounded-md">
                    <h3 className="font-semibold">Sản phẩm vừa thêm:</h3>
                    <p><strong>Tên sản phẩm:</strong> {newProduct.name}</p>
                    <p><strong>Giá:</strong> {newProduct.price}</p>
                    <p><strong>Danh mục:</strong> {CATEGORIES.find(category => category.id === newProduct.idCategory)?.name}</p>
                </div>
            )}

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

                <div>
                    <Label htmlFor="idCategory" className="block text-sm font-medium text-gray-700">
                        Danh mục sản phẩm
                    </Label>
                    <Select value={idCategory} onValueChange={handleCategoryChange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Chọn danh mục" />
                        </SelectTrigger>
                        <SelectContent>

                            {CATEGORIES.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
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

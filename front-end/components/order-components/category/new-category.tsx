
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { callWithAuth } from "../../service/token-handler";
import { createNewCategory } from "../../service/category-service";

export default function NewCategory({ onEdit }: { onEdit: (newCategory: Category) => void }) {

    const [loading, setLoading] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: "", description: "" })

    const submitChange = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        try {
            const { name, description } = newCategory;
            const result = await callWithAuth(() => createNewCategory(name, description));
            if (!result.error) {
                onEdit(result);
                toast.success("Thêm thành công");
            } else {
                toast.error("Có lỗi xảy ra, vui lòng thử lại!");
            }
        } catch (error) {
            console.error("Lỗi khi Thêm danh mục:", error);
            toast.error("Không thể Thêm danh mục");
        }

        setLoading(false);
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewCategory(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="py-1 px-2 items-center hover:bg-gray-300 hover:text-neutral-900 rounded-sm">Danh mục mới</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={submitChange}>
                    <DialogHeader>
                        <DialogTitle>Danh mục mới</DialogTitle>
                        <DialogDescription>
                            Điền thông tin của danh mục mới
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Tên danh mục
                            </Label>
                            <Input
                                name="name"
                                id="name"
                                value={newCategory.name}
                                onChange={handleInputChange}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Mô tả
                            </Label>
                            <Input
                                name="description"
                                id="description"
                                value={newCategory.description}
                                onChange={handleInputChange}
                                className="col-span-3"
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>Thêm</Button>
                        {loading ? "Đang tạo danh mục..." : ""}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { callWithAuth } from "../service/token-handler";
import { editCategory } from "../service/category-service";

export default function CategoryEdit({ category, onEdit }: {
    category: Category,
    onEdit: (category: Category) => void
}) {
    const [name, setName] = useState(category.name);
    const [description, setDescription] = useState(category.description);
    const [loading, setLoading] = useState(false);

    const submitChange = async (event: React.FormEvent) => {
        event.preventDefault(); 
        setLoading(true);

        try {
            const result = await callWithAuth(() => editCategory(category.id, name, description));
            if (result) {
                toast.success("Chỉnh sửa thành công");
                onEdit(result);
            } else {
                toast.error("Có lỗi xảy ra, vui lòng thử lại!");
            }
        } catch (error) {
            console.error("Lỗi khi chỉnh sửa danh mục:", error);
            toast.error("Không thể chỉnh sửa danh mục");
        }

        setLoading(false);
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
                            Chỉnh sửa thông tin danh mục
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Tên danh mục
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
                            <Label htmlFor="description" className="text-right">
                                Mô tả
                            </Label>
                            <Input
                                id="description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                className="col-span-3"
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>Lưu thay đổi</Button>
                        {loading ? "Đang lưu..." : "Lưu thay đổi"}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}
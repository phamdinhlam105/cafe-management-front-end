
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { callWithAuth } from "../service/token-handler";
import { createNewCategory, editCategory } from "../service/category-service";

export default function NewCategory({data, setData}:{
    data:Category[],
    setData:React.Dispatch<React.SetStateAction<Category[]>>
}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const submitChange = async (event: React.FormEvent) => {
        event.preventDefault(); // Ngăn form reload trang
        setLoading(true);

        try {
            const result = await callWithAuth(await createNewCategory(name, description));
            if (result) {
                toast.success("Thêm thành công");
                setData([...data, result]);
            } else {
                toast.error("Có lỗi xảy ra, vui lòng thử lại!");
            }
        } catch (error) {
            console.error("Lỗi khi Thêm danh mục:", error);
            toast.error("Không thể Thêm danh mục");
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
                        <Button type="submit" disabled={loading}>Thêm</Button>
                        {loading ? "Đang tạo danh mục..." : ""}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}
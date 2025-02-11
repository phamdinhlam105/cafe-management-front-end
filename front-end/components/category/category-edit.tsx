
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { CATEGORIES } from "../category/constants";
import { toast } from "sonner";

export default function CategoryEdit({ category }: { category: Category }) {
    const [name, setName] = useState(category.name);

    const submitChange = () => {
        const edittedcategory = { id: category.id, name: name } as Category;
        console.log(edittedcategory);
        //call api
        toast("Chỉnh sửa thành công");
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
                            Make changes to your profile here. Click save when you're done.
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
                        
                    </div>
                    <DialogFooter>
                        <Button type="submit">Lưu thay đổi</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}
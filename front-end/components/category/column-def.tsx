import ColumnHeader from "@/components/table/column-header";
import SelectCell from "@/components/table/select-cell";
import SelectHeader from "@/components/table/select-header";
import { ColumnDef } from "@tanstack/react-table";
import CategoryEdit from "./category-edit";
import { callWithAuth } from "../service/token-handler";
import { getProductsByCategoryId } from "../service/category-service";
import { useEffect, useState } from "react";



const fetchCountProducts = async (idCategory: string) => {
    const result = await callWithAuth(() => getProductsByCategoryId(idCategory));
    if (!result.error)
        return result.count();
    return 0;
}

const ProductCountCell = ({ idCategory }: { idCategory: string }) => {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        const fetchCount = async () => {
            const result = await fetchCountProducts(idCategory);
            setCount(result);
        };
        fetchCount();
    }, [idCategory]);

    return <div className="text-md text-gray-400">{count !== null ? count : "Đang tải..."}</div>;
};

export const getCategoryColumns = ({ onEdit }: {
    onEdit: (category: Category) => void;
}): ColumnDef<Category>[] => [
        {
            id: "select",
            header: ({ table }) => <SelectHeader table={table} />,
            cell: ({ row }) => <SelectCell row={row} />
        },

        {
            accessorKey: "name",
            header: ({ column }) => <ColumnHeader column={column} title="Tên" />,
            cell: ({ row }) => <div className="text-normal">{row.getValue("name")}</div>
        },

        {
            accessorKey: "products",
            header: ({ column }) => <ColumnHeader column={column} title="Số lượng sản phẩm" />,
            cell: ({ row }) => <div className="text-md text-gray-400">{row.original.products? row.original.products.length : "Không xác định"}</div>
        },
        {
            accessorKey: "description",
            header: ({ column }) => <ColumnHeader column={column} title="Mô tả" />,
            cell: ({ row }) => {
                return <div className="text-md text-gray-400">{row.getValue("description")}</div>;
            }
        },
        {
            id: "actions",
            header: () => <div className="text-sm">Hành động</div>,
            cell: ({ row }) => {
                return <div className="flex justify-center w-23 space-x-2">
                    <CategoryEdit category={row.original} onEdit={onEdit} />
                </div>
            }
        }
    ]
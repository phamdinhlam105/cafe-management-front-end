import ColumnHeader from "@/components/table/column-header";
import SelectCell from "@/components/table/select-cell";
import SelectHeader from "@/components/table/select-header";
import { ColumnDef } from "@tanstack/react-table";
import CategoryEdit from "./category-edit";
import { Button } from "../ui/button";

const onEdit = (id:string) =>{
    
}

export const getCategoryColumns = ({ onDelete }: { onDelete: (idRow: string) => void }): ColumnDef<Category>[] => [
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
        cell: ({ row }) => {
            const products = row.getValue("products") as Product[];
            return <div className="text-md text-gray-400">{products.length}</div>;
        }
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
                <CategoryEdit category={row.original}/>
                <Button
                    onClick={() => onDelete(row.original.id)}
                    className="py-1 px-2 items-center hover:bg-gray-300 hover:text-neutral-900 rounded-sm"
                >
                    Xóa
                </Button>
            </div>
        }
    }
]
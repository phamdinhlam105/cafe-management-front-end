
import ColumnHeader from "@/components/table/column-header";
import SelectCell from "@/components/table/select-cell";
import SelectHeader from "@/components/table/select-header";
import { ColumnDef } from "@tanstack/react-table";
import ProductEdit from "./product-edit";
import { Button } from "../ui/button";
import { PRODUCTS } from "./constants";


export const getProductColumns = ({ onDelete }: { onDelete: (idRow: string) => void }): ColumnDef<Product>[] => [
    {
        id: "select",
        header: ({ table }) => <SelectHeader table={table} />,
        cell: ({ row }) => <SelectCell row={row} />
    },

    {
        accessorKey: "name",
        header: ({ column }) => <ColumnHeader column={column} title="Tên sản phẩm" />,
        cell: ({ row }) => <div className="text-normal">{row.getValue("name")}</div>
    },

    {
        accessorKey: "price",
        header: ({ column }) => <ColumnHeader column={column} title="Giá bán" />,
        cell: ({ row }) => <div className="text-md text-gray-400">{row.getValue("price")}</div>
    },
    {
        accessorKey: 'img',
        header: ({ column }) => <ColumnHeader column={column} title="Ảnh sản phẩm" />,
        cell: ({ row }) => {
            if (row.getValue("img"))
                return <div className=""><img className="mx-auto object-fit w-20 w-20" src={row.getValue("img")} /></div>
            else
                return <div className="text-md text-gray-400">Sản phẩm chưa có hình</div>
        }
    },
    {
        accessorKey: "category",
        header: ({ column }) => <ColumnHeader column={column} title="Loại sản phẩm" />,
        cell: ({ row }) => {
            const category = row.getValue("category") as Category;
            return <div className="text-md text-gray-400">{category.name}</div>;
        }
    },
    {
        id: "actions",
        header: () => <div className="text-sm">Hành động</div>,
        cell: ({ row }) => {
            return <div className="flex justify-center w-23 space-x-2">
                <ProductEdit product={row.original} />
                <Button
                    onClick={() => onDelete(PRODUCTS.findIndex(p => p.id === row.original.id).toString())}
                    className="py-1 px-2 items-center hover:bg-gray-300 hover:text-neutral-900 rounded-sm"
                >
                    Xóa
                </Button>
            </div>
        }
    }
]
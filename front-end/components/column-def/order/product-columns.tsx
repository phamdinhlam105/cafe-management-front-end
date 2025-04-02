
import ProductEdit from "@/components/order-components/product/product-edit";
import ColumnHeader from "@/components/table/column-header";
import SelectCell from "@/components/table/select-cell";
import SelectHeader from "@/components/table/select-header";
import { ColumnDef } from "@tanstack/react-table";

export const getProductColumns = ({ onEdit }: {
    onEdit: (updatedProduct: Product) => void
}): ColumnDef<Product>[] => [
        {
            id: "select",
            header: ({ table }) => <SelectHeader table={table} />,
            cell: ({ row }) => <SelectCell row={row} />
        },

        {
            accessorKey: "name",
            header: ({ column }) => <ColumnHeader column={column} title="Tên sản phẩm" />,
            cell: ({ row }) => <div className="text-normal">{row.original.name}</div>
        },

        {
            accessorKey: "price",
            header: ({ column }) => <ColumnHeader column={column} title="Giá bán" />,
            cell: ({ row }) => <div className="text-md text-gray-400">{parseInt(row.original.price).toLocaleString()}</div>
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
            cell: ({ row }) =>  <div className="text-md text-gray-400">{row.original.categoryName}</div>
        },  
        {
            id: "actions",
            header: () => <div className="text-sm">Hành động</div>,
            cell: ({ row }) => {
                return <div className="flex justify-center w-23 space-x-2">
                    <ProductEdit product={row.original} onEdit={onEdit} />
                </div>
            }
        }
    ]
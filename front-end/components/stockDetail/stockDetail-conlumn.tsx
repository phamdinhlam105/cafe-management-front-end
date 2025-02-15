
import ColumnHeader from "@/components/table/column-header";
import SelectCell from "@/components/table/select-cell";
import SelectHeader from "@/components/table/select-header";
import { ColumnDef } from "@tanstack/react-table";
import { StockDetail } from "./stockDetail-model";
import { Ingredient } from "../ingredient/ingredient-model";

export const getStockDetailColumns = (): ColumnDef<StockDetail>[] => [
    {
        id: "select",
        header: ({ table }) => <SelectHeader table={table} />,
        cell: ({ row }) => <SelectCell row={row} />
    },
    {
        accessorKey: "name",
        header: ({ column }) => <ColumnHeader column={column} title="Tên nguyên liệu" />,
        cell: ({ row }) => <div className="text-md text-gray-400">{row.original.ingredient.name}</div>
    },
    
    {
        accessorKey: "measurementUnit",
        header: ({ column }) => <ColumnHeader column={column} title="Đơn vị tính" />,
        cell: ({ row }) => <div className="text-md text-gray-400">{row.original.ingredient.measurement}</div>
    },
    {
        accessorKey: "startOfDay",
        header: ({ column }) => <ColumnHeader column={column} title="Số lượng đầu ngày" />,
        cell: ({ row }) => <div className="text-normal">{row.getValue("startOfDay")}</div>
    },

    {
        accessorKey: "import",
        header: ({ column }) => <ColumnHeader column={column} title="Số lượng nhập kho" />,
        cell: ({ row }) => <div className="text-md text-gray-400">{row.getValue("import")}</div>
    },
    {
        accessorKey: "remain",
        header: ({ column }) => <ColumnHeader column={column} title="Số lượng tồn kho" />,
        cell: ({ row }) => <div className="text-md text-gray-400">{row.getValue("remain")}</div>,
    },
  
]

import ColumnHeader from "@/components/table/column-header";
import SelectCell from "@/components/table/select-cell";
import SelectHeader from "@/components/table/select-header";
import { ColumnDef } from "@tanstack/react-table";
import { Ingredient } from "./ingredient-model";

export const getIngredientColumns = (): ColumnDef<Ingredient>[] => [
    {
        id: "select",
        header: ({ table }) => <SelectHeader table={table} />,
        cell: ({ row }) => <SelectCell row={row} />
    },
    {
        accessorKey: "name",
        header: ({ column }) => <ColumnHeader column={column} title="Tên nguyên liệu" />,
        cell: ({ row }) => <div className="text-md text-gray-400">{row.original.name}</div>
    },

    {
        accessorKey: "measurementUnit",
        header: ({ column }) => <ColumnHeader column={column} title="Đơn vị tính" />,
        cell: ({ row }) => <div className="text-md text-gray-400">{row.original.measurementUnit}</div>
    },
    {
        accessorKey: "pictureURL",
        header: ({ column }) => <ColumnHeader column={column} title="Hình ảnh" />,
        cell: ({ row }) => <div className="text-md text-gray-400 flex justify-center">
            {row.original.pictureURL ? <img width={100} height={100} src={row.original.pictureURL} /> :
                "Không có hình ảnh"}
        </div>
    },
]
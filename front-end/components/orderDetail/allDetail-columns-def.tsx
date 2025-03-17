
import ColumnHeader from "@/components/table/column-header";
import SelectCell from "@/components/table/select-cell";
import SelectHeader from "@/components/table/select-header";
import { ColumnDef } from "@tanstack/react-table";
import { OrderDetail } from "./orderDetail-model";

export const getAllDetailsColumns = (): ColumnDef<OrderDetail>[] => [
        {
            id: "select",
            header: ({ table }) => <SelectHeader table={table} />,
            cell: ({ row }) => <SelectCell row={row} />
        },

        {
            accessorKey: "productName",
            header: ({ column }) => <ColumnHeader column={column} title="Tên sản phẩm" />,
            cell: ({ row }) => <div className="text-normal">{row.getValue("productName")}</div>
        },

        {
            accessorKey: "quantity",
            header: ({ column }) => <ColumnHeader column={column} title="Số lượng" />,
            cell: ({ row }) => <div className="text-md text-gray-400">{row.getValue("quantity")}</div>
        },
        {
            accessorKey: "total",
            header: ({ column }) => <ColumnHeader column={column} title="Tổng tiền" />,
            cell: ({ row }) => <div className="text-md text-gray-400">{Number(row.original.total).toLocaleString()} đ</div>,
        },
        {
            accessorKey: "note",
            header: ({ column }) => <ColumnHeader column={column} title="Ghi chú" />,
            cell: ({ row }) => <div className="text-md text-gray-400">{row.getValue("note")}</div>
        },
       
    ]
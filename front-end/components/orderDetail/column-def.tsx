
import ColumnHeader from "@/components/table/column-header";
import SelectCell from "@/components/table/select-cell";
import SelectHeader from "@/components/table/select-header";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { OrderDetail } from "./orderDetail-model";
import EditOrderDetail from "./edit-details";

export const getOrderDetailColumns = ({ onDelete, onEdit, status }: {
    onDelete: (idRow: string) => void,
    onEdit: () => void,
    status: number | undefined
}): ColumnDef<OrderDetail>[] => [
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
            cell: ({ row }) => <div className="text-md text-gray-400">{row.getValue("total")}</div>,
        },
        {
            accessorKey: "note",
            header: ({ column }) => <ColumnHeader column={column} title="Ghi chú" />,
            cell: ({ row }) => <div className="text-md text-gray-400">{row.getValue("note")}</div>
        },
        {
            id: "actions",
            header: () => <div className="text-sm">Hành động</div>,
            cell: ({ row }) => {
                return <div className="flex justify-center w-23 space-x-2">
                    {status == 0 && <>
                        <EditOrderDetail detail={row.original} onEdit={onEdit} />
                        <Button
                            onClick={() => onDelete(row.original.id)}
                            className="py-1 px-2 items-center hover:bg-gray-300 hover:text-neutral-900 rounded-sm"
                        >
                            Xóa
                        </Button></>
                    }
                </div>
            }
        }
    ]
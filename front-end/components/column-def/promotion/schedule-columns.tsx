
import ColumnHeader from "@/components/table/column-header";
import SelectCell from "@/components/table/select-cell";
import SelectHeader from "@/components/table/select-header";
import { ColumnDef } from "@tanstack/react-table";
import { PromotionSchedule } from "@/components/model/promotion/schedule-model";

export const getPromotionScheduleColumns = (): ColumnDef<PromotionSchedule>[] => [
    {
        id: "select",
        header: ({ table }) => <SelectHeader table={table} />,
        cell: ({ row }) => <SelectCell row={row} />
    },

    {
        accessorKey: "startDate",
        header: ({ column }) => <ColumnHeader column={column} title="Ngày bắt đầu" />,
        cell: ({ row }) => <div className="text-normal">{row.getValue("startDate")}</div>
    },

    {
        accessorKey: "endDate",
        header: ({ column }) => <ColumnHeader column={column} title="Ngày kết thúc" />,
        cell: ({ row }) => <div className="text-normal">{row.getValue("endDate")}</div>
    },
    {
        accessorKey: "note",
        header: ({ column }) => <ColumnHeader column={column} title="Ghi chú" />,
        cell: ({ row }) => <div className="text-normal">{row.getValue("note")}</div>,
    },
]
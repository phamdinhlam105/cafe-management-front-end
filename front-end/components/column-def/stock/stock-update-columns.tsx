
import ColumnHeader from "@/components/table/column-header";
import SelectCell from "@/components/table/select-cell";
import SelectHeader from "@/components/table/select-header";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

export const getStockUpdateColumns = (setStockData: React.Dispatch<React.SetStateAction<any[]>>): ColumnDef<any>[] => [
    {
        id: "select",
        header: ({ table }) => <SelectHeader table={table} />,
        cell: ({ row }) => <SelectCell row={row} />
    },
    {
        accessorKey: "ingredientName",
        header: ({ column }) => <ColumnHeader column={column} title="Tên nguyên liệu" />,
        cell: ({ row }) => <div className="text-md text-gray-400">{row.original.ingredientName}</div>
    },
    {
        accessorKey: "measurementUnit",
        header: ({ column }) => <ColumnHeader column={column} title="Đơn vị tính" />,
        cell: ({ row }) => <div className="text-md text-gray-400">{row.original.measurementUnit}</div>
    },
    {
        accessorKey: "oldRemain",
        header: ({ column }) => <ColumnHeader column={column} title="Số lượng tồn kho cũ" />,
        cell: ({ row }) => {
            return <div className="text-md text-gray-400">{row.original.oldStockRemain}</div>;
        }
    },
    {
        accessorKey: "newStockRemain",
        header: ({ column }) => <ColumnHeader column={column} title="Số lượng còn lại" />,
        cell: ({ row }) => {
            const handleRemainBlur = (e: React.FocusEvent<HTMLInputElement>) => {
                let newRemain = parseFloat(e.target.value) || 0;
                let newUsed = row.original.oldStockRemain - newRemain
                setStockData(prevData => prevData.map(item =>
                    item.id === row.original.id
                        ? { ...item, newStockRemain: newRemain, used: newUsed }
                        : item
                ));
            };

            return (
                <input
                    type="number"
                    className="border rounded p-1 w-full"
                    defaultValue={row.original.newStockRemain}
                    onBlur={handleRemainBlur}
                />
            );
        }
    },
    {
        accessorKey: "used",
        header: ({ column }) => <ColumnHeader column={column} title="Số lượng đã sử dụng" />,
        cell: ({ row }) => {
            const handleUsedBlur = (e: React.FocusEvent<HTMLInputElement>) => {
                let newUsed = parseFloat(e.target.value) || 0;
                if (newUsed > row.original.oldStockRemain) {
                    toast.warning("Số lượng sử dụng không thể lớn hơn số tồn kho cũ");
                    e.target.value = row.original.used
                    return;
                }
                let newRemain = row.original.oldStockRemain - newUsed;
                setStockData(prevData => prevData.map(item =>
                    item.id === row.original.id
                        ? { ...item, used: newUsed, newStockRemain: newRemain }
                        : item
                ));

            };

            return (
                <input
                    type="number"
                    className="border rounded p-1 w-full"
                    defaultValue={row.original.used}
                    onBlur={handleUsedBlur}
                />
            );
        }
    }
];
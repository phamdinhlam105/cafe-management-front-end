
import ColumnHeader from "@/components/table/column-header";
import SelectCell from "@/components/table/select-cell";
import SelectHeader from "@/components/table/select-header";
import { ColumnDef } from "@tanstack/react-table";
import { StockEntryDetail } from "@/components/model/stock/stockEntryDetail-model";
import { Input } from "@/components/ui/input";
import { StockDetail } from "@/components/model/stock/stockDetail-model";

export const getStockEntryColumn = (
    setData: React.Dispatch<React.SetStateAction<StockEntryDetail[]>>,
    toDayStock: StockDetail[]
): ColumnDef<StockEntryDetail>[] => [
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
            header: ({ column }) => <ColumnHeader column={column} title="Đơn vị" />,
            cell: ({ row }) => <div className="text-md text-gray-400">{row.original.ingredient.measurementUnit}</div>
        },

        {
            accessorKey: "price",
            header: ({ column }) => <ColumnHeader column={column} title="Giá" />,
            cell: ({ row }) => {
                const handleChange = (id: string, value: string) => {
                    setData((prevData) =>
                        prevData.map((item) =>
                            item.ingredientId === id
                                ? {
                                    ...item,
                                    price: value,
                                    totalValue: (Number(value) * Number(item.quantity || 0)).toString()
                                }
                                : item
                        )
                    );
                };

                return <div className="flex items-center">
                    <Input defaultValue={row.original.price}
                        onBlur={(e) => handleChange(row.original.ingredientId, e.target.value)}
                        type="number"
                        className="w-24" /> đ</div>;
            }
        },

        {
            accessorKey: "import",
            header: ({ column }) => <ColumnHeader column={column} title="Số lượng nhập" />,
            cell: ({ row }) => {
                const handleChange = (id: string, value: string) => {
                    setData((prevData) =>
                        prevData.map((item) =>
                            item.ingredientId === id
                                ? {
                                    ...item,
                                    quantity: Number(value),
                                    totalValue: (Number(value) * Number(item.price || 0)).toString()
                                }
                                : item
                        )
                    );
                };

                return <Input type="number" min="0"
                    defaultValue={row.original.quantity}
                    onBlur={(e) => handleChange(row.original.ingredientId, e.target.value)}
                    className="w-24" />;
            },
        },
        {
            accessorKey: "remain",
            header: ({ column }) => <ColumnHeader column={column} title="Tồn kho" />,
            cell: ({ row }) => {
                const detail = toDayStock.findLast((d) => d.ingredient.id === row.original.ingredientId);
                return <div className="text-md text-gray-400">{detail ? detail.stockRemaining : 0}</div>;
            },
        },
        {
            accessorKey: "total",
            header: ({ column }) => <ColumnHeader column={column} title="Tổng giá nhập kho" />,
            cell: ({ row }) => <div className="text-md text-gray-400">{parseInt(row.original.totalValue).toLocaleString()} đ</div>
        },
    ]
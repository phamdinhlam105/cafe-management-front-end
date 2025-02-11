import { Table } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown, Columns2, Search } from "lucide-react";
import { Input } from "../ui/input";
import React from "react";


export default function ActionsNavigation({ table, onDelete, newButton }: {
    table: Table<any>,
    onDelete: (idRow: string) => void,
    newButton: React.ReactNode
}) {

    const [search, setSearch] = React.useState('');
    const handleSearchClick = () => {
        if (table.getColumn("name"))
            table.getColumn("name")?.setFilterValue(search);
        else
            table.getColumn("productName")?.setFilterValue(search);
    }

    const removeSearchFilter = () => {
        if (table.getColumn("name"))
            table.getColumn("name")?.setFilterValue(undefined);
        else
            table.getColumn("productName")?.setFilterValue(undefined);
        setSearch('');
    }
    return (
        <div className="inline-flex items-center w-full justify-start gap-x-2 mb-3">
            <div className="w-30 relative">
                <Input
                    placeholder="Từ khóa..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)
                    }
                    className="max-w-sm"
                />
                <Button
                    variant="outline"
                    className="border-none h-8 w-8 absolute right-1 top-1 items-center flex justify-center rounded-l-sm rounded-r-md"
                    onClick={handleSearchClick}>
                    <Search />
                </Button>
            </div>
            <Button
                className="text-foreground border h-10 px-3 rounded-md "
                variant="outline"
                onClick={removeSearchFilter}>
                Xóa bộ lọc
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="borderLine w-10 h-10 items-center flex justify-center rounded-md">
                        <Columns2 />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel className="px-2 items-center py-2">
                        <p className="font-semibold text-sm">Hiện/Ẩn cột</p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {table
                        .getAllColumns()
                        .filter(
                            (column) => column.getCanHide()
                        )
                        .map((column) => {
                            if (column.id !== 'select' && column.id !== 'actions')
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                        })}
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="ml-auto">
                    <Button variant="ghost" className="h-10  text-md hover:opacity-90 hover:bg-primary hover:text-white">
                        Thao tác hàng loạt
                        <ChevronDown />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white dark:bg-neutral-900 shadow w-60 h-10 p-1 rounded-md">
                    <DropdownMenuItem
                        onClick={() => {
                            const selectedRows = table.getSelectedRowModel().rows;
                            selectedRows.forEach(row => {
                                onDelete(row.original.id);
                            });
                        }}
                        disabled={!table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
                        className="px-2 w-full items-center hover:bg-gray-200 rounded-sm text-black dark:text-white"
                    >
                        <p>Xóa các dòng đã chọn</p>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {newButton}
        </div>
    )
}
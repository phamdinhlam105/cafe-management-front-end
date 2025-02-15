"use client"
import { StockDetail } from "@/components/stockDetail/stockDetail-model";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { STOCK } from "@/components/stock/stock-constants";
import { Stock } from "@/components/stock/stock-model";
import { STOCK_DETAILS } from "@/components/stockDetail/stockDetail-constants";
import { DataTable } from "@/components/table/data-table";
import { getStockDetailColumns } from "@/components/stockDetail/stockDetail-conlumn";

export default function StockBody() {
    const [data, setData] = useState<StockDetail[]>(STOCK_DETAILS);
    const [stock,setStock] = useState<Stock>(STOCK);
    const [search, setSearch] = useState('');
    const handleSearchClick = () => {
        if(search)
            setData(data.filter(item => item.ingredient.name.includes(search)));
        else
            setData(STOCK_DETAILS);
    }
    const onDelete = (idRow:string)=>{

    }
    var columns = getStockDetailColumns();
    return <div className="p-4 space-y-5">
        <div className="h-10 flex space-x-4 items-center">
            <div className="text-md font-bold">
                Ngày: <span className="font-normal text-gray-500">{(new Date()).toDateString()}</span>
            </div>
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
                className="border hover:bg-gray-100 hover:text-neutral-900 transition-color duration-200">
                <Link href='/new-order'>Nhập kho</Link>
            </Button>
            
        </div>
        <DataTable columns={columns} data={data} onDelete={onDelete} newButton={undefined}/>
    </div>
}

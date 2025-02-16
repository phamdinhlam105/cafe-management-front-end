"use client"
import { StockDetail } from "@/components/stockDetail/stockDetail-model";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { STOCK } from "@/components/stock/stock-constants";
import { Stock } from "@/components/stock/stock-model";
import { STOCK_DETAILS } from "@/components/stockDetail/stockDetail-constants";
import { DataTable } from "@/components/table/data-table";
import { getStockDetailColumns } from "@/components/stockDetail/stockDetail-conlumn";
import SearchButton from "@/components/item-list/search-button";

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
            <SearchButton search={search} setSearch={setSearch} handleSearchClick={handleSearchClick} />
            <Button
                className="border hover:bg-gray-100 hover:text-neutral-900 transition-color duration-200">
                <Link href='/new-order'>Nhập kho</Link>
            </Button>
            <div className="text-md font-bold">
                Ngày: <span className="font-normal text-gray-500">{stock.createDate}</span>
            </div>
        </div>
        <DataTable columns={columns} data={data} onDelete={onDelete}/>
    </div>
}

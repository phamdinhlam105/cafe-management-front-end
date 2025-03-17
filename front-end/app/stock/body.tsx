"use client"
import { StockDetail } from "@/components/stockDetail/stockDetail-model";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Stock } from "@/components/stock/stock-model";
import { DataTable } from "@/components/table/data-table";
import { getStockDetailColumns } from "@/components/stockDetail/stockDetail-conlumn";
import SearchButton from "@/components/item-list/search-button";
import { callWithAuth } from "@/components/service/token-handler";
import { getDetailByDate, getTodayStock } from "@/components/service/stock-service";

export default function StockBody() {
    const [data, setData] = useState<StockDetail[]>([]);
    const [filterData, setFilterData] = useState<StockDetail[]>(data);
    const [stock, setStock] = useState<Stock>();
    const [search, setSearch] = useState('');

    const fetchStocks = async () => {
        const result = await callWithAuth(getTodayStock);
        if (result) {
            setStock(result);
            if (result.details)
                setData(result.details);
        }
    };
    useEffect(() => {
        fetchStocks();

    }, []);

    useEffect(() => {
        setFilterData(data);
    }, [data])

    const handleSearchClick = () => {
        if (search)
            setFilterData(data.filter(item => item.ingredient.name.includes(search)));
        else
            setFilterData(data);
    }
    const onDelete = (idRow: string) => {

    }
    var columns = getStockDetailColumns();
    return <div className="p-4 space-y-5">
        <div className="h-10 flex space-x-4 items-center">
            <SearchButton search={search} setSearch={setSearch} handleSearchClick={handleSearchClick} />
            <Button
                className="border hover:bg-gray-100 hover:text-neutral-900 transition-color duration-200">
                <Link href='/stock/import'>Nhập kho</Link>
            </Button>
            <div className="text-md font-bold">
                Ngày: <span className="font-normal text-gray-500">{stock?.createDate}</span>
            </div>
        </div>
        <DataTable columns={columns} data={filterData} onDelete={onDelete} />
    </div>
}

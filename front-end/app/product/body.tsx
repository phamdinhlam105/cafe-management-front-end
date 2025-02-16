"use client"
import SearchButton from "@/components/item-list/search-button";
import { getProductColumns } from "@/components/product/column-def";
import { PRODUCTS } from "@/components/product/constants";
import { DataTable } from "@/components/table/data-table";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProductBody() {

    const [data, setData] = useState(PRODUCTS);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setData(PRODUCTS);
    }, [PRODUCTS])
    const onDelete = (index: string) => {
        PRODUCTS.slice(Number(index), Number(index) + 1);
        toast("item deleted");
    }

    const handleSearchClick = () => {
        if (search)
            setData(data.filter(item => item.name.includes(search)));
        else
            setData(PRODUCTS);
    }

    const columns = getProductColumns({ onDelete });
    return <div className="p-4 space-y-4">
        <div className="flex justify-between">
            <SearchButton search={search} setSearch={setSearch} handleSearchClick={handleSearchClick} />
            <Link href="#" className="border rounded-md py-2 px-2 hover:bg-gray-200">Thêm sản phẩm</Link>
        </div>
        <DataTable columns={columns} data={data} onDelete={onDelete} />
    </div>
}
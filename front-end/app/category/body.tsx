"use client"
import { CATEGORIES } from "@/components/category/constants";
import { getCategoryColumns } from "@/components/category/column-def";
import { DataTable } from "@/components/table/data-table";
import { SetStateAction, useState } from "react";
import Link from "next/link";
import SearchButton from "@/components/item-list/search-button";

export default function CategoryBody() {
    const [data, setData] = useState(CATEGORIES);
    const [search, setSearch] = useState('');

    const handleSearchClick = () => {
        if (search)
            setData(data.filter(item => item.name.includes(search)));
        else
            setData(CATEGORIES);
    }
    const onDelete = (id: string) => {
        console.log(id)
        setData((prev) => prev.map((item) => item.id === id ? { ...item, status: 'deleted' } : item));
    }
    const columns = getCategoryColumns({ onDelete });

    return <div className="p-4 pt-10 space-y-4">
        <div className="flex justify-between">
            <SearchButton search={search} setSearch={setSearch} handleSearchClick={handleSearchClick} />
            <Link href="#" className="border rounded-md py-2 px-2 hover:bg-gray-200">Thêm danh mục</Link>
        </div>
        <DataTable columns={columns} data={data} onDelete={onDelete}/>
    </div>
}
"use client"
import { getCategoryColumns } from "@/components/category/column-def";
import { DataTable } from "@/components/table/data-table";
import { SetStateAction, useEffect, useState } from "react";
import Link from "next/link";
import SearchButton from "@/components/item-list/search-button";
import { callWithAuth } from "@/components/service/token-handler";
import { getAllCategory } from "@/components/service/category-service";

export default function CategoryBody() {
    const [data, setData] = useState<Category[]>([]);
    const [filterData, setFilterData] = useState<Category[]>([]);
    const [search, setSearch] = useState('');

    const fetchCategories = async () => {
           const result = await callWithAuth(getAllCategory);
           if (result) {
               setData(result);
           }
       };
       useEffect(() => {
        fetchCategories();
           setFilterData(data);
       }, []);

    const handleSearchClick = () => {
        if (search)
            setData(data.filter(item => item.name.includes(search)));
        else
            setData(data);
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
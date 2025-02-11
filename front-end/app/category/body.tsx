"use client"
import { CATEGORIES } from "@/components/category/constants";
import { getCategoryColumns } from "@/components/category/column-def";
import { DataTable } from "@/components/table/data-table";
import { useState } from "react";
import Link from "next/link";

export default function CategoryBody(){
    const [data, setData] = useState(CATEGORIES);
    const onDelete = (id: string) => {
        console.log(id)
        setData((prev) => prev.map((item) => item.id === id ? { ...item, status: 'deleted' } : item));
    }
    const columns = getCategoryColumns({ onDelete });

    const newButton = <Link href="#" className="border rounded-md py-2 px-2 hover:bg-gray-200">Thêm danh mục</Link>
    return <div className="p-4 pt-10">
        <DataTable columns={columns} data={data} onDelete={onDelete} newButton={newButton}/>
    </div>
}
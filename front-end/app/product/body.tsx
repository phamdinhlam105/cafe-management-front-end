"use client"
import { getProductColumns } from "@/components/product/column-def";
import { PRODUCTS } from "@/components/product/constants";
import { DataTable } from "@/components/table/data-table";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProductBody() {

    const [data, setData] = useState(PRODUCTS);

    useEffect(() => {
        setData(PRODUCTS);
    }, [PRODUCTS])
    const onDelete = (index: string) => {
        PRODUCTS.slice(Number(index), Number(index) + 1);
        toast("item deleted");
    }
    const columns = getProductColumns({ onDelete });
    console.log(PRODUCTS)
    const newButton = <Link href="/new-product" className="border rounded-md py-2 px-2 hover:bg-gray-200">Thêm sản phẩm</Link>
    return <div className="p-4">
        <DataTable columns={columns} data={data} onDelete={onDelete} newButton={newButton} />
    </div>
}
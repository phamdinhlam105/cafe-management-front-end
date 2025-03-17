"use client"
import SearchButton from "@/components/item-list/search-button";
import { getProductColumns } from "@/components/product/column-def";
import { getAllProduct } from "@/components/service/product-service";
import { callWithAuth } from "@/components/service/token-handler";
import { DataTable } from "@/components/table/data-table";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductBody() {

    const [data, setData] = useState<Product[]>([]);
    const [filterData, setFilterData] = useState<Product[]>(data);
    const [search, setSearch] = useState('');

    const fetchProduct = async () => {
        const result = await callWithAuth(getAllProduct);
        if (!result.error) {
            setData(result);
        }
    };
    useEffect(() => {
        fetchProduct();
    }, []);

    useEffect(() => {
        setFilterData(data);
    }, [data])

    const handleSearchClick = () => {
        if (search)
            setFilterData(data.filter(item => item.name.includes(search)));
        else
            setFilterData(data);
    }

    const onDelete = (idRow: string) => {

    }
    const onEdit = (updatedProduct: Product) => {
        setData(prev =>
            prev.map(cat => (cat.id === updatedProduct.id ? updatedProduct : cat))
        );
    };
    const columns = getProductColumns({ onEdit });
    return <div className="p-4 space-y-4">
        <div className="flex justify-between">
            <SearchButton search={search} setSearch={setSearch} handleSearchClick={handleSearchClick} />
            <Link href="/new-product" className="border rounded-md py-2 px-2 hover:bg-gray-200">Thêm sản phẩm</Link>
        </div>
        {filterData.length > 0 ?
            <DataTable columns={columns} data={filterData} onDelete={onDelete} /> : "Đang tải dữ liệu"}
    </div>
}
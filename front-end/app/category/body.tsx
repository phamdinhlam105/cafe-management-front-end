"use client"

import { DataTable } from "@/components/table/data-table";
import { SetStateAction, useEffect, useState } from "react";
import SearchButton from "@/components/item-list/search-button";
import { callWithAuth } from "@/components/service/token-handler";
import { getAllCategory } from "@/components/service/category-service";
import NewCategory from "@/components/order-components/category/new-category";
import { getCategoryColumns } from "@/components/column-def/order/category-columns";

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
    }, []);

    useEffect(() => {
        setFilterData(data);
    }, [data]);


    const handleSearchClick = () => {
        if (search)
            setFilterData(data.filter(item => item.name.includes(search)));
        else
        setFilterData(data);
    }

    const onEdit = (updatedCategory: Category) => {
        setData(prev => {
            const exists = prev.some(cat => cat.id === updatedCategory.id);
            return exists 
                ? prev.map(cat => (cat.id === updatedCategory.id ? updatedCategory : cat)) 
                : [...prev, updatedCategory];
        });
    };
    

    const columns = getCategoryColumns({ onEdit });

    return <div className="p-4 pt-10 space-y-4">
        <div className="flex justify-between">
            <SearchButton search={search} setSearch={setSearch} handleSearchClick={handleSearchClick} />
            <NewCategory onEdit={onEdit} />
        </div>
        <DataTable columns={columns} data={data}  />
    </div>
}
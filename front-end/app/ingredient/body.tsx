"use client"

import { getIngredientColumns } from "@/components/ingredient/ingredient-columns";
import { INGREDIENTS } from "@/components/ingredient/ingredient-constants";
import NewIngredient from "@/components/ingredient/new-ingredient";
import SearchButton from "@/components/item-list/search-button";
import { DataTable } from "@/components/table/data-table";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function IngredientBody(){

    const [data, setData] = useState(INGREDIENTS);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setData(INGREDIENTS);
    }, [INGREDIENTS])
    const onDelete = (index: string) => {
        INGREDIENTS.slice(Number(index), Number(index) + 1);
        toast("item deleted");
    }

    const handleSearchClick = () => {
        if (search)
            setData(data.filter(item => item.name.includes(search)));
        else
            setData(INGREDIENTS);
    }

    const columns = getIngredientColumns();
    return <div className="p-4 space-y-4">
        <div className="flex justify-between">
            <SearchButton search={search} setSearch={setSearch} handleSearchClick={handleSearchClick} />
           <NewIngredient/>
        </div>
        <DataTable columns={columns} data={data} onDelete={onDelete} />
    </div>
}
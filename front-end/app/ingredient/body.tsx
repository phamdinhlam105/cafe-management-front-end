"use client"

import { getIngredientColumns } from "@/components/ingredient/ingredient-columns";
import { INGREDIENTS } from "@/components/ingredient/ingredient-constants";
import { Ingredient } from "@/components/ingredient/ingredient-model";
import NewIngredient from "@/components/ingredient/new-ingredient";
import SearchButton from "@/components/item-list/search-button";
import { getAllIngredient } from "@/components/service/ingredient-service";
import { callWithAuth } from "@/components/service/token-handler";
import { DataTable } from "@/components/table/data-table";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function IngredientBody(){

    const [data, setData] = useState<Ingredient[]>([]);
    const [filterData, setFilterData] = useState<Ingredient[]>(data);
    const [search, setSearch] = useState('');

const fetchIngredients = async () => {
        const result = await callWithAuth(getAllIngredient);
        if (result) {
            setData(result);
        }
    };
    useEffect(() => {
        fetchIngredients();
        setFilterData(data);
    }, []);

    const onDelete = (index: string) => {
        INGREDIENTS.slice(Number(index), Number(index) + 1);
        toast("item deleted");
    }

    const handleSearchClick = () => {
        if (search)
            setFilterData(data.filter(item => item.name.includes(search)));
        else
        setFilterData(data);
    }

    const columns = getIngredientColumns();
    return <div className="p-4 space-y-4">
        <div className="flex justify-between">
            <SearchButton search={search} setSearch={setSearch} handleSearchClick={handleSearchClick} />
           <NewIngredient/>
        </div>
        <DataTable columns={columns} data={filterData} onDelete={onDelete} />
    </div>
}
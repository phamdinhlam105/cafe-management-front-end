"use client"

import { getIngredientColumns } from "@/components/ingredient/ingredient-columns";
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
    }, []);

    useEffect(()=>{
        setFilterData(data);
    },[data])

    const onDelete = (index: string) => {
       
        toast("item deleted");
    }

    const handleSearchClick = () => {
        if (search)
            setFilterData(data.filter(item => item.name.includes(search)));
        else
        setFilterData(data);
    }

    const onEdit = (updatedIngredient: Ingredient) => {
        setData(prev => {
            const exists = prev.findLast(i => i.id === updatedIngredient.id);
            return exists 
                ? prev.map(i => (i.id === updatedIngredient.id ? updatedIngredient : i)) 
                : [...prev, updatedIngredient];
        });
    };


    const columns = getIngredientColumns();
    return <div className="p-4 space-y-4">
        <div className="flex justify-between">
            <SearchButton search={search} setSearch={setSearch} handleSearchClick={handleSearchClick} />
           <NewIngredient onEdit={onEdit} />
        </div>
        <DataTable columns={columns} data={filterData} onDelete={onDelete} />
    </div>
}
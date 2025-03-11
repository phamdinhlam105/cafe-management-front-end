"use client"
import { DateTimePicker24h } from "@/components/datetime-picker";
import { INGREDIENTS } from "@/components/ingredient/ingredient-constants";
import { Ingredient } from "@/components/ingredient/ingredient-model";
import { getAllIngredient } from "@/components/service/ingredient-service";
import { callWithAuth } from "@/components/service/token-handler";
import { getStockEntryColumn } from "@/components/stockEntry/stockEntry-column";
import { StockEntryDetail } from "@/components/stockEntryDetail/stockEntryDetail-model";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

export default function ImportStockBody() {

    const [userName, setUserName] = useState('');
    const [date, setDate] = useState<Date>(new Date());
    const [ingredient, setIngredient] = useState<Ingredient[]>([]);
    const [data, setData] = useState<StockEntryDetail[]>([]);
    const fetchIngredients = async () => {
        const result = await callWithAuth(getAllIngredient);
        if (result) {
            setIngredient(result);
        }
    };
    useEffect(() => {
        fetchIngredients();
        setData(()=>ingredient.map(i=>({
            id:"",
            stockEntryId:"",
            ingredient:i,
            quantity:0,
            price:"",
            total:"0"
        })))
    }, []);
    var columns = getStockEntryColumn(setData);

    return <div className="p-5 space-y-5">
        <div className="flex items-center">
            <Label className="text-md w-1/4">Người nhập kho</Label>
            <Input
                id="name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="mt-1"
                placeholder="Tên nhân viên nhập kho"
            />
        </div>
        <div className="flex items-center">
            <Label className="text-md w-1/4">Thời điểm nhập kho: </Label>
            <div className="w-1/4">
                <DateTimePicker24h date={date} setDate={setDate} />
            </div>


        </div>
        <Button variant="outline"> Tạo đơn nhập kho</Button>
        <DataTable columns={columns} data={data} onDelete={function (idRow: string): void {
            throw new Error("Function not implemented.");
        }} />

    </div>
}
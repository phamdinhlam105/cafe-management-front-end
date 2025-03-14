"use client"
import { DateTimePicker24h } from "@/components/datetime-picker";
import { Ingredient } from "@/components/ingredient/ingredient-model";
import { getAllIngredient } from "@/components/service/ingredient-service";
import { importStock } from "@/components/service/stock-entry-service";
import { getTodayStock } from "@/components/service/stock-service";
import { callWithAuth } from "@/components/service/token-handler";
import { StockDetail } from "@/components/stockDetail/stockDetail-model";
import { getStockEntryColumn } from "@/components/stockEntry/stockEntry-column";
import { StockEntryDetail } from "@/components/stockEntryDetail/stockEntryDetail-model";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ImportStockBody() {

    const [userName, setUserName] = useState('');
    const [date, setDate] = useState<Date>(new Date());
    const [ingredient, setIngredient] = useState<Ingredient[]>([]);
    const [data, setData] = useState<StockEntryDetail[]>([]);
    const [todayStock, setTodayStock] = useState<StockDetail[]>([]);
    const [loadingStock, setLoadingStock] = useState(true);

    const fetchIngredients = async () => {
        const result = await callWithAuth(getAllIngredient);
        if (result) {
            setIngredient(result);
        }
    };
    const fetchStockDetails = async () => {
        setLoadingStock(true);
        const result = await callWithAuth(getTodayStock);
        if (result.dailyStockDetails)
            setTodayStock(result.dailyStockDetails);
        setLoadingStock(true);
    }


    const initialTable = () => {
        setData(() => ingredient.map(i => ({
            id: "",
            stockEntryId: "",
            ingredient: i,
            quantity: 0,
            price: "",
            total: "0"
        })));
    }
    useEffect(() => {
        fetchIngredients();
        fetchStockDetails();
    }, []);
    useEffect(() => {
        initialTable();
    }, [ingredient])

    const handleFinish = async () => {
        const newEntry = {
            entryDate: (new Date).toISOString(),
            totalValue: data.reduce((acc, ed) => acc + Number(ed.total), 0),
            stockEntryDetails: data.map(ed => ({
                ingredientId: ed.ingredient.id,
                quantity: ed.quantity,
                price: ed.price,

            }))
        }
        const result = await callWithAuth(await importStock(newEntry));
        if (!result.error) {
            toast("Nhập kho thành công");
            initialTable();
        }
        else {
            toast("Nhập kho không thành công")
        }
    }

    var columns = loadingStock ? [] : getStockEntryColumn(setData, todayStock);

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
        <Button variant="outline" onClick={handleFinish}> Tạo đơn nhập kho</Button>
        {loadingStock ? (
            <div>Đang tải dữ liệu tồn kho...</div>
        ) : (
            <DataTable
                columns={columns}
                data={data}
                onDelete={function (idRow: string): void {
                    throw new Error("Function not implemented.");
                }}
            />
        )}

    </div>
}
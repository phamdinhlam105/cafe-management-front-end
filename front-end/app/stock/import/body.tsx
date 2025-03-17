"use client"
import { DateTimePicker24h } from "@/components/datetime-picker";
import { formatDate, formatDateTime } from "@/components/helper/date-to-string";
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
        if (result.details)
            setTodayStock(result.details);

    }


    const initialTable = () => {
        setData(() => ingredient.map(i => ({
            id: "",
            stockEntryId: "",
            ingredientId: i.id,
            ingredient: i,
            quantity: 0,
            price: "0",
            totalValue: "0"
        })));
    }
    useEffect(() => {
        fetchIngredients();
        fetchStockDetails();
    }, []);


    useEffect(() => {
        initialTable();
        setLoadingStock(false);
    }, [ingredient, todayStock])

    const handleFinish = async () => {
     
        const newEntry = {
            entryDate: formatDateTime(new Date),
            totalValue: data.reduce((acc, ed) => acc + Number(ed.totalValue), 0),
            details: data.map(ed => ({
                ingredientId: ed.ingredient.id,
                quantity: Number(ed.quantity),
                price: Number(ed.price)
            }))
        }
        if(Number(newEntry.totalValue) == 0 || !newEntry.totalValue){
            toast.warning("Phiếu nhập kho không hợp lệ",{
                description:"Không thể không nhập gì cả"
            })
        }
        const result = await callWithAuth(() => importStock(newEntry));
        if (!result.error) {
        
            toast("Nhập kho thành công");
            initialTable();
        }
        else {
            toast.error("Lỗi khi nhập kho", {
                description: `${result.error}`
            })
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
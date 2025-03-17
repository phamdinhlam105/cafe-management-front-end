"use client"

import { formatDate } from "@/components/helper/date-to-string";
import { getTodayStock, updateStock } from "@/components/service/stock-service";
import { callWithAuth } from "@/components/service/token-handler";
import { getStockUpdateColumns } from "@/components/stock/stock-update-columns";
import { StockDetail } from "@/components/stockDetail/stockDetail-model";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

export default function StockUpdateBody() {

    const [data, setData] = useState<StockDetail[]>([]);
    const [loadingStock, setLoadingStock] = useState(true);
    const [updateStockData, setUpdateStockData] = useState<any[]>([]);
    const [todayStock, setTodayStock] = useState<any>();
    const fetchStockDetail = async () => {
        const result = await callWithAuth(getTodayStock);
        if (!result.error) {
            setData(result.details);
            setTodayStock({ id: result.id, createDate: result.createDate })
            setLoadingStock(false);
        }
        else
            toast.error("Không thể tải dữ liệu vui lòng refresh", { description: `${result.error}` });
    }



    const initialTable = (details: StockDetail[]) => {
        if (details.length > 0) {
            var updateStocks = details.map(d => ({
                id: d.id,
                ingredientId: d.ingredient.id,
                ingredientName: d.ingredient.name,
                measurementUnit: d.ingredient.measurementUnit,
                oldStockRemain: d.stockRemaining,
                newStockRemain: d.stockRemaining,
                used: 0,
            }))
            setUpdateStockData(updateStocks);
        }
    }

    const handleUpdate = async (e:FormEvent) => {
        e.preventDefault();
        const request = {
            id: todayStock.id,
            details: updateStockData.map(usd => ({
                id: usd.id,
                ingredientId: usd.ingredientId,
                remainAmount: usd.newStockRemain
            }))
        }
        const result = await callWithAuth(()=>updateStock(request));
        if(!result.error){
            toast("Cập nhật kho thành công");
            fetchStockDetail();
        }
        else
        {
            toast.error("Cập nhật kho thất bại",{description:`${result.error}`})
        }
    }

    useEffect(() => {
        fetchStockDetail();
    }, []);
    useEffect(() => {
        initialTable(data);
    }, [data])

    const columns = getStockUpdateColumns(setUpdateStockData);


    return <div className="p-5 space-y-5">

        <div>
            Ngày hôm nay: {loadingStock ? "Đang cập nhật dữ liệu" : todayStock.createDate}
        </div>
        <Button onClick={handleUpdate}>Cập nhật kho</Button>
        {loadingStock ? (
            <div>Đang tải dữ liệu tồn kho...</div>
        ) : (
            <DataTable
                columns={columns}
                data={updateStockData}
                onDelete={function (idRow: string): void {
                    throw new Error("Function not implemented.");
                }}
            />
        )}

    </div>
}
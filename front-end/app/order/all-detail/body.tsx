"use client"

import { DatePicker } from "@/components/date-picker";
import { getOrderDetailColumns } from "@/components/orderDetail/column-def";
import { ORDER_DETAILS } from "@/components/orderDetail/constants";
import { OrderDetail } from "@/components/orderDetail/orderDetail-model";
import { getAllOrderDetail } from "@/components/service/order-detail-service";
import { callWithAuth } from "@/components/service/token-handler";
import { DataTable } from "@/components/table/data-table";
import { useEffect, useState } from "react";

export default function AllOrderDetailBody() {

    const [selectedDate, setSelectedDate] = useState<Date>(new Date);
    const [data, setData] = useState<OrderDetail[]>([]);
    const [filterData,setFilterData] = useState<OrderDetail[]>(data);

      const cleanDate = (dateStr: string): Date => {
        // Lấy phần ngày đầu tiên, ví dụ "24/11/2024"
        const datePart = dateStr.split(" ")[0];
        // Nếu định dạng là dd/MM/yyyy, ta cần tách ra
        const parts = datePart.split("/");
        if (parts.length !== 3) {
          throw new Error("Invalid date format");
        }
        const day = Number(parts[0]);
        const month = Number(parts[1]); // tháng trong Date là 0-index
        const year = Number(parts[2]);
        return new Date(year, month - 1, day);
      }

      const fetchAllDetails = async ()=>{
        const result = await callWithAuth(getAllOrderDetail);
        if(result){
          setData(result);
          setFilterData(result);
        }
      }


    useEffect(() => {
      fetchAllDetails();
       
      }, [selectedDate]);

    const onDelete =(idRow:string) =>{

    }

    var getColumns = getOrderDetailColumns({onDelete});
    return <div className="p-4 space-y-4">
        <div>
            Tìm kiếm theo ngày <DatePicker date={selectedDate} setDate={setSelectedDate}/>
        </div>
        <DataTable columns={getColumns} data={filterData} onDelete={onDelete} />
    </div>
}
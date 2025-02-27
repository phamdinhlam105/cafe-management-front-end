"use client"

import { DatePicker } from "@/components/date-picker";
import { ORDER } from "@/components/order/constants";
import { getOrderDetailColumns } from "@/components/orderDetail/column-def";
import { ORDER_DETAILS } from "@/components/orderDetail/constants";
import { OrderDetail } from "@/components/orderDetail/orderDetail-model";
import { DataTable } from "@/components/table/data-table";
import { useEffect, useState } from "react";

export default function AllOrderDetailBody() {

    const [selectedDate, setSelectedDate] = useState<Date>(new Date);
    const [data, setData] = useState<OrderDetail[]>(ORDER_DETAILS);

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
    useEffect(() => {
        const ordersInSelectedDate = ORDER.filter((order) => {
            const orderDate = cleanDate(order.createAt)
            console.log(orderDate);
          return orderDate.getTime() === selectedDate.getTime();
        });
        const orderIds = ordersInSelectedDate.map((order) => order.id);
        const filteredDetails = ORDER_DETAILS.filter((detail) => orderIds.includes(detail.orderId));
        setData(filteredDetails);
      }, [selectedDate]);

    const onDelete =(idRow:string) =>{

    }

    var getColumns = getOrderDetailColumns({onDelete});
    return <div className="p-4 space-y-4">
        <div>
            Tìm kiếm theo ngày <DatePicker date={selectedDate} setDate={setSelectedDate}/>
        </div>
        <DataTable columns={getColumns} data={data} onDelete={onDelete} />
    </div>
}
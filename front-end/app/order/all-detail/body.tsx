"use client"

import { DatePicker } from "@/components/date-picker";
import { getOrderDetailColumns } from "@/components/orderDetail/column-def";
import { OrderDetail } from "@/components/orderDetail/orderDetail-model";
import { getAllOrderDetail, getOrderDetailByDate } from "@/components/service/order-detail-service";
import { callWithAuth } from "@/components/service/token-handler";
import { DataTable } from "@/components/table/data-table";
import { useEffect, useState } from "react";

export default function AllOrderDetailBody() {

  const [selectedDate, setSelectedDate] = useState<Date>(new Date);
  const [data, setData] = useState<OrderDetail[]>([]);


  const convertToDateOnlyString = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  const fetchAllDetails = async () => {
    const result = await callWithAuth(getAllOrderDetail);
    if (result) {
      setData(result);
    }
  }
  const fetchDetailsByDate = async () => {
    const stringDate = convertToDateOnlyString(selectedDate);
    const result = await callWithAuth(await getOrderDetailByDate(stringDate));
    if (result)
      setData(result);
  }

  useEffect(() => {
    fetchAllDetails();
  }, []);

  useEffect(()=>{
    if (selectedDate) fetchDetailsByDate();
  },[selectedDate])

  const onDelete = (idRow: string) => {

  }

  var getColumns = getOrderDetailColumns({ onDelete });
  return <div className="p-4 space-y-4">
    <div>
      Tìm kiếm theo ngày <DatePicker date={selectedDate} setDate={setSelectedDate} />
    </div>
    <DataTable columns={getColumns} data={data} onDelete={onDelete} />
  </div>
}
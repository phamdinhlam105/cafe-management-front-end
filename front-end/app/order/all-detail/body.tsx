"use client"

import { DatePicker } from "@/components/date-picker";
import { getAllDetailsColumns } from "@/components/orderDetail/allDetail-columns-def";
import { OrderDetail } from "@/components/orderDetail/orderDetail-model";
import { getAllOrderDetail, getOrderDetailByDate } from "@/components/service/order-detail-service";
import { callWithAuth } from "@/components/service/token-handler";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
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
    const result = await callWithAuth(() => getOrderDetailByDate(stringDate));
    if (result)
      setData(result);
  }

  useEffect(() => {
    fetchAllDetails();
  }, []);

  const handleResetFilter = () => {
    fetchAllDetails();
  }
  const handleSearch=()=>{
    if (selectedDate) fetchDetailsByDate();
  }
  const onDelete = (idRow: string) => {

  }
  var getColumns = getAllDetailsColumns();
  return <div className="p-4 space-y-4">
    <div className="flex items-center space-x-4"> 
      Tìm kiếm theo ngày <DatePicker date={selectedDate} setDate={setSelectedDate} />
      <Button onClick={handleSearch}>Tìm kiếm</Button>
      <Button variant="outline" onClick={handleResetFilter}>Xóa bộ lọc</Button>
    </div>
    <DataTable columns={getColumns} data={data} onDelete={onDelete} />
  </div>
}
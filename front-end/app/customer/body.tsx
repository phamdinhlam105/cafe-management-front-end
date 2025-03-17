"use client"

import { getCustomerColumns } from "@/components/customer/customer-columns";
import { Customer } from "@/components/customer/customer-model";
import NewCustomer from "@/components/customer/new-customer";
import { getAllCustomer } from "@/components/service/customer-service";
import { callWithAuth } from "@/components/service/token-handler";
import { DataTable } from "@/components/table/data-table";
import { useEffect, useState } from "react";

export default function CustomerBody() {

    const [data, setData] = useState<Customer[]>([]);

    const fetchCustomers = async () => {
        const result = await callWithAuth(getAllCustomer);
        if (!result.error) {
            setData(result);
        }
    }

    useEffect(() => {
        fetchCustomers();
    }, []);

    const onChange = () => {
        fetchCustomers();
    }

    const columns = getCustomerColumns(onChange);

    return <div className="p-4 space-y-4">
        <NewCustomer onChange={onChange} />
        {data ? <DataTable columns={columns} data={data} onDelete={function (idRow: string): void {
            throw new Error("Function not implemented.");
        }} /> : "Đang tải dữ liệu"}
    </div>
}
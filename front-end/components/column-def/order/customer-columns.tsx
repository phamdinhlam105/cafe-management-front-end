


import { Customer } from "@/components/model/order/customer-model";
import EditCustomer from "@/components/order-components/customer/edit-customer";
import ColumnHeader from "@/components/table/column-header";
import { ColumnDef } from "@tanstack/react-table";

export const getCustomerColumns = (onChange:()=>void): ColumnDef<Customer>[] => [

    {
        accessorKey: "name",
        header: ({ column }) => <ColumnHeader column={column} title="Tên khách" />,
        cell: ({ row }) => <div className="text-md text-gray-400">{row.original.name}</div>
    },

    {
        accessorKey: "phone",
        header: ({ column }) => <ColumnHeader column={column} title="Số điện thoại" />,
        cell: ({ row }) => <div className="text-md text-gray-400">{row.original.phone || "không xác định"}</div>
    },
    {
        accessorKey: "address",
        header: ({ column }) => <ColumnHeader column={column} title="Địa chỉ" />,
        cell: ({ row }) => <div className="text-md text-gray-400 flex justify-center">{row.original.address || "không xác định"} </div>
    },
    {
        accessorKey: "edit",
        header: ({ column }) => <ColumnHeader column={column} title="Địa chỉ" />,
        cell: ({ row }) => <div className="text-md text-gray-400 flex justify-center">
            <EditCustomer 
            onChange={onChange}
            customer={row.original}/>
             </div>
    },
]
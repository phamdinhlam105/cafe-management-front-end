


import ColumnHeader from "@/components/table/column-header";
import SelectCell from "@/components/table/select-cell";
import SelectHeader from "@/components/table/select-header";
import { ColumnDef } from "@tanstack/react-table";
import { Customer } from "./customer-model";
import EditCustomer from "./edit-customer";

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
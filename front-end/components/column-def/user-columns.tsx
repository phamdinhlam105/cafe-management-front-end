
import ColumnHeader from "@/components/table/column-header";
import SelectCell from "@/components/table/select-cell";
import SelectHeader from "@/components/table/select-header";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "../model/user/user-model";
import SetRoleButton from "../user/setrole-button";

export const getUserCollumns = (
  setData: React.Dispatch<React.SetStateAction<User[]>>,
  roleChange: (idUser: string, idRole: string) => void,
  allRoles: { id: string, roleName: string }[]
): ColumnDef<User>[] => [
    {
      id: "select",
      header: ({ table }) => <SelectHeader table={table} />,
      cell: ({ row }) => <SelectCell row={row} />
    },
    {
      accessorKey: "userName",
      header: ({ column }) => <ColumnHeader column={column} title="Tên đăng nhập" />,
      cell: ({ row }) => <div className="text-md text-gray-400">{row.original.userName}</div>
    },

    {
      accessorKey: "realName",
      header: ({ column }) => <ColumnHeader column={column} title="Tên đầy đủ" />,
      cell: ({ row }) => <div className="text-md text-gray-400">{row.original.realName}</div>
    },

    {
      accessorKey: "role",
      header: ({ column }) => <ColumnHeader column={column} title="Vai trò" />,
      cell: ({ row }) => <div className="text-md text-gray-400">{row.original.roleName}</div>
    },

    {
      accessorKey: "setrole",
      header: ({ column }) => <ColumnHeader column={column} title="Thay đổi vai trò" />,
      cell: ({ row }) => {
        const currentRole = {
          id: row.original.role,
          roleName: row.original.roleName,
        };

        return (
          <div className="text-md text-gray-400">
            <SetRoleButton 
            idUser={row.original.id} 
            currentRole={currentRole} 
            onChange={roleChange}
            allRoles={allRoles} />
          </div>
        );
      },
    }

  ]
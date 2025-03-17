"use client"

import { getAllUsers, setRoleRequest } from "@/components/service/account-service";
import { callWithAuth } from "@/components/service/token-handler";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { getUserCollumns } from "@/components/user/user-columns";
import { User } from "@/components/user/user-model"
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SetRoleBody() {

    const [data, setData] = useState<User[]>([]);
    const [updateList, setUpdateList] = useState<{ idUser: string, idRole: string }[]>([]);
    const fetchUsers = async () => {
        const result = await callWithAuth(getAllUsers);
        if (!result.error)
            setData(result);
    }
    useEffect(() => {
        fetchUsers();
    }, [])


    const updateRole = async () => {
        if (updateList.length <= 0)
            return;
        for (const u of updateList) {
            const result = await callWithAuth(() => setRoleRequest(u.idUser, u.idRole));

            if (result.error) {
                toast.error("Phát sinh lỗi khi cập nhật", {
                    description: `Lỗi ở ${data.findLast(d => d.id === u.idUser)?.userName}`
                });
                return;
            }
        }


        toast.success("Cập nhật vai trò thành công!");
        setUpdateList([]);
        fetchUsers();
    };
    const roleChange = (idUser: string, idRole: string) => {
        setUpdateList((prevList) => {
            const index = prevList.findIndex((item) => item.idUser === idUser);
            if (index !== -1) {
                const updatedList = [...prevList];
                updatedList[index].idRole = idRole;
                return updatedList;
            } else {
                return [...prevList, { idUser, idRole }];
            }
        });
    };
    const columns = getUserCollumns(setData, roleChange);

    return <div className="p-4 space-y-4">
        <Button onClick={updateRole}>Lưu thay đổi</Button>
        <DataTable columns={columns} data={data} onDelete={function (idRow: string): void {
            throw new Error("Function not implemented.");
        }} />
    </div>
}
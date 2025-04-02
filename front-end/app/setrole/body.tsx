"use client"

import { getAllRoles, getAllUsers, setRoleRequest } from "@/components/service/account-service";
import { callWithAuth } from "@/components/service/token-handler";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { User } from "@/components/model/user/user-model"
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getUserCollumns } from "@/components/column-def/user-columns";

export default function SetRoleBody() {

    const [data, setData] = useState<User[]>([]);
    const [updateList, setUpdateList] = useState<{ idUser: string, idRole: string }[]>([]);
    const [allRoles, setAllRoles] = useState<{ id: string, roleName: string }[]>([]);
    const [columns, setColumns] = useState<any[]>([]);
    const fetchAllRole = async () => {
        const result = await callWithAuth(getAllRoles);
        if (!result.error)
            setAllRoles(result);
    }
    const fetchUsers = async () => {
        const result = await callWithAuth(getAllUsers);
        if (!result.error)
            setData(result);
    }
    useEffect(() => {
        fetchUsers();
        fetchAllRole();

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
            // Tìm user trong data theo idUser
            const user = data.find((item) => item.id === idUser);
            if (!user) return prevList; // Nếu không tìm thấy user thì không làm gì

            const index = prevList.findIndex((item) => item.idUser === idUser);

            if (index !== -1) {
                if (user.role === idRole) {
                    const updatedList = [...prevList];
                    updatedList.splice(index, 1);
                    return updatedList;
                } else {

                    const updatedList = [...prevList];
                    updatedList[index].idRole = idRole;
                    return updatedList;
                }
            } else {
                return [...prevList, { idUser, idRole }];
            }
        });
    };

    useEffect(() => {
        if (allRoles.length > 0) {
            const generatedColumns = getUserCollumns(setData, roleChange, allRoles);
            setColumns(generatedColumns);
        }
        console.log(columns)
        console.log(allRoles)
    }, [allRoles]);

    return <div className="p-4 space-y-4">
        <Button onClick={updateRole}>Lưu thay đổi</Button>
        {columns ? <DataTable columns={columns} data={data} /> : "Đang tải dữ liệu"}
    </div>
}
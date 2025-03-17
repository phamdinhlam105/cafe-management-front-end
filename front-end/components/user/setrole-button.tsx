"use client"

import { useEffect, useState } from "react";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectItem
} from "../ui/select"

export default function SetRoleButton({ currentRole, idUser, onChange, allRoles }: {
    currentRole: { id: string, roleName: string },
    idUser: string,
    onChange: (idUser: string, idRole: string) => void,
    allRoles: { id: string, roleName: string }[]
}) {
    const [chosenRole, setChosenRole] = useState<{ id: string, roleName: string }>(currentRole)
    const handleRoleChange = (value: string) => {
        if (!value)
            return;
        const selectedRole = allRoles.find(r => r.id === value);
        if (selectedRole) {
            setChosenRole(selectedRole);
            onChange(idUser, value);
        }
    };

    return <div>{currentRole ?
        <Select onValueChange={handleRoleChange} value={chosenRole.id}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={chosenRole.roleName} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Vai trò</SelectLabel>
                    {allRoles.map(p => <SelectItem key={p.id} value={p.id}>{p.roleName}</SelectItem>)}
                </SelectGroup>
            </SelectContent>
        </Select> : "Đang tải dữ liệu"}
    </div>
}
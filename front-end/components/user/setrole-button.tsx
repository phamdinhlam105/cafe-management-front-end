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
import { callWithAuth } from "../service/token-handler";
import { getAllRoles } from "../service/account-service";

export default function SetRoleButton({ currentRole, idUser, onChange }: {
    currentRole: string,
    idUser: string,
    onChange: (idUser: string, idRole: string) => void
}) {
    const [allRole, setAllRole] = useState<{ id: string, roleName: string }[]>([]);
    const [chosenRole, setChosenRole] = useState(currentRole)
    const fetchAllRole = async () => {
        const result = await callWithAuth(getAllRoles);
        if (!result.error)
            setAllRole(result);
    }

    useEffect(() => {
        fetchAllRole();
    }, []);

    const handleRoleChange = (value: string) => {
        if (!value)
            return;
        setChosenRole(value);
        onChange(idUser, value);
    }

    return <div>
        <Select onValueChange={handleRoleChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Chọn vai trò" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Vai trò</SelectLabel>
                    {allRole.map(p => <SelectItem key={p.id} value={p.id}>{p.roleName}</SelectItem>)}
                </SelectGroup>
            </SelectContent>
        </Select>
    </div>
}
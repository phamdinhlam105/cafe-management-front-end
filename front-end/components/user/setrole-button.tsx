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
    currentRole: { id: string, roleName: string },
    idUser: string,
    onChange: (idUser: string, idRole: string) => void
}) {
    const [allRole, setAllRole] = useState<{ id: string, roleName: string }[]>([]);
    const [chosenRole, setChosenRole] = useState<{ id: string, roleName: string }>(currentRole)

    const fetchAllRole = async () => {
        const result = await callWithAuth(getAllRoles);
        if (!result.error)
            setAllRole(result);
    }

    useEffect(() => {
        fetchAllRole();
        console.log(currentRole)
    }, []);
    useEffect(() => {
        setChosenRole(currentRole);
    }, [allRole])

    const handleRoleChange = (value: string) => {
        if (!value)
            return;
        setChosenRole({ id: value, roleName: allRole.findLast(r => r.id === value)?.roleName || "" });
        onChange(idUser, value);
    }

    return <div>
        <Select onValueChange={handleRoleChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={chosenRole.roleName} defaultValue={currentRole.id} />
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
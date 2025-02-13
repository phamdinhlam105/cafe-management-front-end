"use client"
import { StockDetail } from "@/components/stockDetail/stockDetail-model";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function StockBody() {
    const [data, setData] = useState<StockDetail[]>([]);
    const [search, setSearch] = useState('');
    const handleSearchClick = () => {
        setData(data.filter(item => item.ingredient.name.includes(search)));

    }
    return <div className="p-4 space-y-5">
        <div className="h-10 flex space-x-4">
            <div className="w-30 relative">
                <Input
                    placeholder="Từ khóa..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)
                    }
                    className="max-w-sm"
                />
                <Button
                    variant="outline"
                    className="border-none h-8 w-8 absolute right-1 top-1 items-center flex justify-center rounded-l-sm rounded-r-md"
                    onClick={handleSearchClick}>
                    <Search />
                </Button>
            </div>
            <Button
                className="border hover:bg-gray-100 hover:text-neutral-900 transition-color duration-200">
                <Link href='/new-order'>Nhập kho</Link>
            </Button>
            
        </div>

    </div>
}

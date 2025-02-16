import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import React from "react";

export default function SearchButton({search, setSearch,handleSearchClick}:{
    search: string,
    setSearch : React.Dispatch<React.SetStateAction<string>>,
    handleSearchClick: ()=> void
}) {

    return <div className="w-30 relative">
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
}
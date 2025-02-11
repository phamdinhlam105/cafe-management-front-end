import { Table } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";

interface SelectHeaderProps {
    table: Table<any>;
}

const SelectHeader: React.FC<SelectHeaderProps> = ({ table }) => {
    return (
        <div className="w-8 items-center flex justify-between">
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        </div>
    )
}

export default SelectHeader
import { Row } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";

interface SelectCellProps {
    row: Row<any>
}

const SelectCell: React.FC<SelectCellProps> = ({ row }) => {

    return (
        <div className="w-8 items-center flex justify-between">
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        </div>
    )
}

export default SelectCell
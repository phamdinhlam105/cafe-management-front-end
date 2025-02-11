
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Column } from '@tanstack/react-table';
import { MoveUp, MoveDown, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

interface ColumnHeaderProps {
  column: Column<any, unknown>;
  title: string
}

const ColumnHeader: React.FC<ColumnHeaderProps> = ({ column, title }) => {
  const handleSortAsc = () => {
    if (column.getIsSorted() !== 'asc') {
      column.toggleSorting(false);
      setSortStatus(1)
    }
  };

  const handleSortDesc = () => {
    if (column.getIsSorted() !== 'desc') {
      column.toggleSorting(true);
      setSortStatus(2)
    }
  };
  const [sortStatus, setSortStatus] = useState(0);
  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 font-bold">
            {title}
            <ChevronsUpDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-32 py-1 px-1 rounded-md bg-background shadow-md space-y-1 text-foreground">
          <DropdownMenuItem
            onClick={handleSortAsc}
            className="flex px-2 items-center hover:bg-accent hover:outline-none rounded-sm font-normal"
          >
            <MoveUp className="h-3 w-3 mr-2" />
            Tăng dần
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleSortDesc}
            className="flex px-2 items-center hover:bg-accent hover:outline-none rounded-sm font-normal"
          >
            <MoveDown className="h-3 w-3 mr-2" />
            Giảm dần
          </DropdownMenuItem>
          <hr />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

  );
};

export default ColumnHeader;

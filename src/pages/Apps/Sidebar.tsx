import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";

function Sidebar() {
  return (
    <div className="flex-initial w-[310px] bg-background-rgba min-h-full px-4">
      <div className="flex items-center gap-2 py-2">
        <div className="flex-1">
          <p className="text-sm font-semibold">Apps</p>
        </div>

        <div>
          <Button size="icon" variant="ghost" className="w-8 h-8">
            <Search size={14} />
          </Button>
        </div>

        <div>
          <Button size="icon" variant="ghost" className="w-8 h-8">
            <Plus size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

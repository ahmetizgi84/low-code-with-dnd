import { SIDEBAR_ITEMS } from "@/common/constants";
import SideBarItem from "@/components/SideBarItem";

function Panel() {
  return (
    <div className="flex-initial w-[310px] bg-background-rgba min-h-full px-4">
      <div className="flex items-center gap-2 py-2">
        <div className="flex-1">
          <p className="text-sm font-semibold">Ready to use components</p>

          <div className="mt-4 flex flex-col space-y-2">
            {Object.values(SIDEBAR_ITEMS).map((sideBarItem) => (
              <SideBarItem key={sideBarItem.id} data={sideBarItem} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Panel;

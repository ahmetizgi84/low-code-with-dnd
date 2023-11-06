import { Monitor, Smartphone, Tablet } from "lucide-react";

import { Button } from "@/components/ui/button";

function PageTop() {
  return (
    <div className="control h-12 px-4 flex justify-between items-center">
      <p>Responsive Control</p>
      <div className="flex items-center">
        <div>
          <Button size="icon" variant="ghost" className="w-8 h-8">
            <Monitor size={14} />
          </Button>
        </div>

        <div>
          <Button size="icon" variant="ghost" className="w-8 h-8">
            <Tablet size={14} />
          </Button>
        </div>
        <div>
          <Button size="icon" variant="ghost" className="w-8 h-8">
            <Smartphone size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PageTop;

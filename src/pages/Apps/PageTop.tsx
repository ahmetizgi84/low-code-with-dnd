import { Monitor, Smartphone, Tablet, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useDndContext } from "@/context/DndContext";
import { defaultMockLayout } from "@/common/mock.data";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function PageTop() {
  const { setLayout } = useDndContext();

  return (
    <div className="control h-12 px-4 flex justify-between items-center">
      <p>Responsive Control</p>
      <div className="flex items-center">
        <div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="icon" variant="ghost" className="w-8 h-8">
                <Trash size={14} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your design and remove your data from our
                  servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => setLayout(defaultMockLayout)}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

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

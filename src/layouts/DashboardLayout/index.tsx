import Navbar from "@/components/navbar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="h-[calc(100vh-3.5rem)]">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default DashboardLayout;

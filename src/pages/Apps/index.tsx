import Panel from "@/components/panel";
import PageTop from "./PageTop";
import Canvas from "@/components/canvas";
import SideBar from "@/components/side-bar";

function Apps() {
  return (
    <main className="flex min-h-full">
      <Panel />

      <div className="flex-1 flex flex-col">
        <PageTop />
        <Canvas />
      </div>

      <SideBar />
    </main>
  );
}

export default Apps;

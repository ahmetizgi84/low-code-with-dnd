import SideBar from "./SideBar";
import Panel from "./Panel";
import PageTop from "./PageTop";
import Canvas from "./Canvas";

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

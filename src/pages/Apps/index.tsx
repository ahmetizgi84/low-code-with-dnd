import Panel from "./Panel";
import Sidebar from "./Sidebar";
import PageTop from "./PageTop";
import Canvas from "./Canvas";

function Apps() {
  return (
    <main className="flex min-h-full">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <PageTop />
        <Canvas />
      </div>

      <Panel />
    </main>
  );
}

export default Apps;

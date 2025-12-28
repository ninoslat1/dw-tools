import Dropzone from "@/components/Dropzone";
import HistoryTable from "@/components/HistoryTable";
import { $page } from "@/stores/$store";
import { useStore } from "@nanostores/react";
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_convert/convert/')({
  component: App,
})

function App() {
  const state = useStore($page)
  return (
    <div className="w-full h-full min-h-screen">
      {state === "convert" ? <Dropzone /> : <HistoryTable/>}
    </div>
  );
}

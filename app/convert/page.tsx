"use client"

import Dropzone from "@/components/Dropzone";
import History from "@/components/History"
import { $page } from "@/stores/section";
import { useStore } from "@nanostores/react";

export default function ConvertPage() {
  const state = useStore($page)
  return (
    <div className="w-full h-full min-h-screen">
      {state === "convert" ? <Dropzone /> : <History/>}
    </div>
  );
}

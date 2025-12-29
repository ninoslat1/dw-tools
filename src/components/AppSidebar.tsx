'use client'


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { $page } from "@/stores/$store"
import { useRef } from "react"
import { WorkflowIcon, type WorkflowIconHandle } from "./ui/workflow"
import { HistoryIcon, type HistoryIconHandle } from "./ui/history"


export function AppSidebar() {
  const workflowRef = useRef<WorkflowIconHandle>(null)
  const historyRef = useRef<HistoryIconHandle>(null)

  const items: TSidebarItem[] = [
  {
    title: "Convert",
    Icon: WorkflowIcon,
    ref: workflowRef,
    state: "convert",
  },
  {
    title: "History",
    Icon: HistoryIcon,
    ref: historyRef,
    state: "history",
  },
]

  return (
    <Sidebar>
      <SidebarContent className="flex flex-col h-full">
        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onMouseEnter={() => item.ref.current?.startAnimation()}
                    onMouseLeave={() => item.ref.current?.stopAnimation()}
                    onFocus={() => item.ref.current?.startAnimation()}
                    onBlur={() => item.ref.current?.stopAnimation()}
                    asChild
                  >
                    <span
                      onClick={() => $page.set(item.state)}
                      className="flex items-center cursor-pointer"
                    >
                      <item.Icon ref={item.ref} className="mr-2" size={16} />
                      <span>{item.title}</span>
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* BOTTOM SECTION */}
        {/* <div className="mt-auto p-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => window.history.back()}
                className="text-muted-foreground hover:text-foreground cursor-pointer focus:bg-transparent hover:bg-transparent"
              >
                <ArrowLeft className="mr-2" />
                <span>Back</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div> */}
      </SidebarContent>
    </Sidebar>
  )
}
'use client'

import { History, Repeat, ArrowLeft } from "lucide-react"

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

const items: TSidebarItem[] = [
  {
    title: "Convert",
    icon: Repeat,
    state: "convert"
  },
  {
    title: "History",
    icon: History,
    state: "history"
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="flex flex-col h-full">
        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                 <SidebarMenuButton asChild>
                    <span onClick={() => $page.set(item.state)} className="flex items-center cursor-pointer">
                      <item.icon className="mr-2" />
                      <span>{item.title}</span>
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* BOTTOM SECTION */}
        <div className="mt-auto p-4">
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
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
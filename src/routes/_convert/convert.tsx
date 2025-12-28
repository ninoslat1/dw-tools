import { AppSidebar } from '@/components/AppSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_convert/convert')({
  component: ConvertLayout,
})

function ConvertLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-full w-full overflow-hidden">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto bg-background">
          <Outlet/>
        </main>
      </div>
    </SidebarProvider>
  )
}

import { AppSidebar } from '@/components/AppSidebar'
import { ArrowLeftIcon, type ArrowLeftIconHandle } from '@/components/ui/arrow-left'
import { Button } from '@/components/ui/button'
import { SidebarProvider } from '@/components/ui/sidebar'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { useRef } from 'react'

export const Route = createFileRoute('/_convert/convert')({
  component: ConvertLayout,
})

function ConvertLayout() {
  const arrowRef = useRef<ArrowLeftIconHandle>(null)
  
  return (
    <SidebarProvider>
      <div className="flex h-full w-full overflow-hidden">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto bg-background">
            <Link to='/'>
              <Button variant="ghost" size="sm" className="gap-1 hover:cursor-pointer hover:bg-transparent"
                onMouseEnter={() => arrowRef.current?.startAnimation()}
                onMouseLeave={() => arrowRef.current?.stopAnimation()}
                
              >
                <ArrowLeftIcon ref={arrowRef} className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>
            </Link>
          <Outlet/>
        </main>
      </div>
    </SidebarProvider>
  )
}

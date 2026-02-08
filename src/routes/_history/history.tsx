import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_history/history')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}

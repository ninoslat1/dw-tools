import { Navigate, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/docs/')({
  component: () => (
    <Navigate to="/docs/$page" params={{ page: 'getting-started' }} />
  ),
})

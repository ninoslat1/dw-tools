import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'
import Documentation from '@/components/Documentation'

export const Route = createFileRoute('/docs/$page')({
  component: DocPage,
  loader: async ({ params: { page } }) => {
    const pageName = page || 'getting-started'
    try {
      return await import(`../../docs/${pageName}.mdx`)
    } catch {
      return await import(`../../docs/getting-started.mdx`)
    }
  },
})

function DocPage() {
  return (
    <React.Suspense fallback={<p>Loading...</p>}>
      <Documentation />
    </React.Suspense>
  )
}

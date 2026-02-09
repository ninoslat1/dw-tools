import { createFileRoute } from "@tanstack/react-router"
import { DocsLayout } from "@/layouts/DocsLayout"
import * as React from "react"
import { useParams } from '@tanstack/react-router'
import Documentation from "@/components/Documentation"


export const Route = createFileRoute("/docs/$page")({
  component: DocPage,
    loader: async ({ params: { page } }) => {
    // Provide a default page if none specified
    const pageName = page || 'getting-started'
    try {
      return await import(`../../docs/${pageName}.mdx`)
    } catch {
      return await import(`../../docs/getting-started.mdx`)
    }
  }
})

function DocPage() {
  const { page } = useParams({ from: '/docs/$page' }) // Correct way to get params
  const doc = Route.useLoaderData()
  
  return (
      <React.Suspense fallback={<p>Loading...</p>}>
        <Documentation />
      </React.Suspense>
  )
}

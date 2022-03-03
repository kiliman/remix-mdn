import { useEffect } from 'react'
import {
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
} from 'remix'

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: '/static/css/main.907b5008.chunk.css',
  },
]
export const meta: MetaFunction = () => {
  return { title: 'Remix MDN Docs' }
}

export default function App() {
  const navigate = useNavigate()
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      // get closet <a> element
      const target = event.target as HTMLElement
      const a = target.closest('a')
      if (!a) return

      const href = a.getAttribute('href')
      if (href && !href.startsWith('https://')) {
        event.preventDefault()
        navigate(href)
      }
    }
    const prefetchedLinks = []
    const prefetch = (event: MouseEvent) => {
      // get closet <a> element
      const target = event.target as HTMLElement
      const a = target.closest('a')
      if (!a) return
      // don't prefetch if link is current page
      if (document.location.pathname === a.getAttribute('href')) return

      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = a.href + '?_data=routes%2F%24lang%2Fdocs.%24'
      link.as = 'fetch'
      document.head.appendChild(link)
      prefetchedLinks.push(link.href)
    }

    document.addEventListener('click', handleClick)
    document.addEventListener('mouseover', prefetch)
    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('mouseover', prefetch)
    }
  }, [navigate])

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

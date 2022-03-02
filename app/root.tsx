import type { MetaFunction } from 'remix'
import {
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
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

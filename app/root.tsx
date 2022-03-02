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
import globalCss from '~/styles/global.css'
import tailwindCss from '~/styles/tailwind.css'

export const links: LinksFunction = () => [
  // {
  //   rel: 'stylesheet',
  //   href: 'https://developer.mozilla.org/static/css/main.907b5008.chunk.css',
  // },
  { rel: 'stylesheet', href: globalCss },
  { rel: 'stylesheet', href: tailwindCss },
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

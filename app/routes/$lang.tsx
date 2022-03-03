import { useEffect, useState } from 'react'
import {
  Link,
  LoaderFunction,
  Outlet,
  useFetcher,
  useLoaderData,
  useLocation,
  useTransition,
} from 'remix'

export let loader: LoaderFunction = async ({ params }) => {
  return { locale: params.lang }
}

export default function Screen() {
  const { locale } = useLoaderData()
  const location = useLocation()
  const [state, setState] = useState('idle')
  const fetcher = useFetcher()
  const transition = useTransition()

  useEffect(() => {
    if (state === 'idle' && fetcher.state === 'submitting') {
      setState('loading')
    } else if (state === 'loading' && fetcher.type === 'done') {
      setState('done')
    } else if (state === 'done' && transition.state !== 'idle') {
      setState('idle')
    }
  }, [state, fetcher.state, transition.state, fetcher.type])

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <fetcher.Form method="get" action="/api/search" key={location.key}>
          <input
            style={{
              border: 0,
              padding: '8px 16px',
              fontSize: '1.2em',
              width: '100%',
              backgroundColor: '#27272f',
              color: '#fff',
            }}
            type="text"
            autoFocus
            name="q"
            placeholder="Search..."
          />
          <input type="hidden" name="locale" defaultValue={locale} />
        </fetcher.Form>
        {fetcher.data && state === 'done' && (
          <div
            style={{
              position: 'absolute',
              display: transition.state === 'loading' ? 'none' : 'block',
              top: '40px',
              padding: '16px',
              backgroundColor: '#27272f',
              zIndex: 1,
              border: '2px solid #15141a',
            }}
          >
            {fetcher.data.documents.map((doc: any, i: number) => (
              <div key={i} style={{ padding: '8px' }}>
                <Link to={doc.mdn_url}>{doc.title}</Link>
                <div style={{ marginTop: '4px' }}>{doc.summary}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Outlet />
    </div>
  )
}

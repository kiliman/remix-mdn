import { renderToString } from 'react-dom/server'
import type { EntryContext } from 'remix'
import { RemixServer } from 'remix'
import { fromBase64 } from './utils/base64'

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const contentType = responseHeaders.get('content-type')
  if (contentType && contentType !== 'application/json') {
    const data = Object.values(remixContext.routeData)
    const body = data[data.length - 1]
    return new Response(fromBase64(body), {
      status: responseStatusCode,
      headers: responseHeaders,
    })
  }

  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />,
  )

  responseHeaders.set('Content-Type', 'text/html')

  return new Response('<!DOCTYPE html>' + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}

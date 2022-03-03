import { LoaderFunction } from 'remix'

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  return fetch(`https://developer.mozilla.org${url.pathname}`)
}

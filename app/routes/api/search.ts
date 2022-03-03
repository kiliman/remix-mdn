import { LoaderFunction } from 'remix'

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const q = url.searchParams.get('q')
  if (!q) return new Response('', { status: 400 })

  const locale = url.searchParams.get('locale') ?? 'en-US'
  return fetch(
    `https://developer.mozilla.org/api/v1/search?q=${encodeURIComponent(
      q!,
    )}&locale=${locale}`,
  )
}

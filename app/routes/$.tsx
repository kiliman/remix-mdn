import {
  HeadersFunction,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from 'remix'

export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url)
  return fetch(`https://developer.mozilla.org${url.pathname}/index.json`)
}

export const headers: HeadersFunction = ({ loaderHeaders }) => loaderHeaders

export const meta: MetaFunction = ({ data }) => ({
  title: data.doc.title,
})

export default function Content() {
  const { doc } = useLoaderData()
  return (
    <div className="flex gap-4 h-screen max-h-screen">
      <div
        className="p-2"
        dangerouslySetInnerHTML={{
          __html: doc.sidebarHTML,
        }}
      ></div>
      <div className="prose p-2 overflow-y-auto">
        {doc.body.map((item: any, i: number) => (
          <div
            key={i}
            dangerouslySetInnerHTML={{
              __html: item.value.content,
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}

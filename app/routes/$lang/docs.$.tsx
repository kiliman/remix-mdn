import {
  HeadersFunction,
  json,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from 'remix'
import { Prose, ProseWithHeading } from '~/documents/ingredients/prose'
import { SpecificationSection } from '~/documents/ingredients/spec-section'

declare var CONTENT: KVNamespace

export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url)
  const key = `${url.pathname.substring(1)}/index.json`
  // @ts-ignore
  let content = JSON.parse(await CONTENT.get(key))
  console.log('cache', content)
  if (!content) {
    const response = await fetch(
      `https://developer.mozilla.org${url.pathname}/index.json`,
    )
    const etag = response.headers.get('etag')
    content = await response.json()
    content.etag = etag
    await CONTENT.put(key, JSON.stringify(content))
  }

  return json(content, { status: 200, headers: { etag: content.etag } })
}

export let headers: HeadersFunction = ({ loaderHeaders }) => loaderHeaders

export let meta: MetaFunction = ({ data }) => ({
  title: data.doc.title,
})

export default function Content() {
  let { doc } = useLoaderData()
  return (
    <div className="article-wrapper">
      <div
        id="sidebar-quicklinks"
        className="sidebar"
        dangerouslySetInnerHTML={{
          __html: doc.sidebarHTML,
        }}
      ></div>
      <main id="content" className="main-content">
        <RenderDocumentBody doc={doc} />
      </main>
    </div>
  )
}

/** These prose sections should be rendered WITHOUT a heading. */
const PROSE_NO_HEADING = ['short_description', 'overview']

function RenderDocumentBody({ doc }: any) {
  return doc.body.map((section: any, i: number) => {
    if (section.type === 'prose') {
      // Only exceptional few should use the <Prose/> component,
      // as opposed to <ProseWithHeading/>.
      if (!section.value.id || PROSE_NO_HEADING.includes(section.value.id)) {
        return (
          <Prose
            key={section.value.id || `prose${i}`}
            section={section.value}
          />
        )
      } else {
        return (
          <ProseWithHeading
            key={section.value.id}
            id={section.value.id}
            section={section.value}
          />
        )
      }
    } else if (section.type === 'specifications') {
      return (
        <SpecificationSection key={`specifications${i}`} {...section.value} />
      )
    } else {
      console.warn(section)
      // throw new Error(`No idea how to handle a '${section.type}' section`);
      return null
    }
  })
}

import { Link } from 'react-router-dom'

export default function Index() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-large my-2">Welcome to Remix MDN Docs</h1>
      <ul>
        <li className="flex flex-col gap-2">
          <Link className="underline" to="/en-US/docs/Web/API/Request">
            Request API
          </Link>
          <Link className="underline" to="/en-US/docs/Web/API/Response">
            Response API
          </Link>
        </li>
      </ul>
    </div>
  )
}

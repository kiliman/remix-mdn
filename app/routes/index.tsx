import { Link } from 'react-router-dom'

export default function Index() {
  return (
    <div className="article-wrapper">
      <main id="content" className="main-content">
        <h1>Welcome to Remix MDN Docs</h1>
        <ul>
          <li>
            <Link to="/en-US/docs/Web/API/Request">Request API</Link>
          </li>
          <li>
            <Link to="/en-US/docs/Web/API/Response">Response API</Link>
          </li>
        </ul>
      </main>
    </div>
  )
}

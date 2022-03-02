import { Link } from 'react-router-dom'

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <Link to="/en-US/docs/Web/API/Request">Request API</Link>
        </li>
      </ul>
    </div>
  )
}

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container">
      <div className="section">
        <h1>Page Not Found</h1>
        <p>Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
        <Link href="/" className="btn btn-primary">
          Return Home
        </Link>
      </div>
    </div>
  )
}

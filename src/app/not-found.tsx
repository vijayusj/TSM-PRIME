import Link from 'next/link';
import '@/styles/error.scss';
export default async function NotFound() {
  return (
    <div className="error_container">
      <p>Could not find requested resource</p>
      <p>
        <Link href="/">Home</Link>
      </p>
    </div>
  );
}

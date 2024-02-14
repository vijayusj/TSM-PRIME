'use client'; // Error components must be Client Components
import '@/styles/error.scss';

export default function ErrorComponent({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="error_container">
      <h2>Something went wrong!</h2>
      <h3>connect to mobile network</h3>
      {/* {error} */}
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}

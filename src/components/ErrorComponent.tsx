'use client'; // Error components must be Client Components
import '@/styles/error.scss';
import { useEffect } from 'react';

export default function ErrorComponent({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    // console.error(error);
  }, [error]);

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

'use client';
import ErrorComponent from '@/components/ErrorComponent';
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <>
          <ErrorComponent error={error} reset={reset} />
          <h2>vijay kinnera</h2>
        </>
      </body>
    </html>
  );
}

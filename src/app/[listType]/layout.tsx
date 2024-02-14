export function generateMetadata({
  params: { listType },
}: {
  params: { listType: string };
}) {
  const title = listType === 'movies' ? 'Movies' : 'TV Shows';
  return {
    title: title,
  };
}
export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
}

// TODO: Update this to mimic the new UI Components
export function EventsSkeleton() {
  return (
    <ul className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <li
          key={i}
          className="bg-white rounded-xl shadow-md border border-gray-200 p-5"
        >
          <div className="h-5 w-56 rounded bg-gray-200 animate-pulse mb-2" />
          <div className="h-4 w-40 rounded bg-gray-200 animate-pulse mb-3" />
          <div className="h-3 w-3/4 rounded bg-gray-100 animate-pulse" />
        </li>
      ))}
    </ul>
  );
}

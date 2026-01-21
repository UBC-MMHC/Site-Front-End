// TODO: Update this to mimic the new UI Components
export function EventsSkeleton() {
	return (
		<ul className="space-y-4">
			{Array.from({ length: 4 }).map((_, i) => (
				<li key={i} className="rounded-xl border border-gray-200 bg-white p-5 shadow-md">
					<div className="mb-2 h-5 w-56 animate-pulse rounded bg-gray-200" />
					<div className="mb-3 h-4 w-40 animate-pulse rounded bg-gray-200" />
					<div className="h-3 w-3/4 animate-pulse rounded bg-gray-100" />
				</li>
			))}
		</ul>
	);
}

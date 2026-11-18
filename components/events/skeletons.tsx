export function EventsSkeleton() {
	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
			{Array.from({ length: 4 }).map((_, i) => (
				<div key={i} className="border-border bg-surface overflow-hidden rounded-2xl border">
					<div className="dark:bg-surface-elevated aspect-[16/9] animate-pulse bg-zinc-200" />
					<div className="space-y-3 p-6">
						<div className="dark:bg-surface-elevated h-5 w-3/4 animate-pulse rounded bg-zinc-200" />
						<div className="dark:bg-surface-elevated h-4 w-1/2 animate-pulse rounded bg-zinc-200" />
						<div className="dark:bg-surface-elevated/80 h-3 w-full animate-pulse rounded bg-zinc-100" />
					</div>
				</div>
			))}
		</div>
	);
}

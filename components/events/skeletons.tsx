export function EventsSkeleton() {
	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
			{Array.from({ length: 4 }).map((_, i) => (
				<div
					key={i}
					className="overflow-hidden rounded-2xl border border-border bg-surface"
				>
					<div className="aspect-[16/9] animate-pulse bg-zinc-200 dark:bg-surface-elevated" />
					<div className="space-y-3 p-6">
						<div className="h-5 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-surface-elevated" />
						<div className="h-4 w-1/2 animate-pulse rounded bg-zinc-200 dark:bg-surface-elevated" />
						<div className="h-3 w-full animate-pulse rounded bg-zinc-100 dark:bg-surface-elevated/80" />
					</div>
				</div>
			))}
		</div>
	);
}

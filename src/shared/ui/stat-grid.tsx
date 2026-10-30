import { classNames } from "@/shared/utils/classnames";

type Stat = { label: string; value: string; color: string };

/**
 * Three color blocks; each value is sized to its own block (cqi), so a long
 * word like "FRONTEND" fits. Phones get one row per stat instead of three
 * columns, which are too narrow for the labels.
 */
export function StatGrid({ stats, className }: { stats: readonly Stat[]; className?: string }) {
	return (
		<dl className={classNames("grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3", className)}>
			{stats.map((stat) => (
				<div
					key={stat.label}
					className={classNames(
						"@container flex min-w-0 items-center justify-between gap-4 rounded-[1.5rem] px-5 py-4 text-on-block sm:flex-col sm:items-start sm:gap-6 sm:rounded-[1.75rem] sm:p-5 md:p-6",
						stat.color,
					)}
				>
					<dt className="min-w-0 text-xs font-bold md:text-sm">{stat.label}</dt>
					<dd className="type-display shrink-0 text-[clamp(1.125rem,8cqi,2rem)] tabular-nums sm:text-[clamp(1.125rem,12cqi,3rem)]">
						{stat.value}
					</dd>
				</div>
			))}
		</dl>
	);
}

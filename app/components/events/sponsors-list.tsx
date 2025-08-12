export function SponsorsList({ sponsors }: { sponsors?: string[] }) {
  return (
    <div className="mt-4 space-y-2">
      <div className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        Sponsors
      </div>
      <div className="flex flex-wrap gap-2">
        {sponsors && sponsors.length > 0 ? (
          sponsors.map((name) => (
            <span
              key={name}
              className="inline-flex items-center gap-1 rounded-full bg-zinc-200 px-2.5 py-0.5 text-xs font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
            >
              {name}
            </span>
          ))
        ) : (
          <span className="text-sm text-zinc-600 dark:text-zinc-400">—</span>
        )}
      </div>
    </div>
  );
}

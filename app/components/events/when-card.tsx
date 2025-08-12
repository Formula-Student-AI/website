export function WhenCard({
  dateLine,
  timeRangeLine,
}: {
  dateLine: string;
  timeRangeLine: string;
}) {
  return (
    <div className="rounded-xl shadow-sm bg-gray-50 p-4 md:p-6">
      <div className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        When
      </div>
      <div className="mt-2">
        <div className="text-base md:text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {dateLine}
        </div>
        <div className="text-sm md:text-base text-zinc-600 dark:text-zinc-400">
          {timeRangeLine}
        </div>
      </div>
    </div>
  );
}

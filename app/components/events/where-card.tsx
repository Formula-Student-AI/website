export function WhereCard({
  location,
  googleMaps,
}: {
  location: string;
  googleMaps?: string | null;
}) {
  return (
    <div className="rounded-xl shadow-sm bg-gray-50 p-4 md:p-6">
      <div className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        Where
      </div>
      <div className="mt-2 text-base md:text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        {location}
      </div>
      {googleMaps && (
        <div className="mt-3">
          <iframe
            src={googleMaps}
            width={"100%"}
            className="rounded-lg"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}

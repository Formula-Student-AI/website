export function CancelBanner({  
    cancelled,
    cancelReason,
  }: {
    cancelled: boolean;
    cancelReason?: string | null;
  }) {
    if (!cancelled) return null;
    return (
      <div
        role="alert"
        className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-800 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-200"
      >
        <p className="font-semibold">This event has been cancelled.</p>
        {cancelReason && (
          <p className="text-sm opacity-90">Reason: {cancelReason}</p>
        )}
      </div>
    );
  }
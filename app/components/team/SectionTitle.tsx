/** A section heading followed by a red rule that fades out across the page. */
export default function SectionTitle({
  id,
  children,
  tone = "light",
}: {
  id: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <h2
        id={id}
        className={`text-3xl font-extrabold tracking-tight sm:text-4xl ${
          tone === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        {children}
      </h2>
      <div
        aria-hidden="true"
        className="h-px flex-1 bg-gradient-to-r from-university-red to-transparent"
      />
    </div>
  );
}

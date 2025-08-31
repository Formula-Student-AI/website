export default function TeamMarkdown({ html }: { html: string }) {
  return (
    <section className="relative py-10 md:py-14 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <div
          className="prose prose-gray max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </section>
  );
}

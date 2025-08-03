import markdownToHtml from "@/lib/markdownToHtml";

const sampleMarkdown = `
# Sample Blog Post

Here is some **bold** text and inline math: $a^2 + b^2 = c^2$. 

Here is a code block:

[Link to Google](https://www.google.com)

<img src="/favicon.png" alt="FSAI Logo" class="w-16" />

<code>
console.log("Hello from code!");
</code>

\`\`\`js
console.log("Hello from code!");
\`\`\`

A table:

| Name  | Age |
|-------|-----|
| Alice | 30  |

Raw HTML:

<div style="color: red;">This is red text</div>

A math block:

$$
E = mc^2
$$
`;

export default async function MarkdownTestPage() {
  const htmlContent = await markdownToHtml(sampleMarkdown);

  return (
    <main>
      <h1>Markdown Rendering Test (Server-side)</h1>
      <div
        className="max-w-2xl mx-auto prose"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </main>
  );
}

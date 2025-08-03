import { remark } from "remark";
import remarkGfm from "remark-gfm"; 
import remarkMath from "remark-math"; 
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex"; 
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkGfm) // Render GitHub-flavored markdown for tables, tasklists, strikethrough, etc.
    .use(remarkMath) // Parse math blocks and inline math
    .use(remarkRehype, { allowDangerousHtml: true }) // Convert remark AST to rehype AST
    .use(rehypeRaw) // Parse raw HTML in markdown
    .use(rehypeKatex) // Convert math blocks to HTML 
    .use(rehypeHighlight) // Highlight code blocks
    .use(rehypeStringify) // Convert HTML AST (rehype) to string
    .process(markdown);

  return result.toString();
}

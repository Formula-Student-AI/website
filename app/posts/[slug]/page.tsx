import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/postApi";
import markdownToHtml from "@/lib/markdownToHtml";
import Header from "@/app/ui/layout/Header";
import Container from "@/app/components/common/container";
import { PostHeader } from "@/app/components/posts/post-header";
import { PostBody } from "@/app/components/posts/post-body";

type Params = { params: Promise<{ slug: string }> };

export default async function Post(props: Params) {
  const slug = (await props.params).slug;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <main>
      <Container>
        <Header />
        <article className="mt-16 mb-32">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
          />
          <PostBody content={content} />
        </article>
      </Container>
    </main>
  );
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const slug = (await props.params).slug;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const title = `${post.title} | Bristol Formula Student AI`;

  return {
    title,
    description: post.excerpt,
    openGraph: {
      title,
      description: post.excerpt,
      images: [{ url: post.coverImage, alt: post.title }],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
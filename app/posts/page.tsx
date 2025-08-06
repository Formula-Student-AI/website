import { Metadata } from "next";
import { getAllPosts } from "@/lib/postApi";
import { Intro } from "@/app/components/posts/intro";
import Container from "../components/common/container";
import { HeroPost } from "../components/posts/hero-post";
import { MoreStories } from "../components/posts/more-stories";

export const metadata: Metadata = {
  title: "Posts | Bristol Formula Student AI",
  description:
    "Read the latest posts and updates from the Bristol Formula Student AI team. Stay informed about our progress, achievements, and insights in autonomous vehicle development.",
  openGraph: {
    title: "Posts | Bristol Formula Student AI",
    description:
      "Read the latest posts and updates from the Bristol Formula Student AI team. Stay informed about our progress, achievements, and insights in autonomous vehicle development.",
    type: "website",
  },
};

export default function Posts() {
  const posts = getAllPosts();
  const featuredPost = posts.find((post) => post.featured) || posts[0];
  const morePosts = posts.filter((post) => post !== featuredPost);

  return (
    <main>
      <Container>
        <Intro />
        <HeroPost
          title={featuredPost.title}
          coverImage={featuredPost.coverImage}
          date={featuredPost.date}
          excerpt={featuredPost.excerpt}
          author={featuredPost.author}
          slug={featuredPost.slug}
        />
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </main>
  );
}

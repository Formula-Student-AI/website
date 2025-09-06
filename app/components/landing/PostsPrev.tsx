import Link from "next/link";
import { getAllPosts } from "@/lib/postApi";
import { HeroPost } from "../posts/hero-post";

export default function PostsPrev() {
  const posts = getAllPosts();
  const featuredPost = posts.find((post) => post.featured) || posts[0];

  return (
    <div className="relative mx-auto px-6 pt-14 pb-16">
      <div className="px-6 md:px-10 lg:px-18 bg-white rounded-2xl">
        <HeroPost
          title={featuredPost.title}
          coverImage={featuredPost.coverImage}
          date={featuredPost.date}
          excerpt={featuredPost.excerpt}
          author={featuredPost.author}
          slug={featuredPost.slug}
        />
      </div>

      <div className="text-center -mt-14">
        <Link
          href="/posts"
          className="inline-block rounded-full bg-university-red px-8 py-3 text-lg font-semibold text-white shadow-md hover:bg-university-red/90 hover:shadow-lg transition-all duration-200"
        >
          More Posts
        </Link>
      </div>
    </div>
  );
}

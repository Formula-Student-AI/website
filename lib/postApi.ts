import { POST_DIR } from "./constants";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { Post } from "@/interfaces/post";
import { getTeamMemberByEmail } from "./teamApi";

export function getPostFilenames() {
  return fs.readdirSync(POST_DIR);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(POST_DIR, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const post = {
    ...data,
    author: getTeamMemberByEmail(data.author_email),
    date: new Date(data.date),
    slug,
    content,
  } as Post;

  return post;
}

export function getAllPosts(): Post[] {
  const filenames = getPostFilenames();
  const posts = filenames
    .map(getPostBySlug)
    .filter((post) => post.published) // Only published posts
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1)); // Sort by date, newest first

  return posts;
}

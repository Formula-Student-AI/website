import Avatar from "@/app/components/posts/avatar";
import CoverImage from "./cover-image";
import { TeamMember } from "@/interfaces/team";
import Link from "next/link";
import DateFormatter from "../common/date-formatter";
import { DEFAULT_AVATAR } from "@/lib/constants";
import { PostTitle } from "./post-title";

type Props = {
  title: string;
  coverImage: string;
  date: Date;
  excerpt: string;
  author: TeamMember;
  slug: string;
};

export function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <section className="mb-24 md:mb-30">
      <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        Featured Post
      </h2>
      <div className="group rounded-xl shadow-2xl shadow-logo-blue/45 overflow-hidden">
        <div className="p-8 mb-4 scale-95 group-hover:scale-100 transition-transform duration-600">
          <CoverImage title={title} src={coverImage} slug={slug} />
        </div>
        <div className="px-8 pb-8">
          <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8">
            <div>
              <h3 className="mb-4 text-4xl lg:text-5xl leading-tight font-bold text-center md:text-left">
                <Link
                  href={`/posts/${slug}`}
                  className="inline-block px-4 py-2 bg-white text-university-red group-hover:bg-university-red group-hover:text-white group-active:bg-university-red group-active:text-white hover:underline transition-all duration-600"
                >
                  {title}
                </Link>
              </h3>
              <div className="mb-4 md:ml-4 md:mb-0 text-lg">
                <DateFormatter date={date} />
              </div>
            </div>
            <div>
              <p className="text-lg leading-relaxed mb-6">{excerpt}</p>
              <Avatar
                name={author.name}
                image={author.image || DEFAULT_AVATAR}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

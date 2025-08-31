import Avatar from "./avatar";
import CoverImage from "../common/cover-image";
import DateFormatter from "../common/date-formatter";
import { PostTitle } from "./post-title";
import { TeamMember } from "@/interfaces/team";
import { DEFAULT_AVATAR } from "@/lib/constants";

type Props = {
  title: string;
  coverImage: string;
  date: Date;
  author: TeamMember;
};

export function PostHeader({ title, coverImage, date, author }: Props) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        <Avatar name={author.name} image={author.image || DEFAULT_AVATAR} />
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar name={author.name} image={author.image || DEFAULT_AVATAR} />
        </div>
        <div className="mb-6 text-lg">
          <DateFormatter date={date} />
        </div>
      </div>
    </>
  );
}

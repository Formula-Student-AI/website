import Link from "next/link";

type Props = {
  onClick?: () => void;
};

export default function NavLinks({ onClick }: Props) {
  return (
    <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 text-sm sm:text-base font-medium text-gray-800">
      {[
        { href: "/posts", label: "Posts" },
        { href: "/events", label: "Events" },
        { href: "/team", label: "Team" },
      ].map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="hover:text-gray-600 transition-colors"
          onClick={onClick}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}

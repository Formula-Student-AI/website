import Link from "next/link";

const links = [
  { href: "/posts", label: "Posts" },
  { href: "/team", label: "Team" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/notion-hub", label: "Notion hub" },
];

export default function FooterLinks() {
  return (
    <div className="grid grid-cols-4 text-center pb-6">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="hover:underline transition-colors text-xs font-semibold text-gray-800"
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
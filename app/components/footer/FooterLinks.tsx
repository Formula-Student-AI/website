import Link from "next/link";

const links = [
  { href: "/posts", label: "Posts" },
  { href: "/events", label: "Events" },
  { href: "/team", label: "Team" },
  { href: "/sponsors", label: "Sponsor us" },
  { href: "/notion-hub", label: "Notion hub" },
];

export default function FooterLinks() {
  return (
    <div className="grid grid-cols-5 text-center pb-6">
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
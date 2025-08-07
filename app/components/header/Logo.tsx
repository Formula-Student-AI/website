import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image
        src="/favicon-transparent.png"
        alt="FSAI Logo"
        width={32}
        height={32}
        className="h-8 w-8"
      />
      <span className="text-xl font-semibold text-gray-900">FSAI</span>
    </Link>
  );
}

import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function FooterBrand() {
  return (
    <div className="text-center mt-10 mb-6 pt-8 border-b border-gray-300 pb-10">
      <h3 className="text-base font-semibold text-gray-800 mb-3">
        <Link href="/" className="hover:underline">
          Bristol Formula Student AI
        </Link>
      </h3>
      <div className="flex justify-center space-x-6 text-gray-600">
        <Link
          href="https://instagram.com"
          aria-label="Instagram"
          target="_blank"
        >
          <FaInstagram className="w-5 h-5 hover:text-black transition-colors" />
        </Link>
        <Link href="https://linkedin.com" aria-label="LinkedIn" target="_blank">
          <FaLinkedin className="w-5 h-5 hover:text-black transition-colors" />
        </Link>
        <Link href="https://facebook.com" aria-label="Facebook" target="_blank">
          <FaFacebook className="w-5 h-5 hover:text-black transition-colors" />
        </Link>
      </div>
    </div>
  );
}

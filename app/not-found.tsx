import { FaChevronLeft } from "react-icons/fa";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4">404 – Page Not Found</h1>
      <p className="text-gray-600 mb-6">
        Sorry, the page you are looking for does not exist.
      </p>
      <h3 className="relative text-lg font-bold text-center">
        <Link
          href="/"
          className="inline-block relative text-university-red hover:underline"
        >
          <FaChevronLeft className="absolute left-[-1.5rem] top-1/2 -translate-y-1/2 w-4 h-4 text-university-red" />
          Go back home
        </Link>
      </h3>
    </div>
  );
}

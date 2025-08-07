import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home | Bristol Formula Student AI",
  description:
    "Welcome to Bristol Formula Student AI - pioneering autonomous vehicle technology in Formula Student competition. Discover our innovative AI-driven approach to racing.",
  openGraph: {
    title: "Bristol Formula Student AI",
    description:
      "Welcome to Bristol Formula Student AI - pioneering autonomous vehicle technology in Formula Student competition. Discover our innovative AI-driven approach to racing.",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="bg-white py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Bristol Formula Student AI
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Pioneering autonomous vehicle technology in Formula Student
            competition.
          </p>
          <Link
            href="/team"
            className="inline-block px-6 py-3 bg-black text-white text-sm font-semibold rounded hover:bg-gray-800 transition"
          >
            Meet the Team
          </Link>
        </div>
      </section>

      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About Us</h2>
          <p className="text-gray-700">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam, ipsum. Illum dolorum facilis modi voluptatum nemo, doloremque ad molestiae pariatur consequatur quos distinctio, explicabo a ullam? Cupiditate voluptatibus consectetur harum.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Events</h3>
            <p className="text-gray-600">
              Stay tuned for our upcoming competitions and public demos.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Posts</h3>
            <p className="text-gray-600">
              Read about our progress, AI development, and insights.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Our Team
            </h3>
            <p className="text-gray-600">
              Meet the brilliant minds behind the Bristol FSAI project.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

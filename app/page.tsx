import { Metadata } from "next";

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
    <div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita sed
        exercitationem non, recusandae ex quia et repellendus earum maiores,
        necessitatibus ducimus nesciunt omnis quam porro doloremque temporibus
        inventore autem molestias.
      </p>
    </div>
  );
}

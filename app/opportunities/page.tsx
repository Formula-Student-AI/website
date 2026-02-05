import type { Metadata } from "next";
import Container from "../components/common/container";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { getPublishedOpportunities } from "@/lib/opportunityApi";

export const metadata: Metadata = {
  title: "Opportunities | Bristol Formula Student AI",
  description:
    "Explore open roles with the Bristol Formula Student AI team and apply through our Microsoft Forms.",
  openGraph: {
    title: "Opportunities | Bristol Formula Student AI",
    description:
      "Explore open roles with the Bristol Formula Student AI team and apply through our Microsoft Forms.",
    type: "website",
  },
};

const formatTeamLabel = (tags?: string[]) => tags?.[0] ?? "General";

export default function OpportunitiesPage() {
  const visibleOpportunities = getPublishedOpportunities();

  return (
    <main className="bg-white min-h-screen">
      <Container>
        <section className="flex flex-col items-center mt-16 mb-12">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight text-center">
            Join us.
          </h1>
          <p className="text-center md:text-justify text-lg mt-5 max-w-3xl text-gray-600">
            Explore open roles across the team. Apply via the linked Microsoft
            Form for each opportunity.
          </p>
        </section>

        <section className="mb-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-6">
            <div className="flex items-center gap-3 text-gray-600">
              <Search className="h-4 w-4" aria-hidden="true" />
              <span className="text-sm font-medium">
                {visibleOpportunities.length} openings
              </span>
            </div>
          </div>

          <div>
            {visibleOpportunities.map((opportunity) => (
              <div
                key={opportunity.slug}
                className="flex flex-col gap-4 border-b border-gray-100 py-6 transition-all duration-300 hover:border-b-4 hover:border-university-red md:flex-row md:items-center md:justify-between last:border-b-0"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href={`/opportunities/${opportunity.slug}`}
                      className="text-lg font-semibold text-gray-900 transition-colors hover:text-university-red"
                    >
                      {opportunity.title}
                    </Link>
                    <span className="text-sm text-gray-500">
                      {formatTeamLabel(opportunity.tags)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 max-w-2xl">
                    {opportunity.summary}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-6 text-sm text-gray-600 md:min-w-[260px] md:justify-end">
                  <span>{opportunity.location ?? "Multiple locations"}</span>
                  <a
                    href={opportunity.application_form_url ?? "#"}
                    className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-5 py-2 text-sm font-semibold text-gray-900 transition hover:bg-gray-200"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Apply now
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}

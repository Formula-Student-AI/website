import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/app/components/common/container";
import { ArrowUpRight } from "lucide-react";
import markdownToHtml from "@/lib/markdownToHtml";
import {
  getAllOpportunities,
  getOpportunityBySlug,
} from "@/lib/opportunityApi";

type Params = { params: Promise<{ slug: string }> };

const formatTeamLabel = (tags?: string[]) => tags?.[0] ?? "Team";
const formatLocation = (location?: string) =>
  location ?? "Multiple locations";
const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
const formatOpportunityType = (type: string) =>
  ({
    team_role: "Team role",
    internship: "Internship",
    volunteer: "Volunteer",
    part_time: "Part-time",
    full_time: "Full-time",
    other: "Other",
  })[type] ?? "Opportunity";

export default async function OpportunityPage(props: Params) {
  const slug = (await props.params).slug;
  const opportunity = getOpportunityBySlug(slug);

  if (!opportunity || !opportunity.published) {
    notFound();
  }

  const content = await markdownToHtml(opportunity.content || "");

  return (
    <main className="bg-white">
      <Container>
        <article className="pt-16 min-h-screen flex flex-col">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-gray-400">
              Opportunities
            </p>
            <h1 className="mt-6 text-3xl md:text-6xl font-bold tracking-tight text-gray-900">
              {opportunity.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-base md:text-lg text-gray-600">
              {opportunity.tags?.length ? (
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {opportunity.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-university-red px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-university-red"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : (
                <span>{formatTeamLabel(opportunity.tags)}</span>
              )}
              <span aria-hidden="true">•</span>
              <span>{formatLocation(opportunity.location)}</span>
            </div>
            {opportunity.summary && (
              <p className="mt-4 text-base text-gray-600">
                {opportunity.summary}
              </p>
            )}
            {opportunity.application_form_url && (
              <a
                href={opportunity.application_form_url}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-gray-100 px-5 py-2 text-sm font-semibold text-gray-900 transition hover:bg-gray-200"
                target="_blank"
                rel="noreferrer"
              >
                Apply now
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>

          {content && (
            <div className="mt-12 flex-1 border-t border-gray-200 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
              <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
                <div className="mx-auto h-full w-full max-w-4xl border-x-1 border-gray-300">
                  <div className="px-0 py-12">
                  <section className="grid gap-0 md:grid-cols-2 border-b border-gray-200 pb-12">
                    <div className="rounded-2xl bg-white p-6">
                      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                        Role details
                      </h2>
                      <dl className="mt-4 space-y-3 text-sm text-gray-600">
                        <div className="flex items-center justify-between gap-4">
                          <dt className="font-medium text-gray-900">Type</dt>
                          <dd>
                            {formatOpportunityType(
                              opportunity.opportunity_type
                            )}
                          </dd>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <dt className="font-medium text-gray-900">Location</dt>
                          <dd>{formatLocation(opportunity.location)}</dd>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <dt className="font-medium text-gray-900">Work mode</dt>
                          <dd>{opportunity.remote ? "Remote / Hybrid" : "On-site"}</dd>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <dt className="font-medium text-gray-900">Open date</dt>
                          <dd>{formatDate(opportunity.open_date)}</dd>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <dt className="font-medium text-gray-900">Close date</dt>
                          <dd>
                            {opportunity.close_date
                              ? formatDate(opportunity.close_date)
                              : "Open until filled"}
                          </dd>
                        </div>
                        {opportunity.contact_email && (
                          <div className="flex items-center justify-between gap-4">
                            <dt className="font-medium text-gray-900">Contact</dt>
                            <dd>{opportunity.contact_email}</dd>
                          </div>
                        )}
                      </dl>
                    </div>

                    {(opportunity.requirements?.length ||
                      opportunity.responsibilities?.length) && (
                      <div className="rounded-2xl bg-white p-6">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                          Requirements
                        </h2>
                        {opportunity.requirements?.length ? (
                          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-gray-600">
                            {opportunity.requirements.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-4 text-sm text-gray-600">
                            We welcome applicants from all backgrounds.
                          </p>
                        )}

                        {opportunity.responsibilities?.length ? (
                          <>
                            <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                              Responsibilities
                            </h3>
                            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-600">
                              {opportunity.responsibilities.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </>
                        ) : null}
                      </div>
                    )}
                  </section>

                  <div className="pt-12">
                    <div
                      className="prose prose-pre:bg-transparent max-w-none px-4 md:px-8"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </article>
      </Container>
    </main>
  );
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const slug = (await props.params).slug;
  const opportunity = getOpportunityBySlug(slug);

  if (!opportunity) {
    notFound();
  }

  const title = `${opportunity.title} | Bristol Formula Student AI`;
  const description =
    opportunity.summary ?? opportunity.description ?? "Join our team.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  const opportunities = getAllOpportunities();
  return opportunities.map((opportunity) => ({
    slug: opportunity.slug,
  }));
}

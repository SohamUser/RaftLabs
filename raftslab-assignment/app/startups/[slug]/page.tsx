import { getAllStartups, getStartupBySlug } from "@/lib/startups";
import { notFound } from "next/navigation";
import Link from "next/link";
import ShareButton from "./ShareButton";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const startup = getStartupBySlug(slug);

  if (!startup) return {};

  return {
    title: `${startup.name} – Indian Startup Directory`,
    description: startup.description,
  };
}

export async function generateStaticParams() {
  return getAllStartups().map((startup) => ({
    slug: startup.slug,
  }));
}

export default async function StartupPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const startup = getStartupBySlug(slug);

  if (!startup) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link href="/startups" className="text-sm text-blue-600 hover:underline">
        ← Back to startups
      </Link>

      <section className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex items-center justify-center h-28 w-28 rounded-full bg-white/90 p-2 shadow-md">
            {startup.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={startup.logo}
                alt={`${startup.name} logo`}
                className="h-full w-full rounded-full object-contain"
              />
            ) : (
              <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center text-sm text-gray-600">
                No logo
              </div>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-extrabold drop-shadow">{startup.name}</h1>
            <p className="mt-2 text-sm/relaxed opacity-90">{startup.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {startup.sector.map((tag, idx) => (
                <span
                  key={`${startup.slug}-${tag}-${idx}`}
                  className="text-xs px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 md:mt-0 flex flex-col gap-3 items-start">
            {startup.website ? (
              <a
                href={startup.website}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 bg-white text-indigo-700 px-4 py-2 rounded-full font-medium shadow-sm hover:shadow-md"
              >
                🌐 Visit site
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm">Website not available</span>
            )}

            <ShareButton name={startup.name} description={startup.description} url={startup.website} />
          </div>
        </div>
      </section>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl border p-5 bg-white">
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{startup.description}</p>
        </div>

        <div className="rounded-xl border p-5 bg-white">
          <h3 className="text-lg font-semibold mb-2">Company Details</h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p><strong>Headquarters:</strong> {startup.hq || "Not available"}</p>
            <p><strong>Funding:</strong> {startup.funding.length > 0 ? startup.funding.join(", ") : "Not disclosed"}</p>
            <p><strong>Sectors:</strong> {startup.sector.join(", ")}</p>
          </div>
        </div>

        <div className="rounded-xl border p-5 bg-white flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Stats</h3>
            <div className="flex gap-3">
              <div className="flex-1 bg-gray-50 p-3 rounded">
                <div className="text-xs text-gray-500">Sectors</div>
                <div className="text-lg font-bold">{startup.sector.length}</div>
              </div>

              <div className="flex-1 bg-gray-50 p-3 rounded">
                <div className="text-xs text-gray-500">Funding Rounds</div>
                <div className="text-lg font-bold">{startup.funding.length}</div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            {startup.website ? (
              <a
                href={startup.website}
                target="_blank"
                rel="noreferrer noopener"
                className="block text-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Visit Website
              </a>
            ) : (
              <div className="text-sm text-gray-500 text-center">No external link</div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 text-xs text-gray-400">Data sourced from publicly available startup listings.</div>
    </div>
  );
}

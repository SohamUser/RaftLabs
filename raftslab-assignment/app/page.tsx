import Link from "next/link";
import { getAllStartups } from "@/lib/startups";

export default function HomePage() {
  const startups = getAllStartups();

  const total = startups.length;
  const sectors = Array.from(
    new Set(startups.flatMap((s) => s.sector.map((t) => t.trim()).filter(Boolean)))
  ).filter(Boolean);
  const sectorCount = sectors.length;

  const featured = startups.slice(0, 6);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <section className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
          <div className="md:flex md:items-center md:justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
                Indian Startup Directory
              </h1>
              <p className="mt-4 text-gray-600 text-base sm:text-lg">
                A curated directory of Indian startups — discover companies by
                sector, explore funding info, and quickly jump to company pages.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <Link
                  href="/startups"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-full font-medium shadow"
                >
                  Browse startups
                </Link>

                <a href="#featured" className="text-sm text-gray-600 hover:underline">
                  See featured
                </a>
              </div>
            </div>

            <div className="mt-6 md:mt-0 grid grid-cols-2 gap-3 w-full max-w-xs">
              <div className="rounded-lg bg-gray-50 border border-gray-100 p-4 text-center">
                <div className="text-sm text-gray-500">Startups</div>
                <div className="mt-2 text-2xl font-bold">{total}</div>
              </div>

              <div className="rounded-lg bg-gray-50 border border-gray-100 p-4 text-center">
                <div className="text-sm text-gray-500">Sectors</div>
                <div className="mt-2 text-2xl font-bold">{sectorCount}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-lg bg-white border border-gray-100 p-4">
            <div className="text-sm text-gray-500">Total startups</div>
            <div className="mt-1 text-xl font-semibold">{total}</div>
          </div>

          <div className="rounded-lg bg-white border border-gray-100 p-4">
            <div className="text-sm text-gray-500">Unique sectors</div>
            <div className="mt-1 text-xl font-semibold">{sectorCount}</div>
          </div>

          <div className="rounded-lg bg-white border border-gray-100 p-4">
            <div className="text-sm text-gray-500">Curated list</div>
            <div className="mt-1 text-xl font-semibold">Static JSON</div>
          </div>
        </section>

        <section id="featured" className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Featured startups</h2>
            <Link href="/startups" className="text-sm text-emerald-600 hover:underline">
              View all
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featured.map((s) => (
              <Link
                key={s.slug}
                href={`/startups/${s.slug}`}
                className="group block rounded-xl bg-white border border-gray-100 p-4 hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-md bg-gray-50 flex items-center justify-center border overflow-hidden">
                    {s.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={s.logo} alt={`${s.name} logo`} className="h-full w-full object-contain" />
                    ) : (
                      <div className="text-xs text-gray-400">No logo</div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="text-sm font-semibold truncate">{s.name}</div>
                    <div className="mt-1 text-xs text-gray-500">{s.sector && s.sector.length > 0 ? s.sector[0] : "—"}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12 bg-white rounded-xl border border-gray-100 p-6 text-center">
          <h3 className="text-lg font-semibold">Explore more startups</h3>
          <p className="mt-2 text-sm text-gray-600 max-w-xl mx-auto">Browse the full directory to find companies by sector, funding, and location.</p>

          <div className="mt-4">
            <Link href="/startups" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-full font-medium shadow">
              Browse the directory
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

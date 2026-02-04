"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Startup } from "@/types/startup";

export default function StartupsList({
  startups,
  initial = 12,
  step = 12,
}: {
  startups: Startup[];
  initial?: number;
  step?: number;
}) {
  const [visible, setVisible] = useState(Math.min(initial, startups.length));
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (visible >= startups.length) return;

    const el = sentinelRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLoading(true);
            // small delay to show loading feel
            setTimeout(() => {
              setVisible((v) => Math.min(startups.length, v + step));
              setLoading(false);
            }, 250);
          }
        });
      },
      { rootMargin: "200px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [step, startups.length, visible]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {startups.slice(0, visible).map((startup) => (
          <article
            key={startup.slug}
            className="group rounded-2xl border bg-white p-5 hover:shadow-xl transition-transform transform hover:-translate-y-1"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {startup.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={startup.logo} alt={`${startup.name} logo`} className="h-16 w-16 rounded-lg object-contain border bg-white" loading="lazy" />
                ) : (
                  <div className="h-16 w-16 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-500">N/A</div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold truncate">
                  <Link href={`/startups/${startup.slug}`} className="inline-block hover:underline">
                    {startup.name}
                  </Link>
                </h3>

                <p className="mt-2 text-sm text-gray-600 line-clamp-3">{startup.description}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {startup.sector.filter(Boolean).slice(0, 3).map((tag, i) => (
                    <span key={`${startup.slug}-${tag}-${i}`} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="ml-3 flex flex-col items-end gap-2">
                <Link href={`/startups/${startup.slug}`} className="text-sm bg-emerald-600 text-white px-3 py-1.5 rounded-full hover:bg-emerald-700">View</Link>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600 flex flex-col sm:flex-row sm:justify-between gap-2">
              <div className="min-w-0">
                <strong>HQ:</strong>
                <div className="text-gray-700 break-words">{startup.hq || "—"}</div>
              </div>

              <div className="min-w-0 text-sm text-right">
                <strong>Funding:</strong>
                <div className="text-gray-700 break-words">{startup.funding.length > 0 ? startup.funding.join(", ") : "—"}</div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div ref={sentinelRef} className="mt-6 flex justify-center items-center" aria-hidden>
        {loading ? <div className="text-sm text-gray-500">Loading...</div> : visible < startups.length ? <div className="h-6" /> : <div className="text-sm text-gray-400">End of list</div>}
      </div>
    </div>
  );
}

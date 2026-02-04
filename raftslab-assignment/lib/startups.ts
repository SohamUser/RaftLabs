import startups from "@/data/startups.json";
import { Startup } from "@/types/startup";

/**
 * Basic validity check (not too strict)
 */
function isValidStartup(s: Startup): boolean {
  if (!s.slug || !s.name) return false;
  if (!Array.isArray(s.sector) || s.sector.length === 0) return false;

  const lowerName = s.name.toLowerCase();
  if (
    lowerName.includes("delivered to you") ||
    lowerName.includes("newsletter")
  ) {
    return false;
  }

  return true;
}

/**
 * Filter + deduplicate by slug
 */
const seenSlugs = new Set<string>();

export const allStartups: Startup[] = (startups as Startup[])
  .filter(isValidStartup)
  .filter((startup) => {
    if (seenSlugs.has(startup.slug)) {
      return false; // drop duplicate
    }
    seenSlugs.add(startup.slug);
    return true;
  });

export function getAllStartups(): Startup[] {
  return allStartups;
}

export function getStartupBySlug(slug: string): Startup | undefined {
  return allStartups.find((s) => s.slug === slug);
}

export function getStartupsBySector(sector: string): Startup[] {
  return allStartups.filter((s) =>
    s.sector.some(
      (tag) => tag.toLowerCase() === sector.toLowerCase()
    )
  );
}

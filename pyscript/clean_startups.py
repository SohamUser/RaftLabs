import json

INPUT_FILE = "./startups2.json"
OUTPUT_FILE = "data/startups.cleaned.json"

with open(INPUT_FILE, "r", encoding="utf-8") as f:
    startups = json.load(f)

cleaned = []
seen_slugs = set()

for s in startups:
    slug = s.get("slug", "").strip()
    name = s.get("name", "").strip()
    description = s.get("description", "").strip()
    sector = s.get("sector", [])

    # 1. Basic required fields
    if not slug or not name:
        continue

    # 2. Remove junk / CTA rows
    lower_name = name.lower()
    if "delivered to you" in lower_name or "newsletter" in lower_name:
        continue

    # 3. Description must be meaningful
    if len(description) < 10:
        continue

    # 4. Sector must exist
    if not isinstance(sector, list) or len(sector) == 0:
        continue

    # 5. Deduplicate by slug
    if slug in seen_slugs:
        continue
    seen_slugs.add(slug)

    cleaned.append(s)

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(cleaned, f, indent=2, ensure_ascii=False)

print(f"✅ Cleaning complete")
print(f"Original count: {len(startups)}")
print(f"Cleaned count: {len(cleaned)}")
print(f"Removed: {len(startups) - len(cleaned)}")

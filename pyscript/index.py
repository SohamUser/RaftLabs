import requests
from bs4 import BeautifulSoup
import json
import time

BASE_URL = "https://topstartups.io/"
HEADERS = {
    "User-Agent": "Mozilla/5.0"
}

TARGET_COUNT = 200
page = 1
all_startups = []

while len(all_startups) < TARGET_COUNT:
    print(f"Scraping page {page}... (collected {len(all_startups)})")

    params = {
        "page": page,
        "hq_location": "India"
    }

    res = requests.get(BASE_URL, headers=HEADERS, params=params)

    if res.status_code != 200:
        print("Stopped: Non-200 response")
        break

    soup = BeautifulSoup(res.text, "html.parser")
    cards = soup.find_all("div", class_="infinite-item")

    if not cards:
        print("No more startups found.")
        break

    for card in cards:
        if len(all_startups) >= TARGET_COUNT:
            break  # hard stop at 200

        try:
            name_tag = card.find("h3")
            name = name_tag.text.strip() if name_tag else ""

            website_tag = card.find("a", id="startup-website-link")
            website = website_tag["href"] if website_tag else ""

            # Description
            desc = ""
            what = card.find("b", string="What they do:")
            if what:
                desc = what.find_next("br").next_sibling.strip()

            # Sector / industry
            sectors = [
                tag.text.strip()
                for tag in card.find_all("span", id="industry-tags")
            ]

            # HQ
            hq = ""
            hq_text = card.find(string=lambda t: t and "HQ:" in t)
            if hq_text:
                hq = hq_text.replace("📍HQ:", "").strip()

            # Funding
            funding_tags = [
                tag.text.strip()
                for tag in card.find_all("span", id="funding-tags")
            ]

            all_startups.append({
                "slug": name.lower().replace(" ", "-"),
                "name": name,
                "sector": sectors,
                "funding": funding_tags,
                "hq": hq,
                "website": website,
                "description": desc,
            })

        except Exception as e:
            print("Error parsing startup:", e)

    page += 1
    time.sleep(1)  # be polite

# Save JSON
with open("startups2.json", "w", encoding="utf-8") as f:
    json.dump(all_startups, f, indent=2, ensure_ascii=False)

print(f"\n✅ Scraping complete — {len(all_startups)} startups collected")

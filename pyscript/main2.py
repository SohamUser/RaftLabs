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
        break

    soup = BeautifulSoup(res.text, "html.parser")
    cards = soup.find_all("div", class_="infinite-item")

    if not cards:
        break

    for card in cards:
        if len(all_startups) >= TARGET_COUNT:
            break

        try:
            # Name
            name_tag = card.find("h3")
            name = name_tag.text.strip() if name_tag else ""

            # Slug
            slug = name.lower().strip().replace(" ", "-")

            # Website
            website_tag = card.find("a", id="startup-website-link")
            website = website_tag["href"] if website_tag else ""

            # ✅ LOGO (robust)
            logo = ""
            img_tag = card.find("img", alt=lambda x: x and "logo" in x.lower())
            if not img_tag:
                img_tag = card.find("img")  # fallback
            if img_tag and img_tag.get("src"):
                logo = img_tag["src"]

            # Description
            desc = ""
            what = card.find("b", string="What they do:")
            if what:
                desc = what.find_next("br").next_sibling.strip()

            # Sector / industry
            sectors = [
                tag.text.strip()
                for tag in card.find_all("span", id="industry-tags")
                if tag.text.strip()
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
                "slug": slug,
                "name": name,
                "logo": logo,
                "sector": sectors,
                "funding": funding_tags,
                "hq": hq,
                "website": website,
                "description": desc
            })

        except Exception as e:
            print("Error parsing startup:", e)

    page += 1
    time.sleep(1)

with open("startups3.json", "w", encoding="utf-8") as f:
    json.dump(all_startups, f, indent=2, ensure_ascii=False)

print(f"\n✅ Scraping complete — {len(all_startups)} startups collected")

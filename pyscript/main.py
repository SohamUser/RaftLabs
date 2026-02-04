import requests
from bs4 import BeautifulSoup
import json
import time

BASE_URL = "https://topstartups.io"
PAGE_URL = "https://topstartups.io/?hq_location=India"

headers = {
    "User-Agent": "Mozilla/5.0"
}

response = requests.get(PAGE_URL, headers=headers)
soup = BeautifulSoup(response.text, "html.parser")

cards = soup.find_all("div", class_="infinite-item")

startups = []

for card in cards:
    try:
        # Name
        name_tag = card.find("h3")
        name = name_tag.text.strip() if name_tag else ""

        # Website
        website_tag = card.find("a", id="startup-website-link")
        website = website_tag["href"] if website_tag else ""

        # Description
        desc = ""
        what_they_do = card.find("b", string="What they do:")
        if what_they_do:
            desc = what_they_do.find_next("br").next_sibling.strip()

        # Sector / Industry tags
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

        startups.append({
            "slug": name.lower().replace(" ", "-"),
            "name": name,
            "sector": sectors,
            "funding": funding_tags,
            "hq": hq,
            "website": website,
            "description": desc
        })

    except Exception as e:
        print("Error parsing card:", e)

# Save to JSON
with open("startups.json", "w", encoding="utf-8") as f:
    json.dump(startups, f, indent=2, ensure_ascii=False)

print(f"Saved {len(startups)} startups to startups.json")

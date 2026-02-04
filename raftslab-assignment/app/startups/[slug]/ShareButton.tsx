"use client";

import React from "react";

export default function ShareButton({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url?: string;
}) {
  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title: name, text: description, url });
      } catch {
        // user probably cancelled, ignore
      }
      return;
    }

    if (url && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        // small UX feedback; keep minimal
        alert("Link copied to clipboard");
      } catch {
        alert("Unable to copy link");
      }
      return;
    }

    alert("No sharing available");
  }

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm hover:bg-white/20"
    >
      🔗 Share
    </button>
  );
}

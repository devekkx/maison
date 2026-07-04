"use client";

import { useState, useMemo } from "react";
import { GALLERY, GALLERY_FILTERS, type GalleryFilter } from "@/lib/data";
import GalleryTile from "@/components/GalleryTile";

export default function Gallery() {
  const [filter, setFilter] = useState<GalleryFilter>("All");
  const visible = useMemo(
    () => filter === "All" ? GALLERY : GALLERY.filter((g) => g.category === filter),
    [filter]
  );

  return (
    <section className="gallery" id="gallery" data-screen-label="05 Gallery">
      <div className="gallery-head">
        <h2 data-reveal-y>
          Recent <em>sittings.</em>
        </h2>
        <div className="filter" data-reveal-y role="group" aria-label="Filter gallery by category">
          {GALLERY_FILTERS.map((f) => (
            <button
              key={f}
              className={`chip ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="gallery-grid" aria-live="polite" aria-label="Gallery images">
        {visible.map((g, i) => (
          <GalleryTile key={`${g.cls}-${i}`} item={g} index={i} />
        ))}
      </div>
    </section>
  );
}

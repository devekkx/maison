"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { GALLERY, GALLERY_FILTERS, type GalleryFilter } from "@/lib/data";

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
        <div className="filter" data-reveal-y>
          {GALLERY_FILTERS.map((f) => (
            <button
              key={f}
              className={`chip ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="gallery-grid">
        {visible.map((g, i) => (
          <figure className={`tile ${g.cls}`} key={i} data-tile>
            <Image
              src={g.src}
              alt={g.cap}
              fill
              sizes="(max-width: 980px) 50vw, 25vw"
              style={{ objectFit: "cover" }}
            />
            <figcaption className="cap">{g.cap}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { type GalleryItem } from "@/lib/data";

interface GalleryTileProps {
  item: GalleryItem;
  index: number;
}

export default function GalleryTile({ item, index }: GalleryTileProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <figure className={`tile ${item.cls}`} key={index} data-tile>
      {imgError ? (
        <div className="tile-fallback" aria-label={item.cap} style={{ background: "#1a1a1a", width: "100%", height: "100%" }} />
      ) : (
        <Image
          src={item.src}
          alt={item.cap}
          fill
          loading="lazy"
          sizes="(max-width: 980px) 50vw, 25vw"
          style={{ objectFit: "cover" }}
          onError={() => setImgError(true)}
        />
      )}
      <figcaption className="cap">{item.cap}</figcaption>
    </figure>
  );
}

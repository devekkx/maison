import Image from "next/image";
import { type GalleryItem } from "@/lib/data";

interface GalleryTileProps {
  item: GalleryItem;
  index: number;
}

export default function GalleryTile({ item, index }: GalleryTileProps) {
  return (
    <figure className={`tile ${item.cls}`} key={index} data-tile>
      <Image
        src={item.src}
        alt={item.cap}
        fill
        loading="lazy"
        sizes="(max-width: 980px) 50vw, 25vw"
        style={{ objectFit: "cover" }}
      />
      <figcaption className="cap">{item.cap}</figcaption>
    </figure>
  );
}

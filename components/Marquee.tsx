import { STAR } from "@/lib/data";

const ITEMS = [
  "Custom cuts",
  STAR,
  "Bespoke color",
  STAR,
  "Ghana braids",
  STAR,
  "Loc rituals",
  STAR,
  "Brow architecture",
  STAR,
  "Bridal atelier",
  STAR,
];

const LOOP = [...ITEMS, ...ITEMS, ...ITEMS];

export default function Marquee() {
  return (
    <div className="marquee">
      <div className="marquee-track" data-marquee>
        {LOOP.map((item, i) => (
          <span key={i}>
            {item === STAR ? (
              <span className="star">{STAR}</span>
            ) : (
              item
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

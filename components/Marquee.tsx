import { STAR } from "@/lib/data";

const ITEMS = [
  "Sharp. Clean. Precise.",
  STAR,
  "The fade doesn't lie",
  STAR,
  "Sit. Breathe. Trust.",
  STAR,
  "Two hours · No interruptions",
  STAR,
  "Hair is identity",
  STAR,
  "Patience is the service",
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

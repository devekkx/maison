import { STAR, MARQUEE_ITEMS } from "@/lib/data";

const LOOP = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

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

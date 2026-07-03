import { STUDIO_INFO } from "@/lib/studio-data";

const QUOTE =
  "We don't do quick. We don't do trends. We do the haircut you'll keep you looking stunning.";

export default function PullQuote() {
  const words = QUOTE.split(" ");
  return (
    <section className="pull" data-screen-label="06 Quote" aria-label="Studio philosophy">
      <blockquote>
        {words.map((w, i) => (
          <span className="word" data-pull-word key={i}>
            {w}
          </span>
        ))}
      </blockquote>
      <cite>{STUDIO_INFO.stylist}, founder · {STUDIO_INFO.address.neighborhood}, {STUDIO_INFO.address.city}</cite>
    </section>
  );
}

const QUOTE =
  "We don't do quick. We don't do trends. We do the haircut you'll keep for three years.";

export default function PullQuote() {
  const words = QUOTE.split(" ");
  return (
    <section className="pull" data-screen-label="06 Quote">
      <blockquote>
        {words.map((w, i) => (
          <span className="word" data-pull-word key={i}>
            {w}
          </span>
        ))}
      </blockquote>
      <cite>Amara Osei, founder · Labone, Accra</cite>
    </section>
  );
}

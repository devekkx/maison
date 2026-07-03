import { STUDIO_INFO } from "@/lib/studio-data";

export default function About() {
  return (
    <section className="about" id="about" data-screen-label="02 About">
      <div className="l">
        <div className="eyebrow eyebrow-warm" data-reveal-y>
          About · N° 02
        </div>
        <h2 data-reveal-y>
          A studio,
          <br />
          <em>not a salon.</em>
        </h2>
      </div>
      <div className="r">
        <p data-reveal-y>
          {STUDIO_INFO.name} was opened in {STUDIO_INFO.established} by {STUDIO_INFO.stylist} in a former tailor&apos;s
          shop on Switchback Road, {STUDIO_INFO.address.neighborhood}. The brief has not changed since: hair
          that looks the way you actually live, not the way a chair looks under
          studio light.
        </p>
        <p data-reveal-y>
          One stylist. One chair. No walk-ins, no assistants, no rush. Each
          appointment begins with a fifteen-minute consultation over Ghanaian
          filter coffee, about your week, your outdooring, the way you sleep on
          it, before any scissors come out.
        </p>
        <dl className="stats">
          <div className="stat" data-reveal-y>
            <dt className="sr-only">Years open</dt>
            <dd className="n">
              12<em>·</em>yrs
            </dd>
            <small>Open since 2014</small>
          </div>
          <div className="stat" data-reveal-y>
            <dt className="sr-only">Number of stylists</dt>
            <dd className="n">01</dd>
            <small>Stylist · sole hands</small>
          </div>
          <div className="stat" data-reveal-y>
            <dt className="sr-only">Total clients served</dt>
            <dd className="n">3,100</dd>
            <small>Heads, &amp; counting</small>
          </div>
        </dl>
      </div>
    </section>
  );
}

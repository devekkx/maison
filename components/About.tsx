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
          Maison Noire was opened in 2014 by Amara Osei in a former tailor&apos;s
          shop on Switchback Road, Labone. The brief has not changed since: hair
          that looks the way you actually live, not the way a chair looks under
          studio light.
        </p>
        <p data-reveal-y>
          One stylist. One chair. No walk-ins, no assistants, no rush. Each
          appointment begins with a fifteen-minute consultation over Ghanaian
          filter coffee, about your week, your outdooring, the way you sleep on
          it, before any scissors come out.
        </p>
        <div className="stats">
          <div className="stat" data-reveal-y>
            <div className="n">
              11<em>·</em>yrs
            </div>
            <small>Open since 2014</small>
          </div>
          <div className="stat" data-reveal-y>
            <div className="n">01</div>
            <small>Stylist · sole hands</small>
          </div>
          <div className="stat" data-reveal-y>
            <div className="n">2,840</div>
            <small>Heads, &amp; counting</small>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { STUDIO_INFO } from "@/lib/studio-data";
import { openContact } from "@/lib/contact";

export default function EndCTA() {
  return (
    <>
      <section className="endcta" id="book" data-screen-label="07 Contact">
        <h2 data-reveal-y>
          Sit <em>with us.</em>
        </h2>
        <div className="endcta-cols">
          <div className="col" data-reveal-y>
            <h4>Studio</h4>
            <p>
              {STUDIO_INFO.address.street}
              <br />
              {STUDIO_INFO.address.neighborhood}, {STUDIO_INFO.address.city}, {STUDIO_INFO.address.country}
              <br />
              <a href={STUDIO_INFO.address.mapsUrl} target="_blank" rel="noopener noreferrer">
                Get directions →
              </a>
            </p>
          </div>
          <div className="col" data-reveal-y>
            <h4>Reservations</h4>
            <p>
              <button
                type="button"
                className="link-button"
                onClick={() => openContact()}
              >
                {STUDIO_INFO.contact.email}
              </button>
              <br />
              {STUDIO_INFO.contact.phone}
              <br />
              {STUDIO_INFO.hours.display}
            </p>
          </div>
          <div className="col" data-reveal-y>
            <h4>Follow</h4>
            <p>
              <a href={STUDIO_INFO.social.instagramUrl} aria-label={`Instagram ${STUDIO_INFO.social.instagram}`}>
                {STUDIO_INFO.social.instagram}
              </a>
              <br />
              <a href={STUDIO_INFO.social.pinterestUrl} aria-label="Pinterest">
                Pinterest
              </a>
              <br />
              <a href={STUDIO_INFO.social.newsletterUrl} aria-label="Newsletter">
                Newsletter
              </a>
            </p>
          </div>
          <div className="col" data-reveal-y>
            <h4>Press</h4>
            <p>
              {STUDIO_INFO.press.map((item) => (
                <span key={item.name}>
                  <a href={item.url} aria-label={`${item.name}, ${item.year}`}>
                    {item.name}, {item.year}
                  </a>
                  <br />
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>
      <div className="foot-bar">
        <span>© {STUDIO_INFO.name} · {STUDIO_INFO.copyright.since}–{STUDIO_INFO.copyright.through}</span>
        <span>{STUDIO_INFO.slug} · {STUDIO_INFO.address.city}</span>
        <span>Site by the studio</span>
      </div>
    </>
  );
}

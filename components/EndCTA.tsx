"use client";

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
              5 Switchback Road
              <br />
              Labone, Accra, Ghana
              <br />
              <a href="https://maps.google.com/?q=5+Switchback+Road+Labone+Accra+Ghana" target="_blank" rel="noopener noreferrer">
                Get directions →
              </a>
            </p>
          </div>
          <div className="col" data-reveal-y>
            <h4>Reservations</h4>
            <p>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  openContact();
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") openContact();
                }}
              >
                book@maisonnoire.studio
              </a>
              <br />
              +233 20 955 0144
              <br />
              Tue–Sat · 09:00–19:00
            </p>
          </div>
          <div className="col" data-reveal-y>
            <h4>Follow</h4>
            <p>
              <a href="#" aria-label="Instagram @maisonnoire.gh">
                @maisonnoire.gh
              </a>
              <br />
              <a href="#" aria-label="Pinterest">
                Pinterest
              </a>
              <br />
              <a href="#" aria-label="Newsletter">
                Newsletter
              </a>
            </p>
          </div>
          <div className="col" data-reveal-y>
            <h4>Press</h4>
            <p>
              <a href="#" aria-label="Glitz Africa, 2024">
                Glitz Africa, 2024
              </a>
              <br />
              <a href="#" aria-label="Genevieve, 2023">
                Genevieve, 2023
              </a>
              <br />
              <a href="#" aria-label="Pulse Ghana, 2022">
                Pulse Ghana, 2022
              </a>
            </p>
          </div>
        </div>
      </section>
      <div className="foot-bar">
        <span>© Maison Noire Studio · 2014–2026</span>
        <span>NN · Accra</span>
        <span>Site by the studio</span>
      </div>
    </>
  );
}

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
              217 Franklin Street
              <br />
              Brooklyn, NY 11222
              <br />
              <a href="https://maps.google.com/?q=217+Franklin+Street+Brooklyn+NY" target="_blank" rel="noopener noreferrer">
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
              +1 (718) 555 0144
              <br />
              Tue–Sat · 10:00–20:00
            </p>
          </div>
          <div className="col" data-reveal-y>
            <h4>Follow</h4>
            <p>
              <a href="#" aria-label="Instagram @maisonnoire.bk">
                @maisonnoire.bk
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
              <a href="#" aria-label="The Cut, 2024">
                The Cut, 2024
              </a>
              <br />
              <a href="#" aria-label="Vogue, 2023">
                Vogue, 2023
              </a>
              <br />
              <a href="#" aria-label="Cereal, 2022">
                Cereal, 2022
              </a>
            </p>
          </div>
        </div>
      </section>
      <div className="foot-bar">
        <span>© Maison Noire Studio · 2014–2026</span>
        <span>NN · Brooklyn</span>
        <span>Site by the studio</span>
      </div>
    </>
  );
}

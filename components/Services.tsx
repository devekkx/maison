"use client";

import { SERVICES } from "@/lib/data";
import { openContact } from "@/lib/contact";

export default function Services() {
  return (
    <section
      className="services"
      id="services"
      data-screen-label="03 Services"
    >
      <div className="head">
        <div className="eyebrow" data-reveal-y>
          Services · N° 03
        </div>
        <h2 data-reveal-y>
          The <em>menu.</em>
        </h2>
        <p data-reveal-y>
          Six rituals, priced honestly. Consultation included. All services
          finish with a head-wash and a black coffee, or a glass of something
          stronger.
        </p>
      </div>
      <div className="svc-list">
        {SERVICES.map((s) => (
          <div
            className="svc"
            key={s.id}
            data-svc-row
            onClick={() => openContact({ service: `${s.name} ${s.italic}` })}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                openContact({ service: `${s.name} ${s.italic}` });
              }
            }}
          >
            <div className="num">{s.num}</div>
            <div className="name">
              {s.name} <em>{s.italic}</em>
            </div>
            <div className="desc">{s.desc}</div>
            <div className="price">
              {s.price}
              <small>{s.dur}</small>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

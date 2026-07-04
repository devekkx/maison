"use client";

import { SERVICES } from "@/lib/data";
import ServiceRow from "@/components/ServiceRow";

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
      <div className="svc-list" role="list" aria-label="Available services">
        {SERVICES.map((s) => (
          <ServiceRow key={s.id} service={s} />
        ))}
      </div>
    </section>
  );
}

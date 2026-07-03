"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { HERO_SLIDES } from "@/lib/data";
import { STUDIO_INFO } from "@/lib/studio-data";
import { TIMING } from "@/lib/constants";
import { openContact } from "@/lib/contact";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setSlide((s) => (s + 1) % HERO_SLIDES.length),
      TIMING.HERO_CAROUSEL_MS
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero" id="top" data-screen-label="01 Hero">
      <div className="hero-bg" data-parallax="0.25">
        {HERO_SLIDES.map((src, i) => (
          <div className={`slide ${i === slide ? "active" : ""}`} key={i}>
            <Image
              src={src}
              alt=""
              fill
              sizes="100vw"
              priority={i === 0}
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>

      <div className="hero-dots" role="group" aria-label="Slideshow navigation">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            className={i === slide ? "active" : ""}
            onClick={() => setSlide(i)}
            aria-label={`Go to slide ${i + 1} of ${HERO_SLIDES.length}`}
            aria-current={i === slide ? "true" : undefined}
            style={{ minWidth: 44, minHeight: 44 }}
          />
        ))}
      </div>

      <div className="hero-meta">
        <div className="eyebrow" data-reveal-y>
          {STUDIO_INFO.tagline} · Est. {STUDIO_INFO.established} · {STUDIO_INFO.city}
        </div>
        <h1>
          <span className="stack">
            <span data-hero-line>The hair</span>
          </span>
          <span className="stack">
            <span data-hero-line>you wear</span>
          </span>
          <span className="stack">
            <span data-hero-line>
              <em>after midnight.</em>
            </span>
          </span>
        </h1>
        <div className="hero-sub" data-reveal-y>
          <p>
            A studio of one. By appointment, no walk-ins. Cuts, color, braids
            and texture, taken slowly, in two-hour sittings. One chair, one
            client, undivided.
          </p>
        </div>
      </div>

      <aside className="hero-card" data-reveal-y>
        <div className="row">
          <span className="label">Next opening</span>
          <span className="value">Thu, Jul 10 · 10:00</span>
        </div>
        <div className="row">
          <span className="label">Studio</span>
          <span className="value">{STUDIO_INFO.address.short}</span>
        </div>
        <div className="row">
          <span className="label">Hours</span>
          <span className="value">{STUDIO_INFO.hours.short}</span>
        </div>
        <Button className="book" onClick={() => openContact()}>
          Reserve a chair <span>→</span>
        </Button>
      </aside>

      <div className="hero-foot">
        <span>↓ Scroll · The whole story</span>
        <div className="marquee-cue">
          <span className="dot" />
          <span>Open · Now taking July bookings</span>
        </div>
        <span>NN · 04</span>
      </div>
    </section>
  );
}

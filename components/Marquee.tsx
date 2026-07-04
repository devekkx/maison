"use client";

import { useEffect, useRef } from "react";
import { STAR, MARQUEE_ITEMS } from "@/lib/data";

const LOOP = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

export default function Marquee() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const track = section.querySelector<HTMLDivElement>("[data-marquee]");
    if (!track) return;

    let animId: number | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          track.style.animationPlayState = "running";
        } else {
          track.style.animationPlayState = "paused";
        }
      },
      { threshold: 0 }
    );

    observer.observe(section);
    void animId;

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="marquee" ref={sectionRef}>
      <div className="marquee-track" data-marquee>
        {LOOP.map((item, i) => (
          <span key={i}>
            {item === STAR ? (
              <span className="star">{STAR}</span>
            ) : (
              item
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

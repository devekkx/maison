"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export default function AnimationsProvider({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.85,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1.1,
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time: number) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    document.addEventListener("click", (e) => {
      const a = (e.target as HTMLElement).closest("a[href^='#']");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target as HTMLElement, { offset: -20, duration: 0.9 });
      }
    });

    const ease = "power3.out";

    // ── INTRO overlay ──────────────────────────────────────
    const intro = document.querySelector<HTMLElement>("[data-intro]");
    const introSpacer = document.querySelector<HTMLElement>("[data-intro-spacer]");
    const introLines = gsap.utils.toArray<HTMLElement>("[data-intro-line]");
    const introEyebrow = document.querySelector<HTMLElement>("[data-intro-eyebrow]");
    const introCue = document.querySelector<HTMLElement>("[data-intro-cue]");

    if (intro && introSpacer) {
      gsap.set(introLines, {
        yPercent: 110,
        rotateX: -85,
        opacity: 0,
        transformOrigin: "50% 100% -60px",
      });
      gsap.set(introEyebrow, { opacity: 0, y: 20 });
      gsap.set(introCue, { opacity: 0, y: 20 });

      const introIn = gsap.timeline({ delay: 0.25 });
      introIn
        .to(introEyebrow, { opacity: 1, y: 0, duration: 1.0, ease }, 0)
        .to(
          introLines,
          { yPercent: 0, rotateX: 0, opacity: 1, duration: 1.4, ease: "expo.out", stagger: 0.15 },
          0.15
        )
        .to(introCue, { opacity: 1, y: 0, duration: 1.0, ease }, 1.1);

      gsap
        .timeline({
          scrollTrigger: {
            trigger: introSpacer,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
            onLeave: () => {
              intro.style.display = "none";
            },
            onEnterBack: () => {
              intro.style.display = "";
            },
          },
        })
        .to(introCue, { opacity: 0, y: 30, duration: 0.4 }, 0)
        .to(introEyebrow, { opacity: 0, y: -20, duration: 0.6 }, 0)
        .to(
          introLines,
          { yPercent: -120, rotateX: 60, opacity: 0, stagger: 0.05, ease: "power3.in", duration: 0.9 },
          0.05
        )
        .to(intro, { scale: 1.15, filter: "blur(8px)", opacity: 0, ease: "power2.in", duration: 1 }, 0.2);
    }

    // ── HERO 3D line reveal ─────────────────────────────────
    const heroLines = gsap.utils.toArray<HTMLElement>("[data-hero-line]");
    gsap.set(heroLines, {
      yPercent: 110,
      rotateX: -75,
      opacity: 0,
      transformOrigin: "50% 100% -40px",
    });
    gsap.to(heroLines, {
      yPercent: 0,
      rotateX: 0,
      opacity: 1,
      duration: 1.4,
      ease: "expo.out",
      stagger: 0.14,
      scrollTrigger: { trigger: ".hero", start: "top 60%", toggleActions: "play none none none" },
    });

    // ── Generic reveal-y ───────────────────────────────────
    gsap.utils.toArray<HTMLElement>("[data-reveal-y]").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50, rotateX: 18, transformPerspective: 1200, transformOrigin: "50% 100%" },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.1,
          ease,
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        }
      );
    });

    // ── Hero parallax bg ───────────────────────────────────
    const heroBg = document.querySelector<HTMLElement>("[data-parallax]");
    if (heroBg) {
      const intensity = parseFloat(heroBg.dataset.parallax ?? "0.2");
      gsap.to(heroBg, {
        yPercent: intensity * 100,
        ease: "none",
        scrollTrigger: { trigger: heroBg, start: "top top", end: "bottom top", scrub: true },
      });
    }

    // ── Hero card 3D tilt ──────────────────────────────────
    const heroCard = document.querySelector<HTMLElement>(".hero-card");
    const heroSection = document.querySelector<HTMLElement>(".hero");
    if (heroCard && heroSection) {
      gsap.set(heroCard, { transformPerspective: 1200, transformStyle: "preserve-3d" });
      heroSection.addEventListener("mousemove", (e: MouseEvent) => {
        const r = heroSection.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(heroCard, { rotateY: px * 12, rotateX: -py * 10, duration: 0.6, ease });
      });
      heroSection.addEventListener("mouseleave", () => {
        gsap.to(heroCard, { rotateY: 0, rotateX: 0, duration: 0.8, ease });
      });
    }

    // ── Marquee ────────────────────────────────────────────
    const marqueeTrack = document.querySelector<HTMLElement>("[data-marquee]");
    if (marqueeTrack) {
      const w = marqueeTrack.scrollWidth / 3;
      gsap.to(marqueeTrack, { x: -w, ease: "none", duration: 30, repeat: -1 });
      let snapBack: gsap.core.Tween | null = null;
      ScrollTrigger.create({
        onUpdate: (self) => {
          const v = self.getVelocity();
          const skew = gsap.utils.clamp(-15, 15, v * 0.006);
          const rot = gsap.utils.clamp(-6, 6, v * 0.002);
          snapBack?.kill();
          gsap.to(marqueeTrack, { skewX: skew, rotateY: rot, duration: 0.4, ease });
          snapBack = gsap.to(marqueeTrack, { skewX: 0, rotateY: 0, duration: 0.7, ease, delay: 0.2 });
        },
      });
    }

    // ── Service rows ───────────────────────────────────────
    gsap.utils.toArray<HTMLElement>("[data-svc-row]").forEach((row) => {
      gsap.fromTo(
        row,
        { opacity: 0, y: 80, rotateX: -25, rotateY: -8, transformPerspective: 1400, transformOrigin: "50% 0%" },
        {
          opacity: 1, y: 0, rotateX: 0, rotateY: 0,
          duration: 1.1, ease: "power4.out",
          scrollTrigger: { trigger: row, start: "top 88%" },
        }
      );
    });

    // ── Owner stage 3D ─────────────────────────────────────
    const ownerStage = document.querySelector<HTMLElement>("[data-owner-stage]");
    if (ownerStage) {
      const cards = gsap.utils.toArray<HTMLElement>("[data-owner-card]", ownerStage);
      gsap.set(cards, { transformPerspective: 1600, transformStyle: "preserve-3d" });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: ownerStage, start: "top 75%", end: "top 25%", scrub: 1 },
      });
      if (cards[0])
        tl.fromTo(cards[0],
          { rotateY: 18, rotateX: 6, x: -40, scale: 0.92, opacity: 0.4, transformOrigin: "0% 50%" },
          { rotateY: 0, rotateX: 0, x: 0, scale: 1, opacity: 1, ease: "none" }, 0);
      if (cards[1])
        tl.fromTo(cards[1],
          { rotateY: -22, x: 60, z: -120, opacity: 0.3 },
          { rotateY: 0, x: 0, z: 0, opacity: 1, ease: "none" }, 0);
      if (cards[2])
        tl.fromTo(cards[2],
          { rotateY: -28, x: 100, z: -180, opacity: 0.2 },
          { rotateY: 0, x: 0, z: 0, opacity: 1, ease: "none" }, 0);

      ownerStage.addEventListener("mousemove", (e: MouseEvent) => {
        const r = ownerStage.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        cards.forEach((c, i) => {
          const depth = [1, 0.6, 0.4][i] ?? 0.4;
          gsap.to(c, { rotateY: px * 8 * depth, rotateX: -py * 6 * depth, duration: 0.7, ease });
        });
      });
      ownerStage.addEventListener("mouseleave", () => {
        gsap.to(cards, { rotateY: 0, rotateX: 0, duration: 0.9, ease });
      });
    }

    // ── Gallery tiles 3D ───────────────────────────────────
    gsap.utils.toArray<HTMLElement>("[data-tile]").forEach((tile, i) => {
      gsap.set(tile, { transformPerspective: 1600, transformStyle: "preserve-3d" });
      gsap.fromTo(
        tile,
        { y: 80, opacity: 0, scale: 0.88, rotateX: -20, z: -200 },
        {
          y: 0, opacity: 1, scale: 1, rotateX: 0, z: 0,
          duration: 1.2, ease: "power4.out", delay: (i % 3) * 0.08,
          scrollTrigger: { trigger: tile, start: "top 92%" },
        }
      );

      const img = tile.querySelector<HTMLElement>("img");
      if (img) {
        gsap.fromTo(img,
          { yPercent: -8 },
          { yPercent: 8, ease: "none", scrollTrigger: { trigger: tile, start: "top bottom", end: "bottom top", scrub: true } }
        );
      }

      tile.addEventListener("mousemove", (e: MouseEvent) => {
        const r = tile.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(tile, { rotateY: px * 14, rotateX: -py * 14, z: 30, duration: 0.5, ease });
      });
      tile.addEventListener("mouseleave", () => {
        gsap.to(tile, { rotateY: 0, rotateX: 0, z: 0, duration: 0.7, ease });
      });
    });

    // ── Pull quote word-by-word ────────────────────────────
    const words = gsap.utils.toArray<HTMLElement>("[data-pull-word]");
    if (words.length) {
      gsap.set(words, { opacity: 0.1, rotateX: 40, transformPerspective: 800, transformOrigin: "50% 100%" });
      gsap.to(words, {
        opacity: 1, rotateX: 0, stagger: 0.06, ease: "power2.out",
        scrollTrigger: { trigger: ".pull", start: "top 75%", end: "center 45%", scrub: true },
      });
    }

    // ── Hero meta fade on scroll ───────────────────────────
    gsap.to(".hero-meta", {
      opacity: 0.15, y: -80, rotateX: 12, transformPerspective: 1200,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "center top", end: "bottom top", scrub: true },
    });
    gsap.to(".hero-bg", {
      scale: 1.1, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
    });

    // ── About stats roll-in ────────────────────────────────
    gsap.utils.toArray<HTMLElement>(".about .stat").forEach((s, i) => {
      gsap.fromTo(s,
        { opacity: 0, rotateY: -30, x: -30, transformPerspective: 1200 },
        {
          opacity: 1, rotateY: 0, x: 0, duration: 1.0, ease, delay: i * 0.1,
          scrollTrigger: { trigger: s, start: "top 90%" },
        }
      );
    });

    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.ticker.remove((time: number) => lenis.raf(time * 1000));
    };
  }, []);

  return <>{children}</>;
}

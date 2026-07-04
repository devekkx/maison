"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { TIMING, EASING, ANIM_SELECTORS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);
// fastScrollEnd/ignoreMobileResize exist at runtime but aren't in the 3.x typedefs yet
// eslint-disable-next-line @typescript-eslint/no-explicit-any
ScrollTrigger.config({ fastScrollEnd: true, ignoreMobileResize: true } as any);

export default function AnimationsProvider({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    const wrapper = document.getElementById(ANIM_SELECTORS.LENIS_WRAPPER);
    if (!wrapper) return;

    const lenis = new Lenis({
      wrapper,
      content: wrapper,
      duration: TIMING.LENIS_DURATION,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1.1,
    });

    ScrollTrigger.scrollerProxy(wrapper, {
      scrollTop(value?: number) {
        if (value !== undefined) wrapper.scrollTop = value;
        return wrapper.scrollTop;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });

    ScrollTrigger.defaults({ scroller: wrapper });

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onAnchorClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a[href^='#']");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target as HTMLElement, { offset: TIMING.SCROLL_OFFSET, duration: TIMING.ANCHOR_SCROLL_DURATION });
      }
    };
    document.addEventListener("click", onAnchorClick);

    const ease = EASING.DEFAULT;

    //  INTRO overlay
    const intro = document.querySelector<HTMLElement>(ANIM_SELECTORS.INTRO);
    const introSpacer = document.querySelector<HTMLElement>(ANIM_SELECTORS.INTRO_SPACER);
    const introLines = gsap.utils.toArray<HTMLElement>(ANIM_SELECTORS.INTRO_LINE);
    const introEyebrow = document.querySelector<HTMLElement>(ANIM_SELECTORS.INTRO_EYEBROW);
    const introCue = document.querySelector<HTMLElement>(ANIM_SELECTORS.INTRO_CUE);

    if (intro && introSpacer) {
      gsap.set(introLines, {
        yPercent: 110,
        rotationX: -85,
        opacity: 0,
        transformOrigin: "50% 100% -60px",
      });
      gsap.set(introEyebrow, { opacity: 0, y: 20 });
      gsap.set(introCue, { opacity: 0, y: 20 });

      const introIn = gsap.timeline({ delay: TIMING.INTRO_DELAY });
      introIn
        .to(introEyebrow, { opacity: 1, y: 0, duration: TIMING.INTRO_EYEBROW_DURATION, ease }, 0)
        .to(
          introLines,
          {
            yPercent: 0,
            rotationX: 0,
            opacity: 1,
            duration: TIMING.INTRO_LINE_DURATION,
            ease: EASING.EXPO_OUT,
            stagger: 0.15,
          },
          0.15,
        )
        .to(introCue, { opacity: 1, y: 0, duration: TIMING.INTRO_CUE_DURATION, ease }, 1.1);

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
          {
            yPercent: -120,
            rotationX: 60,
            opacity: 0,
            stagger: 0.05,
            ease: "power3.in",
            duration: 0.9,
          },
          0.05,
        )
        .to(
          intro,
          { scale: 1.08, opacity: 0, ease: "power2.in", duration: 1 },
          0.2,
        );
    }

    //  HERO 3D line reveal
    const heroLines = gsap.utils.toArray<HTMLElement>(ANIM_SELECTORS.HERO_LINE);
    gsap.set(heroLines, {
      yPercent: 110,
      rotationX: -75,
      opacity: 0,
      transformOrigin: "50% 100% -40px",
    });
    gsap.to(heroLines, {
      yPercent: 0,
      rotationX: 0,
      opacity: 1,
      duration: TIMING.HERO_LINE_DURATION,
      ease: EASING.EXPO_OUT,
      stagger: 0.09,
      scrollTrigger: {
        trigger: ANIM_SELECTORS.HERO_SECTION,
        start: "top 60%",
        toggleActions: "play none none none",
      },
    });

    //  Generic reveal-y
    gsap.utils.toArray<HTMLElement>(ANIM_SELECTORS.REVEAL_Y).forEach((el) => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 50,
          rotationX: 18,
          transformPerspective: 1200,
          transformOrigin: "50% 100%",
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.1,
          ease,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      );
    });

    //  Hero parallax bg
    const heroBg = document.querySelector<HTMLElement>(ANIM_SELECTORS.PARALLAX);
    if (heroBg) {
      const intensity = parseFloat(heroBg.dataset.parallax ?? "0.2");
      gsap.to(heroBg, {
        yPercent: intensity * 100,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: heroBg,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }

    //  Hero card 3D tilt
    const heroCard = document.querySelector<HTMLElement>(ANIM_SELECTORS.HERO_CARD);
    const heroSection = document.querySelector<HTMLElement>(ANIM_SELECTORS.HERO_SECTION);
    if (heroCard && heroSection) {
      gsap.set(heroCard, {
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
        force3D: true,
      });
      const tiltY = gsap.quickTo(heroCard, "rotationY", { duration: TIMING.HERO_CARD_TILT_DURATION, ease });
      const tiltX = gsap.quickTo(heroCard, "rotationX", { duration: TIMING.HERO_CARD_TILT_DURATION, ease });
      heroSection.addEventListener("mousemove", (e: MouseEvent) => {
        const r = heroSection.getBoundingClientRect();
        tiltY(((e.clientX - r.left) / r.width) * 12 - 6);
        tiltX(-(((e.clientY - r.top) / r.height) * 10 - 5));
      });
      heroSection.addEventListener("mouseleave", () => {
        tiltY(0);
        tiltX(0);
      });
    }

    //  Marquee
    const marqueeTrack = document.querySelector<HTMLElement>(ANIM_SELECTORS.MARQUEE);
    if (marqueeTrack) {
      const w = marqueeTrack.scrollWidth / 3;
      gsap.to(marqueeTrack, { x: -w, ease: EASING.NONE, duration: TIMING.MARQUEE_DURATION, repeat: -1 });
      let snapBack: gsap.core.Tween | null = null;
      ScrollTrigger.create({
        onUpdate: (self) => {
          const v = self.getVelocity();
          const skew = gsap.utils.clamp(-15, 15, v * 0.006);
          const rot = gsap.utils.clamp(-6, 6, v * 0.002);
          snapBack?.kill();
          gsap.to(marqueeTrack, {
            skewX: skew,
            rotationY: rot,
            duration: TIMING.MARQUEE_SKEW_DURATION,
            ease,
          });
          snapBack = gsap.to(marqueeTrack, {
            skewX: 0,
            rotationY: 0,
            duration: TIMING.MARQUEE_SNAP_DURATION,
            ease,
            delay: TIMING.MARQUEE_SNAP_DELAY,
          });
        },
      });
    }

    //  Service rows
    gsap.utils.toArray<HTMLElement>(ANIM_SELECTORS.SVC_ROW).forEach((row) => {
      gsap.fromTo(
        row,
        {
          opacity: 0,
          y: 80,
          rotationX: -25,
          rotationY: -8,
          transformPerspective: 1400,
          transformOrigin: "50% 0%",
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: row, start: "top 88%" },
        },
      );
    });

    //  Owner stage 3D
    const ownerStage = document.querySelector<HTMLElement>(ANIM_SELECTORS.OWNER_STAGE);
    if (ownerStage) {
      const cards = gsap.utils.toArray<HTMLElement>(ANIM_SELECTORS.OWNER_CARD, ownerStage);
      gsap.set(cards, {
        transformPerspective: 1600,
        transformStyle: "preserve-3d",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ownerStage,
          start: "top 75%",
          end: "top 25%",
          scrub: 1,
        },
      });
      if (cards[0])
        tl.fromTo(
          cards[0],
          {
            rotationY: 18,
            rotationX: 6,
            x: -40,
            scale: 0.92,
            opacity: 0.4,
            transformOrigin: "0% 50%",
          },
          { rotationY: 0, rotationX: 0, x: 0, scale: 1, opacity: 1, ease: "none" },
          0,
        );
      if (cards[1])
        tl.fromTo(
          cards[1],
          { rotationY: -22, x: 60, z: -120, opacity: 0.3 },
          { rotationY: 0, x: 0, z: 0, opacity: 1, ease: "none" },
          0,
        );
      if (cards[2])
        tl.fromTo(
          cards[2],
          { rotationY: -28, x: 100, z: -180, opacity: 0.2 },
          { rotationY: 0, x: 0, z: 0, opacity: 1, ease: "none" },
          0,
        );

      ownerStage.addEventListener("mousemove", (e: MouseEvent) => {
        const r = ownerStage.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        cards.forEach((c, i) => {
          const depth = [1, 0.6, 0.4][i] ?? 0.4;
          gsap.to(c, {
            rotationY: px * 8 * depth,
            rotationX: -py * 6 * depth,
            duration: 0.7,
            ease,
          });
        });
      });
      ownerStage.addEventListener("mouseleave", () => {
        gsap.to(cards, { rotationY: 0, rotationX: 0, duration: 0.9, ease });
      });
    }

    //  Gallery tiles 3D
    gsap.utils.toArray<HTMLElement>(ANIM_SELECTORS.TILE).forEach((tile, i) => {
      gsap.set(tile, {
        transformPerspective: 1600,
        transformStyle: "preserve-3d",
      });
      gsap.fromTo(
        tile,
        { y: 80, opacity: 0, scale: 0.88, rotationX: -20, z: -200 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          z: 0,
          duration: 1.2,
          ease: "power4.out",
          delay: (i % 3) * 0.08,
          scrollTrigger: { trigger: tile, start: "top 92%" },
        },
      );

      const img = tile.querySelector<HTMLElement>("img");
      if (img) {
        gsap.fromTo(
          img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: tile,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }

      tile.addEventListener("mousemove", (e: MouseEvent) => {
        const r = tile.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(tile, {
          rotationY: px * 14,
          rotationX: -py * 14,
          z: 30,
          duration: 0.5,
          ease,
        });
      });
      tile.addEventListener("mouseleave", () => {
        gsap.to(tile, { rotationY: 0, rotationX: 0, z: 0, duration: 0.7, ease });
      });
    });

    //  Pull quote word-by-word
    const words = gsap.utils.toArray<HTMLElement>(ANIM_SELECTORS.PULL_WORD);
    if (words.length) {
      gsap.set(words, {
        opacity: 0.1,
        rotationX: 40,
        transformPerspective: 800,
        transformOrigin: "50% 100%",
      });
      gsap.to(words, {
        opacity: 1,
        rotationX: 0,
        stagger: TIMING.PULL_QUOTE_STAGGER,
        ease: EASING.POWER2_OUT,
        scrollTrigger: {
          trigger: ANIM_SELECTORS.PULL_SECTION,
          start: "top 75%",
          end: "center 45%",
          scrub: true,
        },
      });
    }

    //  Hero meta fade on scroll
    gsap.to(ANIM_SELECTORS.HERO_META, {
      opacity: 0.15,
      y: -60,
      ease: EASING.NONE,
      force3D: true,
      scrollTrigger: {
        trigger: ANIM_SELECTORS.HERO_SECTION,
        start: "center top",
        end: "bottom top",
        scrub: 0.6,
      },
    });
    gsap.to(ANIM_SELECTORS.HERO_BG, {
      scale: 1.08,
      ease: EASING.NONE,
      force3D: true,
      scrollTrigger: {
        trigger: ANIM_SELECTORS.HERO_SECTION,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
      },
    });

    //  About stats roll-in
    gsap.utils.toArray<HTMLElement>(ANIM_SELECTORS.ABOUT_STAT).forEach((s, i) => {
      gsap.fromTo(
        s,
        { opacity: 0, rotationY: -30, x: -30, transformPerspective: 1200 },
        {
          opacity: 1,
          rotationY: 0,
          x: 0,
          duration: TIMING.STAT_DURATION,
          ease,
          delay: i * 0.1,
          scrollTrigger: { trigger: s, start: "top 90%" },
        },
      );
    });

    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.ticker.remove(tick);
      document.removeEventListener("click", onAnchorClick);
    };
  }, []);

  return <>{children}</>;
}

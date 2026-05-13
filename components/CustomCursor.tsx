"use client";

import { useEffect, useRef } from "react";

function ScissorsSVG() {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g className="blade-a">
        <circle cx="9" cy="26" r="4.2" />
        <path d="M11.5 22.5 L26 8" />
      </g>
      <g className="blade-b">
        <circle cx="27" cy="26" r="4.2" />
        <path d="M24.5 22.5 L10 8" />
      </g>
      <circle cx="18" cy="18" r="1.1" fill="currentColor" />
    </svg>
  );
}

const HOVER_SEL =
  "a, button, .chip, .tile, .svc, .artist, .owner-card, .hero-dots button, input, select, textarea";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const icon = iconRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !icon) return;

    if (matchMedia("(pointer: coarse)").matches) {
      [dot, ring, icon, label].forEach((el) => {
        if (el) el.style.display = "none";
      });
      return;
    }

    document.documentElement.classList.add("has-custom-cursor");

    let mx = window.innerWidth / 2,
      my = window.innerHeight / 2;
    let rx = mx,
      ry = my;
    let ix = mx,
      iy = my;
    let angle = 0,
      lastX = mx;

    const setDot = (x: number, y: number) => {
      dot.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;
    };
    const setRing = (x: number, y: number) => {
      const s = ring.dataset.scale ?? "1";
      ring.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%) scale(${s})`;
    };
    const setIcon = (x: number, y: number, a: number) => {
      icon.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%) rotate(${a}deg)`;
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      setDot(mx, my);
      if (label)
        label.style.transform = `translate3d(${mx + 22}px,${my + 22}px,0)`;
    };
    const onDown = () => {
      ring.dataset.scale = "0.7";
      setRing(rx, ry);
      icon.classList.add("snip");
    };
    const onUp = () => {
      ring.dataset.scale = ring.dataset.hover === "1" ? "2.4" : "1";
      setRing(rx, ry);
      icon.classList.remove("snip");
    };
    const onLeave = () => {
      [dot, ring, icon, label].forEach((el) => {
        if (el) el.style.opacity = "0";
      });
    };
    const onEnter = () => {
      dot.style.opacity = ring.style.opacity = "1";
    };

    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest(HOVER_SEL);
      if (!t) return;
      ring.classList.add("hover");
      ring.dataset.hover = "1";
      ring.dataset.scale = "2.4";
      icon.classList.add("show");
      let txt = (t as HTMLElement).dataset.cursor ?? "";
      if (!txt) {
        if (t.matches(".tile, .artist, .owner-card")) txt = "View";
        else if (t.matches(".svc")) txt = "Book";
        else if (t.matches("input, select, textarea")) {
          txt = "Type";
          icon.classList.remove("show");
        }
      }
      if (label) {
        label.textContent = txt;
        label.classList.toggle("show", !!txt);
      }
    };
    const onOut = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest(HOVER_SEL);
      if (!t) return;
      ring.classList.remove("hover");
      ring.dataset.hover = "0";
      ring.dataset.scale = "1";
      icon.classList.remove("show");
      if (label) label.classList.remove("show");
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    let rafId: number;
    const tick = () => {
      rx += (mx - rx) * 0.28;
      ry += (my - ry) * 0.28;
      ix += (mx - ix) * 0.22;
      iy += (my - iy) * 0.22;
      const dx = mx - lastX;
      angle += (dx * 1.4 - angle) * 0.22;
      angle = Math.max(-30, Math.min(30, angle));
      lastX = mx;
      setRing(rx, ry);
      setIcon(ix, iy, angle);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div className="cur-ring" ref={ringRef} />
      <div className="cur-icon" ref={iconRef}>
        <ScissorsSVG />
      </div>
      <div className="cur-dot" ref={dotRef} />
      <div className="cur-label" ref={labelRef} />
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import { NAV_LINKS } from "@/lib/data";
import { openContact } from "@/lib/contact";
import { Button } from "@/components/ui/button";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav className="nav">
        <a href="#top" className="logo" onClick={() => setMenuOpen(false)}>
          Maison Noire
        </a>

        <ul role="list">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href} role="listitem">
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <Button
            type="button"
            variant="outline"
            className="cta"
            onClick={() => openContact()}
            aria-label="Book a chair"
          >
            Book a chair
          </Button>

          <Button
            type="button"
            variant="ghost"
            className={`hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </Button>
        </div>
      </nav>

      <div
        className={`mobile-menu${menuOpen ? " open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav className="mobile-menu-links">
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <Button
            type="button"
            variant="secondary"
            className="mobile-menu-book"
            onClick={() => { setMenuOpen(false); openContact(); }}
          >
            Book a chair →
          </Button>
        </nav>
      </div>
    </>
  );
}

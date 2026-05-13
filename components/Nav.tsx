"use client";

import { useState, useEffect } from "react";
import { openContact } from "@/lib/contact";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route hash change (anchor navigation)
  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  // Prevent body scroll when menu is open
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

        {/* Desktop links */}
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#artists">Artists</a></li>
          <li><a href="#gallery">Gallery</a></li>
        </ul>

        <div className="nav-right">
          <button
            type="button"
            className="cta"
            onClick={() => openContact()}
            aria-label="Book a chair"
          >
            Book a chair
          </button>

          {/* Hamburger (mobile only) */}
          <button
            type="button"
            className={`hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`mobile-menu${menuOpen ? " open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav className="mobile-menu-links">
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#artists" onClick={() => setMenuOpen(false)}>Artists</a>
          <a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a>
          <button
            type="button"
            className="mobile-menu-book"
            onClick={() => { setMenuOpen(false); openContact(); }}
          >
            Book a chair →
          </button>
        </nav>
      </div>
    </>
  );
}

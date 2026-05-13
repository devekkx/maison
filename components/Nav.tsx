"use client";

import { openContact } from "@/lib/contact";

export default function Nav() {
  return (
    <nav className="nav">
      <a href="#top" className="logo">
        Maison Noire
      </a>
      <ul>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#services">Services</a>
        </li>
        <li>
          <a href="#artists">Artists</a>
        </li>
        <li>
          <a href="#gallery">Gallery</a>
        </li>
      </ul>
      <button
        className="cta"
        onClick={() => openContact()}
        aria-label="Book a chair"
      >
        Book a chair
      </button>
    </nav>
  );
}

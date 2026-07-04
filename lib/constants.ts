/** All GSAP and Lenis duration/delay values in seconds (or ms for HERO_CAROUSEL_MS). */
export const TIMING = {
  LENIS_DURATION: 0.85,
  HERO_CAROUSEL_MS: 4500,
  SCROLL_OFFSET: -20,
  ANCHOR_SCROLL_DURATION: 0.9,
  INTRO_DELAY: 0.25,
  INTRO_EYEBROW_DURATION: 1.0,
  INTRO_LINE_DURATION: 1.4,
  INTRO_CUE_DURATION: 1.0,
  HERO_LINE_DURATION: 0.9,
  REVEAL_Y_DURATION: 1.1,
  PARALLAX_SCRUB: 0.8,
  HERO_CARD_TILT_DURATION: 0.4,
  MARQUEE_DURATION: 30,
  MARQUEE_SKEW_DURATION: 0.4,
  MARQUEE_SNAP_DURATION: 0.7,
  MARQUEE_SNAP_DELAY: 0.2,
  SERVICE_ROW_DURATION: 1.1,
  OWNER_SCRUB: 1,
  GALLERY_TILE_DURATION: 1.2,
  PULL_QUOTE_STAGGER: 0.06,
  STAT_DURATION: 1.0,
  CURSOR_RING_CLICK: 0.7,
  CURSOR_SNAP_DURATION: 0.7,
} as const;

/** GSAP easing strings. Use EASING.DEFAULT for most transitions. */
export const EASING = {
  DEFAULT: "power3.out",
  EXPO_OUT: "expo.out",
  POWER4_OUT: "power4.out",
  POWER2_OUT: "power2.out",
  POWER2_IN: "power2.in",
  POWER3_IN: "power3.in",
  NONE: "none",
} as const;

/** CustomCursor animation lerp factors, angle limits, and scale values. */
export const CURSOR = {
  RING_LERP: 0.5,
  ICON_LERP: 0.4,
  ANGLE_LERP: 0.38,
  ANGLE_DRIVE: 1.4,
  ANGLE_MAX: 30,
  RING_HOVER_SCALE: 2.4,
  RING_CLICK_SCALE: 0.7,
  LABEL_OFFSET: 22,
} as const;

/** CSS/data-attribute selectors used by AnimationsProvider to target DOM nodes. */
export const ANIM_SELECTORS = {
  INTRO: "[data-intro]",
  INTRO_SPACER: "[data-intro-spacer]",
  INTRO_LINE: "[data-intro-line]",
  INTRO_EYEBROW: "[data-intro-eyebrow]",
  INTRO_CUE: "[data-intro-cue]",
  HERO_LINE: "[data-hero-line]",
  REVEAL_Y: "[data-reveal-y]",
  PARALLAX: "[data-parallax]",
  MARQUEE: "[data-marquee]",
  SVC_ROW: "[data-svc-row]",
  OWNER_STAGE: "[data-owner-stage]",
  OWNER_CARD: "[data-owner-card]",
  TILE: "[data-tile]",
  PULL_WORD: "[data-pull-word]",
  HERO_META: ".hero-meta",
  HERO_BG: ".hero-bg",
  HERO_CARD: ".hero-card",
  HERO_SECTION: ".hero",
  PULL_SECTION: ".pull",
  ABOUT_STAT: ".about .stat",
  LENIS_WRAPPER: "lenis-wrapper",
} as const;

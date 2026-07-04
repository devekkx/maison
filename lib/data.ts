/** Union of all valid service IDs — matches the `id` field on each Service entry. */
export type ServiceId = "cut" | "col" | "brd" | "tre" | "brw" | "brd2";

/** All gallery filter categories (excludes "All" which is a filter-only value). */
export type GalleryCategory = "Cut" | "Braids" | "Color" | "Brows";

export interface Service {
  id: ServiceId;
  num: string;
  name: string;
  italic: string;
  desc: string;
  price: string;
  dur: string;
}

export interface Owner {
  id: string;
  name: string;
  role: string;
  img: string;
  portrait2: string;
  portrait3: string;
  bio: string;
  signature: string;
}

export interface GalleryItem {
  src: string;
  cap: string;
  cls: string;
  category: GalleryCategory;
}

export const SERVICES: Service[] = [
  {
    id: "cut",
    num: "N° 01",
    name: "Signature Cut",
    italic: "& Style",
    desc: "A consultation-led precision cut tailored to your hair texture, lifestyle, and the way you actually wear it.",
    price: "₵800",
    dur: "90 min",
  },
  {
    id: "col",
    num: "N° 02",
    name: "Bespoke",
    italic: "Color",
    desc: "Custom-mixed single-process, balayage, or full lift, with a tone-protective gloss finish.",
    price: "from ₵1,600",
    dur: "2½ hrs",
  },
  {
    id: "brd",
    num: "N° 03",
    name: "Braids",
    italic: "& Locs",
    desc: "Ghana braids, knotless box braids, cornrows, Bantu knots, and loc maintenance, protective styles done patiently.",
    price: "from ₵1,200",
    dur: "3–6 hrs",
  },
  {
    id: "tre",
    num: "N° 04",
    name: "Scalp",
    italic: "Ritual",
    desc: "A 75-minute treatment: raw shea butter, baobab oil, steam, and a slow scalp massage. Leaves hair softer, the head quieter.",
    price: "₵600",
    dur: "75 min",
  },
  {
    id: "brw",
    num: "N° 05",
    name: "Brow",
    italic: "Architecture",
    desc: "Mapping, shaping, and lamination, sculpted to the bones of the face, never to a trend.",
    price: "₵400",
    dur: "45 min",
  },
  {
    id: "brd2",
    num: "N° 06",
    name: "Bridal",
    italic: "Atelier",
    desc: "Half-day private session: trial, day-of styling for your white wedding or traditional, and a touch-up kit. By appointment, two months ahead.",
    price: "₵4,500",
    dur: "4 hrs",
  },
];

export const OWNER: Owner = {
  id: "kofi",
  name: "Kofi Osei",
  role: "Founder, sole stylist · Cut · Color · Braids",
  img: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=1400&q=80",
  portrait2:
    "https://images.unsplash.com/photo-1590086782957-93c06ef21604?auto=format&fit=crop&w=1400&q=80",
  portrait3:
    "https://images.unsplash.com/photo-1553514029-1318c9127859?auto=format&fit=crop&w=1400&q=80",
  bio: "Ten years behind the chair. Trained in Accra, then at Sassoon London, and three years at a colour house in Lagos before coming home and opening Maison Noire on his own terms, one chair, one client, no rush.",
  signature: "K. Osei",
};

export const GALLERY: GalleryItem[] = [
  {
    src: "https://images.unsplash.com/photo-1567894340315-735d7c361db0?auto=format&fit=crop&w=1000&q=80",
    cap: "Fade · Kwame",
    cls: "g-a",
    category: "Cut",
  },
  {
    src: "https://images.unsplash.com/photo-1686671805337-7d8aa64b965f?auto=format&fit=crop&w=900&q=80",
    cap: "Lineup · Kojo",
    cls: "g-b",
    category: "Cut",
  },
  {
    src: "https://images.unsplash.com/photo-1717089256239-dc2ed4d9dfc6?auto=format&fit=crop&w=900&q=80",
    cap: "Cut · Yaw",
    cls: "g-c",
    category: "Cut",
  },
  {
    src: "https://images.unsplash.com/photo-1596580817363-a4a8f67d4bc8?auto=format&fit=crop&w=900&q=80",
    cap: "Brow shape",
    cls: "g-d",
    category: "Brows",
  },
  {
    src: "https://images.unsplash.com/photo-1551493923-9a1b98921caa?auto=format&fit=crop&w=900&q=80",
    cap: "Locs · Kweku",
    cls: "g-e",
    category: "Braids",
  },
  {
    src: "https://images.unsplash.com/photo-1637708653394-e4b51eaeb28e?auto=format&fit=crop&w=1000&q=80",
    cap: "Colour · Ato",
    cls: "g-f",
    category: "Color",
  },
  {
    src: "https://images.unsplash.com/photo-1744636574936-9b3de5c85d0d?auto=format&fit=crop&w=900&q=80",
    cap: "Afro · Kwesi",
    cls: "g-g",
    category: "Cut",
  },
  {
    src: "https://images.unsplash.com/photo-1541784493975-77e8adc9e23e?auto=format&fit=crop&w=1000&q=80",
    cap: "Braids · Kofi",
    cls: "g-h",
    category: "Braids",
  },
  {
    src: "https://images.unsplash.com/photo-1614010966237-74489a16848b?auto=format&fit=crop&w=900&q=80",
    cap: "Colour · Yaw",
    cls: "g-i",
    category: "Color",
  },
];

export const GALLERY_FILTERS = ["All", "Cut", "Braids", "Color", "Brows"] as const;

export type GalleryFilter = (typeof GALLERY_FILTERS)[number];

export const HERO_SLIDES = [
  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1800&q=80",
];

export const STAR = "✦";

export const MARQUEE_ITEMS = [
  "Sharp. Clean. Precise.",
  STAR,
  "The fade doesn't lie",
  STAR,
  "Sit. Breathe. Trust.",
  STAR,
  "Two hours · No interruptions",
  STAR,
  "Hair is identity",
  STAR,
  "Patience is the service",
  STAR,
] as const;

export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#artists", label: "Artists" },
  { href: "#gallery", label: "Gallery" },
] as const;

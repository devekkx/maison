export interface Service {
  id: string;
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
    src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1000&q=80",
    cap: "Fade · Kwame",
    cls: "g-a",
  },
  {
    src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=900&q=80",
    cap: "Lineup · Kojo",
    cls: "g-b",
  },
  {
    src: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=900&q=80",
    cap: "Grooming · Yaw",
    cls: "g-c",
  },
  {
    src: "https://images.unsplash.com/photo-1553514029-1318c9127859?auto=format&fit=crop&w=900&q=80",
    cap: "Brow shape",
    cls: "g-d",
  },
  {
    src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80",
    cap: "Locs · Kweku",
    cls: "g-e",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1000&q=80",
    cap: "Editorial · Ato",
    cls: "g-f",
  },
  {
    src: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
    cap: "Studio · Kwesi",
    cls: "g-g",
  },
  {
    src: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=1000&q=80",
    cap: "Locs maintenance",
    cls: "g-h",
  },
  {
    src: "https://images.unsplash.com/photo-1590086782957-93c06ef21604?auto=format&fit=crop&w=900&q=80",
    cap: "Scalp ritual",
    cls: "g-i",
  },
];

export const GALLERY_FILTERS = ["All", "Cut", "Color", "Braids", "Bridal", "Brows"];

export const HERO_SLIDES = [
  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1800&q=80",
];

export const STAR = "✦";

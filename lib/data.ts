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
  id: "amara",
  name: "Amara Osei",
  role: "Founder, sole stylist · Cut · Color · Braids",
  img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1400&q=80",
  portrait2:
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1400&q=80",
  portrait3:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1400&q=80",
  bio: "Ten years behind the chair. Trained in Accra, then at Sassoon London, and three years at a colour house in Lagos before coming home and opening Maison Noire on her own terms, one chair, one client, no rush.",
  signature: "A. Osei",
};

export const GALLERY: GalleryItem[] = [
  {
    src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=1000&q=80",
    cap: "Knotless · Ama",
    cls: "g-a",
  },
  {
    src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80",
    cap: "Curl cut · Abena",
    cls: "g-b",
  },
  {
    src: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=900&q=80",
    cap: "Color study · Amara",
    cls: "g-c",
  },
  {
    src: "https://images.unsplash.com/photo-1522337094846-8a818192de1f?auto=format&fit=crop&w=900&q=80",
    cap: "Brow lamination",
    cls: "g-d",
  },
  {
    src: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=900&q=80",
    cap: "Twist out · Akosua",
    cls: "g-e",
  },
  {
    src: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1000&q=80",
    cap: "Balayage · Amara",
    cls: "g-f",
  },
  {
    src: "https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=900&q=80",
    cap: "Bridal trial · Adjoa",
    cls: "g-g",
  },
  {
    src: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&w=1000&q=80",
    cap: "Locs maintenance",
    cls: "g-h",
  },
  {
    src: "https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&w=900&q=80",
    cap: "Scalp ritual",
    cls: "g-i",
  },
];

export const GALLERY_FILTERS = ["All", "Cut", "Color", "Braids", "Bridal", "Brows"];

export const HERO_SLIDES = [
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1800&q=80",
];

export const STAR = "✦";

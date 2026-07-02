export const STUDIO_INFO = {
  name: "Maison Noire",
  slug: "NN",
  tagline: "Salon · Atelier",
  established: "2014",
  city: "Accra",
  stylist: "Kofi Osei",
  address: {
    street: "5 Switchback Road",
    neighborhood: "Labone",
    city: "Accra",
    country: "Ghana",
    short: "5 Switchback Rd · Labone",
    mapsUrl:
      "https://maps.google.com/?q=5+Switchback+Road+Labone+Accra+Ghana",
  },
  hours: {
    days: "Tue–Sat",
    open: "09:00",
    close: "19:00",
    display: "Tue–Sat · 09:00–19:00",
    short: "Tue–Sat · 09–19",
  },
  contact: {
    email: "book@maisonnoire.studio",
    phone: "+233 20 955 0144",
  },
  social: {
    instagram: "@maisonnoire.gh",
    instagramUrl: "#",
    pinterestUrl: "#",
    newsletterUrl: "#",
  },
  press: [
    { name: "Glitz Africa", year: "2024", url: "#" },
    { name: "Genevieve", year: "2023", url: "#" },
    { name: "Pulse Ghana", year: "2022", url: "#" },
  ],
  copyright: {
    since: "2014",
    through: "2026",
  },
} as const;

export type GalleryPhoto = {
  src: string;
  caption?: string;
};

export type GalleryEvent = {
  name: string;
  subtitle?: string;
  hero: string;
  photos: GalleryPhoto[];
};

const uniquePhotos = (photos: GalleryPhoto[]) => {
  const seen = new Set<string>();
  return photos.filter((photo) => {
    if (!photo.src || seen.has(photo.src)) return false;
    seen.add(photo.src);
    return true;
  });
};

const rawGalleryEvents: GalleryEvent[] = [
  {
    name: "Game Night",
    subtitle: "Loteria, cards, food, and good company 🎲",
    hero: "/images/events/25-26/gbody3:gamenight/loteria.JPEG",
    photos: [
      { src: "/images/events/25-26/gbody3:gamenight/loteria.JPEG" },
      { src: "/images/events/25-26/gbody3:gamenight/cards.JPEG" },
      { src: "/images/events/25-26/gbody3:gamenight/dominos.JPEG" },
      { src: "/images/events/25-26/gbody3:gamenight/food.JPG" },
      { src: "/images/events/25-26/gbody3:gamenight/plateoffood.JPG" },
      { src: "/images/events/25-26/gbody3:gamenight/winner1.JPEG" },
      { src: "/images/events/25-26/gbody3:gamenight/winner2.JPEG" },
      { src: "/images/events/25-26/gbody3:gamenight/winner3.JPEG" },
    ],
  },
  {
    name: "General Body Meeting 1",
    subtitle: "Getting to Know Each Other Through Bingo",
    hero: "/images/events/25-26/gbody1/g1.jpeg",
    photos: [
      {
        src: "/images/events/25-26/gbody1/g1.jpeg",
        caption: "Our first GBM of 2025 🎉",
      },
      {
        src: "/images/events/25-26/gbody1/g2.png",
        caption: "Networking and catching up after summer break.",
      },
      {
        src: "/images/events/25-26/gbody1/g3.jpeg",
        caption: "Welcoming new members into the familia 💙",
      },
      {
        src: "/images/events/25-26/gbody1/g4.jpeg",
        caption: "Great turnout and energy all around!",
      },
      {
        src: "/images/events/25-26/gbody1/g5.jpeg",
        caption: "Ending the night with smiles and good vibes.",
      },
      {
        src: "/images/events/25-26/gbody1/g7.jpeg",
        caption: "Say I scream for ice cream! 🍦🍧",
      },
      {
        src: "/images/events/25-26/gbody1/g6.jpeg",
        caption: "Fun and games during bingo night!",
      },
      {
        src: "/images/events/25-26/gbody1/g8.jpeg",
        caption: "Nothing better than meeting new people 😄",
      },
    ],
  },
  {
    name: "Bienvenidos",
    subtitle:
      "Annual welcome-back celebration hosted by the Latino Living Center to build community among students, staff, and faculty",
    hero: "/images/events/25-26/bienvenidos/b1.png",
    photos: [
      { src: "/images/events/25-26/bienvenidos/b1.png" },
    ],
  },
  {
    name: "Merch Plug",
    hero: "/images/events/25-26/merch_plug.png",
    photos: [],
  },
  {
    name: "Conference 2025",
    subtitle: "Representing our roots at SHPE Convention 🌎",
    hero: "/images/conference/2025/dinner.jpg",
    photos: [
      { src: "/images/conference/2025/dinner.jpg" },
      { src: "/images/conference/2025/familia.jpg" },
    ],
  },
  {
    name: "Familia Moments",
    subtitle: "Candid memories 💙🧡🩵",
    hero: "/images/events/25-26/Familia/familia.jpg",
    photos: [
      {
        src: "/images/events/25-26/Familia/familia.jpg",
        caption: "🍎 Apple Fest 🍏",
      },
      {
        src: "/images/events/25-26/Familia/f1.jpg",
        caption: "Apple Fest 🧃",
      },
      {
        src: "/images/events/25-26/Familia/f2.jpeg",
        caption: "Conference 2024 👩‍💼🤵‍♂️",
      },
    ],
  },
];

export const galleryEvents: GalleryEvent[] = rawGalleryEvents.map((event) => ({
  ...event,
  photos: uniquePhotos(event.photos),
}));

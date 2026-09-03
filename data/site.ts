/**
 * Jedyne miejsce do edycji treści strony.
 * ------------------------------------------------------------------
 * ZDJĘCIA: wrzuć pliki do `public/nails-alesia/` i wpisz ścieżkę w `src`,
 * np. src: "/nails-alesia/french-01.jpg".
 * Dopóki `src` jest `null`, karta pokazuje elegancki placeholder
 * (bez layout shiftu — proporcje są takie same jak docelowe zdjęcie).
 */

export type GalleryCategory =
  | "Natural"
  | "French"
  | "Nude"
  | "Extensions"
  | "Pedicure"
  | "Elegant";

export type PhotoRatio = "3/4" | "4/5" | "1/1" | "16/9";

export type GalleryItem = {
  id: string;
  /** np. "/nails-alesia/french-01.jpg" — null => placeholder */
  src: string | null;
  alt: string;
  label: string;
  category: GalleryCategory;
  ratio: PhotoRatio;
  /** wariant koloru placeholdera: 0-4 */
  tone: 0 | 1 | 2 | 3 | 4;
  isReference?: boolean;
  source?: string;
  objectPosition?: string;
};

export const profile = {
  brand: "Alesia Nails Szczecin",
  master: "Alesia Garkavenko",
  role: "Stylizacja paznokci",
  city: "Szczecin",
  district: "Centrum",
  tagline:
    "Delikatny manicure, precyzyjna stylizacja i kobiecy detal w centrum Szczecina.",
  heroLead:
    "Naturalne kształty, czyste cuticle work i kolory, które pasują do skóry — a nie do trendu na jeden tydzień. Wizyta bez pośpiechu, w spokojnej atmosferze.",
  /** np. "/nails-alesia/profile.jpg" */
  avatar: "/images/hero-alesia.jpg" as string | null,
  avatarAlt: "Alesia — stylistka paznokci w Szczecinie",
  aboutParagraphs: [
    "Nazywam się Alesia i od kilku lat zajmuję się stylizacją paznokci w Szczecinie. Najbardziej lubię efekt, którego nie widać na pierwszy rzut oka: równy kształt, cienką warstwę i gładką linię przy skórkach.",
    "Pracuję powoli i dokładnie. Zanim sięgnę po kolor, dobieram długość i kształt do Twojej dłoni — inaczej nawet najładniejszy odcień będzie wyglądał przypadkowo.",
    "Salon jest kameralny: jedna osoba w danym momencie, sterylne narzędzia i czas na spokojną rozmowę albo na ciszę, jeśli wolisz.",
  ],
  stats: [
    { value: "280+", label: "prac na Instagramie" },
    { value: "5 lat", label: "praktyki" },
    { value: "2–3 h", label: "spokojnej wizyty" },
  ],
  trustChips: ["280+ postów", "Szczecin — Centrum", "Manicure · Pedicure · Stylizacja"],
} as const;

/**
 * HERO — portret Alesi jest głównym bohaterem pierwszego ekranu.
 * Wgraj zdjęcie do `public/images/hero-alesia.jpg` i ustaw `portrait`.
 * Dopóki `portrait === null`, hero pokazuje wyraźny placeholder z instrukcją
 * (o tych samych proporcjach, więc podmiana nie zmieni layoutu).
 * NIE używamy avatara 100x100 jako hero — to tylko mały portret w sekcji "O mnie".
 */
export const hero = {
  /** np. "/images/hero-alesia.jpg" — portret editorial, kadr pionowy 3:4 */
  portrait: "/images/hero-alesia.jpg" as string | null,
  portraitAlt: "Alesia, nail stylist in Szczecin",
  /** opcjonalne tło pełnoekranowe, np. "/images/hero-bg.jpg" (zbliżenie dłoni) */
  background:
    "https://images.pexels.com/photos/13038494/pexels-photo-13038494.jpeg?auto=compress&cs=tinysrgb&w=1800" as string | null,
  backgroundAlt: "Zbliżenie na dłonie z delikatnym manicure w mlecznym świetle",
  eyebrow: "Stylizacja paznokci · Szczecin",
  ctaLabel: "Umów wizytę przez Instagram",
};

/** Kafle unoszące się wokół portretu w hero (desktop) / swipe-stack (mobile). */
export type HeroTile = {
  id: string;
  label: string;
  caption: string;
  category: GalleryCategory;
  /** np. "/nails-alesia/french-01.jpg" */
  src: string | null;
  tone: 0 | 1 | 2 | 3 | 4;
  /** pozycja na desktopie w % szerokości/wysokości sceny */
  pos: { x: number; y: number };
  /** głębia parallaxu: 0.2 (daleko) – 1 (blisko) */
  depth: number;
  /** delikatny obrót kafla w stopniach */
  tilt: number;
};

export const heroTiles: HeroTile[] = [
  {
    id: "t-french",
    label: "French Minimal",
    caption: "Cienka linia, krótka płytka",
    category: "French",
    src: "https://images.pexels.com/photos/34997574/pexels-photo-34997574.jpeg?auto=compress&cs=tinysrgb&w=900",
    tone: 0,
    pos: { x: 13, y: 20 },
    depth: 0.9,
    tilt: -4,
  },
  {
    id: "t-nude",
    label: "Soft Nude",
    caption: "Odcień dobrany do skóry",
    category: "Nude",
    src: "https://images.pexels.com/photos/34373403/pexels-photo-34373403.jpeg?auto=compress&cs=tinysrgb&w=900",
    tone: 1,
    pos: { x: 30, y: 20 },
    depth: 0.6,
    tilt: 3,
  },
  {
    id: "t-gel",
    label: "Gel Shape",
    caption: "Migdał, naturalna budowa",
    category: "Extensions",
    src: "https://images.pexels.com/photos/13038494/pexels-photo-13038494.jpeg?auto=compress&cs=tinysrgb&w=900",
    tone: 2,
    pos: { x: 75, y: 20 },
    depth: 0.35,
    tilt: 5,
  },
  {
    id: "t-pearl",
    label: "Pearl Detail",
    caption: "Efekt lustra, perła",
    category: "Elegant",
    src: null,
    tone: 3,
    pos: { x: 90, y: 38 },
    depth: 0.75,
    tilt: 4,
  },
  {
    id: "t-pedicure",
    label: "Clean Pedicure",
    caption: "Spokojne wykończenie stóp",
    category: "Pedicure",
    src: null,
    tone: 4,
    pos: { x: 76, y: 56 },
    depth: 0.45,
    tilt: -3,
  },
  {
    id: "t-evening",
    label: "Evening Design",
    caption: "Szampan i cienkie zdobienie",
    category: "Elegant",
    src: "https://images.pexels.com/photos/34997567/pexels-photo-34997567.jpeg?auto=compress&cs=tinysrgb&w=900",
    tone: 1,
    pos: { x: 90, y: 72 },
    depth: 0.95,
    tilt: -5,
  },
];

export const socialLinks = {
  instagram: "https://www.instagram.com/nails_alesia_szczecin/",
  /** uzupełnij: "https://wa.me/48XXXXXXXXX" — dopóki null, przycisk się nie pokazuje */
  whatsapp: null as string | null,
  /** uzupełnij linkiem Booksy, np. "https://booksy.com/pl-pl/..." */
  booksy: null as string | null,
  /** uzupełnij: "https://maps.google.com/?q=..." */
  maps: null as string | null,
  instagramHandle: "@nails_alesia_szczecin",
};

export const services = [
  {
    id: "manicure-hybrydowy",
    name: "Manicure hybrydowy",
    description:
      "Opracowanie skórek, dobór kształtu i trwały kolor z połyskiem, który zostaje na tygodnie.",
    duration: "ok. 120 min",
    price: "od 140 zł",
    details: ["Opracowanie skórek", "Kolor lub baza w odcieniu skóry", "Olejek i pielęgnacja"],
    featured: true,
  },
  {
    id: "stylizacja-zelowa",
    name: "Stylizacja żelowa / akrylowa",
    description:
      "Wzmocnienie płytki i naturalnie wyglądająca budowa — bez efektu ciężkiego, grubego paznokcia.",
    duration: "ok. 150 min",
    price: "od 180 zł",
    details: ["Żel lub akryl", "Korekta łuku i apexu", "Uzupełnienie od 150 zł"],
    featured: false,
  },
  {
    id: "przedluzanie",
    name: "Przedłużanie paznokci",
    description:
      "Długość dobrana do dłoni: migdał, soft square albo delikatny ballerina.",
    duration: "ok. 180 min",
    price: "od 220 zł",
    details: ["Szablon lub tipsy", "Symetria i jednolita linia", "Konsultacja kształtu w cenie"],
    featured: false,
  },
  {
    id: "pedicure",
    name: "Pedicure",
    description:
      "Kompletne opracowanie stóp z zachowaniem komfortu — również w wersji z kolorem hybrydowym.",
    duration: "ok. 90 min",
    price: "od 150 zł",
    details: ["Opracowanie płytki i skórek", "Peeling i masaż", "Kolor hybrydowy +40 zł"],
    featured: false,
  },
  {
    id: "zdobienia",
    name: "Zdobienia · french · ombre · efekt lustra",
    description:
      "Subtelne detale: cienki french, mgiełka ombre, chrom w odcieniu perły lub szampana.",
    duration: "ok. +30 min",
    price: "Cena po konsultacji",
    details: ["Micro french", "Ombre / baby boomer", "Efekt lustra, chrom, folia"],
    featured: true,
  },
] as const;

export const galleryFilters: Array<GalleryCategory | "Wszystko"> = [
  "Wszystko",
  "Natural",
  "French",
  "Nude",
  "Extensions",
  "Pedicure",
  "Elegant",
];

export const galleryItems: GalleryItem[] = [
  {
    id: "g-01",
    src: "https://images.pexels.com/photos/13038494/pexels-photo-13038494.jpeg?auto=compress&cs=tinysrgb&w=1800",
    alt: "Inspiracja: delikatny french manicure na długich paznokciach",
    label: "Soft french",
    category: "French",
    ratio: "16/9",
    tone: 0,
    isReference: true,
    source: "Pexels",
    objectPosition: "52% 48%",
  },
  {
    id: "g-02",
    src: "https://images.pexels.com/photos/34997574/pexels-photo-34997574.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Inspiracja: klasyczny biały french z biżuterią",
    label: "Classic white edge",
    category: "French",
    ratio: "3/4",
    tone: 1,
    isReference: true,
    source: "Pexels",
    objectPosition: "50% 44%",
  },
  {
    id: "g-03",
    src: "https://images.pexels.com/photos/34373403/pexels-photo-34373403.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Inspiracja: naturalne mleczne nude paznokcie w miękkim świetle",
    label: "Milky natural",
    category: "Natural",
    ratio: "4/5",
    tone: 2,
    isReference: true,
    source: "Pexels",
    objectPosition: "48% 52%",
  },
  {
    id: "g-04",
    src: "https://images.pexels.com/photos/34997562/pexels-photo-34997562.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Inspiracja: elegancki french na czerwonym tle",
    label: "Evening french",
    category: "Elegant",
    ratio: "3/4",
    tone: 3,
    isReference: true,
    source: "Pexels",
    objectPosition: "48% 44%",
  },
  {
    id: "g-05",
    src: "https://images.pexels.com/photos/34997567/pexels-photo-34997567.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Inspiracja: długi french w edytorialnym kadrze",
    label: "Editorial detail",
    category: "Elegant",
    ratio: "16/9",
    tone: 4,
    isReference: true,
    source: "Pexels",
    objectPosition: "48% 50%",
  },
  {
    id: "g-06",
    src: null,
    alt: "Miejsce na realne zdjęcie pracy: nude manicure hybrydowy",
    label: "Portfolio photo coming soon",
    category: "Nude",
    ratio: "1/1",
    tone: 1,
  },
  {
    id: "g-07",
    src: null,
    alt: "Miejsce na realne zdjęcie pracy: przedłużanie paznokci",
    label: "Portfolio photo coming soon",
    category: "Extensions",
    ratio: "4/5",
    tone: 2,
  },
  {
    id: "g-08",
    src: null,
    alt: "Miejsce na realne zdjęcie pracy: perłowy efekt",
    label: "Portfolio photo coming soon",
    category: "Elegant",
    ratio: "3/4",
    tone: 3,
  },
  {
    id: "g-09",
    src: null,
    alt: "Miejsce na realne zdjęcie pracy: pedicure hybrydowy",
    label: "Portfolio photo coming soon",
    category: "Pedicure",
    ratio: "1/1",
    tone: 4,
  },
  {
    id: "g-10",
    src: null,
    alt: "Miejsce na realne zdjęcie pracy: krótki naturalny manicure",
    label: "Portfolio photo coming soon",
    category: "Natural",
    ratio: "4/5",
    tone: 0,
  },
  {
    id: "g-11",
    src: null,
    alt: "Miejsce na realne zdjęcie pracy: różowy french",
    label: "Portfolio photo coming soon",
    category: "French",
    ratio: "3/4",
    tone: 1,
  },
  {
    id: "g-12",
    src: null,
    alt: "Miejsce na realne zdjęcie pracy: nude manicure z połyskiem",
    label: "Portfolio photo coming soon",
    category: "Nude",
    ratio: "1/1",
    tone: 2,
  },
];

export const processSteps = [
  {
    id: "konsultacja",
    icon: "MessageCircle",
    title: "Konsultacja",
    description:
      "Rozmawiamy o stanie płytki, o tym co Ci przeszkadzało wcześniej i jak wygląda Twój dzień — od tego zależy długość.",
  },
  {
    id: "ksztalt",
    icon: "Ruler",
    title: "Dobór kształtu",
    description:
      "Kształt dopasowuję do palca i skórek, nie do zdjęcia z internetu. Symetria najbardziej rzuca się w oczy.",
  },
  {
    id: "stylizacja",
    icon: "Sparkles",
    title: "Stylizacja",
    description:
      "Cienkie warstwy, czysty margines przy skórkach i kolor dobrany do odcienia dłoni.",
  },
  {
    id: "pielegnacja",
    icon: "Leaf",
    title: "Pielęgnacja po wizycie",
    description:
      "Dostajesz krótką instrukcję: czym oliwić, czego unikać i kiedy wrócić na uzupełnienie.",
  },
] as const;

/**
 * UWAGA: `isMock: true` = tekst przykładowy.
 * Podmień na prawdziwe opinie (Instagram / Booksy / Google) i ustaw isMock: false.
 */
export const reviews = [
  {
    id: "r-1",
    name: "Karolina",
    context: "Manicure hybrydowy",
    text: "Pierwszy raz mam paznokcie, które nie odrastają krzywo po dwóch tygodniach. Bardzo dokładna praca przy skórkach i zero pośpiechu.",
    isMock: true,
  },
  {
    id: "r-2",
    name: "Magda",
    context: "Przedłużanie · migdał",
    text: "Bałam się przedłużania, bo wcześniej wychodziło zbyt grubo. Tutaj długość dobrana do dłoni, wygląda naturalnie i nie przeszkadza w pracy.",
    isMock: true,
  },
  {
    id: "r-3",
    name: "Ola",
    context: "French",
    text: "Cieniutki french dokładnie taki, jaki chciałam. Spokojne miejsce, miła rozmowa i wszystko dopięte na czas.",
    isMock: true,
  },
] as const;

export const faqNote =
  "Ceny orientacyjne — ostateczny koszt zależy od długości i stanu płytki. Podaję je przed rozpoczęciem wizyty.";

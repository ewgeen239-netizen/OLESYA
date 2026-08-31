/**
 * ============================================================================
 *  ALESIA NAILS SZCZECIN — WARSTWA TREŚCI
 * ============================================================================
 *  Cała treść strony znajduje się w tym jednym pliku.
 *  Aby zaktualizować stronę, edytuj wartości poniżej — nie trzeba dotykać
 *  komponentów.
 *
 *  ⚠️  DO UZUPEŁNIENIA PRZED PUBLIKACJĄ (oznaczone `TODO:`):
 *   1. `profile.heroImage` — zdjęcie Alesi na pierwszy ekran.
 *   2. `services[].price`  — ceny są ORIENTACYJNE, potwierdź je.
 *   3. `reviews`           — to PRZYKŁADOWE opinie (`isSample: true`).
 *                            Zastąp je prawdziwymi i ustaw `isSample: false`,
 *                            aby ukryć widoczną plakietkę "przykładowe".
 * ============================================================================
 */

/* -------------------------------------------------------------------------- */
/*  Typy                                                                      */
/* -------------------------------------------------------------------------- */

export type CategoryId = 'french' | 'nude' | 'gel' | 'pedicure' | 'design';

export interface Category {
  id: CategoryId | 'all';
  label: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: CategoryId;
  /** Krótki, elegancki podpis widoczny w lightboxie i na kafelku. */
  caption: string;
  /** Ścieżka w /public. Podmień na prawdziwe zdjęcie, zachowaj proporcje 4:5. */
  image: string;
  alt: string;
  /** `tall` wydłuża kafelek w siatce portfolio (efekt masonry). */
  span?: 'normal' | 'tall';
}

export interface HeroTile {
  /** Odnosi się do `GalleryItem.id`. */
  itemId: string;
  /** Pozycja w procentach szerokości/wysokości sceny hero (desktop). */
  left: number;
  top: number;
  rotate: number;
  /** Opóźnienie unoszenia się kafelka, w sekundach. */
  delay: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  /** TODO: potwierdź ceny przed publikacją. */
  price: string;
  icon: 'sparkles' | 'gem' | 'layers' | 'footprints' | 'brush';
  featured?: boolean;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Review {
  id: string;
  name: string;
  service: string;
  quote: string;
  rating: number;
  /** `true` = treść demonstracyjna. Ustaw `false` po wstawieniu prawdziwej opinii. */
  isSample: boolean;
}

/* -------------------------------------------------------------------------- */
/*  Marka                                                                     */
/* -------------------------------------------------------------------------- */

export const site = {
  name: 'Alesia Nails',
  fullName: 'Alesia Nails Szczecin',
  city: 'Szczecin',
  tagline: 'Delikatny, precyzyjny manicure',
  description:
    'Autorska stylizacja paznokci w Szczecinie. Subtelne kolory, dopracowany kształt i trwałość, która wygląda naturalnie.',
  /** Zmień na własną domenę po wdrożeniu — używane w metadanych SEO. */
  url: 'https://alesia-nails-szczecin.pl',
  locale: 'pl_PL',
} as const;

export const socialLinks = {
  instagram: 'https://www.instagram.com/nails_alesia_szczecin/',
  instagramHandle: '@nails_alesia_szczecin',
  /** Bezpośrednia wiadomość — główne CTA całej strony. */
  instagramDm: 'https://ig.me/m/nails_alesia_szczecin',
} as const;

export const cta = {
  primary: 'Umów wizytę przez Instagram',
  short: 'Umów wizytę',
  similar: 'Umów podobną stylizację',
} as const;

/* -------------------------------------------------------------------------- */
/*  Profil                                                                    */
/* -------------------------------------------------------------------------- */

export const profile = {
  name: 'Alesia',
  role: 'Stylistka paznokci',
  location: 'Szczecin',

  /**
   * TODO: GŁÓWNE ZDJĘCIE PIERWSZEGO EKRANU.
   * Wgraj portret Alesi jako:  public/images/hero-alesia.jpg
   * (albo public/hero-alesia.jpg / assets/nails-alesia/hero-alesia.jpg —
   *  skrypt `scripts/sync-assets.mjs` sam skopiuje plik we właściwe miejsce).
   *
   * Dopóki pliku nie ma, hero pokazuje wyraźnie opisane, puste miejsce —
   * świadomie NIE podstawiamy tam zdjęcia stockowego ani awatara 100×100.
   * Zalecane: kadr pionowy, min. 1200×1600 px, miękkie, jasne światło.
   */
  heroImage: '/images/hero-alesia.jpg',
  heroAlt: 'Alesia, nail stylist in Szczecin',

  /** Mały awatar (100×100 z Instagrama) — używany WYŁĄCZNIE w sekcji "O mnie". */
  avatar: '/images/profile.jpg',
  avatarAlt: 'Alesia — stylistka paznokci w Szczecinie',

  bio: [
    'Nazywam się Alesia i od kilku lat tworzę w Szczecinie stylizacje, które mają wyglądać jak Twoje własne paznokcie — tylko dopracowane do końca.',
    'Pracuję powoli i dokładnie. Najpierw kształt i zdrowa płytka, dopiero potem kolor. Stawiam na spokojne, nudowe odcienie, cienką linię francuza i wykończenie, które wytrzymuje codzienność.',
  ],

  stats: [
    { value: '5+', label: 'lat doświadczenia' },
    { value: '1:1', label: 'jedna klientka na wizytę' },
    { value: '3–4', label: 'tygodnie trwałości' },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  Portfolio                                                                 */
/* -------------------------------------------------------------------------- */

export const categories: Category[] = [
  { id: 'all', label: 'Wszystkie' },
  { id: 'french', label: 'French' },
  { id: 'nude', label: 'Nude' },
  { id: 'gel', label: 'Żel' },
  { id: 'pedicure', label: 'Pedicure' },
  { id: 'design', label: 'Zdobienia' },
];

/**
 * Obrazy to na razie autorskie placeholdery SVG w kolorystyce marki
 * (generowane przez `npm run assets:generate`).
 * Podmiana na prawdziwe zdjęcia: wgraj plik do public/images/portfolio/
 * i zmień tylko pole `image` — proporcje 4:5 trzymają układ bez przeskoków.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: 'french-minimal',
    title: 'French Minimal',
    category: 'french',
    caption: 'Cienka, ręcznie rysowana linia i mlecznobiała baza. Klasyka w najspokojniejszej wersji.',
    image: '/images/portfolio/french-minimal.svg',
    alt: 'Minimalistyczny french manicure w mlecznobiałym odcieniu',
    span: 'tall',
  },
  {
    id: 'soft-nude',
    title: 'Soft Nude',
    category: 'nude',
    caption: 'Ciepły beż dopasowany do odcienia skóry. Wygląda jak druga skóra.',
    image: '/images/portfolio/soft-nude.svg',
    alt: 'Delikatny nude manicure w ciepłym beżu',
  },
  {
    id: 'gel-shape',
    title: 'Gel Shape',
    category: 'gel',
    caption: 'Migdał budowany żelem — smukła sylwetka paznokcia i mocna, elastyczna płytka.',
    image: '/images/portfolio/gel-shape.svg',
    alt: 'Stylizacja żelowa w kształcie migdała',
  },
  {
    id: 'pearl-detail',
    title: 'Pearl Detail',
    category: 'design',
    caption: 'Pojedyncza perłowa kropka na jednym palcu. Detal, który widać dopiero z bliska.',
    image: '/images/portfolio/pearl-detail.svg',
    alt: 'Nude manicure z perłowym zdobieniem',
    span: 'tall',
  },
  {
    id: 'clean-pedicure',
    title: 'Clean Pedicure',
    category: 'pedicure',
    caption: 'Zadbana stopa, równy kształt, transparentny finisz. Pedicure, którego nie widać — czuć.',
    image: '/images/portfolio/clean-pedicure.svg',
    alt: 'Klasyczny, zadbany pedicure',
  },
  {
    id: 'evening-design',
    title: 'Evening Design',
    category: 'design',
    caption: 'Złoty pyłek i cienka linia na nudowej bazie. Wersja wieczorowa, wciąż elegancka.',
    image: '/images/portfolio/evening-design.svg',
    alt: 'Wieczorowa stylizacja paznokci ze złotym detalem',
  },
  {
    id: 'milky-french',
    title: 'Milky French',
    category: 'french',
    caption: 'Mleczna baza z ledwie zaznaczonym uśmiechem. Ulubieniec panien młodych.',
    image: '/images/portfolio/milky-french.svg',
    alt: 'Mleczny french manicure',
  },
  {
    id: 'almond-nude',
    title: 'Almond Nude',
    category: 'nude',
    caption: 'Migdał w odcieniu cappuccino. Wydłuża dłoń, nie rzucając się w oczy.',
    image: '/images/portfolio/almond-nude.svg',
    alt: 'Migdałowy manicure w odcieniu cappuccino',
    span: 'tall',
  },
  {
    id: 'glass-gloss',
    title: 'Glass Gloss',
    category: 'gel',
    caption: 'Szklane wykończenie top coatem. Światło układa się na płytce jak na lustrze.',
    image: '/images/portfolio/glass-gloss.svg',
    alt: 'Paznokcie z lustrzanym, szklanym wykończeniem',
  },
  {
    id: 'cat-eye',
    title: 'Cat Eye',
    category: 'design',
    caption: 'Magnetyczny refleks w ciepłym brązie. Zmienia się razem ze światłem.',
    image: '/images/portfolio/cat-eye.svg',
    alt: 'Manicure cat eye w ciepłym brązie',
  },
  {
    id: 'spa-pedicure',
    title: 'Spa Pedicure',
    category: 'pedicure',
    caption: 'Pełna pielęgnacja stóp zakończona nudowym lakierem hybrydowym.',
    image: '/images/portfolio/spa-pedicure.svg',
    alt: 'Pedicure spa z nudowym lakierem hybrydowym',
  },
  {
    id: 'micro-french',
    title: 'Micro French',
    category: 'french',
    caption: 'Najcieńsza linia, jaką da się poprowadzić pędzelkiem. Dla miłośniczek detalu.',
    image: '/images/portfolio/micro-french.svg',
    alt: 'Micro french z bardzo cienką linią',
    span: 'tall',
  },
];

/**
 * Sześć prac unoszących się wokół portretu na pierwszym ekranie.
 *
 * Układ jest wyliczony tak, by NIGDY nie zasłonić trzech stref:
 *   • portret Alesi   — środek kadru, ok. 34–66% szerokości
 *   • nagłówek + CTA  — lewy dolny róg, ok. 0–26% szerokości i 36–90% wysokości
 *   • dok nawigacji   — dolny środek
 *
 * Stąd jeden kafelek w lewym górnym rogu i pięć ułożonych w naprzemienną,
 * dwukolumnową „kaskadę” po prawej stronie. Rozmiar kafelka skaluje się
 * z wysokością okna (clamp w komponencie), więc układ trzyma się także
 * na niskich ekranach laptopowych.
 */
export const heroTiles: HeroTile[] = [
  { itemId: 'french-minimal', left: 3.5, top: 2.5, rotate: -2.5, delay: 0 },
  { itemId: 'gel-shape', left: 70, top: 6, rotate: 2.2, delay: 0.4 },
  { itemId: 'pearl-detail', left: 81, top: 22, rotate: -1.6, delay: 1.2 },
  { itemId: 'soft-nude', left: 70, top: 38, rotate: 1.8, delay: 0.8 },
  { itemId: 'clean-pedicure', left: 81, top: 54, rotate: 1.4, delay: 0.6 },
  { itemId: 'evening-design', left: 70, top: 70, rotate: -2, delay: 1.6 },
];

/* -------------------------------------------------------------------------- */
/*  Usługi                                                                    */
/* -------------------------------------------------------------------------- */

/** TODO: ceny orientacyjne — potwierdź je przed publikacją strony. */
export const services: Service[] = [
  {
    id: 'manicure-hybrydowy',
    name: 'Manicure hybrydowy',
    description:
      'Opracowanie skórek, nadanie kształtu i lakier hybrydowy. Podstawa, na której trzyma się wszystko inne.',
    duration: 'ok. 90 min',
    price: 'od 130 zł',
    icon: 'sparkles',
    featured: true,
  },
  {
    id: 'stylizacja-zelowa',
    name: 'Stylizacja żelowa',
    description:
      'Budowa żelem na naturalnej płytce. Wzmacnia, wyrównuje i pozwala zapomnieć o łamiących się paznokciach.',
    duration: 'ok. 120 min',
    price: 'od 170 zł',
    icon: 'layers',
  },
  {
    id: 'przedluzanie-paznokci',
    name: 'Przedłużanie paznokci',
    description:
      'Długość i kształt dobrane do dłoni — migdał, kwadrat lub soft square. Efekt lekki, nie sztuczny.',
    duration: 'ok. 150 min',
    price: 'od 210 zł',
    icon: 'gem',
  },
  {
    id: 'pedicure',
    name: 'Pedicure',
    description:
      'Pełna pielęgnacja stóp z opracowaniem wałów i wykończeniem hybrydą lub odżywką.',
    duration: 'ok. 90 min',
    price: 'od 160 zł',
    icon: 'footprints',
  },
  {
    id: 'zdobienia',
    name: 'Zdobienia',
    description:
      'French, cat eye, perłowe detale, delikatne linie i złoto. Dobierane do stylizacji, nigdy na siłę.',
    duration: '+15–30 min',
    price: 'od 20 zł',
    icon: 'brush',
  },
];

export const servicesNote =
  'Ceny orientacyjne — ostateczną wycenę i termin potwierdzam w wiadomości na Instagramie.';

/* -------------------------------------------------------------------------- */
/*  Proces                                                                    */
/* -------------------------------------------------------------------------- */

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Konsultacja',
    description:
      'Zaczynamy od rozmowy: styl życia, praca, oczekiwania i stan płytki. Bez tego nie ma trwałego efektu.',
  },
  {
    number: '02',
    title: 'Dobór kształtu',
    description:
      'Dopasowuję długość i kształt do proporcji dłoni. Sprawdzamy je na sucho, zanim cokolwiek utrwalę.',
  },
  {
    number: '03',
    title: 'Stylizacja',
    description:
      'Precyzyjne opracowanie, budowa i kolor. Cienkie warstwy, równe krawędzie, żadnego pośpiechu.',
  },
  {
    number: '04',
    title: 'Pielęgnacja',
    description:
      'Oliwka, krem i konkretne wskazówki na kolejne tygodnie. Dostajesz też termin kolejnej wizyty.',
  },
];

/* -------------------------------------------------------------------------- */
/*  Opinie                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * ⚠️ TREŚĆ PRZYKŁADOWA — to NIE są prawdziwe opinie klientek.
 * Służą wyłącznie jako rusztowanie układu. Zastąp je autentycznymi
 * wypowiedziami i ustaw `isSample: false`, żeby zniknęła widoczna
 * plakietka informująca o materiale demonstracyjnym.
 */
export const reviews: Review[] = [
  {
    id: 'r1',
    name: 'Karolina M.',
    service: 'Manicure hybrydowy',
    quote:
      'Pierwszy raz mam paznokcie, których nie muszę poprawiać po tygodniu. Kształt idealnie dobrany do moich dłoni.',
    rating: 5,
    isSample: true,
  },
  {
    id: 'r2',
    name: 'Natalia W.',
    service: 'Stylizacja żelowa',
    quote:
      'Bardzo spokojna atmosfera i ogromna dokładność. Wychodzę z poczuciem, że ktoś naprawdę się tym zajął.',
    rating: 5,
    isSample: true,
  },
  {
    id: 'r3',
    name: 'Ewa K.',
    service: 'French Minimal',
    quote:
      'Chciałam coś subtelnego do pracy i dostałam dokładnie to. Linia francuza cieniutka, równiutka.',
    rating: 5,
    isSample: true,
  },
  {
    id: 'r4',
    name: 'Magda S.',
    service: 'Pedicure',
    quote:
      'Profesjonalnie i higienicznie, a przy tym bardzo miło. Wracam co miesiąc i zawsze ten sam poziom.',
    rating: 5,
    isSample: true,
  },
];

export const reviewsSampleNotice =
  'Opinie poglądowe — do zastąpienia prawdziwymi wypowiedziami klientek.';

/* -------------------------------------------------------------------------- */
/*  Nawigacja (dok)                                                           */
/* -------------------------------------------------------------------------- */

export interface NavItem {
  id: string;
  label: string;
  icon: 'images' | 'sparkles' | 'user' | 'quote' | 'calendar';
  href: string;
}

export const navItems: NavItem[] = [
  { id: 'portfolio', label: 'Portfolio', icon: 'images', href: '#portfolio' },
  { id: 'uslugi', label: 'Usługi', icon: 'sparkles', href: '#uslugi' },
  { id: 'o-mnie', label: 'O mnie', icon: 'user', href: '#o-mnie' },
  { id: 'opinie', label: 'Opinie', icon: 'quote', href: '#opinie' },
  { id: 'rezerwacja', label: 'Rezerwacja', icon: 'calendar', href: '#rezerwacja' },
];

/* -------------------------------------------------------------------------- */
/*  Pomocnicze                                                                */
/* -------------------------------------------------------------------------- */

export const galleryById = (id: string): GalleryItem | undefined =>
  galleryItems.find((item) => item.id === id);

export const categoryLabel = (id: CategoryId): string =>
  categories.find((c) => c.id === id)?.label ?? id;

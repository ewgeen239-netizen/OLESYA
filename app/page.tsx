import About from "@/components/About";
import BookingCTA from "@/components/BookingCTA";
import Dock from "@/components/Dock";
import Footer from "@/components/Footer";
import HeroScene from "@/components/HeroScene";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Reviews from "@/components/Reviews";
import Services from "@/components/Services";
import SoftCursor from "@/components/SoftCursor";
import { profile, services, socialLinks } from "@/data/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NailSalon",
  name: profile.brand,
  description: profile.tagline,
  image: "https://alesia-nails-szczecin.pl/opengraph-image",
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.city,
    addressCountry: "PL",
  },
  sameAs: [socialLinks.instagram],
  priceRange: "$$",
  makesOffer: services.map((s) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: s.name },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SoftCursor />
      <main>
        <HeroScene />
        <Portfolio />
        <Services />
        <Process />
        <About />
        <Reviews />
        <BookingCTA />
      </main>
      <Footer />
      <Dock />
    </>
  );
}

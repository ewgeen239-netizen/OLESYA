import InstagramIcon from "@/components/ui/InstagramIcon";
import { ArrowUpRight, MapPin, MessageCircle } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { profile, socialLinks } from "@/data/site";

export default function BookingCTA() {
  return (
    <section
      id="kontakt"
      className="bg-grain noise relative overflow-hidden border-t border-espresso/8 bg-[linear-gradient(180deg,#FBF6F0_0%,#F4EADC_55%,#EFE3D2_100%)] py-18 sm:py-22 lg:py-28"
    >

      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="mx-auto max-w-[760px] text-center">
          <Reveal>
            <p className="text-[11px] font-medium tracking-[0.24em] uppercase text-espresso-faint">
              Rezerwacja
            </p>
            <h2 className="mt-4 font-display text-[34px] leading-[1.08] text-balance sm:text-[46px] lg:text-[54px]">
              Gotowa na delikatny manicure?
            </h2>
            <p className="mx-auto mt-5 max-w-[52ch] text-[15px] leading-[1.75] text-pretty text-espresso-soft">
              Napisz na Instagramie — odpisuję zwykle tego samego dnia. Podaj
              preferowany termin i to, co chciałabyś zrobić; resztę ustalimy na
              miejscu.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-13 w-full items-center justify-center gap-2 rounded-[10px] bg-espresso px-6 text-[14.5px] font-medium text-cream transition-all duration-300 hover:bg-[#241C17] hover:shadow-[0_18px_40px_-20px_rgba(75,58,49,0.9)] sm:w-auto"
              >
                <InstagramIcon aria-hidden="true" className="h-4 w-4" />
                Napisz na Instagramie
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              {socialLinks.whatsapp ? (
                <a
                  href={socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-[10px] border border-espresso/15 bg-cream px-6 text-[14.5px] font-medium text-espresso transition-all duration-300 hover:border-espresso/35 sm:w-auto"
                >
                  <MessageCircle aria-hidden="true" className="h-4 w-4" />
                  WhatsApp
                </a>
              ) : null}

              {socialLinks.booksy ? (
                <a
                  href={socialLinks.booksy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-[10px] border border-espresso/15 bg-cream px-6 text-[14.5px] font-medium text-espresso transition-all duration-300 hover:border-espresso/35 sm:w-auto"
                >
                  Booksy
                </a>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-7 inline-flex items-center gap-2 text-[12.5px] text-espresso-faint">
              <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
              {profile.city} — {profile.district}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

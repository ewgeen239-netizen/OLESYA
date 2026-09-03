import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { faqNote, services, socialLinks } from "@/data/site";

export default function Services() {
  return (
    <section
      id="uslugi"
      className="border-b border-espresso/8 bg-latte/45 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="text-[11px] font-medium tracking-[0.24em] uppercase text-espresso-faint">
                Usługi
              </p>
              <h2 className="mt-3 font-display text-[32px] leading-[1.1] text-balance sm:text-[40px] lg:text-[44px]">
                Menu zabiegów
              </h2>
              <p className="mt-4 max-w-[40ch] text-[14px] leading-[1.75] text-pretty text-espresso-soft">
                Każda wizyta zaczyna się od konsultacji — dobieramy długość,
                kształt i wykończenie, zanim zaczniemy pracę.
              </p>
              <p className="mt-5 rounded-[10px] border border-espresso/10 bg-cream px-4 py-3 text-[12.5px] leading-[1.65] text-espresso-faint">
                {faqNote}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <ul className="border-t border-espresso/10">
              {services.map((s, i) => (
                <Reveal as="li" key={s.id} delay={i * 0.05}>
                  <div className="group border-b border-espresso/10 py-6 transition-colors duration-500 hover:bg-cream/70 sm:py-7">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                      <div className="min-w-0">
                        <h3 className="flex flex-wrap items-center gap-2 font-display text-[22px] leading-tight text-espresso sm:text-[25px]">
                          {s.name}
                          {s.featured ? (
                            <span className="rounded-[6px] bg-accent-soft px-2 py-0.5 font-sans text-[10px] font-medium tracking-[0.16em] uppercase text-espresso-soft">
                              Najczęściej wybierane
                            </span>
                          ) : null}
                        </h3>
                        <p className="mt-2 max-w-[52ch] text-[14px] leading-[1.7] text-pretty text-espresso-soft">
                          {s.description}
                        </p>
                        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                          {s.details.map((d) => (
                            <li
                              key={d}
                              className="text-[12px] tracking-[0.02em] text-espresso-faint before:mr-2 before:content-['·']"
                            >
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="shrink-0 sm:text-right">
                        <p className="font-display text-[20px] leading-none whitespace-nowrap text-espresso">
                          {s.price}
                        </p>
                        <p className="mt-2 text-[11.5px] tracking-[0.06em] text-espresso-faint">
                          {s.duration}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.1}>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex h-12 items-center gap-2 rounded-[10px] border border-espresso/15 bg-cream px-5 text-[14px] font-medium text-espresso transition-all duration-300 hover:border-espresso/35 hover:shadow-[0_10px_28px_-18px_rgba(75,58,49,0.6)]"
              >
                Zapytaj o termin
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

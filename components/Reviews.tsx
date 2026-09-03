import { Quote } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { reviews, socialLinks } from "@/data/site";

export default function Reviews() {
  const hasMock = reviews.some((r) => r.isMock);

  return (
    <section
      id="opinie"
      className="border-b border-espresso/8 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="text-[11px] font-medium tracking-[0.24em] uppercase text-espresso-faint">
              Opinie
            </p>
            <h2 className="mt-3 max-w-[18ch] font-display text-[32px] leading-[1.1] text-balance sm:text-[40px] lg:text-[42px]">
              Co mówią klientki
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-espresso-soft underline decoration-espresso/20 underline-offset-4 transition-colors hover:text-espresso"
            >
              Więcej relacji na Instagramie
            </a>
          </Reveal>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal as="li" key={r.id} delay={i * 0.07}>
              <figure className="flex h-full flex-col rounded-[14px] border border-espresso/10 bg-latte/40 p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-cream hover:shadow-[0_26px_50px_-40px_rgba(75,58,49,0.7)]">
                <Quote aria-hidden="true" className="h-4 w-4 text-accent" />
                <blockquote className="mt-4 flex-1 text-[14.5px] leading-[1.75] text-pretty text-espresso-soft">
                  {r.text}
                </blockquote>
                <figcaption className="mt-5 border-t border-espresso/10 pt-4">
                  <span className="block text-[13.5px] text-espresso">{r.name}</span>
                  <span className="mt-0.5 block text-[11.5px] tracking-[0.06em] text-espresso-faint">
                    {r.context}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>

        {hasMock ? (
          <p className="mt-6 text-[11.5px] leading-relaxed text-espresso-faint">
            * Opinie przykładowe — do podmiany na prawdziwe w
            <code className="mx-1 rounded-[4px] bg-latte px-1.5 py-0.5 text-[11px]">
              data/site.ts
            </code>
            (pole <code className="text-[11px]">isMock</code>).
          </p>
        ) : null}
      </div>
    </section>
  );
}

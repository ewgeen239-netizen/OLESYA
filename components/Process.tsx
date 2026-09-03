import { Leaf, MessageCircle, Ruler, Sparkles, type LucideIcon } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { processSteps } from "@/data/site";

const ICONS: Record<string, LucideIcon> = {
  MessageCircle,
  Ruler,
  Sparkles,
  Leaf,
};

export default function Process() {
  return (
    <section className="border-b border-espresso/8 bg-latte/45 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <Reveal>
          <p className="text-[11px] font-medium tracking-[0.24em] uppercase text-espresso-faint">
            Przebieg wizyty
          </p>
          <h2 className="mt-3 max-w-[20ch] font-display text-[32px] leading-[1.1] text-balance sm:text-[40px] lg:text-[42px]">
            Cztery kroki, zero pośpiechu
          </h2>
        </Reveal>

        <ol className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-[14px] border border-espresso/10 bg-espresso/10 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => {
            const Icon = ICONS[step.icon] ?? Sparkles;
            return (
              <Reveal as="li" key={step.id} delay={i * 0.07}>
                <div className="h-full bg-cream p-6 transition-colors duration-500 hover:bg-accent-soft/40 sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-espresso/10 bg-latte/60">
                      <Icon aria-hidden="true" className="h-4.5 w-4.5 text-espresso-soft" />
                    </span>
                    <span className="font-display text-[15px] text-espresso-faint">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-[21px] leading-tight text-espresso">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-[13.5px] leading-[1.7] text-pretty text-espresso-soft">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

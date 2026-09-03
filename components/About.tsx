import InstagramIcon from "@/components/ui/InstagramIcon";
import { ShieldCheck } from "lucide-react";
import NailPhoto from "@/components/ui/NailPhoto";
import Reveal from "@/components/ui/Reveal";
import { profile, socialLinks } from "@/data/site";

export default function About() {
  return (
    <section
      id="o-mnie"
      className="border-b border-espresso/8 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="rounded-[14px] border border-espresso/10 bg-latte/50 p-5 sm:p-6">
              <div className="flex items-center gap-4">
                <div className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-[12px] border border-espresso/10 sm:h-20 sm:w-20">
                  <NailPhoto
                    src={profile.avatar}
                    alt={profile.avatarAlt}
                    ratio="1/1"
                    tone={3}
                    sizes="80px"
                    objectPosition="50% 16%"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-[21px] leading-tight text-espresso">
                    {profile.master}
                  </p>
                  <p className="mt-1 text-[12.5px] tracking-[0.04em] text-espresso-faint">
                    {profile.role} · {profile.city}
                  </p>
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-[12.5px] text-espresso-soft transition-colors hover:text-espresso"
                  >
                    <InstagramIcon aria-hidden="true" className="h-3.5 w-3.5" />
                    {socialLinks.instagramHandle}
                  </a>
                </div>
              </div>

              <div className="mt-5 flex items-start gap-2.5 border-t border-espresso/10 pt-5">
                <ShieldCheck
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-espresso-faint"
                />
                <p className="text-[12.5px] leading-[1.7] text-espresso-soft">
                  Sterylizacja narzędzi po każdej klientce, jednorazowe pilniki
                  i praca na jedną osobę w danym momencie.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.06}>
            <p className="text-[11px] font-medium tracking-[0.24em] uppercase text-espresso-faint">
              O mnie
            </p>
            <h2 className="mt-3 max-w-[18ch] font-display text-[32px] leading-[1.1] text-balance sm:text-[40px] lg:text-[42px]">
              Detal, którego nie widać od razu
            </h2>
          </Reveal>

          <div className="mt-5 space-y-4">
            {profile.aboutParagraphs.map((p, i) => (
              <Reveal key={i} delay={0.08 + i * 0.05}>
                <p className="max-w-[62ch] text-[15px] leading-[1.8] text-pretty text-espresso-soft">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

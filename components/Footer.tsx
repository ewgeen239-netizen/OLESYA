
import InstagramIcon from "@/components/ui/InstagramIcon";
import { profile, socialLinks } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-espresso/10 bg-cream pb-28 pt-10">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-5 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-[18px] leading-none text-espresso">
            {profile.brand}
          </p>
          <p className="mt-2 text-[12.5px] text-espresso-faint">
            {profile.city} — {profile.district} · stylizacja paznokci
          </p>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram — ${socialLinks.instagramHandle}`}
            className="inline-flex items-center gap-2 text-[13px] text-espresso-soft transition-colors hover:text-espresso"
          >
            <InstagramIcon aria-hidden="true" className="h-4 w-4" />
            {socialLinks.instagramHandle}
          </a>
          <p className="text-[12px] text-espresso-faint">
            © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}

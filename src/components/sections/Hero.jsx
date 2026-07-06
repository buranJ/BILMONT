import { useTranslation } from "react-i18next";
import Button from "../ui/Button.jsx";
import CurvedShowcase from "./CurvedShowcase.jsx";

/**
 * Hero block: tag badge, two-line serif headline, subtitle, CTAs,
 * a stats bar, and the infinite mentor slider underneath — laid out
 * to mirror the Flowblox hero.
 */
export default function Hero() {
  const { t } = useTranslation();
  const stats = t("stats", { returnObjects: true });

  return (
    <section id="top" className="relative overflow-hidden pt-4">
      <div className="mx-auto max-w-container px-6 text-center">
        {/* Tag badge */}
        {/* <span className="inline-flex items-center gap-2 rounded-full border border-dark/10 bg-white/40 px-3 py-1 text-xs font-medium text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-green" />
          {t('hero.tag')}
        </span> */}

        {/* Headline */}
        <h1 className="mx-auto mt-6 max-w-3xl font-serif leading-[1.05] text-dark">
          <span className="block text-4xl font-normal italic md:text-5xl">
            {t("hero.h1_italic")}
          </span>
          <span className="mt-1 block text-5xl font-bold md:text-6xl">
            {/* {t('hero.h1_bold')} */}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted">
          {t("hero.sub")}
        </p>

        {/* CTAs */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button arrow href="#contact">
            {t("hero.cta")}
          </Button>
          <Button variant="outline" href="#features">
            {t("hero.cta2")}
          </Button>
        </div>
      </div>

      {/* Coverflow slider */}
      <div className="">
        <CurvedShowcase />
      </div>

      {/* Stats bar */}
      <div className="mx-auto mt-22 max-w-container px-6 ">
        <div className="mx-auto grid max-w-2xl grid-cols-3 border-t border-dark/5 pt-10">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`px-2 text-center sm:px-4 ${
                i > 0 ? 'border-l border-dark/10' : ''
              }`}
            >
              <p className="font-serif text-2xl font-bold leading-none tracking-tight text-dark sm:text-3xl md:text-4xl">
                {s.value}
              </p>
              <p className="mt-2 text-xs leading-tight text-muted sm:text-sm">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    
    </section>
  );
}

import Image from "next/image";

/* Decorative images keep their own exported size and must not react to taps. */
const decor = "absolute h-auto w-auto max-w-none";

/**
 * The layered background of the hero.
 *
 * In Figma this is the poster frame of a looping tech video. The designer's
 * note says: in production, replace it with a muted, autoplaying, looping
 * MP4/WebM video and keep this picture as the poster. Until that video
 * exists, we stack the same layers the design uses (bottom to top):
 *
 *   1. footage photo        4. plexus network lines     7. bottom fade
 *   2. circuit photo        5. three soft light spots   8. two colour glows
 *   3. purple brand tint    6. thin scan line
 *
 * Layers 4, 5 and 8 are drawn for a specific frame shape, so there are two
 * sets: a tall one for phones (shown below md) and a wide one for larger
 * screens. The glows have a "compact" set (below xl) and a desktop set.
 *
 * Everything here is decoration, so it is hidden from screen readers.
 */
export default function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* 1. Footage photo, slightly zoomed in like in the design */}
      <Image
        src="/assets/images/hero/poster.png"
        alt=""
        fill
        sizes="100vw"
        preload
        className="scale-118 object-cover"
      />
      {/* 2. Circuit photo, blended on top at low opacity */}
      <Image
        src="/assets/images/hero/circuit.png"
        alt=""
        fill
        sizes="100vw"
        className="scale-111 object-cover opacity-18 mix-blend-screen"
      />
      {/* 3. Brand tint: dark on the left (behind the text), purple on the right */}
      <div className="absolute inset-0 bg-linear-to-r from-ink/95 via-ink-soft/75 via-55% to-primary-dark/45" />

      {/* 4 + 5. Plexus lines and light spots: PHONE set */}
      <Image
        src="/assets/images/hero/plexus-mobile.svg"
        alt=""
        width={460}
        height={1024}
        className={`${decor} -top-15.5 -left-8 md:hidden`}
      />
      <Image
        src="/assets/images/hero/light-1-mobile.svg"
        alt=""
        width={206}
        height={779}
        className={`${decor} -top-51 -right-9.5 md:hidden`}
      />
      <Image
        src="/assets/images/hero/light-2-mobile.svg"
        alt=""
        width={190}
        height={717}
        className={`${decor} top-97 -left-17.5 md:hidden`}
      />
      <Image
        src="/assets/images/hero/light-3-mobile.svg"
        alt=""
        width={114}
        height={430}
        className={`${decor} top-128 -right-5.5 md:hidden`}
      />

      {/* 4 + 5. Plexus lines and light spots: TABLET + DESKTOP set */}
      <Image
        src="/assets/images/hero/plexus.svg"
        alt=""
        width={1700}
        height={867}
        className={`${decor} -top-13 -left-30 hidden md:block`}
      />
      <Image
        src="/assets/images/hero/light-1.svg"
        alt=""
        width={760}
        height={659}
        className={`${decor} -top-43 -right-35 hidden md:block`}
      />
      <Image
        src="/assets/images/hero/light-2.svg"
        alt=""
        width={700}
        height={607}
        className={`${decor} top-82 -left-65 hidden md:block`}
      />
      <Image
        src="/assets/images/hero/light-3.svg"
        alt=""
        width={420}
        height={364}
        className={`${decor} top-108 -right-20 hidden md:block`}
      />

      {/* 6. Thin horizontal scan line */}
      <div className="absolute inset-x-0 top-1/5 h-px bg-linear-to-r from-accent/0 via-accent/60 to-accent/0" />
      {/* 7. Fade to dark at the bottom */}
      <div className="absolute inset-0 bg-linear-to-b from-ink/0 via-ink/15 via-60% to-ink/85" />

      {/* 8. Colour glows: PHONE + TABLET set (bottom left and top right) */}
      <Image
        src="/assets/images/hero/glow-compact-1.svg"
        alt=""
        width={600}
        height={600}
        className={`${decor} top-75 -left-50 xl:hidden`}
      />
      <Image
        src="/assets/images/hero/glow-compact-2.svg"
        alt=""
        width={500}
        height={500}
        className={`${decor} -top-25 -right-62.5 xl:hidden`}
      />
      {/* 8. Colour glows: DESKTOP set (top right and bottom left) */}
      <Image
        src="/assets/images/hero/glow-1.svg"
        alt=""
        width={760}
        height={760}
        className={`${decor} -top-40 -right-20 hidden xl:block`}
      />
      <Image
        src="/assets/images/hero/glow-2.svg"
        alt=""
        width={700}
        height={700}
        className={`${decor} top-95 -left-65 hidden xl:block`}
      />
    </div>
  );
}

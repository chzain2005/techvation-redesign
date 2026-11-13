import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

/** The icon shapes in /public/assets/icons/glyph (all 24 x 24, line style). */
export type GlyphName =
  | "arrow-right"
  | "award"
  | "bar-chart"
  | "bot"
  | "cart"
  | "check"
  | "chevron-down"
  | "chevron-right"
  | "clock"
  | "cloud"
  | "code"
  | "cpu"
  | "database"
  | "dollar"
  | "file-text"
  | "headset"
  | "layers"
  | "mail"
  | "megaphone"
  | "minus"
  | "monitor"
  | "phone"
  | "plus"
  | "rocket"
  | "search"
  | "shield"
  | "sliders"
  | "smartphone"
  | "sparkles"
  | "target"
  | "trending-up"
  | "truck"
  | "users"
  | "wrench"
  | "zap";

type GlyphProps = {
  name: GlyphName;
  /** Size of the icon in pixels. */
  size: number;
  /** Colour it with a text colour class, e.g. "text-white" or "text-primary". */
  className?: string;
};

/**
 * A line icon that takes the colour of the text around it.
 *
 * Unlike <Icon>, which shows an SVG file exported in one fixed colour and
 * size, a Glyph uses the SVG only as a stencil ("mask") and paints it with
 * the current text colour. So one file serves every colour and size:
 *
 *   <Glyph name="layers" size={18} className="text-primary" />
 *   <Glyph name="layers" size={24} className="text-white" />
 *
 * Icons are decorative (the text next to them explains them), so screen
 * readers skip them.
 */
export default function Glyph({ name, size, className }: GlyphProps) {
  const mask = `url(/assets/icons/glyph/${name}.svg)`;
  const style: CSSProperties = {
    width: size,
    height: size,
    maskImage: mask,
    WebkitMaskImage: mask,
    maskSize: "contain",
    WebkitMaskSize: "contain",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: "center",
    WebkitMaskPosition: "center",
  };
  // To show a glyph only on some screens, wrap it (e.g. <span className="md:hidden">),
  // because display classes passed here would clash with "block".
  return <span aria-hidden className={cn("block shrink-0 bg-current", className)} style={style} />;
}
